'use strict';

module.exports = {
  name: 'nypr-ads',
  
  included: function(app) {
    this._super.included.apply(this, arguments);
    
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }
    
    app.import('vendor/shims/googletag.js');
  },
  
  contentFor: function(type, config) {
    if (type === 'head' && config.environment !== 'test') {
      return '<script async="async" src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>';
    } else {
      return '';
    }
  },
  
  isDevelopingAddon: function() {
    return true;
  }
};
