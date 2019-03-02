const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();

if (process.env.HUB_ENVIRONMENT === 'development') {
  factory.addResource('boards', 'community').withAttributes({
    title: 'Community'
  });
}

module.exports = factory.getModels();