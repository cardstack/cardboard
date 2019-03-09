import ArticleBaseComponent from './article-base';
import layout from '../templates/isolated';
import { getOwner } from '@ember/application';

export default ArticleBaseComponent.extend({
  layout,
  init() {
    this._super(...arguments);
    this.set('config', getOwner(this).factoryFor('config:environment').class);
  },
});