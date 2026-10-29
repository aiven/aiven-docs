const GA_TRACKING_ID = 'G-M6D699CJR0';

// Loads Google Analytics once, only after consent to Targeting cookies.
function loadGtag() {
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID);
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);
}

function OptanonWrapper() {
  if (window.OnetrustActiveGroups.includes(',4,')) {
    loadGtag();
  }
  if (
    window.OnetrustActiveGroups.includes('115') ||
    window.OnetrustActiveGroups.includes('2')
  ) {
    // Consent given for Snowplow cookies. UX cookies 115. Performance cookies 2.
    window.snowplow('disableAnonymousTracking', {
      stateStorageStrategy: 'cookieAndLocalStorage',
    });
  } else {
    // enable fully anonymous tracking
    window.snowplow('clearUserData', {preserveSession: true});
  }
  window.dispatchEvent(new Event('OneTrustGroupsUpdated'));
}
