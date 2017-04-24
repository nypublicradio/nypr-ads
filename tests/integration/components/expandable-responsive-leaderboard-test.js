import { moduleForComponent } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import googletag from 'googletag';

moduleForComponent('expandable-responsive-leaderboard', 'Integration | Component | expandable responsive leaderboard', {
  integration: true,
  beforeEach() {
    googletag.pubads = googletag.pubads || (() => {});
  }
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{expandable-responsive-leaderboard}}`);

  assert.equal(this.$('.leaderboard').length, 1);
});

test('large breakpoint', function(/*assert*/) {
  this.stub(googletag.cmd, 'push').callsFake(f => f());
  
  this.mock(googletag).expects('display').once();
  this.mock(googletag).expects('defineSlot')
    .once()
    .returns({
      addService: this.stub,
      defineSizeMapping: this.mock().atLeast(1)
    });
  
  this.mock(googletag)
    .expects('sizeMapping')
    .once()
    .returns({
      build: this.mock().atLeast(1),
      addSize: this.mock().atLeast(2)
    });

  this.mock(window)
    .expects('matchMedia')
    .twice()
    .returns({
      addListener: this.mock().atLeast(2),
      removeListener() {}
    });
  
  this.render(hbs`
    {{expandable-responsive-leaderboard
      site='wqxr'
      smallBreakpoint=false
    }}
  `);
});

test('small breakpoint', function(/*assert*/) {
  this.stub(googletag.cmd, 'push').callsFake(f => f());
  
  this.mock(googletag).expects('display').once();
  this.mock(googletag).expects('defineSlot')
    .once()
    .returns({
      addService: this.stub,
      defineSizeMapping: this.mock().never()
    });
  
  this.mock(googletag)
    .expects('sizeMapping')
    .never();

  this.mock(window)
    .expects('matchMedia')
    .never();
  
  this.render(hbs`
    {{expandable-responsive-leaderboard
      site='wqxr'
      smallBreakpoint=true
    }}
  `);
});
