import { computed  } from '@ember/object';
import Component from '@ember/component';
import moment from 'moment';
import layout from '../../templates/field-editors/publish-toggle';
import SetReadersMixin from '../../mixins/set-readers';

export default Component.extend(SetReadersMixin, {
  layout,

  isPublished: computed('content.publishedDate', function() {
    return Boolean(this.get('content.publishedDate'));
  }),

  publishedDate: computed('content.publishedDate', function() {
    let publishedDate = this.get('content.publishedDate');
    if (!publishedDate) { return; }

    return moment(publishedDate).format('MMM D, YYYY h:mm a');
  }),

  actions: {
    toggleValue(value) {
      this.set('content.publishedDate', value ? moment().toISOString() : null);
      this.setReaders(value ? 'everyone' : 'github-writers');
      this.get('onchange')();
    }
  }
});
