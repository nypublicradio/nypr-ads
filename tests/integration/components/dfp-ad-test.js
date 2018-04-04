import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import googletag from 'googletag';

module('Integration | Component | dfp ad', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    googletag.pubads = googletag.pubads || (() => {});
  });

  test('it renders', async function(assert) {
    await render(hbs`{{dfp-ad target='foo'}}`);

    assert.equal(findAll('#foo').length, 1);
  });

  test('it initializes a basic display ad', async function(assert) {
    this.stub(googletag.cmd, 'push').callsFake( f => f());
    
    let defineMock = this.mock(googletag)
      .expects('defineSlot')
      .once()
      .returns({ addService: this.mock().once() });
    let displayMock = this.mock(googletag).expects('display').once();
    
    await render(hbs`{{dfp-ad target='foo target' sizes=(array 100 200 300) slot='foo slot'}}`);
    
    assert.ok(displayMock.firstCall.calledWith('foo target'));
    assert.ok(defineMock.firstCall.calledWith('foo slot', [100, 200, 300], 'foo target'));
  });

  test('it initializes an ad with a size mapping', async function() /*assert*/{
    this.stub(googletag.cmd, 'push').callsFake(f => f());
    
    this.mock(googletag).expects('display').once();
    this.stub(googletag, 'defineSlot')
      .returns({
        addService: this.stub,
        defineSizeMapping: this.mock().once().withArgs('built mapping')
      });
    
    this.mock(googletag)
      .expects('sizeMapping')
      .once()
      .returns({
        build: this.mock().once().returns('built mapping'),
        addSize: this.mock().twice()
      });

    this.mock(window)
      .expects('matchMedia')
      .twice()
      .returns({
        addListener: this.mock().twice(),
        removeListener() {}
      });
    
    await render(hbs`{{dfp-ad target='foo target' sizes=(array 100 200 300) slot='foo slot' mapping=(array
      (array 100 (array 200 300))
      (array 300 (array 400 500))
    )}}`);
  });
});
