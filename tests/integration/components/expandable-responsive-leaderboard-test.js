import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import googletag from 'googletag';

module('Integration | Component | expandable responsive leaderboard', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    googletag.pubads = googletag.pubads || (() => {});
  });

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{expandable-responsive-leaderboard}}`);

    assert.equal(findAll('.leaderboard').length, 1);
  });

  test('large breakpoint', async function() /*assert*/{
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
    
    await render(hbs`
      {{expandable-responsive-leaderboard
        site='wqxr'
        smallBreakpoint=false
      }}
    `);
  });

  test('small breakpoint', async function() /*assert*/{
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
    
    await render(hbs`
      {{expandable-responsive-leaderboard
        site='wqxr'
        smallBreakpoint=true
      }}
    `);
  });
});
