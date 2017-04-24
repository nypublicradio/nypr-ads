import Ember from 'ember';
import computed from 'ember-computed';
import layout from '../templates/components/expandable-responsive-leaderboard';

export default Ember.Component.extend({
  layout,
  
  network: '6483581',
  unitSuffix: 'leaderboard',
  slot: computed('network', 'site', function() {
    return `/${this.get('network')}/leaderboard/${this.get('site')}_${this.get('unitSuffix')}`;
  })
});
