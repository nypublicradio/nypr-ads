import { module } from 'qunit';
import { setupTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import googletag from 'googletag';
import {
  doTargeting, clearTargeting,
  doTargetingForPath, clearTargetingForPath
} from 'nypr-ads';

module('Unit | google ads', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(() => {

  })

  test('it calls setTargeting on passed in hash', function(assert) {
    googletag.pubads = googletag.pubads || (() => {});

    let testTargets = {tags: ['foo', 'bar'], show: 'baz'};
    let targetingMock = this.mock().exactly(2);

    this.stub(googletag.cmd, 'push').callsFake(f => f());
    this.stub(googletag, 'pubads').callsFake(() => ({
      setTargeting: targetingMock
    }));

    doTargeting(testTargets);
    targetingMock.verify();
    assert.ok(targetingMock.getCall(0).calledWith('tags', ['foo', 'bar']));
    assert.ok(targetingMock.getCall(1).calledWith('show', 'baz'));
  });

  test('it calls doTargetingForPath', function(assert) {
    googletag.pubads = googletag.pubads || (() => {});
    let targetingMock = this.mock().exactly(3);

    this.stub(googletag.cmd, 'push').callsFake(f => f());
    this.stub(googletag, 'pubads').callsFake(() => ({
      setTargeting: targetingMock
    }));

    doTargetingForPath({pathname: '/foo/bar/baz', host: 'http://example.com'});
    targetingMock.verify();
    assert.ok(targetingMock.calledWith('host', 'http://example.com'));
    assert.ok(targetingMock.calledWith('url', '/foo/bar/baz'));
    assert.ok(targetingMock.calledWith('urlSegments', ['foo','bar','baz']));
  });

  test('it calls clearTargetingForPath', function(/* assert */) {
    googletag.pubads = googletag.pubads || (() => {});
    let clearTargetingMock = this.mock().exactly(3);

    this.stub(googletag.cmd, 'push').callsFake(f => f());
    this.stub(googletag, 'pubads').callsFake(() => ({
      clearTargeting: clearTargetingMock
    }));

    clearTargetingForPath();
    clearTargetingMock.verify();
  });

  test('it calls clearTargeting on a key', function(/* assert */) {
    googletag.pubads = googletag.pubads || (() => {});
    let clearTargetingMock = this.mock().once().withArgs('foo');

    this.stub(googletag.cmd, 'push').callsFake(f => f());
    this.stub(googletag, 'pubads').callsFake(() => ({
      clearTargeting: clearTargetingMock
    }));

    clearTargeting('foo');
    clearTargetingMock.verify();
  });
});
