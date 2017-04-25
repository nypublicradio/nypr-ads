import Service from 'ember-service';
import { isEmpty } from 'ember-utils';
import googletag from 'googletag';

export default Service.extend({
  doTargeting(targets) {
    googletag.cmd.push(function() {
      googletag.pubads().setTargeting('url', window.location.pathname);
      googletag.pubads().setTargeting('host', window.location.host);
      googletag.pubads().setTargeting('fullurl', window.location);
    
      if (targets) {
        Object.keys(targets).forEach(key => {
          if (!isEmpty(targets[key])) {
            googletag.pubads().setTargeting(key, targets[key]);
          }
        });
      }
    });  
  }
});
