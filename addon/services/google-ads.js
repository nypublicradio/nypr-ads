import Service from 'ember-service';
import { isEmpty } from 'ember-utils';
import googletag from 'googletag';

export default Service.extend({
  doTargeting(story) {
    googletag.cmd.push(function() {
      googletag.pubads().setTargeting('url', window.location.pathname);
      googletag.pubads().setTargeting('host', window.location.host);
      googletag.pubads().setTargeting('fullurl', window.location);
    
      if (story){
        let {
          tags,
          show,
          channel,
          series
        } = story.get('extendedStory');
        
        [['tag', tags], ['show', show], ['channel', channel], ['series', series]].forEach(([k, v]) => {
          if (!isEmpty(v)) {
            googletag.pubads().setTargeting(k, v);
          }
        });
      }
    });  
  }
});
