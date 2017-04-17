import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import { bind, schedule } from 'ember-runloop';
import googletag from 'googletag';
import layout from '../templates/components/dfp-ad';

function wnycEmbeddedAttr() {
  return computed('embeddedAttrs', {
    get(k) {
      return get(this, `embeddedAttrs.${k}`);
    },
    set(k, v) {
      return v;
    }
  });
}

export default Component.extend({
  layout,

  slot:           wnycEmbeddedAttr(),
  target:         wnycEmbeddedAttr(),
  sizes:          wnycEmbeddedAttr(),
  mapping:        wnycEmbeddedAttr(),
  slotClassNames: wnycEmbeddedAttr(),

  refresh() {
    let ad = this.get('ad');
    googletag.cmd.push(() => googletag.pubads().refresh([ad]));
  },

  didInsertElement() {
    this._super(...arguments);
    let {
      slot,
      sizes,
      target,
      mapping
    } = this.getProperties('slot', 'sizes', 'target', 'mapping');
    googletag.cmd.push(() => {
      let ad = googletag.defineSlot(slot, sizes, target);
      this.set('ad', ad);

      if (mapping) {
        let mqList = [];
        let sizeMapping = googletag.sizeMapping();
        mapping.forEach(([width, unit]) => {
          sizeMapping.addSize([width, 0], unit);
          let mq = window.matchMedia(`(min-width: ${width}px)`);
          mq.addListener(bind(this, 'refresh'));
          mqList.push(mq);
        });
        sizeMapping.build();
        ad.defineSizeMapping(sizeMapping);
        this.set('mqList', mqList);
      }
      ad.addService(googletag.pubads());
      schedule('afterRender', () => googletag.display(target));
    });
  },
  
  willDestroyElement() {
    this._super(...arguments);
    let { mqList, ad } = this.getProperties('mqList', 'ad');
    if (mqList && mqList.length) {
      mqList.forEach(mq => mq.removeListener(bind(this, 'refresh')));
    }
    googletag.cmd.push(() => googletag.destroySlots([ad]));
  }
});
