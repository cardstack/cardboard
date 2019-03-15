import Service, { inject as service } from '@ember/service';
import { hubURL } from '@cardstack/plugin-utils/environment';
import { task } from 'ember-concurrency';
import { getOwner } from '@ember/application';

export default Service.extend({
  cardstackSession: service(),
  store: service(),
  router: service(),

  registerArticle: task(function * (boardId, articleId) {
    yield this._performArticleRegistration(boardId, articleId);
  }).drop(),

  async _performArticleRegistration(boardId, articleId) {
    let url = `${hubURL}/article-registrations`;
    let token = this.get('cardstackSession.token');
    let body = JSON.stringify({
      data: {
        type: 'article-registrations',
        relationships: {
          board: { data: { type: 'boards', id: boardId } },
          article: { data: { type: 'articles', id: articleId } },
        }
      }
    });

    let response = await fetch(url, {
      method: 'POST',
      body,
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": 'application/vnd.api+json'
      }
    });
    let jsonApiDocument = await response.json();
    this.store.pushPayload(jsonApiDocument);

    let routeName = this.router.get('currentRouteName');
    if (routeName !== 'cardstack.new-content') {
      let currentRoute = getOwner(this).lookup(`route:${routeName}`);
      currentRoute.refresh();
    }
  },
});