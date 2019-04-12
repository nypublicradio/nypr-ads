import { isEmpty } from '@ember/utils';
import { get } from '@ember/object';
import googletag from 'googletag';


export function doTargetingForPath(location=window.location) {
  doTargeting({
    'host': location.host,
    'url': location.pathname,
    'urlSegments': location.pathname && location.pathname.split('/').filter(segment => segment.length > 0)
  });
}

export function clearTargetingForPath() {
  clearTargeting('host');
  clearTargeting('url');
  clearTargeting('urlSegments');
}

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

export function clearTargeting(...targets) {
  targets.forEach(target => {
    googletag.cmd.push(function() {
      googletag.pubads().clearTargeting(target);
    });
  });
}
