import { moduleForComponent } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import googletag from 'googletag';

moduleForComponent('dfp-ad', 'Integration | Component | dfp ad', {
  integration: true,
  beforeEach() {
    googletag.pubads = googletag.pubads || (() => {});
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{dfp-ad target='foo'}}`);

  assert.equal(this.$('#foo').length, 1);
});

test('it initializes a basic display ad', function(assert) {
  this.stub(googletag.cmd, 'push', f => f());
  
  let defineMock = this.mock(googletag)
    .expects('defineSlot')
    .once()
    .returns({ addService: this.mock().once() });
  let displayMock = this.mock(googletag).expects('display').once();
  
  this.render(hbs`{{dfp-ad target='foo target' sizes=(array 100 200 300) slot='foo slot'}}`);
  
  assert.ok(displayMock.firstCall.calledWith('foo target'));
  assert.ok(defineMock.firstCall.calledWith('foo slot', [100, 200, 300], 'foo target'));
});

test('it initializes an ad with a size mapping', function(/*assert*/) {
  this.stub(googletag.cmd, 'push', f => f());
  
  this.mock(googletag).expects('display').once();
  this.stub(googletag, 'defineSlot')
    .returns({
      addService: this.stub,
      defineSizeMapping: this.mock().once()
    });
  
  this.mock(googletag)
    .expects('sizeMapping')
    .once()
    .returns({
      build: this.mock().once(),
      addSize: this.mock().twice()
    });

  this.mock(window)
    .expects('matchMedia')
    .twice()
    .returns({
      addListener: this.mock().twice(),
      removeListener() {}
    });
  
  this.render(hbs`{{dfp-ad target='foo target' sizes=(array 100 200 300) slot='foo slot' mapping=(array
    (array 100 (array 200 300))
    (array 300 (array 400 500))
  )}}`);
});
