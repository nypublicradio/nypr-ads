import { moduleFor } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import googletag from 'googletag';

moduleFor('service:google-ads', 'Unit | Service | google ads', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
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
  
  let service = this.subject();
  service.doTargeting(testTargets);
  targetingMock.verify();
  assert.ok(targetingMock.getCall(0).calledWith('url', window.location.pathname));
  assert.ok(targetingMock.getCall(1).calledWith('host', window.location.host));
  assert.ok(targetingMock.getCall(2).calledWith('fullurl', window.location));
  assert.ok(targetingMock.getCall(3).calledWith('tags', ['foo', 'bar']));
  assert.ok(targetingMock.getCall(4).calledWith('show', 'baz'));
});
