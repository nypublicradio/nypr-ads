import $ from 'jquery';
import Service from '@ember/service';
import googletag from 'googletag';

export default Service.extend({
  install() {
    window.addEventListener('message', this._resizeLeaderboard);
    googletag.cmd.push(() => googletag.pubads().addEventListener('slotRenderEnded', this.adSpaceCleanup));
  },
  willDestroy() {
    this._super(...arguments);
    window.removeEventListener('message', this._resizeLeaderboard);
  },
  adSpaceCleanup(e) {
    if (/leaderboard/.test(e.slot.getAdUnitPath())) {
      if (e.isEmpty) {
        $('#leaderboard').addClass('is-collapsed');
      } else {
        $('#leaderboard').removeClass('is-collapsed');
      }
    }
  },
  _resizeLeaderboard(e) {
    let data;
    let shouldOpen;
    let $leaderboard = $('#leaderboard > div > iframe, #leaderboard > div');

    // lots of things on a page can send a postMessage, but not all of that
    // data is parsable as JSON. this prevents nasty console messages.
    try {
      data = JSON.parse(e.data);
    } catch(err) {
      return false;
    }

    // just a little sanity check that we're receiving a message from our ad
    if ( !data.wnyc ) {
      return false;
    }

    if ( data.msg === 'init' ) {
      $('#leaderboard').css('max-height', 'none');
      shouldOpen = false;
    } else {
      shouldOpen = data.msg === 'open';
    }

    if ( $leaderboard.length !== 1 ) {
      $leaderboard = $('#leaderboard > div > iframe, #leaderboard > div');
    }
    $leaderboard.css('max-height', shouldOpen ? 415 : 90);
  }
});
