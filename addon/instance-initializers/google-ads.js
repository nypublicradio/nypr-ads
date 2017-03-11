import googletag from 'googletag';

export function initialize({ application }) {
  if (application.testing) {
    googletag.apiReady = true;
  } else {
    let gads = document.createElement('script');
    gads.async = true; gads.type = 'text/javascript';
    gads.src = 'https://www.googletagservices.com/tag/js/gpt.js';
    let node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(gads, node);
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
