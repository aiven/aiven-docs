import type {ClientModule} from '@docusaurus/types';

declare global {
  interface Window {
    snowplow: (arg: string) => void;
  }
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
