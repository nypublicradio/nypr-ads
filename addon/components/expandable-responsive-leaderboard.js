import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/expandable-responsive-leaderboard';
import config from 'ember-get-config';
import DEFAULT_NETWORK_CODE from 'nypr-ads/defaults';

export default Component.extend({
  layout,

  network: DEFAULT_NETWORK_CODE,
  unitSuffix: 'leaderboard',
  slot: computed('network', 'site', function() {
    return `/${this.get('network')}${this.get('prefix')}/leaderboard/${this.get('site')}_${this.get('unitSuffix')}`;
  }),
  init() {
    this._super(...arguments);
    this.set('network', config.networkCode || DEFAULT_NETWORK_CODE);
    this.set('prefix', config.prefix ? `/${config.prefix}` : null);
  }
});
