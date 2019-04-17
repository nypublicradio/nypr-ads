import Component from '@ember/component';
import { doTargeting, clearTargeting } from 'nypr-ads';


/**
  An invisible component that sets page-level
  GPT key-value targeting when created and clears
  it when destroyed.

  Setting one key-value pair:
  ```html
    <DoTargeting @key='foo' @value='bar'/>
  ```

  Setting multiple key-value pairs:
  ```html
    <DoTargeting @targets={{hash
      key1='value1'
      key2='value2'
    }} />
  ```

  @class DoTargeting
*/
export default Component.extend({
  /**
    The name of a value to assign to @key

    @argument key
    @type {String}
  */
  key: null,
  /**
    A value to assign to @key.

    @argument value
    @type {String|String[]}
  */
  value: null,
  /**
    A map of key value pairs

    `{key1:'value1', key2:'value2'}`

    @argument targets
    @type {Object}
  */
  targets: null,
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
    this._clearTargeting();

    if (this.key && this.value != null) {
      doTargeting({[this.key]: this.value});
      this.prevKey = this.key;
    }
    if(this.targets) {
      doTargeting(this.targets);
      this.prevTargets = this.targets;
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
