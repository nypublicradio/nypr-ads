# nypr-ads

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
  * for screen sizes between 0px wide and 757px wide, use ads from the `300 x 50` slot
  * for screen sizes between 757px wide and 1203, use ads from the `728 x 90` slot
  * for screen sizes above 1203 use `970 x 415`

* The `sizes` above say:
  * there is a `970 x 415` slot, a `728 x 90` slot, and a `300 x 50` slot

* `slotRenderEndedAction` - optional
  * You can pass in an action to run when GPT sends the `slotRenderEnded` event for this ad slot.

* `clearOnEmptyRefresh` - optional, default: false
  * When googletag.pubads().refresh() is called to request a new ad and returns empty, the default GPT behavior is to keep the current ad. Set this to true if you want to `.clear()` the ad slot when empty. 
  * You might want to use this if you're using key/value targeting, and never want a targeted ad to stick around (due to lack of other ads) after you change the targeting.

## Configuration

You can configure the following settings in your `environment.js`.
```js
    nypr-ads: {
     networkCode: "6483581", //optional, defaults to '6483581'
     prefix: "_demo"          //optional, defaults to null
    },
```

| Setting     | Default   | Description |
|-------------|-----------|-------------|
| networkCode | "6483581" | This will be used as the first part of the slot name, you don't need to include it.  The full slot that would be used request `6483581/leaderboard/wqxr_leaderboard_demo`  |
| prefix      | _null_    | If you set a prefix here, it will be added to the slot name after the network code, e.g. if you set a prefix of `_demo`, the dfp request will ask for `6483581/_demo/leaderboad/wqxr_leaderboard_demo`. You can use this to help organize your ad units by application or environment. |


## Development

Development requires nodejs 6+.
```sh
brew install nvm
nvm install --lts
nvm use --lts
```

Install dependencies.
```sh
npm install
```

Build and run ember.
_Note: To use your system's global ember simply type `ember`_
```sh
./node_modules/.bin/ember build
./node_modules/.bin/ember serve
```

## Tests

Tests require `google-chrome` and `chromedriver`.
```sh
brew cask install google-chrome
brew cask install chromedriver
```

Execute tests.
```sh
./node_modules/.bin/ember test
```
