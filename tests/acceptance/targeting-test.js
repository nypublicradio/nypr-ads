import { module } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import test from 'ember-sinon-qunit/test-support/test';
import googletag from 'googletag';

module('Acceptance | targeting', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
  });

  test('visiting /targeting-route', async function(assert) {
    this.stub(googletag.cmd, 'push').callsFake(f => f());

    let setTargeting = this.fake();
    let clearTargeting = this.fake();

    this.replace(googletag, 'pubads', this.fake.returns({
      setTargeting,
      clearTargeting
    }));

    await visit('/targeting-route');

    function calledWith(fake, firstArg) {
      return fake
              .getCalls()
              .filter(call => call.args[0] === firstArg)
              .map(call => call.args[1])
    }

    assert.equal(currentURL(), '/targeting-route');
    assert.deepEqual(calledWith(setTargeting, 'url'), ['/foo/bar']);
    assert.deepEqual(calledWith(setTargeting, 'host'), ['example.test']);
    assert.deepEqual(calledWith(setTargeting, 'urlSegments'), [['foo','bar']]);
    assert.deepEqual(calledWith(setTargeting, 'section'), ['todays-news']);
    assert.deepEqual(calledWith(setTargeting, 'story'), ['good-news-for-once']);
    assert.deepEqual(calledWith(setTargeting, 'tags'), [['good-news', 'cool', 'finally']]);
    assert.deepEqual(calledWith(setTargeting, 'foo'), ['true']);
    assert.deepEqual(calledWith(setTargeting, 'bar'), ['false']);
    assert.equal(setTargeting.callCount, 8);
    assert.equal(clearTargeting.callCount, 0);

    await visit('/non-targeting-route');

    assert.equal(currentURL(), '/non-targeting-route');
    assert.ok(clearTargeting.calledWith('url'));
    assert.ok(clearTargeting.calledWith('host'));
    assert.ok(clearTargeting.calledWith('urlSegments'));
    assert.ok(clearTargeting.calledWith('section'));
    assert.ok(clearTargeting.calledWith('story'));
    assert.ok(clearTargeting.calledWith('tags'));
    assert.ok(clearTargeting.calledWith('foo'));
    assert.ok(clearTargeting.calledWith('bar'));
    assert.equal(setTargeting.callCount, 8);
    assert.equal(clearTargeting.callCount, 8);
  });

  test('visiting /component-targeting-route', async function(assert) {
    this.stub(googletag.cmd, 'push').callsFake(f => f());

    let setTargeting = this.fake();
    let clearTargeting = this.fake();

    this.replace(googletag, 'pubads', this.fake.returns({
      setTargeting,
      clearTargeting
    }));

    await visit('/component-targeting-route');

    function calledWith(fake, firstArg) {
      return fake
              .getCalls()
              .filter(call => call.args[0] === firstArg)
              .map(call => call.args[1])
    }

    assert.equal(currentURL(), '/component-targeting-route');
    assert.deepEqual(calledWith(setTargeting, 'section'), ['todays-news']);
    assert.deepEqual(calledWith(setTargeting, 'story'), ['good-news-for-once']);
    assert.deepEqual(calledWith(setTargeting, 'tags'), [['good-news', 'cool', 'finally']]);
    assert.deepEqual(calledWith(setTargeting, 'foo'), ['true']);
    assert.deepEqual(calledWith(setTargeting, 'bar'), ['false']);
    assert.equal(setTargeting.callCount, 5);
    assert.equal(clearTargeting.callCount, 0);

    await visit('/non-targeting-route');

    assert.equal(currentURL(), '/non-targeting-route');
    assert.ok(clearTargeting.calledWith('section'));
    assert.ok(clearTargeting.calledWith('story'));
    assert.ok(clearTargeting.calledWith('tags'));
    assert.ok(clearTargeting.calledWith('foo'));
    assert.ok(clearTargeting.calledWith('bar'));
    assert.equal(setTargeting.callCount, 5);
    assert.equal(clearTargeting.callCount, 5);
  });
});


