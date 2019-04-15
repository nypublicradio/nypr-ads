import Component from '@ember/component';
import { doTargeting, clearTargeting } from 'nypr-ads';

export default Component.extend({
  tagName: '',
  _clearTargeting() {
    if (this.prevKey) {
      clearTargeting(this.prevKey)
      delete this.prevKey
    }
    if (this.prevTargets) {
      clearTargeting(...Object.keys(this.prevTargets))
      delete this.prevTargets
    }
  },
  _updateTargeting() {
    let key = this.get('key');
    let value = this.get('value');
    let targets = this.get('targets');

    this._clearTargeting();

    if (key && value != null) {
      doTargeting({[key]: value});
      this.prevKey = key;
    }
    if(targets) {
      doTargeting(targets);
      this.prevTargets = targets;
    }
  },
  didInsertElement() {
    this._updateTargeting();
  },
  didUpdateAttrs() {
    this._updateTargeting();
  },
  willDestroyElement() {
    this._clearTargeting();
  }
});
