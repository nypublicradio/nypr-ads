# Configuration

You can configure the following settings in your app's `environment.js`.

{{#docs-snippet name='config.hbs' title='config/environment.js'}}
module.exports = function(environment) {
  let ENV = {
    //...
    'nypr-ads': {
       networkCode: "6483581",
       prefix: "_demo"
    },
    //...
  }
}
{{/docs-snippet}}

**Setting:** `networkCode`<br>
**Default:** _"6483581"_

Your Google Ad Manager network code.

**Setting:** `prefix`<br>
**Default:** _null_

If you set a prefix here, it will be added to dfp slot names right after the network code. 

For example, if you set a prefix of `_demo`, and pointed a `dfp-ad` component towards `wqxr/leaderboad`, it would send dfp request for the `6483581/_demo/wqxr/leaderboad` slot. You can use this to help organize your ad units by application or environment.
