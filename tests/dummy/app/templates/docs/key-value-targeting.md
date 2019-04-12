# Key-Value Targeting

You can use the methods provided by this addon to set up page level [Google Ad Manager key-value targeting](https://support.google.com/admanager/answer/188092?hl=en) in your application.

## Targeting with the Route

You can set and clear your ad targeting values in your routes in the `didTransition` and `willTransition` actions using the provided functions.

### Path Keys

To configure our path targeting values that get set on all routes use `doPathTargeting` and `clearPathTargeting` in your `routes/application.js`.

```js
import { doTargetingForPath, clearTargetingForPath } from 'nypr-ads';

actions: {
  didTransition() {
    doTargetingForPath();
  },
  willTransition() {
    clearTargetingForPath();
  }
}
```

This will set key-value targeting for the url, host, and url segments. Your key-value pairs will look something like this:
```
url: '/docs/key-value-targeting'
host: 'nypublicradio.github.io'
urlSegments: ['docs', 'key-value-targeting']
```

### Model keys

In your other routes

```js
import { doTargetingForModels, clearTargetingForModels } from 'nypr-ads';

actions: {
  didTransition() {
    let { section, story } = this.currentModel;
    doTargetingForModels(section, story);
  },
  willTransition() {
    clearTargetingForModels(section, story);
  }
}
```

In your models you want to return a mapping of targeting keys to model properties. For example if you had a model with tags and category properties, and you wanted to use those values with ad targeting keys of 'Tag' and 'Section' respectively, your model would look like this.

This will target the 'tags' value to the 'Tag' key and the 'category' value to the 'Section' key.

```js
import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  tags: DS.attr(),
  category: DS.attr(),
  sponsor: DS.attr(),
  adTargeting: computed(function() {
    return {
      'Tag': 'tags',
      'Section': 'category'
    }
  })
});
```

### Other key-values

You can also manually set key-value pairs with `doTargeting` and `clearTargeting`.


```js
import { doTargeting, clearTargeting } from 'nypr-ads';

actions: {
  didTransition() {
    let { section, story } = this.currentModel;
    doTargeting({'key1': 'value1', 'key2': 'value2'});
  },
  willTransition() {
    clearTargeting('key1', 'key2');
  }
}
```

## Targeting with the Template

You can also use an invisible component to set targeting in the template:


```hbs
{{do-targeting key='foo' value='bar'}}
```

Passing multiple targets:

```hbs
{{do-targeting targets=(hash
  foo='bar'
  baz='bla'
)}}
