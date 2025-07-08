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
    if (window.Kapa) {
      window.Kapa('open');
    }
  }
})();
