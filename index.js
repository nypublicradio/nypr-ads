/* jshint node: true */
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
  
  isDevelopingAddon: function() {
    return true;
  }
};
