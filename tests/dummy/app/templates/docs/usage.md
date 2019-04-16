# Usage

## The dfp-ad Component

```javascript
  {{dfp-ad
    slotClassNames="l-constrained aligncenter leaderboard"
    slot="leaderboard/wqxr_leaderboard_demo"
    target="leaderboard_ad_home"
    mapping=(array (array 0 (array 300 50)) (array 758 (array 728 90)) (array 1203 (array 970 415)))
    sizes=(array (array 970 415) (array 728 90) (array 300 50))
    slotRenderEndedAction=(action 'handleSlotRendered')
    clearOnEmptyRefresh=false
  }}
```

Things you might want to know when using this addon:

* For an ad to display, both the full slot name and the ad size have to match something being served out of DFP

* the `slot` name above is `6483581/leaderboard/wqxr_leaderboard_demo`

* The `mapping` parameter above says:
  * for viewport sizes greater than or equal to 0px wide and less than 757px wide, use ads from the `300 x 50` slot
  * for viewport sizes greater than or equal to 757px wide and less than 1203, use ads from the `728 x 90` slot
  * for viewport sizes greater than or equal 1203px wide use `970 x 415`

* The `sizes` above say:
  * there is a `970 x 415` slot, a `728 x 90` slot, and a `300 x 50` slot

* `slotRenderEndedAction` - optional
  * You can pass in an action to run when GPT sends the `slotRenderEnded` event for this ad slot.

* `clearOnEmptyRefresh` - optional, default: false
  * When googletag.pubads().refresh() is called to request a new ad and returns empty, the default GPT behavior is to keep the current ad. Set this to true if you want to `.clear()` the ad slot when empty. 
  * You might want to use this if you're using key/value targeting, and never want a targeted ad to stick around (due to lack of other ads) after you change the targeting.

