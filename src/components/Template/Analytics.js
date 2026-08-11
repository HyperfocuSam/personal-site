import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { installOutboundTracking } from '../../utils/track';

/**
 * Mounted once per page by layouts/Main.js, outside the hideNav branch, so it
 * covers /get-started too. Two jobs:
 *
 * 1. GA4 pageviews on route change. PostHog does NOT need this — it inits with
 *    defaults '2026-01-30', which implies capture_pageview: 'history_change',
 *    so it already captures SPA navigation. Adding one here would double-count.
 * 2. Install the delegated click listener that tracks every outbound link and
 *    funnel CTA on the site, so the ~25 page components stay free of
 *    analytics code and free of hydration risk.
 */
const Analytics = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  useEffect(() => installOutboundTracking(), []);

  return null;
};

export default Analytics;
