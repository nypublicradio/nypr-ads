import { isEmpty } from '@ember/utils';
import { get } from '@ember/object';
import googletag from 'googletag';


/**
  Set targeting for the current 'url', 'host', and 'urlSegments'.

  @function doTargetingForPath
  @export named
  @param {Object} [location=window.location] The browser location object or a testable replacement.
*/
export function doTargetingForPath(location=window && window.location) {
  if (location) {
    doTargeting({
      'host': location.host,
      'url': location.pathname,
      'urlSegments': location.pathname && location.pathname.split('/').filter(segment => segment.length > 0)
    });
  }
}

/**
  Clear targeting for the current 'url', 'host', and 'urlSegments'.

  @function clearTargetingForPath
  @export named
*/
export function clearTargetingForPath() {
  clearTargeting('host');
  clearTargeting('url');
  clearTargeting('urlSegments');
}

/**
  Set targeting for passed in Ember Data Models that
  have an adTargeting property set up.

  Accepts any number of Ember Data models as parameters.

  Usage:
  ```js
    doTargetingForModels(model1, model2);
  ```

  @function doTargetingForModels
  @export named
  @param {DS.Model} ...models Any number of Ember Data models with 'adTargeting' properties.
*/
export function doTargetingForModels(...models) {
  models.forEach(model => {
    let targets = {};
    let adTargeting = get(model, 'adTargeting');
    if(adTargeting) {
      Object.keys(adTargeting).forEach(key => {
        targets[key] = get(model, adTargeting[key]);
      });
    }
    doTargeting(targets);
  });
}

/**
  Clear targeting for Ember Data Models that
  have an adTargeting property set up.

  Accepts any number of Ember Data models as parameters.

  Usage:
  ```js
    clearTargetingForModels(model1, model2);
  ```

  @function clearTargetingForModels
  @export named
  @param {DS.Model} ...models Any number of Ember Data models with 'adTargeting' properties.
*/
export function clearTargetingForModels(...models) {
  models.forEach(model => {
    let adTargetingMap = get(model, 'adTargeting');
    if(adTargetingMap) {
      Object.keys(adTargetingMap).forEach(key => {
        clearTargeting(key);
      });
    }
  });
}

/**
  Set targeting for a set of key value pairs.

  Usage:
  ```js
    doTargeting({key1:'value1', key2:'value2'});
  ```

  @function doTargeting
  @export named
  @param {Object} targets An object containing key value pairs for targeting.
*/
export function doTargeting(targets) {
  googletag.cmd.push(function() {
    if (targets) {
      Object.keys(targets).forEach(key => {
        if (!isEmpty(targets[key])) {
          googletag.pubads().setTargeting(key, targets[key]);
        }
      });
    }
  });
}

/**
  Clear targeting for a set of keys.

  Accepts any number of strings as parameters.

  Usage:
  ```js
    clearTargeting('key1', 'key2');
  ```

  @function clearTargeting
  @export named
  @param {String} ...targets Any number key names to clear.
*/
export function clearTargeting(...targets) {
  targets.forEach(target => {
    googletag.cmd.push(function() {
      googletag.pubads().clearTargeting(target);
    });
  });
}

