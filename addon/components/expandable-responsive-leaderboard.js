import Component from '@ember/component';
import { computed, get } from '@ember/object';
import layout from '../templates/components/expandable-responsive-leaderboard';
import config from 'ember-get-config';
import { DEFAULT_NETWORK_CODE } from 'nypr-ads/defaults';

export default Component.extend({
  layout,

  unitSuffix: 'leaderboard',
  slot: computed('network', 'site', function() {
    return `/${this.get('network')}${this.get('prefix')}/leaderboard/${this.get('site')}_${this.get('unitSuffix')}`;
  }),
  init() {
    this._super(...arguments);

    let networkCode =  get(config, 'nypr-ads.networkCode');
    this.set('network', networkCode || DEFAULT_NETWORK_CODE);

    let prefix = get(config, 'nypr-ads.prefix');
    this.set('prefix', prefix ? `/${prefix}` : '');
  }
});
