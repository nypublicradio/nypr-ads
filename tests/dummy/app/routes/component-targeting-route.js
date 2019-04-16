import Route from '@ember/routing/route';

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
});
