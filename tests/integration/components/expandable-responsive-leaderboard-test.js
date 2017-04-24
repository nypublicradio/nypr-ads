import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('expandable-responsive-leaderboard', 'Integration | Component | expandable responsive leaderboard', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{expandable-responsive-leaderboard}}`);

  assert.equal(this.$('.leaderboard').length, 1);
});
