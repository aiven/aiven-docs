import type {ClientModule} from '@docusaurus/types';

declare global {
  interface Window {
    snowplow: (arg: string) => void;
    posthog?: {
      startSessionRecording: (opts?: {sampling: boolean}) => void;
      stopSessionRecording: () => void;
      opt_in_capturing: () => void;
      opt_out_capturing: () => void;
    };
    OnetrustActiveGroups?: string;
  }
}

function applyPosthogConsent() {
  if (!window.posthog) return;
  const groups = window.OnetrustActiveGroups || '';
  if (groups.includes('115')) {
    window.posthog.opt_in_capturing();
    window.posthog.startSessionRecording({sampling: false});
  } else {
    window.posthog.opt_out_capturing();
    window.posthog.stopSessionRecording();
  }
}

if (typeof window !== 'undefined') {
  applyPosthogConsent();
  window.addEventListener('OneTrustGroupsUpdated', applyPosthogConsent);
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
