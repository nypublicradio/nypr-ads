import Component from '@ember/component';
import { get } from '@ember/object';
import { bind, schedule, run } from '@ember/runloop';
import googletag from 'googletag';
import layout from '../templates/components/dfp-ad';
import config from 'ember-get-config';
import { DEFAULT_NETWORK_CODE } from 'nypr-ads/defaults';

/**
  Adds a DFP ad slot to a page.

  Usage:
  ```hbs
    {{dfp-ad
      slotClassNames="l-constrained aligncenter leaderboard"
      slot="leaderboard/wqxr_leaderboard_demo"
      target="leaderboard_ad_home"
      mapping=(array (array 0 (array 300 50)) (array 758 (array 728 90)) (array 1203 (array 970 415)))
      sizes=(array (array 970 415) (array 728 90) (array 300 50))
      slotRenderEndedAction=(action 'handleSlotRendered')
      clearOnEmptyRefresh=false
    /}}
  ```

  @class DfpAd
*/
export default Component.extend({
  layout,
  /**
    The DFP ad slot name without the network code.

    @argument slot
    @type {String}
  */
  slot: null,
  /**
    The id to be used by the autogenerated target HTML element.

    @argument target
    @type {String}
  */
  target: null,
  /**
    Array of arrays containing the dimensions of the ad sizes.

    `[[width1,height1],[width2,height2]]`

    @argument sizes
    @type {Array}
  */
  sizes: null,
  /**
    A mapping of breakpoints to ad sizes for responsive ad display.

    `[[min-size-breakpoint1,[width1,height1]],[min-size-breakpoint2,[width2,height2]]]`

    @argument mapping
    @type {Array}
  */
  mapping: null,
  /**
    Space separated list of CSS class names.

    @argument slotClassNames
    @type {String}
    @optional
  */
  slotClassNames: null,
  /**
    Callback function called when the
    `slotRenderEnded` event is recieved from GPT.

    @argument slotRenderEndedAction
    @type {Action}
    @optional
  */
  slotRenderEndedAction: () => {},
  /**
    When set to true, will clear the ad slot when
    `googletag.pubads().refresh()` is called to
    request a new ad and returns empty.

    @argument clearOnEmptyRefresh
    @type {Boolean}
    @default [false]
    @optional
  */
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

    let networkCode = get(config, 'nypr-ads.networkCode') || DEFAULT_NETWORK_CODE;
    let prefix = get(config, 'nypr-ads.prefix') ? `/${get(config, 'nypr-ads.prefix')}` : '';
    slot = `${networkCode}${prefix}/${slot}`;

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
