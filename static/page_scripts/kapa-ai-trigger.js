(function () {
  // Preinitialize Kapa AI
  // https://docs.kapa.ai/integrations/website-widget/javascript-api/preinitialize
  let k = window.Kapa;
  if (!k) {
    let i = function () {
      i.c(arguments);
    };
    i.q = [];
    i.c = function (args) {
      i.q.push(args);
    };
    window.Kapa = i;
  }

  // Open Kapa AI if the URL parameter 'openKapa' is set to 'true'
  const params = new URLSearchParams(window.location.search);
  if (params.get('openKapa') === 'true') {
    const query = params.get('kapaQuery');
    if (window.Kapa) {
      const trimmedQuery = typeof query === 'string' ? query.trim() : '';
      window.Kapa(
        'open',
        trimmedQuery
          ? {mode: 'ai', query: trimmedQuery, submit: true}
          : undefined,
      );
    }

    params.delete('openKapa');
    params.delete('kapaQuery');
    const queryString = params.toString();
    const nextUrl =
      queryString.length > 0
        ? `${window.location.pathname}?${queryString}${window.location.hash}`
        : `${window.location.pathname}${window.location.hash}`;
    window.history.replaceState({}, '', nextUrl);
  }
})();
