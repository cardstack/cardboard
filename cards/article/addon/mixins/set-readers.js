import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  store: service(),

  setReaders(groupId) {
    if (!this.store.peekRecord('group', groupId)) {
      this.store.push({
        data: { id: groupId, type: 'group' }
      });
    }
    let group = this.store.peekRecord('group', groupId);
    this.set('content.readers', group);
  }
});