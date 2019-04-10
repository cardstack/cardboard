const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');
let factory = new JSONAPIFactory();
factory.addResource('content-types', 'boards')
  .withAttributes({
    defaultIncludes: [
      'published-articles'
    ],
    fieldsets: {
      isolated: [
        { field: 'published-articles', format: 'embedded' },
      ],
    }
  })
  .withRelated('fields', [
    { type: 'fields', id: 'title'},
    factory.addResource('fields', 'published-articles').withAttributes({
      fieldType: '@cardstack/core-types::has-many'
    })
  ]);

factory.addResource('grants', 'boards-anonymous-read')
  .withRelated('who', [{ type: 'groups', id: 'everyone' }])
  .withRelated('types', [
    { type: 'content-types', id: 'boards' },
  ])
  .withAttributes({
    'may-read-resource': true,
    'may-read-fields': true,
  });

factory.addResource('grants', 'boards-writers-update')
  .withRelated('who', [{ type: 'groups', id: 'github-writers' }])
  .withRelated('types', [
    { type: 'content-types', id: 'boards' }
  ])
  .withAttributes({
    'may-create-resource': true,
    'may-update-resource': true,
    'may-delete-resource': true,
    'may-write-fields': true
  });

let models = factory.getModels();
module.exports = function () { return models; };
