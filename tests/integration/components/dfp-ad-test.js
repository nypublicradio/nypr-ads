import { module } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import test from 'ember-sinon-qunit/test-support/test';
import hbs from 'htmlbars-inline-precompile';
import googletag from 'googletag';
import config from 'ember-get-config';
import { DEFAULT_NETWORK_CODE } from 'nypr-ads/defaults';

module('Integration | Component | dfp ad', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    googletag.pubads = googletag.pubads || (() => {});
    config['nypr-ads'] = config['nypr-ads'] || {};
    config['nypr-ads'].networkCode = DEFAULT_NETWORK_CODE || 'default network code not found';
    config['nypr-ads'].prefix = null;
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

    assert.ok(displayMock.firstCall.calledWith('foo target'),
      'it should call display with the correct target');
    assert.deepEqual(defineMock.getCall(0).args,
      [`${DEFAULT_NETWORK_CODE}/foo slot`, [100, 200, 300], 'foo target'],
      'it should call define with the correct slot, sizes, and target');
  });

  test('it lets you override the network code in the config', async function(assert) {
    config['nypr-ads'].networkCode = '123';
    this.stub(googletag.cmd, 'push').callsFake( f => f());

    let defineMock = this.mock(googletag)
      .expects('defineSlot')
      .once()
      .returns({ addService: this.mock().once() });
    let displayMock = this.mock(googletag).expects('display').once();

    await render(hbs`{{dfp-ad target='foo target' sizes=(array 100 200 300) slot='foo slot'}}`);

    assert.ok(displayMock.getCall(0).args,
      ['foo target'],
      'it should call display with the correct target');
    assert.ok(defineMock.getCall(0).args,
      ['123/foo slot', [100, 200, 300], 'foo target'],
      'it should call define with the correct slot, sizes, and target');
  });

  test('it lets you set a prefix in the config', async function(assert) {
    config['nypr-ads'].prefix = 'abc';
    this.stub(googletag.cmd, 'push').callsFake( f => f());

    let defineMock = this.mock(googletag)
      .expects('defineSlot')
      .once()
      .returns({ addService: this.mock().once() });
    let displayMock = this.mock(googletag).expects('display').once();

    await render(hbs`{{dfp-ad target='foo target' sizes=(array 100 200 300) slot='foo slot'}}`);

    assert.ok(displayMock.getCall(0).args,
      ['foo target'],
      'it should call display with the correct target');
    assert.ok(defineMock.getCall(0).args,
      [`${DEFAULT_NETWORK_CODE}/abc/foo slot`, [100, 200, 300], 'foo target'],
      'it should call define with the correct slot, sizes, and target');
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
