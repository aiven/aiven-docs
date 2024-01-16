function OptanonWrapper() {
  if (
    window.OnetrustActiveGroups.includes('115') ||
    window.OnetrustActiveGroups.includes('2')
  ) {
    // Consent given for Snowplow cookies. UX cookies 115. Performance cookies 2.
    snowplow('disableAnonymousTracking', {
      stateStorageStrategy: 'cookieAndLocalStorage',
    });
  } else {
    // enable fully anonymous tracking
    snowplow('clearUserData', {preserveSession: true});
  }
}
