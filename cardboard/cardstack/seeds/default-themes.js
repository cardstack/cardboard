const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();

if (process.env.HUB_ENVIRONMENT === 'development') {
  factory.addResource('themes', 'modern').withAttributes({
    name: 'Modern'
  });
  factory.addResource('themes', 'sharp').withAttributes({
    name: 'Sharp'
  });
  factory.addResource('themes', 'dark').withAttributes({
    name: 'Dark'
  });
}

module.exports = factory.getModels();
