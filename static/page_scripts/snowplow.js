(function (p, l, o, w, i, n, g) {
  if (!p[i]) {
    p.GlobalSnowplowNamespace = p.GlobalSnowplowNamespace || [];
    p.GlobalSnowplowNamespace.push(i);
    p[i] = function () {
      (p[i].q = p[i].q || []).push(arguments);
    };
    p[i].q = p[i].q || [];
    n = l.createElement(o);
    g = l.getElementsByTagName(o)[0];
    n.async = 1;
    n.src = w;
    g.parentNode.insertBefore(n, g);
  }
})(
  window,
  document,
  'script',
  'https://storage.googleapis.com/aiven-dw-prod-snowplow-tracker/3.4.0/gh7rnaha.js',
  'snowplow',
);

snowplow('newTracker', 'at', 'dc.aiven.io', {
  appId: 'docs',
  platform: 'web',
  forceSecureTracker: true,
  discoverRootDomain: true,
  cookieSameSite: 'Lax',
  anonymousTracking: {withSessionTracking: true, withServerAnonymisation: true},
  stateStorageStrategy: 'cookieAndLocalStorage',
  eventMethod: 'post',
  postPath: '/aiven/dc2',
  contexts: {
    webPage: true,
  },
});

// Must be called before snowplow('trackPageView')
snowplow('enableActivityTracking', {
  minimumVisitLength: 10,
  heartbeatDelay: 10,
});

snowplow(
  'addPlugin',
  'https://cdn.jsdelivr.net/npm/@snowplow/browser-plugin-link-click-tracking@latest/dist/index.umd.min.js',
  ['snowplowLinkClickTracking', 'LinkClickTrackingPlugin'],
);

snowplow('enableLinkClickTracking', {pseudoClicks: true, trackContent: true});
