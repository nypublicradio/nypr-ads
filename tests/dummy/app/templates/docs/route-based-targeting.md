# Route-based Targeting

You can use the functions provided by this addon to set up [page-level GPT key-value targeting](https://support.google.com/admanager/answer/1697712#use_key-value_targeting_with_GPT) in your application.

## Setting targeting for the path

We usually want to add key-values based on the url to allow for targeting ads by path.

To set up targeting for your path that will be applied on all routes in your application, add `doPathTargeting` and `clearPathTargeting` to the `didTransition` and `willTransition` actions on your `routes/application.js`.

{{#docs-snippet name='path-targeting.hbs' title='app/routes/application.js'}}
import Route from '@ember/routing/route';
import { doTargetingForPath, clearTargetingForPath } from 'nypr-ads';

export default Route.extend({
  //...
  actions: {
    didTransition() {
      doTargetingForPath();
    },
    willTransition() {
      clearTargetingForPath();
    }
  }
});
{{/docs-snippet}}

This will set targeting for the url, host, and url segments. Your resulting key-value pairs will look something like this:

|Key          |Value |
|-------------|---|
|`url`          | '/docs/key-value-targeting' |
|`host`         | 'nypublicradio.github.io' |
|`urlSegments` | ['docs', 'key-value-targeting'] |

## Setting targeting for models

Since each model is different, this addon makes it the responsibility of the model to know which properties are important to ad targeting.

Your model is expected to have an `adTargeting` property that provides a mapping of targeting keys to model properties. 

For example if you had a model with `tags` and `category` properties, and you wanted to use those values with ad targeting keys of `Tag` and `Section` respectively, your model would look like this:

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

This will target the value of the `tags` property to the `Tag` key and the value of the `category` property to the `Section` key.

Once your models are set up, you can pass them to the `doTargetingForModels` and `clearTargetingForModels` functions.

```js
import Route from '@ember/routing/route';
import { doTargetingForModels, clearTargetingForModels } from 'nypr-ads';

export default Route.extend({
  //...
  actions: {
    didTransition() {
      let { section, story } = this.currentModel;
      doTargetingForModels(section, story);
    },
    willTransition() {
      let { section, story } = this.currentModel;
      clearTargetingForModels(section, story);
    }
  }
});
```

## Manually setting targeting

You can also manually set key-value pairs with `doTargeting` and `clearTargeting`.


```js
import Route from '@ember/routing/route';
import { doTargeting, clearTargeting } from 'nypr-ads';

export default Route.extend({
  //...
  actions: {
    didTransition() {
      doTargeting({'key1': 'value1', 'key2': 'value2'});
    },
    willTransition() {
      clearTargeting('key1', 'key2');
    }
  }
});
```
