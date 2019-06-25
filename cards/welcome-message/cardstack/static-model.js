const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();
factory.addResource('content-types', 'welcome-messages')
  .withRelated('fields', [
    factory.addResource('fields', 'title').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
    factory.addResource('fields', 'message').withAttributes({
      fieldType: '@cardstack/core-types::string'
    })
  ]);

  factory.addResource('welcome-messages', 1).withAttributes({
    title: 'Welcome!!',
    message: 'Get ready to build your first Cardboard Application'
  });
let models = factory.getModels();
module.exports = function() { return models; };
