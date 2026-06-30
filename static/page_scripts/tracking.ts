import type {ClientModule} from '@docusaurus/types';

declare global {
  interface Window {
    snowplow: (arg: string) => void;
    posthog?: {
      startSessionRecording: (opts?: {sampling: boolean}) => void;
      stopSessionRecording: () => void;
      opt_in_capturing: () => void;
      opt_out_capturing: () => void;
      capture: (event: string, properties?: Record<string, unknown>) => void;
    };
    OnetrustActiveGroups?: string;
  }
}

function applyPosthogConsent(retries = 50) {
  const ph = window.posthog;
  if (!ph || typeof ph.startSessionRecording !== 'function') {
    if (retries > 0) setTimeout(() => applyPosthogConsent(retries - 1), 100);
    return;
  }
  const groups = window.OnetrustActiveGroups || '';
  if (groups.includes('115')) {
    ph.opt_in_capturing();
    ph.startSessionRecording({sampling: false});
  } else {
    ph.opt_out_capturing();
    ph.stopSessionRecording();
  }
}

if (typeof window !== 'undefined') {
  applyPosthogConsent();
  window.addEventListener('OneTrustGroupsUpdated', applyPosthogConsent);

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const button = target?.closest('button[aria-label^="Copy code"]');
    if (button) {
      window.posthog?.capture('code_copy_clicked', {path: window.location.pathname});
    }
  });
}

const module: ClientModule = {
  onRouteUpdate() {
    if (window.snowplow) {
      window.snowplow('trackPageView');
    }
  },
  onRouteDidUpdate() {
    if (window.snowplow) {
      window.snowplow('refreshLinkClickTracking');
    }
  },
};

export default module;
