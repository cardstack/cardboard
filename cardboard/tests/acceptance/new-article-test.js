import { module, test } from 'qunit';
import { click, currentURL, fillIn, waitFor } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Fixtures from '@cardstack/test-support/fixtures';
import { setupMockUser, login } from '../helpers/login';
import { saveDocument, findTriggerElementWithLabel } from '../helpers/editor-utils';
import { getArticles, setupThemes, setupCategories } from '../helpers/article-utils';

async function navigateToNewArticle() {
  await login('github-writer');
  await click('[data-test-cardstack-tools-launcher-button');
  await click('.cs-create-button');
  let [ addArticle ] = [ ... document.querySelectorAll('.cs-create-menu li')].filter(element => /Article/.test((element.textContent || '').trim()));
  let button = addArticle.querySelector('button');
  await click(button);
  await waitFor('[data-test-article-isolated-done-loading]');
}

async function setSlugField(slug) {
  await fillIn('[data-test-cs-field-editor="slug"] input[type="text"]', slug);
}

const scenario = new Fixtures({
  create(factory) {
    setupMockUser(factory);
    setupThemes(factory);
    setupCategories(factory);
    factory.addResource('boards', 'community').withAttributes({ title: 'Community' });
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
    await saveDocument();

    let [ article ] = await getArticles();
    assert.ok(article, 'an article was created');
    assert.deepEqual(article.relationships.readers.data, { type: 'groups', id: 'github-writers'}, 'the article readers group is set correctly');
  });

  test('the readers field is set correctly for new published articles', async function(assert) {
    await navigateToNewArticle();

    await click('[data-test-cs-field-editor="publishedDate"] .cs-toggle-switch');

    await setSlugField('test');
    await saveDocument();

    let [ article ] = await getArticles();
    assert.ok(article, 'an article was created');
    assert.deepEqual(article.relationships.readers.data, { type: 'groups', id: 'everyone'}, 'the article readers group is set correctly');
  });

  test('the authors field is set correctly for articles', async function(assert) {
    await navigateToNewArticle();
    await setSlugField('test');
    await saveDocument();

    let [ article ] = await getArticles();
    assert.ok(article, 'an article was created');
    assert.equal(article.attributes['author-name'], 'Writer McWriteface', 'the author name is correct');
    assert.deepEqual(article.relationships.author.data, { type: 'github-users', id: 'github-writer'}, 'the author is set correctly');
  });

  test('the created-date field is set correctly for articles', async function(assert) {
    await navigateToNewArticle();
    await setSlugField('test');
    await saveDocument();

    let [ article ] = await getArticles();
    assert.ok(article, 'an article was created');
    assert.ok(article.attributes['created-date'], 'the created date is set');
  });

  test('the article publish date is not set when the article is not published', async function(assert) {
    await navigateToNewArticle();
    await setSlugField('test');
    await saveDocument();

    let [ article ] = await getArticles();
    assert.ok(article, 'an article was created');
    assert.notOk(article.attributes['published-date'], 'the published date is not set');
    assert.equal(article.attributes['is-draft'], true, 'is-draft is set correectly');

    assert.dom('[data-test-cs-field-editor="publishedDate"] .cs-toggle-switch').hasText('No');
    assert.dom('.cardboard-field-created-date--published-date').doesNotExist();
  });

  test('the article publish date is set when the article is published', async function(assert) {
    await navigateToNewArticle();

    await click('[data-test-cs-field-editor="publishedDate"] .cs-toggle-switch');

    await setSlugField('test');
    await saveDocument();

    let [ article ] = await getArticles();
    assert.ok(article, 'an article was created');
    assert.ok(article.attributes['published-date'], 'the published date is set');
    assert.equal(article.attributes['is-draft'], false, 'is-draft is set correectly');

    assert.dom('[data-test-cs-field-editor="publishedDate"] .cs-toggle-switch').hasText('Yes');
    assert.dom('.cardboard-field-created-date--published-date').hasAnyText();
  });

  test('the theme has been set to the default theme', async function(assert) {
    await navigateToNewArticle();
    assert.dom('[data-test-article-isolated="modern"]').exists();

    await setSlugField('test');
    await saveDocument();

    let [ article ] = await getArticles();
    assert.ok(article, 'an article was created');
    assert.deepEqual(article.relationships.theme.data, { type: 'themes', id: 'modern'}, 'the default theme is set correctly');
  });

  test('the slug cannot be empty', async function(assert) {
    await navigateToNewArticle();
    await click('[data-test-cs-version-control-button-save="false"]');

    // TODO currently there is a bug where we are not showing validation errors when trying to save new documents that fail validation
    // https://github.com/cardstack/cardstack/issues/688
    // After this bug is fixed replace the timeout below with a `waitFor`.

    // Give the hub a moment to return an error. Because of the bug above, this error is invisible to the user--so lets just wait 5 secs
    await new Promise(res => setTimeout(() => { res() }), 5000);
    assert.dom('[data-test-cs-version-control-button-save="false"]').exists();
  });

  test('all the categories are available in the category drop down', async function(assert) {
    await navigateToNewArticle();

    let element = findTriggerElementWithLabel(/Category/);
    let section = element.closest('section');
    await click(element);
    assert.dom(section.querySelector('.ember-power-select-selected-item')).doesNotContainText();

    await click(section.querySelector('.ember-power-select-trigger'));

    assert.dom('.ember-power-select-options').hasTextContaining('LOLz');
    assert.dom('.ember-power-select-options').hasTextContaining('Squash');
    assert.dom('.ember-power-select-options').hasTextContaining('Hair');
    assert.dom('.ember-power-select-option[aria-selected="true"]').doesNotExist();
  });

  test('all the themes are available in the theme picker', async function(assert) {
    await navigateToNewArticle();

    let element = findTriggerElementWithLabel(/Theme/);
    let section = element.closest('section');
    await click(element);
    assert.dom(section.querySelector('.ember-power-select-selected-item')).hasText('Modern');

    await click(section.querySelector('.ember-power-select-trigger'));

    assert.dom('.ember-power-select-options').hasTextContaining('Dark');
    assert.dom('.ember-power-select-options').hasTextContaining('Modern');
    assert.dom('.ember-power-select-options').hasTextContaining('Sharp');
    assert.dom('.ember-power-select-option[aria-selected="true"]').hasText('Modern');
  });
});
