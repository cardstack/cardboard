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

  // Wide open grant--TODO remove this
  factory.addResource('grants', 'app-card-grant')
    .withRelated('who', [{ type: 'groups', id: 'everyone' }])
    .withAttributes({
      'may-read-resource': true,
      'may-read-fields': true,
      'may-create-resource': true,
      'may-update-resource': true,
      'may-write-fields': true,
      'may-login': true
    });

  return factory.getModels();
};
