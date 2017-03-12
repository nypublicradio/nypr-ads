import googletag from 'googletag';

export function initialize({ application }) {
  if (application.testing) {
    googletag.apiReady = true;
  }
  
  googletag.cmd.push(function() {
    googletag.pubads().enableSingleRequest();
    googletag.pubads().collapseEmptyDivs();
    googletag.enableServices();
  });
}

export default {
  name: 'google-ad',
  initialize
};
