import { module } from 'qunit';
import { setupTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import googletag from 'googletag';

module('Unit | Service | google ads', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:google-ads');
    assert.ok(service);
  });

  test('it calls setTargeting on passed in hash', function(assert) {
    googletag.pubads = googletag.pubads || (() => {});
    
    let testTargets = {tags: ['foo', 'bar'], show: 'baz'};
    let targetingMock = this.mock().exactly(5);

    this.stub(googletag.cmd, 'push').callsFake(f => f());
    this.stub(googletag, 'pubads').callsFake(() => ({
      setTargeting: targetingMock
    }));
    
    let service = this.owner.lookup('service:google-ads');
    service.doTargeting(testTargets);
    targetingMock.verify();
    assert.ok(targetingMock.getCall(0).calledWith('url', window.location.pathname));
    assert.ok(targetingMock.getCall(1).calledWith('host', window.location.host));
    assert.ok(targetingMock.getCall(2).calledWith('fullurl', window.location.host + window.location.pathname));
    assert.ok(targetingMock.getCall(3).calledWith('tags', ['foo', 'bar']));
    assert.ok(targetingMock.getCall(4).calledWith('show', 'baz'));
  });

  test('can safely call targeting without an argument', function(assert) {
    googletag.pubads = googletag.pubads || (() => {});
    let targetingMock = this.mock().exactly(3);

    this.stub(googletag.cmd, 'push').callsFake(f => f());
    this.stub(googletag, 'pubads').callsFake(() => ({
      setTargeting: targetingMock
    }));
    
    let service = this.owner.lookup('service:google-ads');
    service.doTargeting();
    targetingMock.verify();
    assert.ok(targetingMock.getCall(0).calledWith('url', window.location.pathname));
    assert.ok(targetingMock.getCall(1).calledWith('host', window.location.host));
    assert.ok(targetingMock.getCall(2).calledWith('fullurl', window.location.host + window.location.pathname));
  });

  test('clear targeting calls the correct googletag api', function(/* assert */) {
    googletag.pubads = googletag.pubads || (() => {});
    let clearTargetingMock = this.mock().once().withArgs(undefined);
    
    this.stub(googletag.cmd, 'push').callsFake(f => f());
    this.stub(googletag, 'pubads').callsFake(() => ({
      clearTargeting: clearTargetingMock
    }));
    
    let service = this.owner.lookup('service:google-ads');
    service.clearTarget();
    clearTargetingMock.verify();
  });

  test('clear targeting accepts an argument', function(/* assert */) {
    googletag.pubads = googletag.pubads || (() => {});
    let clearTargetingMock = this.mock().once().withArgs('foo');
    
    this.stub(googletag.cmd, 'push').callsFake(f => f());
    this.stub(googletag, 'pubads').callsFake(() => ({
      clearTargeting: clearTargetingMock
    }));
    
    let service = this.owner.lookup('service:google-ads');
    service.clearTarget('foo');
    clearTargetingMock.verify();
  });
});
