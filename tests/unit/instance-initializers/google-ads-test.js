import Ember from 'ember';
import { initialize } from 'dummy/instance-initializers/google-ads';
import { module } from 'qunit';
import test from 'ember-sinon-qunit/test-support/test';
import destroyApp from '../../helpers/destroy-app';
import googletag from 'googletag';

module('Unit | Instance Initializer | google ads', {
  beforeEach() {
    googletag.pubads = googletag.pubads || (() => {});
    googletag.enableServices = googletag.enableServices || (() => {});
    Ember.run(() => {
      this.application = Ember.Application.create();
      this.appInstance = this.application.buildInstance();
    });
  },
  afterEach() {
    Ember.run(this.appInstance, 'destroy');
    destroyApp(this.application);
  }
});

test('it works', function(assert) {
  initialize(this.appInstance);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});

test('it pushes the correct functions into the command queue', function(/* assert */) {
  this.stub(googletag.cmd, 'push', f => f());
  
  let singleRequestStub = this.mock().once();
  singleRequestStub.method = 'enableSingleRequest';
  let collapseStub = this.mock().once();
  collapseStub.method = 'collapseEmptyDivs';
  let enableServicesMock = this.mock().once();
  enableServicesMock.method = 'enableServices';

  this.stub(googletag, 'pubads').callsFake(() => ({
    enableSingleRequest: singleRequestStub,
    collapseEmptyDivs: collapseStub
  }));
  this.stub(googletag, 'enableServices').callsFake(() => enableServicesMock());
  
  initialize(this.appInstance);
  
  // run the first item in the command queue
  singleRequestStub.verify();
  collapseStub.verify();
  enableServicesMock.verify();
});
