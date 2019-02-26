const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');
const { readdirSync, existsSync } = require('fs');
const { join } = require('path');
const cardDir = join(__dirname, '../../cards');
const cardboardRouter = require('./router');
const defaultRouter = require('@cardstack/routing/cardstack/default-router');

module.exports = function () {
  let factory = new JSONAPIFactory();
  let cardSchemas = new JSONAPIFactory();
  let dataSources = new JSONAPIFactory();

  for (let dataSourceFile of readdirSync(join(__dirname, 'data-sources'))) {
    let filePath = join(__dirname, 'data-sources', dataSourceFile);
    dataSources.importModels(require(filePath));
  }
  let dataSourceTypes = dataSources.getModels().filter(i => i.type === 'data-sources')
                                               .map(i => i.attributes.sourceType || i.attributes['source-type']);
  for (let cardName of readdirSync(cardDir)) {
    let packageJsonFile = join(cardDir, cardName, 'package.json');
    if (!existsSync(packageJsonFile)) { continue; }

    let packageJson = require(packageJsonFile);
    if (dataSourceTypes.includes(packageJson.name)) { continue; }

    let schemaFile = join(cardDir, cardName, 'cardstack', 'static-model.js');
    if (existsSync(schemaFile)) {
      cardSchemas.importModels(require(schemaFile)());
      factory.addResource('data-sources')
        .withAttributes({ sourceType: `cardboard-${cardName}` });
    }
  }

  let router = process.env.HUB_ENVIRONMENT === 'test' &&
    process.env.TEST &&
    process.env.TEST.includes('cards/') ? defaultRouter : cardboardRouter;
  factory.addResource('content-types', 'app-cards')
    .withAttributes({ router });
  factory.addResource('app-cards', 'cardboard');

  factory.addResource('grants', 'app-card-grant')
    .withRelated('who', [{ type: 'groups', id: 'everyone' }])
    .withRelated('types', [
      { type: 'content-types', id: 'content-types' },
      { type: 'content-types', id: 'spaces' }
    ])
    .withAttributes({
      'may-read-resource': true,
      'may-read-fields': true,
    });

  if (process.env.HUB_ENVIRONMENT === 'development' &&
    (!process.env.GITHUB_CLIENT_ID ||
      !process.env.GITHUB_CLIENT_SECRET ||
      !process.env.GITHUB_TOKEN)) {

    factory.addResource('data-sources', 'mock-auth')
      .withAttributes({
        sourceType: '@cardstack/mock-auth',
        'user-rewriter': './cardstack/mock-auth-rewriter.js',
        params: {
          provideUserSchema: false,
          mockedTypes: ['github-users'],
          users: {
            'mock-user': {
              type: 'github-users',
              id: 'mock-user', // this ID is meant to be the github username. Please adjust as necessary
              attributes: {
                name: "Mock User",
                'avatar-url': "https://avatars2.githubusercontent.com/u/61075?v=4?v=3&s=80",
                permissions: ['cardstack/cardboard-data:read', 'cardstack/cardboard-data:write']
              },
            },
          }
        }
      });
  }

  factory.addResource('groups', 'github-readers')
  .withAttributes({
    'search-query': {
      filter: {
        type: { exact: 'github-users' },
        permissions: { exact: 'cardstack/cardboard-data:read' }
      }
    }
  });

factory.addResource('groups', 'github-writers')
  .withAttributes({
    'search-query': {
      filter: {
        type: { exact: 'github-users' },
        permissions: { exact: 'cardstack/cardboard-data:write' }
      }
    }
  });

factory.addResource('grants')
  .withRelated('who', [{ type: 'groups', id: 'github-readers' }])
  .withAttributes({
    mayLogin: true
  });

factory.addResource('grants')
  .withRelated('who', [{ type: 'fields', id: 'id' }])
  .withRelated('types', [{ type: 'content-types', id: 'github-users' }])
  .withAttributes({
    'may-read-resource': true,
    'may-read-fields': true
  });

let contentTypes = cardSchemas.getModels().filter(i => i.type === 'content-types').map(i => {
  return { type: 'content-types', id: i.id };
});

factory.addResource('grants')
  .withRelated('who', [{ type: 'groups', id: 'everyone' }])
  .withRelated('types', contentTypes.concat([
    { type: 'content-types', id: 'content-types' },
    { type: 'content-types', id: 'spaces' },
    { type: 'content-types', id: 'app-cards' },
  ]))
  .withAttributes({
    'may-read-resource': true,
    'may-read-fields': true,
  });

factory.addResource('grants')
  .withRelated('who', [{ type: 'groups', id: 'github-writers' }])
  .withRelated('types', [
    // TODO add images, videos, and any other content types you can create from 4 edges
    { type: 'content-types', id: 'articles' }
  ])
  .withAttributes({
    'may-create-resource': true,
    'may-update-resource': true,
    'may-delete-resource': true,
    'may-write-fields': true
  });

  return factory.getModels();
};
