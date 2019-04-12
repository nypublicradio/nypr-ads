# Configuration

You can configure the following settings in your app's `environment.js`.
```js
module.exports = function(environment) {
  let ENV = {
    //...
    'nypr-ads': {
     networkCode: "6483581", //optional, defaults to '6483581'
     prefix: "_demo"          //optional, defaults to null
    },
    //...
  }
}

```

| Setting     | Default   | Description |
|-------------|-----------|-------------|
| networkCode | "6483581" | This will be used as the first part of the slot name, you don't need to include it.  The full slot that would be used in the dfp request above will be: `6483581/leaderboard/wqxr_leaderboard_demo`  |
| prefix      | _null_    | If you set a prefix here, it will be added to the slot name after the network code, e.g. if you set a prefix of `_demo`, the dfp request will ask for: `6483581/_demo/leaderboad/wqxr_leaderboard_demo`. You can use this to help organize your ad units by application or environment. |
