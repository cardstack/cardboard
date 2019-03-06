import Component from '@ember/component';
import moment from 'moment';
import { inject as service } from '@ember/service';
import SetReadersMixin from '../mixins/set-readers';
import SetThemeMixin from '../mixins/set-theme';

const defaultTheme = 'modern';
const defaultReadersGroup = 'github-writers';

export default Component.extend(SetReadersMixin, SetThemeMixin, {
  cardstackSession: service(),

  didReceiveAttrs() {
    if (this.get('content.id')) { return; }

    if (!this.get('content.author')) {
      // TODO need to figure out why setting an author relationship causes node-postgres to hang
      // this.set('content.author', this.get('cardstackSession.user'));
    }
    if (!this.get('content.publishedDate')) {
      this.setReaders(defaultReadersGroup);
    }
    if (!this.get('content.theme')) {
      this.setTheme(defaultTheme);
    }
    if (!this.get('content.createdDate')) {
      this.set('content.createdDate', moment().toISOString());
    }
  },
});