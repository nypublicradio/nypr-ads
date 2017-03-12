(function() {
  function vendorModule() {
    'use strict';
    
    var googletag = self['googletag'] = self['googletag'] || {};
    googletag.cmd = googletag.cmd || [];

    return { 'default': self['googletag'] };
  }

  define('googletag', [], vendorModule);
})();
