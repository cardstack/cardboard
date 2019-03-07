import { module, test, skip } from 'qunit';
import { click, visit, currentURL, waitFor, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Fixtures from '@cardstack/test-support/fixtures';
import { login } from '../helpers/login';
import { ciSessionId } from '@cardstack/test-support/environment';
import { hubURL } from '@cardstack/plugin-utils/environment';

async function navigateToNewArticle() {
  await login('github-writer');
  await click('[data-test-cardstack-tools-launcher-button');
  await click('.cs-create-button');
  let [ addArticle ] = [ ... document.querySelectorAll('.cs-create-menu li')].filter(element => /Article/.test((element.textContent || '').trim()));
  let button = addArticle.querySelector('button');
  await click(button);
}

async function saveArticle() {
  await click('[data-test-cs-version-control-button-save="false"]');
  await waitFor('[data-test-cs-version-control-button-save="true"]');
}

function findTriggerElementWithLabel(labelRegex) {
  return [...document.querySelectorAll('.cs-toolbox-section label')].find(element => labelRegex.test(element.textContent));
}

async function setSlugField(slug) {
  let element = findTriggerElementWithLabel(/Slug/);
  await click(element);
  let input = element.closest('section').querySelector('input');
  await fillIn(input, slug);
}

async function getArticles() {
  let url = `${hubURL}/api/articles`;
  let response = await fetch(url, {
    headers: {
      authorization: `Bearer ${ciSessionId}`,
      "content-type": 'application/vnd.api+json'
    }
  });
  return (await response.json()).data;
}

const scenario = new Fixtures({
  create(factory) {
    factory.addResource('boards', 'community').withAttributes({ title: 'Community' });
    factory.addResource('github-users', 'github-writer')
      .withAttributes({
        name: "Writer McWriteface",
        permissions: ['cardstack/cardboard-data:read', 'cardstack/cardboard-data:write']
      });
    factory.addResource('data-sources', 'mock-auth')
      .withAttributes({
        sourceType: '@cardstack/mock-auth',
        'may-create-user': true,
        'user-rewriter': './cardstack/mock-auth-rewriter.js',
        params: {
          provideUserSchema: false,
          users: {
            'github-writer': { type: 'github-users', id: 'github-writer' },
          }
        }
      });
  },
  destroy() {
    return [{ type: 'articles' }];
  }
});
module('Acceptance | new article', function(hooks) {
  setupApplicationTest(hooks);
  scenario.setupTest(hooks);

  hooks.beforeEach(function() {
    delete localStorage['cardstack-tools'];
  });

  hooks.afterEach(function() {
    delete localStorage['cardstack-tools'];
  });

  test('the readers field is set correctly for new draft articles', async function(assert) {
    await navigateToNewArticle();
    assert.equal(currentURL(), '/articles/new');
    await setSlugField('test');
    await saveArticle();

    let [ article ] = await getArticles();
    assert.ok(article, 'an article was created');
    assert.deepEqual(article.relationships.readers.data, { type: 'groups', id: 'github-writers'}, 'the article readers group is set correctly');
  });

  test('the readers field is set correctly for new published articles', async function(assert) {
    await navigateToNewArticle();

    let element = findTriggerElementWithLabel(/Published/);
    await click(element);
    await click(element.closest('section').querySelector('.cs-toggle-switch'));

    await setSlugField('test');
    await saveArticle();

    let [ article ] = await getArticles();
    assert.ok(article, 'an article was created');
    assert.deepEqual(article.relationships.readers.data, { type: 'groups', id: 'everyone'}, 'the article readers group is set correctly');
  });

  test('the authors field is set correctly for articles', async function(assert) {
    await navigateToNewArticle();
    await setSlugField('test');
    await saveArticle();

    let [ article ] = await getArticles();
    assert.ok(article, 'an article was created');
    assert.equal(article.attributes['author-name'], 'Writer McWriteface', 'the author name is correct');
    assert.deepEqual(article.relationships.author.data, { type: 'github-users', id: 'github-writer'}, 'the author is set correctly');
  });

  test('the created-date field is set correctly for articles', async function(assert) {
    await navigateToNewArticle();
    await setSlugField('test');
    await saveArticle();

    let [ article ] = await getArticles();
    assert.ok(article, 'an article was created');
    assert.ok(article.attributes['created-date'], 'the created date is set');
  });

  test('the article publish date is not set when the article is not published', async function(assert) {
    await navigateToNewArticle();
    await setSlugField('test');
    await saveArticle();

    let [ article ] = await getArticles();
    assert.ok(article, 'an article was created');
    assert.notOk(article.attributes['published-date'], 'the published date is not set');
    assert.equal(article.attributes['is-draft'], true, 'is-draft is set correectly');

    await visit(`/articles/test`);
    let element = findTriggerElementWithLabel(/Published/);
    await click(element);

    let toggleSwitch = element.closest('section').querySelector('.cs-toggle-switch');
    assert.dom(toggleSwitch).hasText('No');
    assert.dom('.cs-field-editor-published-date--published-date').doesNotExist();
  });

  test('the article publish date is set when the article is published', async function(assert) {
    await navigateToNewArticle();

    let element = findTriggerElementWithLabel(/Published/);
    await click(element);
    let toggleSwitch = element.closest('section').querySelector('.cs-toggle-switch');
    await click(toggleSwitch);

    await setSlugField('test');
    await saveArticle();

    let [ article ] = await getArticles();
    assert.ok(article, 'an article was created');
    assert.ok(article.attributes['published-date'], 'the published date is set');
    assert.equal(article.attributes['is-draft'], false, 'is-draft is set correectly');

    await visit(`/articles/test`);
    element = findTriggerElementWithLabel(/Published/);
    await click(element);

    toggleSwitch = element.closest('section').querySelector('.cs-toggle-switch');
    assert.dom(toggleSwitch).hasText('Yes');
    assert.dom('.cs-field-editor-published-date--published-date').hasAnyText();
  });

  test('the theme has been set to the default theme', async function(assert) {
    await navigateToNewArticle();
    assert.dom('.article-isolated.modern').exists();

    await setSlugField('test');
    await saveArticle();

    let [ article ] = await getArticles();
    assert.ok(article, 'an article was created');
    assert.deepEqual(article.relationships.theme.data, { type: 'themes', id: 'modern'}, 'the default theme is set correctly');
  });

  skip('TODO the slug cannot be empty', async function(/*assert*/) {
  });

});