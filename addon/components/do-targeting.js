import Component from '@ember/component';
import { doTargeting, clearTargeting } from 'nypr-ads';

export default Component.extend({
  tagName: '',
  didInsertElement() {
    let key = this.get('key');
    let value = this.get('value');
    let targets = this.get('targets');
    if (key && value != null) {
      doTargeting({[key]: value});
    }
    if(targets) {
      doTargeting(targets);
    }
  },
  willDestroyElement() {
    let key = this.get('key');
    let targets = this.get('targets');
    if (key) {
      clearTargeting(key);
    }
    if(targets) {
      clearTargeting(...Object.keys(targets));
    }
  }
});
