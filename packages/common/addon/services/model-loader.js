import Service, { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),

  init() {
    this._super(...arguments);
    this.loadedTypes = {};
  },

  // This loader really is only meant for loading specific types and not descending through
  // all the relationships like the @cardstack/data service.
  async load(type) {
    if (await this.loadedTypes[type]) { return; }

    let hasLoaded = this.get('store').findAll(type).then(() => true);
    this.loadedTypes[type] = hasLoaded;

    return await hasLoaded;
  }
});