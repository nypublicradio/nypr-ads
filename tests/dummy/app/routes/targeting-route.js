import Route from '@ember/routing/route';
import {
  doTargetingForPath, clearTargetingForPath,
  doTargetingForModels, clearTargetingForModels,
  doTargeting, clearTargeting
} from 'nypr-ads'

export default Route.extend({

  model() {
    return {
      section: {
        id: 123,
        slug: 'todays-news',
        adBindings: ['slug:section']
      },
      story: {
        id: 456,
        slug: 'good-news-for-once',
        tags: ['good-news', 'cool', 'finally'],
        adBindings: ['slug:story', 'tags']
      }
    };
  },
  actions: {
    didTransition() {
      let {section, story} = this.currentModel;

      doTargetingForPath({pathname: '/foo/bar', 'host': 'example.test'});
      doTargetingForModels(section, story);
      doTargeting({
        'foo': 'true',
        'bar': 'false'
      });
    },

    willTransition() {
      let {section, story} = this.currentModel;

      clearTargetingForPath();
      clearTargetingForModels(section, story);
      clearTargeting('foo', 'bar');
    }
  }
});
