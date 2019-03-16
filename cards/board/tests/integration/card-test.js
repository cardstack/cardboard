import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';
import Fixtures from '@cardstack/test-support/fixtures';
import { setupURLs, setupCardTest } from '@cardstack/test-support/test-helpers';

const scenario = new Fixtures({
  create(factory) {
    let article1 = factory.addResource('articles', 'article-1')
      .withAttributes({
        title: 'Article 1',
        slug: 'article1',
        'published-date': '2019-03-15T03:43:02.992Z',

      });
    let article2 = factory.addResource('articles', 'article-2')
      .withAttributes({
        title: 'Article 2',
        slug: 'article2',
        'published-date': '2019-03-15T03:43:02.992Z',
      });
    factory.addResource('boards', '123')
      .withAttributes({
        title: 'Hello'
      })
      .withRelated('articles', [
        article1,
        article2
      ]);

    factory.addResource('grants')
      .withRelated('who', [{ type: 'groups', id: 'everyone' }])
      .withRelated('types', [
        { type: 'content-types', id: 'articles' },
      ])
      .withAttributes({
        'may-read-resource': true,
        'may-read-fields': true,
      });
  }
});

module('Card | board', function(hooks) {
  setupCardTest(hooks);
  setupURLs(hooks);
  scenario.setupTest(hooks);

  test('embedded format renders', async function(assert) {
    await render(hbs`{{cardstack-card-test 'board' '123' format="embedded"}}`);
    assert.dom('[data-test-board-embedded-title]').hasText('Hello');
  });

  test('isolated format renders', async function(assert) {
    await render(hbs`{{cardstack-card-test 'board' '123' format="isolated"}}`);
    assert.dom('[data-test-board-isolated-title]').hasText('Hello');
    assert.dom('[data-test-board-isolated-article="0"]').exists();
    assert.dom('[data-test-board-isolated-article="1"]').exists();
    assert.dom('[data-test-cardboard-top-header]').exists();
  });
});
