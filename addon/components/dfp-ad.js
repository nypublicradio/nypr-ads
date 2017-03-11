import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';
import { bind } from 'ember-runloop';
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
    console.log('running refresh');
    let ad = this.get('ad');
    googletag.cmd.push(() => googletag.pubads().refresh([ad]));
  },

  didInsertElement() {
    googletag.cmd.push(() => {
      let ad = googletag.defineSlot(this.get('slot'), this.get('sizes'), this.get('target'));
      if (ad) {
        ad.addService(googletag.pubads());
  
        if (this.get('mapping')) {
          this.set('ad', ad);
          this.set('mql', []);
          let sizeMapping = googletag.sizeMapping();
          this.get('mapping').forEach(([width, unit]) => {
            sizeMapping.addSize([width, 0], unit);
            let mql = window.matchMedia(`(min-width: ${width}px)`);
            mql.addListener(bind(this, 'refresh'));
            this.get('mql').push(mql);
          });
          sizeMapping.build();
          ad.defineSizeMapping(sizeMapping);
        }
        googletag.display(this.get('target'));
      } else {
        googletag.pubads().refresh();
      }

    });
  },
  
  willDestroyElement() {
    let mql = this.get('mql');
    if (mql && mql.length) {
      mql.forEach(m => m.removeListener(bind(this, 'refresh')));
    }
  }
});
