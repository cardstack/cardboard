const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');
const {
  createDefaultEnvironment,
  destroyDefaultEnvironment
} = require('@cardstack/test-support/env');
const Session = require('@cardstack/plugin-utils/session');
const { join } = require('path');
const { readdirSync, existsSync } = require('fs');
const cardDir = join(__dirname, '../../');

let factory, env, writers, searchers, sessions;

async function createArticle(attributes={}, readers='everyone') {
  if (!attributes.slug) {
    attributes.slug = 'test';
  }

  let { data: article } = await writers.create('master', env.session, 'articles', {
    data: {
      type: 'articles',
      attributes,
      relationships: {
        readers: {
          data: { type: 'groups', id: readers }
        }
      }
    }
  });
  return article;
}

async function createReaderSession() {
  return sessions.create('github-users', 'github-reader');
}
async function createWriterSession() {
  return sessions.create('github-users', 'github-writer');
}

describe('articles - grants', function () {
  beforeEach(async function () {
    factory = new JSONAPIFactory();

    // Make all content types available from the cards in our application available for us to use
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

    factory.addResource('data-sources', 'default').withAttributes({
      sourceType: '@cardstack/ephemeral'
    });

    factory.addResource('data-sources', '@cardstack/image').withAttributes({
      sourceType: '@cardstack/image',
      params: {
        storeImageMetadataIn: { type: 'data-sources', id: 'default' }
      }
    });

    factory.addResource('data-sources', '@cardstack/files').withAttributes({
      sourceType: '@cardstack/files',
      params: {
        storeFilesIn: { type: 'data-sources', id: 'default' }
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

    env = await createDefaultEnvironment(`${__dirname}/..`, factory.getModels());
    searchers = env.lookup('hub:searchers');
    writers = env.lookup('hub:writers');
    sessions = env.lookup('hub:sessions');
    await searchers.getFromControllingBranch(Session.INTERNAL_PRIVILEGED, 'github-users', 'github-reader');
    await searchers.getFromControllingBranch(Session.INTERNAL_PRIVILEGED, 'github-users', 'github-writer');
  });

  afterEach(async function () {
    await destroyDefaultEnvironment(env);
  });

  describe('grants', function () {
    it('allows anonymous to view published article', async function () {
      let { id, type } = await createArticle({ title: 'title', 'published-date': '2019-03-04T16:19:54.696Z' });
      let { data } = await searchers.getFromControllingBranch(null, type, id);

      expect(data).to.have.deep.property('attributes.title', 'title');
    });

    it('does not allow anonymous to view non-published article', async function () {
      let { id, type } = await createArticle({ title: 'title' }, 'github-writers');
      let error;
      try {
       await searchers.getFromControllingBranch(null, type, id);
      } catch (e) {
        error = e;
      }
      expect(error.status).to.equal(404);
    });

    it('allows github-writer to view non-published article', async function () {
      let { id, type } = await createArticle({ title: 'title' }, 'github-writers');
      let { data } = await searchers.getFromControllingBranch(await createWriterSession(), type, id);

      expect(data).to.have.deep.property('attributes.title', 'title');
    });

    it('does not allow github-reader to create article', async function () {
      let error;
      try {
        await writers.create('master', await createReaderSession(), 'articles', {
          data: {
            type: 'articles',
            attributes: { title: 'title', slug: 'test' },
            relationships: {
              readers: { data: { type: 'groups', id: 'github-readers'} }
            }
          }
        });
      } catch (e) {
        error = e;
      }
      expect(error.status).to.equal(404);
    });

    it('does not allow github-reader to update article', async function () {
      let { id, type, meta: { version } } = await createArticle({ title: 'title' });
      let error;
      try {
        await writers.update('master', await createReaderSession(), type, id, {
          data: {
            type, id,
            attributes: { title: 'updated title', slug: 'test' },
            relationships: {
              readers: { data: { type: 'groups', id: 'github-readers'} }
            },
            meta: { version }
          }
        });
      } catch (e) {
        error = e;
      }
      expect(error.status).to.equal(404);
    });

    it('allows github-writer to create article', async function () {
      let { data: { type, id } } = await writers.create('master', await createWriterSession(), 'articles', {
        data: {
          type: 'articles',
          attributes: { title: 'title', slug: 'test' },
          relationships: {
            readers: { data: { type: 'groups', id: 'github-writers' } }
          },
        }
      });
      let { data } = await searchers.getFromControllingBranch(Session.INTERNAL_PRIVILEGED, type, id);
      expect(data).to.have.deep.property('attributes.title', 'title');
    });

    it('allows github-writer to update article', async function () {
      let { id, type, meta: { version } } = await createArticle({ title: 'title' });
      await writers.update('master', await createWriterSession(), type, id, {
        data: {
          type, id,
          attributes: { title: 'updated title', slug: 'test' },
          relationships: {
            readers: { data: { type: 'groups', id: 'github-writers' } }
          },
          meta: { version }
        }
      });

      let { data } = await searchers.getFromControllingBranch(Session.INTERNAL_PRIVILEGED, type, id);
      expect(data).to.have.deep.property('attributes.title', 'updated title');
    });

    it('does not allow github-reader to delete article', async function () {
      let { id, type, meta: { version } } = await createArticle({ title: 'title' });
      let error;
      try {
        await writers.delete('master', await createReaderSession(), version, type, id);
      } catch (e) {
        error = e;
      }
      expect(error.status).to.equal(401);
    });

    it('allows github-writer to delete article', async function () {
      let { id, type, meta: { version } } = await createArticle({ title: 'title' });
      await writers.delete('master', await createWriterSession(), version, type, id);

      let error;
      try {
        await searchers.getFromControllingBranch(Session.INTERNAL_PRIVILEGED, type, id);
      } catch (e) {
        error = e;
      }
      expect(error.status).to.equal(404);
    });

  });
});
