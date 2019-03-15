const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');
const {
  createDefaultEnvironment,
  destroyDefaultEnvironment
} = require('@cardstack/test-support/env');
const { join } = require('path');
const supertest = require('supertest');
const Koa = require('koa');
const { readdirSync, existsSync } = require('fs');

const cardDir = join(__dirname, '../../');

let factory, env, auth, searchers, request;

async function createToken(userId) {
  return await auth.createToken({ id: userId, type: 'github-users' }, 30);
}

describe('board', function () {
  beforeEach(async function () {
    factory = new JSONAPIFactory();

    // Make all content types available from the cards in our application aviailable for us to use
    for (let cardName of readdirSync(cardDir)) {
      let schemaFile = join(cardDir, cardName, 'cardstack', 'static-model.js');
      if (!existsSync(schemaFile)) { continue; }
      factory.importModels(require(schemaFile)());
    }

    factory.addResource('data-sources', 'github').withAttributes({
      sourceType: '@cardstack/github-auth',
      params: {
        permissions: [
          { repo: 'cardstack/cardboard-data', permission: 'read' },
          { repo: 'cardstack/cardboard-data', permission: 'write' },
        ]
      }
    });

    factory.addResource('data-sources', '@cardstack/image').withAttributes({
      sourceType: '@cardstack/image',
      params: {
        storeImageMetadataIn: { type: 'data-sources', id: 'default-data-source' }
      }
    });

    factory.addResource('data-sources', '@cardstack/files').withAttributes({
      sourceType: '@cardstack/files',
      params: {
        storeFilesIn: { type: 'data-sources', id: 'default-data-source' }
      }
    });

    factory.addResource('data-sources', 'mock-auth')
      .withAttributes({
        sourceType: '@cardstack/mock-auth',
        'user-rewriter': './node-tests/mock-auth-rewriter.js',
        params: {
          provideUserSchema: false,
          mockedTypes: ['github-users'],
          users: {
            'github-writer': {
              type: 'github-users',
              id: 'github-writer',
              attributes: {
                name: "Writer McWriterson",
                'avatar-url': "https://avatars2.githubusercontent.com/u/61075",
                permissions: ['cardstack/cardboard-data:read', 'cardstack/cardboard-data:write']
              },
            },
            'github-reader': {
              type: 'github-users',
              id: 'github-reader',
              attributes: {
                name: "Reader McReady",
                'avatar-url': "https://avatars2.githubusercontent.com/u/61075",
                permissions: ['cardstack/cardboard-data:read']
              },
            },
          }
        }
      });

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

    factory.addResource('boards', 'community').withAttributes({ title: 'Community' });
    factory.addResource('boards', 'hot')
      .withAttributes({ title: 'Hot' })
      .withRelated('articles', [{ type: 'articles', id: '123'}]);

    factory.addResource('articles', '123')
      .withAttributes({ title: 'Hello', slug: 'hello' })
      .withRelated('author', { type: 'github-users', id: 'github-writer' })

    factory.addResource('articles', '456')
      .withAttributes({ title: 'Goodbye', slug: 'bye' })
      .withRelated('author', { type: 'github-users', id: 'github-writer' })

    env = await createDefaultEnvironment(`${__dirname}/..`, factory.getModels());
    searchers = env.lookup('hub:searchers');
    auth = env.lookup('plugin-middleware:@cardstack/authentication/cardstack/middleware');
    let app = new Koa();
    app.use(env.lookup('hub:middleware-stack').middleware());
    request = supertest(app.callback());
  });

  afterEach(async function () {
    await destroyDefaultEnvironment(env);
  });

  describe('/register-article', function () {
    it('supports CORS preflight for endpoint', async function () {
      let response = await request.options('/article-registrations');
      expect(response).hasStatus(200);
      expect(response.headers['access-control-allow-methods']).matches(/POST/);
    });

    it('can register an article with a board when the user session is authorized for a board that is related to no articles', async function() {
      let { token } = await createToken('github-writer');
      let response = await request.post('/article-registrations')
        .set('authorization', `Bearer ${token}`)
        .set('accept', `application/vnd.api+json`)
        .send({
          data: {
            type: 'article-registrations',
            relationships: {
              board: { data: { type: 'boards', id: 'community' } },
              article: { data: { type: 'articles', id: '123' } },
            }
          }
        });

      expect(response).hasStatus(200);

      let { data: boards } = await searchers.getFromControllingBranch(env.session, 'boards', 'community');
      expect(boards.relationships.articles.data).to.eql([{ type: 'articles', id: '123' }]);
    });

    it('can register an article with a board when the user session is authorized and the board is related to other articles', async function() {
      let { token } = await createToken('github-writer');
      let response = await request.post('/article-registrations')
        .set('authorization', `Bearer ${token}`)
        .set('accept', `application/vnd.api+json`)
        .send({
          data: {
            type: 'article-registrations',
            relationships: {
              board: { data: { type: 'boards', id: 'hot' } },
              article: { data: { type: 'articles', id: '456' } },
            }
          }
        });

      expect(response).hasStatus(200);

      let { data: boards } = await searchers.getFromControllingBranch(env.session, 'boards', 'hot');
      expect(boards.relationships.articles.data).to.eql([
        { type: 'articles', id: '123' },
        { type: 'articles', id: '456' }
      ]);
    });

    it('does nothing if the article is already registered', async function() {
      let { token } = await createToken('github-writer');
      let response = await request.post('/article-registrations')
        .set('authorization', `Bearer ${token}`)
        .set('accept', `application/vnd.api+json`)
        .send({
          data: {
            type: 'article-registrations',
            relationships: {
              board: { data: { type: 'boards', id: 'hot' } },
              article: { data: { type: 'articles', id: '123' } },
            }
          }
        });

      expect(response).hasStatus(200);

      let { data: boards } = await searchers.getFromControllingBranch(env.session, 'boards', 'hot');
      expect(boards.relationships.articles.data).to.eql([
        { type: 'articles', id: '123' },
      ]);
    });

    it('does not register an article with a board when the user session is not authorized', async function() {
      let response = await request.post('/article-registrations')
        .set('accept', `application/vnd.api+json`)
        .send({
          data: {
            type: 'article-registrations',
            relationships: {
              board: { data: { type: 'boards', id: 'hot' } },
              article: { data: { type: 'articles', id: '456' } },
            }
          }
        });

      expect(response).hasStatus(401);

      let { data: boards } = await searchers.getFromControllingBranch(env.session, 'boards', 'hot');
      expect(boards.relationships.articles.data).to.eql([
        { type: 'articles', id: '123' },
      ]);
    });

    it('does not register an article with a board when the user session does not have a sufficient grant', async function() {
      let { token } = await createToken('github-reader');
      let response = await request.post('/article-registrations')
        .set('authorization', `Bearer ${token}`)
        .set('accept', `application/vnd.api+json`)
        .send({
          data: {
            type: 'article-registrations',
            relationships: {
              board: { data: { type: 'boards', id: 'hot' } },
              article: { data: { type: 'articles', id: '456' } },
            }
          }
        });

      expect(response).hasStatus(401);

      let { data: boards } = await searchers.getFromControllingBranch(env.session, 'boards', 'hot');
      expect(boards.relationships.articles.data).to.eql([
        { type: 'articles', id: '123' },
      ]);
    });
  });

});
