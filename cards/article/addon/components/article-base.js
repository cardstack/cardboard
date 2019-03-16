import Component from '@ember/component';
import { and } from '@ember/object/computed';
import { computed } from '@ember/object';
import moment from 'moment';
import { inject as service } from '@ember/service';
import SetReadersMixin from '../mixins/set-readers';
import RSVP from 'rsvp';
import { csImageUrl } from '@cardstack/image/helpers/cs-image-url';
import { task, waitForProperty } from 'ember-concurrency';
import { htmlSafe } from '@ember/string';

const defaultTheme = 'modern';
const defaultReadersGroup = 'github-writers';
const dateFormat = 'MMM d, YYYY';
const communityBoardId = 'community';

export default Component.extend(SetReadersMixin, {
  cardstackSession: service(),
  articleRegistration: service(),
  cardstackTools: service(),
  modelLoader: service(),
  store: service(),

  editMode: and('cardstackTools.active', 'cardstackTools.editing'),

  didReceiveAttrs() {
    if (this.get('cardstackTools.active')) {

      // this will populate the drop downs when in editing mode for all the models--not just the ones we are using.
      // no need to issue these requests when not in editng mode as the spaces will take care of loading the models
      // that we actually use (also we side step not having to deal with leaky async in fastboot)
      this.get('loadData').perform(['theme', 'category']).then(() => {
        this.get('registerArticleAfterSave').perform();

        if (this.get('content.id')) { return; }

        if (!this.get('content.author')) {
          this.set('content.author', this.get('cardstackSession.user'));
        }
        if (!this.get('content.publishedDate')) {
          this.setReaders(defaultReadersGroup);
        }
        if (!this.get('content.theme')) {
          let theme = this.get('store').peekRecord('theme', defaultTheme);
          this.set('content.theme', theme);
        }
        if (!this.get('content.createdDate')) {
          this.set('content.createdDate', moment().toISOString());
        }
      });
    }
  },

  loadData: task(function * (types) {
    yield RSVP.all(types.map(type => this.get('modelLoader').load(type)));
  }).drop(),

  // This is a workaround for the fact that we do not yet have query based relationships.
  // Rather the client is responsible for fashioning the relationship from the board to the articles.
  // Please refactor this out after we have query based relationships.
  registerArticleAfterSave: task(function * () {
    yield waitForProperty(this, 'content.isSaving', true);
    yield waitForProperty(this, 'content.isSaving', false);
    yield waitForProperty(this, 'content.id', id => Boolean(id));

    yield this.get('articleRegistration.registerArticle').perform(communityBoardId, this.get('content.id'));
  }).drop(),

  coverImageBackgroundImageCss: computed('content.coverImage', function() {
    let image = this.get('content.coverImage');
    if (!image) { return; }

    let url = csImageUrl(image);
    return htmlSafe(`background-image:url(${url})`);
  }),

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
