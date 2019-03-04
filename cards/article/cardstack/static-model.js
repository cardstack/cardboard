const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();
factory.addResource('content-types', 'articles')
  .withRelated('fields', [
    factory.addResource('fields', 'slug').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
    factory.addResource('fields', 'title').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
    factory.addResource('fields', 'description').withAttributes({
      fieldType: '@cardstack/core-types::string',
      editorComponent: 'string-text-area'
    }),
    factory.addResource('fields', 'body').withAttributes({
      fieldType: '@cardstack/mobiledoc'
    }),
    factory.addResource('fields', 'created-date').withAttributes({
      fieldType: '@cardstack/core-types::date',
      editorComponent: 'date-read-only'
    }),
    factory.addResource('fields', 'published-date').withAttributes({
      fieldType: '@cardstack/core-types::date',
      editorComponent: 'publish-toggle'
    }),
    factory.addResource('fields', 'author').withAttributes({
      fieldType: '@cardstack/core-types::belongs-to'
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'github-users' }]),
    factory.addResource('fields', 'category').withAttributes({
      fieldType: '@cardstack/core-types::belongs-to'
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'categories' }]),
    factory.addResource('fields', 'theme').withAttributes({
      fieldType: '@cardstack/core-types::belongs-to'
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'themes' }]),
    factory.addResource('fields', 'readers').withAttributes({
      fieldType: '@cardstack/core-types::belongs-to'
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'groups' }]),

    factory.addResource('computed-fields', 'is-draft').withAttributes({
      'computed-field-type': 'cardboard-article::is-draft',
    }),
  ]);

factory.addResource('content-types', 'categories')
  .withRelated('fields', [
    factory.addResource('fields', 'name').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
  ]);

factory.addResource('content-types', 'themes')
  .withRelated('fields', [
    factory.addResource('fields', 'name').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
  ]);

factory.addResource('grants', 'article-world-read')
  .withRelated('who', [{ type: 'fields', id: 'readers' }])
  .withRelated('types', [
    { type: 'content-types', id: 'articles' }
  ])
  .withAttributes({
    'may-read-resource': true,
    'may-read-fields': true,
  });

factory.addResource('grants', 'article-writers-update')
  .withRelated('who', [{ type: 'groups', id: 'github-writers' }])
  .withRelated('types', [
    { type: 'content-types', id: 'articles' }
  ])
  .withAttributes({
    'may-create-resource': true,
    'may-update-resource': true,
    'may-delete-resource': true,
    'may-write-fields': true
  });

let models = factory.getModels();
module.exports = function() { return models; };
