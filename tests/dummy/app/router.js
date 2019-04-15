import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  docsRoute(this, function() {
    this.route('usage');
    this.route('configuration');
    this.route('route-based-targeting');
    this.route('template-based-targeting');
  });
  this.route('not-found', { path: '/*path' });
  this.route('targeting-route');
  this.route('non-targeting-route');
  this.route('component-targeting-route');
});

export default Router;
