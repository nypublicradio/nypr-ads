(function() {
  function vendorModule() {
    'use strict';
    
    const googletag = self['googletag'] || {};
    googletag.cmd = googletag.cmd || [];

    return { 'default': self['googletag'] };
  }

  define('googletag', [], vendorModule);
})();
