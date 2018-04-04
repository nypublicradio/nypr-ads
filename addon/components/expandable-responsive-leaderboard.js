import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/expandable-responsive-leaderboard';

export default Component.extend({
  layout,

  network: '6483581',
  unitSuffix: 'leaderboard',
  slot: computed('network', 'site', function() {
    return `/${this.get('network')}/leaderboard/${this.get('site')}_${this.get('unitSuffix')}`;
  })
});
