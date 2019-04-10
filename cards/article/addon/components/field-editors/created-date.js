import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/field-editors/created-date';
import moment from 'moment';

export default Component.extend({
  layout,
  createdDate: computed('content.createdDate', function() {
    let date = this.get('content.createdDate');
    if (!date) { return; }

    return moment(date).format('MMM D, YYYY h:mm a');
  }),

  isPublished: computed('content.publishedDate', function() {
    return Boolean(this.get('content.publishedDate'));
  }),

  publishedDate: computed('content.publishedDate', function() {
    let publishedDate = this.get('content.publishedDate');
    if (!publishedDate) { return; }

    return moment(publishedDate).format('MMM D, YYYY h:mm a');
  }),

  publishedDateIsDirty: computed('content.{publishedDate,hasDirtyAttributes,isSaving}', function() {
    let { publishedDate:publishedDateChanged } = this.get('content').changedAttributes();
    this.get('content.isSaving'); // aparenty I need to invoke this in order for this to trigger the computed ¯\_(ツ)_/¯

    return Boolean(publishedDateChanged);
  }),

});