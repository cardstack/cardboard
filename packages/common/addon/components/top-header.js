import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import injectOptional from 'ember-inject-optional';
import layout from '../templates/top-header';

export default Component.extend({
  layout,
  session: injectOptional.service(),
  router: service(),

  actions: {
    logout() {
      let session = this.get('session');
      if (!session) { return; }

      session.invalidate();
      this.router.transitionTo('cardstack.index');

      let routeName = this.router.get('currentRouteName');
      let currentRoute = getOwner(this).lookup(`route:${routeName}`);
      currentRoute.refresh();
    }
  }
});
