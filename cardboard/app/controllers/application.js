import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import injectOptional from 'ember-inject-optional';

export default Controller.extend({
  session: injectOptional.service(),
  router: service(),

  logout() {
    let session = this.get('session');
    if (!session) { return; }

    session.invalidate();
    this.router.transitionTo('cardstack.index');

    let routeName = this.router.get('currentRouteName');
    let currentRoute = getOwner(this).lookup(`route:${routeName}`);
    currentRoute.refresh();
  }
});