# Route-based Targeting

You can use the functions provided by this addon to set up [page-level GPT key-value targeting](https://support.google.com/admanager/answer/1697712#use_key-value_targeting_with_GPT) in your application.

## Setting targeting for the path

We usually want to add key-values based on the url to allow for targeting ads by path.

To set up targeting for your path that will be applied on all routes in your application, add `doPathTargeting` and `clearPathTargeting` to the `didTransition` and `willTransition` actions on your `routes/application.js`.

<aside>For this to work correctly, `didTransition` and `willTransition` actions need to bubble from your child routes. Don't forget to `return true` when you implement `didTransition` and `willTransition` in other routes.</aside>

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

This will set targeting for the url, host, and url segments. Your resulting key-value pairs for the example url `http://example.com/foo/bar/baz` would look like this:

|Key          |Value |
|-------------|---|
|`url`          | '/foo/bar/baz' |
|`host`         | 'example.com' |
|`urlSegments` | ['foo', 'bar', 'baz'] |

## Setting targeting for models

Since each model is different, this addon makes it the responsibility of the model to know which properties are important to ad targeting.

Your model is expected to have an `adBindings` property that provides an array of keys for properties that will be sent to dfp.

For example, if you had a show model, with a showId property that you also wanted to use as for ad targeting, your `adBindings` would look like this:

```js
['showId']
```

If you need to target a model field toward a different GPT key, for example if the above model had an `id` property, you can format your string as the `modelKey:gptKey`:

```js
['id:showId']
```

Here's a full model example. In this scenario, we have a model with `tags` and `category` properties, and we want to use those values with ad targeting keys of `tags` and `section` respectively.

```js
import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  tags: DS.attr(),
  category: DS.attr(),
  adBindings: computed(function() {
    return ['tags', 'category:section']
  })
});
```

This will target the value of the `tags` property to the `tags` ad key and the value of the `category` property to the `section` ad key.

Once your models are set up, you can pass them to the `doTargetingForModels` and `clearTargetingForModels` functions.

```js
import Route from '@ember/routing/route';
import { doTargetingForModels, clearTargetingForModels } from 'nypr-ads';

export default Route.extend({
  //...
  model({section_id}) {
    return this.store.findRecord('section', section_id);
  },
  actions: {
    didTransition() {
      doTargetingForModels(this.currentModel);
    },
    willTransition() {
      clearTargetingForModels(this.currentModel);
    }
  }
});
```

You can also pass in multiple models.

```js
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { doTargetingForModels, clearTargetingForModels } from 'nypr-ads';

export default Route.extend({
  //...
  model({story_id, section_id}) {
    return RSVP.hash({
      section: this.store.findRecord('section', section_id),
      story: this.store.findAll('story', story_id)
    });
  },
  actions: {
    didTransition() {
      let { section, story } = this.currentModel;
      doTargetingForModels(section, story);
      return true;
    },
    willTransition() {
      let { section, story } = this.currentModel;
      clearTargetingForModels(section, story);
      return true;
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
      return true;
    },
    willTransition() {
      clearTargeting('key1', 'key2');
      return true;
    }
  }
});
```
