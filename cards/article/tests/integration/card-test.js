import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import Fixtures from '@cardstack/test-support/fixtures';
import { setupURLs, setupCardTest } from '@cardstack/test-support/test-helpers';

const scenario = new Fixtures({
  create(factory) {
    factory.addResource('articles', '123')
      .withAttributes({
        title: 'Hello',
        slug: 'hello',
        body: { 'atoms': [], 'cards': [], 'markups': [['strong'] ], 'version': '0.3.1', 'sections': [[1, 'p', [[0, [], 0, `Hi everybody! I'm squash.`]]]] }
      })
  }
});

module('Card | article', function(hooks) {
  setupCardTest(hooks);
  setupURLs(hooks);
  scenario.setupTest(hooks);

  test('embedded format renders', async function(assert) {
    await render(hbs`{{cardstack-card-test 'article' '123' format="embedded"}}`);
    assert.dom('[data-test-article-embedded-title]').hasText('Hello');
  });

  test('isolated format renders', async function(assert) {
    await render(hbs`{{cardstack-card-test 'article' '123' format="isolated"}}`);
    assert.dom('[data-test-article-isolated-title]').hasText('Hello');
    assert.dom('[data-test-article-isolated-body]').hasText(`Hi everybody! I'm squash.`);
  });
});
