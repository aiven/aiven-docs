import type {ClientModule} from '@docusaurus/types';

declare global {
  interface Window {
    snowplow: (arg: string) => void;
    posthog?: {
      startSessionRecording: (opts?: {sampling: boolean}) => void;
      stopSessionRecording: () => void;
      opt_in_capturing: () => void;
      opt_out_capturing: () => void;
      capture: (eventName: string, properties?: Record<string, unknown>) => void;
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
}

function hasPosthogConsent(): boolean {
  const groups = window.OnetrustActiveGroups || '';
  return groups.includes('115');
}

function extractCodeLanguage(button: Element): string {
  const codeBlock = button.closest('pre');
  if (!codeBlock) return 'unknown';
  
  const classNames = codeBlock.className || '';
  const match = classNames.match(/language-(\w+)/);
  return match ? match[1] : 'unknown';
}

function attachCopyButtonListeners() {
  if (typeof document === 'undefined') return;
  
  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    
    if (!target.classList.contains('docusaurus-code-copy-button')) return;
    
    if (!hasPosthogConsent() || !window.posthog) return;
    
    const language = extractCodeLanguage(target);
    
    window.posthog.capture('code_block_copied', {
      page_path: window.location.pathname,
      code_language: language,
      doc_title: document.title,
    });
  }, { capture: true });
}

let copyListenerAttached = false;

const module: ClientModule = {
  onRouteUpdate() {
    if (window.snowplow) {
      window.snowplow('trackPageView');
    }
    
    if (!copyListenerAttached) {
      attachCopyButtonListeners();
      copyListenerAttached = true;
    }
  },
  onRouteDidUpdate() {
    if (window.snowplow) {
      window.snowplow('refreshLinkClickTracking');
    }
  },
};

export default module;
