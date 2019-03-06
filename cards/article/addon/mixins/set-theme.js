import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { capitalize } from '@ember/string';

// pushing these into the store so we dont have any async nor XHR required for loading card
// the themes seem like a pretty controlled list that would involve a code change anyways if we add more
const themes = [ 'modern', 'sharp', 'dark' ];

export default Mixin.create({
  store: service(),

  init() {
    this._super(...arguments);

    this.initializeThemes();
  },

  initializeThemes() {
    themes.forEach(id => {
      if (!this.store.peekRecord('theme', id)) {
        this.store.push({
          data: {
            id,
            type: 'theme',
            attributes: { name: capitalize(id) }
          }
        });
      }
    });
  },

  setTheme(themeId) {
    this.initializeThemes();
    let theme = this.store.peekRecord('theme', themeId);
    this.set('content.theme', theme);
  }
});