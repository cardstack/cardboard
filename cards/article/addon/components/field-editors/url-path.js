import Component from '@ember/component';
import layout from '../../templates/field-editors/url-path';

export default Component.extend({
  layout,
  urlPrefix: window.location.origin
});