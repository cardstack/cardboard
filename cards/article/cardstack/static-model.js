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
    factory.addResource('fields', 'body').withAttributes({
      fieldType: '@cardstack/mobiledoc'
    })
  ]);

let models = factory.getModels();
module.exports = function() { return models; };
