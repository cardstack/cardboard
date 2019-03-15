const { declareInjections } = require('@cardstack/di');
const Error = require('@cardstack/plugin-utils/error');
const Session = require('@cardstack/plugin-utils/session');
const { get } = require('lodash');
const compose = require('koa-compose');
const route = require('koa-better-route');
const koaJSONBody = require('koa-json-body');

const { withJsonErrorHandling } = Error;
const prefix = 'article-registrations';

function addCorsHeaders(response) {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'POST,OPTIONS');
  response.set('Access-Control-Allow-Headers', '*');
}

module.exports = declareInjections({
  writers: 'hub:writers',
  searchers: 'hub:searchers',
  controllingBranch: 'hub:controlling-branch',
  sessions: 'hub:sessions'
},

  class ArticleRegistration {
    get after() {
      return 'authentication';
    }

    middleware() {
      return compose([
        this._registerPreflight(),
        this._createRelationship(),
      ]);
    }

    _registerPreflight() {
      return route.options(`/${prefix}`, async (ctxt) => {
        addCorsHeaders(ctxt.response);
        ctxt.status = 200;
      });
    }

    /*
    The client request should look like:
    {
      data: {
        type: 'article-registrations',
        relationships: {
          board: { data: { type: 'boards', id: 'community' } },
          article: { data: { type: 'articles': id: 'my-article' } }
        }
      }
    }
    */
    _createRelationship() {
      const branch = this.controllingBranch.name;
      return route.post(`/${prefix}`, compose([
        koaJSONBody({ limit: '1mb' }),
        async (ctxt) => {
          addCorsHeaders(ctxt.response);
          await withJsonErrorHandling(ctxt, async () => {
            let requestSession = get(ctxt, 'state.cardstackSession');
            if (!requestSession) {
              ctxt.status = 401;
              ctxt.body = {
                errors: [{
                  title: "Unauthorized",
                  detail: "You are not authorized to issue an article-registrations request"
                }]
              };
              return;
            }

            let requestType = get(ctxt, 'request.body.data.type');
            let boardId = get(ctxt, 'request.body.data.relationships.board.data.id');
            let boardType = get(ctxt, 'request.body.data.relationships.board.data.type');
            let articleId = get(ctxt, 'request.body.data.relationships.article.data.id');
            let articleType = get(ctxt, 'request.body.data.relationships.article.data.type');

            if (requestType !== 'article-registrations' ||
              boardType !== 'boards' ||
              articleType !== 'articles') {
              ctxt.status = 400;
              ctxt.body = {
                errors: [{
                  title: "Bad format",
                  detail: "The article-registrations request is is malformed"
                }]
              };
              return;
            }

            let { data: board } = await this.searchers.getFromControllingBranch(Session.INTERNAL_PRIVILEGED, boardType, boardId);
            let articles = get(board, 'relationships.articles.data') || [];
            let articleIds = articles.map(i => i.id);

            if (!articleIds.includes(articleId)) {
              articles.push({ type: 'articles', id: articleId });
              board.relationships = board.relationships || {};
              board.relationships.articles = board.relationships.articles || {};
              board.relationships.articles.data = articles;
              let session = this.sessions.create(requestSession.type, requestSession.id);
              await this.writers.update(branch, session, 'boards', boardId, { data: board });
            }

            let session = this.sessions.create(requestSession.type, requestSession.id);
            let readAuthorizedBoard = await this.searchers.getFromControllingBranch(session, 'boards', boardId);

            // We really only care about the relationships, not the actual article data
            delete readAuthorizedBoard.included;

            ctxt.status = 200;
            ctxt.body = readAuthorizedBoard;
          });
        }
      ]));
    }
  });