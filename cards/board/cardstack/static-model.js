const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();
factory.addResource('content-types', 'boards')
  .withAttributes({
    defaultIncludes: [
      'articles',
    ],
    fieldsets: {
      isolated: [
        { field: 'articles', format: 'embedded' },
      ],
    }
  })
  .withRelated('fields', [
    factory.addResource('fields', 'title').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
    factory.addResource('fields', 'articles').withAttributes({
      fieldType: '@cardstack/core-types::has-many'
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'articles' }]),
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

let models = factory.getModels();
module.exports = function () { return models; };
