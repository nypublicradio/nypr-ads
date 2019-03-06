import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { bind, schedule, run } from '@ember/runloop';
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
  slotRenderEndedAction: () => {},
  clearOnEmptyRefresh: false,

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
      if (!ad) {
        return;
      }
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
        ad.defineSizeMapping(sizeMapping.build());
        this.set('mqList', mqList);
      }
      ad.addService(googletag.pubads());
      googletag.pubads().addEventListener('slotRenderEnded', (event) => {
        if (ad === event.slot) {
          run(() => {
            if (event.isEmpty && this.get('clearOnEmptyRefresh')) {
              googletag.pubads().clear([ad]);
            }
            this.slotRenderEndedAction(event);
          });
        }
      });
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
