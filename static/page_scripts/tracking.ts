import type {ClientModule} from '@docusaurus/types';

declare global {
  interface Window {
    snowplow: (arg: string) => void;
    posthog?: {
      startSessionRecording: (opts?: {sampling: boolean}) => void;
      stopSessionRecording: () => void;
      opt_in_capturing: () => void;
      opt_out_capturing: () => void;
      has_opted_in_capturing: () => boolean;
      capture: (event: string, properties?: Record<string, unknown>) => void;
    };
    OnetrustActiveGroups?: string;
    gtag?: (...args: unknown[]) => void;
  }
}

function applyPosthogConsent(retries = 50) {
  const ph = window.posthog;
  if (!ph || typeof ph.startSessionRecording !== 'function') {
    if (retries > 0) setTimeout(() => applyPosthogConsent(retries - 1), 100);
    return;
  }
  const groups = window.OnetrustActiveGroups || '';
  if (groups.includes(',115,')) {
    ph.opt_in_capturing();
    ph.startSessionRecording({sampling: false});
  } else {
    ph.stopSessionRecording();
    if (ph.has_opted_in_capturing()) {
      ph.opt_out_capturing();
    }
  }
}

if (typeof window !== 'undefined') {
  applyPosthogConsent();
  window.addEventListener('OneTrustGroupsUpdated', () => applyPosthogConsent());

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const button = target?.closest('button[aria-label^="Copy code"]');
    if (button) {
      window.posthog?.capture('code_copy_clicked', {
        path: window.location.pathname,
      });
    }
    const highlightButton =
      target?.id === 'kapa-highlight-ask-btn'
        ? target
        : target?.closest('#kapa-highlight-ask-btn');
    if (highlightButton) {
      window.posthog?.capture('highlight_ask_kapa_clicked', {
        path: window.location.pathname,
      });
    }
  });
}

const module: ClientModule = {
  onRouteUpdate() {
    if (window.snowplow) {
      window.snowplow('trackPageView');
    }
  },
  onRouteDidUpdate({location, previousLocation}) {
    if (window.snowplow) {
      window.snowplow('refreshLinkClickTracking');
    }
    // GA only sends the first page view itself; send one per client-side
    // navigation, as @docusaurus/plugin-google-gtag did.
    if (
      window.gtag &&
      previousLocation &&
      (location.pathname !== previousLocation.pathname ||
        location.search !== previousLocation.search ||
        location.hash !== previousLocation.hash)
    ) {
      // Defer so document.title has been updated for the new page
      setTimeout(() => {
        window.gtag?.(
          'set',
          'page_path',
          location.pathname + location.search + location.hash,
        );
        window.gtag?.('event', 'page_view');
      });
    }
  },
};

export default module;
