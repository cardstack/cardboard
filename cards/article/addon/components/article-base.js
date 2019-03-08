import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';
import { inject as service } from '@ember/service';
import SetReadersMixin from '../mixins/set-readers';
import SetThemeMixin from '../mixins/set-theme';

const defaultTheme = 'modern';
const defaultReadersGroup = 'github-writers';
const dateFormat = 'MMM d, YYYY h:mm a';

export default Component.extend(SetReadersMixin, SetThemeMixin, {
  cardstackSession: service(),

  didReceiveAttrs() {
    if (this.get('content.id')) { return; }

    if (!this.get('content.author')) {
      this.set('content.author', this.get('cardstackSession.user'));
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

  publishedDate: computed('content.publishedDate', function() {
    let publishedDate = this.get('content.publishedDate');
    if (!publishedDate) { return; }

    return moment(publishedDate).format(dateFormat);
  }),

  createdDate: computed('content.createdDate', function() {
    let createdDate = this.get('content.createdDate');
    if (!createdDate) { return; }

    return moment(createdDate).format(dateFormat);
  })
});