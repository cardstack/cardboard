const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();
factory.addResource('content-types', 'my-card-names')
  .withRelated('fields', [
    factory.addResource('fields', 'title').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
    factory.addResource('fields', 'nickname').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
  ]);

  factory.addResource('my-card-names', 1).withAttributes({
    title: 'Wow',
    nickname: 'testing'
  });

let models = factory.getModels();
module.exports = function() { return models; };
