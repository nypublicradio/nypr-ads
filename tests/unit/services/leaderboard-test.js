import { moduleFor } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import googletag from 'googletag';

moduleFor('service:leaderboard', 'Unit | Service | leaderboard', {
  // Specify the other units that are required for this test.
  // needs: ['service:foo']
  beforeEach() {
    googletag.pubads = googletag.pubads || (() => {});
  }
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('it sets up a media query listener on install', function(assert) {
  let googleListener = this.mock().once();
  this.stub(googletag.cmd, 'push').callsFake(f => f());
  this.stub(googletag, 'pubads').callsFake(() => ({
    addEventListener: googleListener
  }));
  let windowMock = this.mock(window).expects('addEventListener').once();

  let service = this.subject();
  service.install();
  
  windowMock.verify();
  googleListener.verify();
  assert.ok(googleListener.firstCall.calledWith('slotRenderEnded', service.adSpaceCleanup));
});

test('it resizes the leaderboard', function(assert) {
  let leaderboard = $('<div/>', {id: 'leaderboard'}).appendTo('#ember-testing');
  leaderboard.append('<div/>');
  
  let service = this.subject();
  service._resizeLeaderboard({data: '{"wnyc": true, "msg": "init"}'});
  assert.equal(leaderboard.css('max-height'), 'none');
  assert.equal(leaderboard.find('div').css('max-height'), '90px');
  
  service._resizeLeaderboard({data: '{"wnyc": true, "msg": "open"}'});
  assert.equal(leaderboard.find('div').css('max-height'), '415px');
});

test('it cleans up the ad space', function(assert) {
  let leaderboard = $('<div/>', {id: 'leaderboard'}).appendTo('#ember-testing');
  let testEvent = {
    slot: {getAdUnitPath: () => 'leaderboard'},
    isEmpty: true
  };
  let service = this.subject();

  assert.notOk(leaderboard.hasClass('is-collapsed'));
  service.adSpaceCleanup(testEvent);
  assert.ok(leaderboard.hasClass('is-collapsed'));
  
  testEvent.isEmpty = false;
  service.adSpaceCleanup(testEvent);
  assert.notOk(leaderboard.hasClass('is-collapsed'));
});
