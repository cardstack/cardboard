import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Fixtures from '@cardstack/test-support/fixtures';
import { login } from '../helpers/login';
import { saveDocument, findTriggerElementWithLabel } from '../helpers/editor-utils';
import { getArticles, setupTestArticle } from '../helpers/article-utils';

async function navigateToArticleAsWriter() {
  await login('github-writer');
  await click('[data-test-cardstack-tools-launcher-button');
  await visit('/articles/hello');
  await click('[data-test-cs-editor-switch]');
}

async function unpublishArticle() {
  let element = findTriggerElementWithLabel(/Published/);
  await click(element);
  await click(element.closest('section').querySelector('.cs-toggle-switch'));
  await saveDocument();
}

const scenario = new Fixtures({
  create(factory) {
    factory.addResource('boards', 'community').withAttributes({ title: 'Community' });
    setupTestArticle(factory);
  },
});
module('Acceptance | article', function(hooks) {
  setupApplicationTest(hooks);
  scenario.setupTest(hooks);

  hooks.beforeEach(function() {
    delete localStorage['cardstack-tools'];
  });

  hooks.afterEach(function() {
    delete localStorage['cardstack-tools'];
  });

  test('isolated article renders', async function(assert) {
    await visit('/articles/hello');
    assert.equal(currentURL(), '/articles/hello');
    assert.dom('[data-test-article-isolated-title]').hasText('Hello');
    assert.dom('[data-test-article-isolated-body]').hasText(`Hi everybody! I'm squash.`);
    assert.dom('[data-test-article-isolated-description]').hasText(`Why doors?`);
    assert.dom('[data-test-article-isolated-published-date]').hasAnyText();
    assert.dom('[data-test-article-isolated-category]').hasText(`LOLz`);
    assert.dom('.article-isolated.modern').exists();
    assert.dom('.article-isolated--cover-image').hasStyle({ 'background-image': 'url("http://localhost:3000/api/cardstack-files/lol-cat.jpg")' });
  });

  test('when a published article is unpublished it unsets the published-date field', async function(assert) {
    await navigateToArticleAsWriter();

    let element = findTriggerElementWithLabel(/Published/);
    await click(element);

    let toggleSwitch = element.closest('section').querySelector('.cs-toggle-switch');
    await click(toggleSwitch);

    assert.dom(toggleSwitch).hasText('No');
    assert.dom('.cs-field-editor-published-date--published-date').hasAnyText();

    await saveDocument();

    assert.dom('.cs-field-editor-published-date--published-date').doesNotExist();
    let [ article ] = await getArticles();
    assert.notOk(article.attributes['published-date'], 'the published date is not set');
    assert.equal(article.attributes['is-draft'], true, 'is-draft is set correectly');
  });

  test('when a published article is unpublished it unsets the published-date field', async function(assert) {
    await navigateToArticleAsWriter();
    await unpublishArticle();

    let [ article ] = await getArticles();
    assert.deepEqual(article.relationships.readers.data, { type: 'groups', id: 'github-writers' }, 'readers is set correctly');
  });

  test('when an unpublished article is published it sets the readers field correctly', async function(assert) {
    await navigateToArticleAsWriter();
    await unpublishArticle();

    let element = findTriggerElementWithLabel(/Published/);
    let toggleSwitch = element.closest('section').querySelector('.cs-toggle-switch');
    await click(toggleSwitch);

    await saveDocument();
    let [ article ] = await getArticles();
    assert.deepEqual(article.relationships.readers.data, { type: 'groups', id: 'everyone' }, 'readers is set correctly');
  });

  test('when an unpublished article is published it sets the published date correctly', async function(assert) {
    await navigateToArticleAsWriter();
    await unpublishArticle();

    let element = findTriggerElementWithLabel(/Published/);
    let toggleSwitch = element.closest('section').querySelector('.cs-toggle-switch');
    await click(toggleSwitch);

    assert.dom(toggleSwitch).hasText('Yes');
    assert.dom('.cs-field-editor-published-date--published-date').doesNotExist();

    await saveDocument();

    assert.dom('.cs-field-editor-published-date--published-date').hasAnyText();
    let [ article ] = await getArticles();
    assert.ok(article.attributes['published-date'], 'the published date is set');
    assert.equal(article.attributes['is-draft'], false, 'is-draft is set correectly');
  });

});