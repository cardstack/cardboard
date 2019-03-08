import { module, test, skip } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { setupTestArticle } from '../helpers/article-utils';
import Fixtures from '@cardstack/test-support/fixtures';

const scenario = new Fixtures({
  create(factory) {
    setupTestArticle(factory);
    factory.addResource('boards', 'community')
    .withAttributes({
      title: 'Community'
    })
    .withRelated('articles', [
      { type: 'articles', id: '123' }
    ]);
  },
});
module('Acceptance | cardboard', function(hooks) {
  setupApplicationTest(hooks);
  scenario.setupTest(hooks);

  hooks.beforeEach(function() {
    delete localStorage['cardstack-tools'];
  });

  hooks.afterEach(function() {
    delete localStorage['cardstack-tools'];
  });

  test('the community board is rendered at the index route', async function(assert) {
    await visit('/');
    assert.equal(currentURL(), '/');

    assert.dom('[data-test-board-isolated-title]').hasText('Community');
  });

  test('emedded article renders', async function(assert) {
    await visit('/');

    assert.dom('[data-test-article-embedded-title]').hasText('Hello');
    assert.dom('[data-test-article-embedded-description]').hasText(`Why doors?`);
    assert.dom('[data-test-article-embedded-published-date]').hasAnyText();
    assert.dom('[data-test-article-embedded-category]').hasText(`LOLz`);
    assert.dom('.article-embedded.modern').exists();
  });

  skip('TODO add test for cover image when rendering embedded article', async function(/*assert*/) {
  });
});