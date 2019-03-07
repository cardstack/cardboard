import { module, test, skip } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import Fixtures from '@cardstack/test-support/fixtures';

const scenario = new Fixtures({
  create(factory) {
    // factory.addResource('boards', 'community').withAttributes({
    factory.addResource('boards', 'community').withAttributes({
      title: 'Community'
    });
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

  skip('TODO emedded article renders', async function(/*assert*/) {
    // add the tests that needed to be removed from the integration tests due to the need for articles components to leverage session
  });
});