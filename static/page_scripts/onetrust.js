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

// GA sets _ga* cookies on the root domain, so delete them there and on the host.
function clearGaCookies() {
  const rootDomain = window.location.hostname.split('.').slice(-2).join('.');
  document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => name.startsWith('_ga'))
    .forEach((name) => {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${rootDomain}`;
    });
}

function OptanonWrapper() {
  if (window.OnetrustActiveGroups.includes(',4,')) {
    window[`ga-disable-${GA_TRACKING_ID}`] = false;
    loadGtag();
  } else if (window.gtag) {
    // Consent revoked: stop GA and remove its cookies
    window[`ga-disable-${GA_TRACKING_ID}`] = true;
    clearGaCookies();
  }
  if (
    window.OnetrustActiveGroups.includes(',115,') ||
    window.OnetrustActiveGroups.includes(',2,')
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

if (window.OnetrustActiveGroups) OptanonWrapper();
