const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();

factory.addResource('data-sources', 'github').withAttributes({
  sourceType: '@cardstack/github-auth',
  params: {
    'client-id': process.env.GITHUB_CLIENT_ID,
    'client-secret': process.env.GITHUB_CLIENT_SECRET,
    token: process.env.GITHUB_TOKEN,
    permissions: [
      { repo: 'cardstack/cardboard-data', permission: 'read' },
      { repo: 'cardstack/cardboard-data', permission: 'write' },
    ]
  }
});

module.exports = factory.getModels();
