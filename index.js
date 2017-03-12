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
  
  contentFor: function(type/*, config */) {
    if (type === 'head') {
      var scriptArray = [
        '<script>',
        'var gads = document.createElement("script");',
        'gads.async = true; gads.type = "text/javascript";',
        'gads.src = "https://www.googletagservices.com/tag/js/gpt.js";',
        'var node = document.getElementsByTagName("script")[0];',
        'node.parentNode.insertBefore(gads, node);',
        '</script>'
      ];
      return scriptArray.join("\n");
    } else {
      return '';
    }
  },
  
  isDevelopingAddon: function() {
    return true;
  }
};
