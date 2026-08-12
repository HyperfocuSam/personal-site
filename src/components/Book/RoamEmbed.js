import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { track } from '../../utils/track';

export const ROAM_LOBBY_URL = 'https://ro.am/samwong/';
const ROAM_EMBED_SCRIPT = 'https://ro.am/lobbylinks/embed.js';
const ACCENT_COLOR = '#c8965a';
const LOAD_TIMEOUT_MS = 8000;

/**
 * The Ro.am scheduler, and the instrumentation that proves it rendered.
 *
 * Extracted from Book.js when /zh/book was added: this is ~80 lines of failure
 * detection that must behave identically in both languages, and a copy would
 * have drifted the first time one of them was touched.
 *
 * The lobby is a cross-origin iframe, so slot selection and booking completion
 * are invisible to us — any "bookings" number derived here would be fabricated.
 * What this measures is DELIVERY: did the scheduler actually render for this
 * human, and if not, why. That distinction is not academic. From 2026-05-15 the
 * site's own CSP omitted ro.am from script-src and frame-src, so this rendered
 * an empty box for three months while pageviews looked perfectly healthy.
 *
 * `placement` keeps /book and /zh/book separable in the funnel.
 */
const RoamEmbed = ({ placement }) => {
  const containerRef = useRef(null);
  const settledRef = useRef(false);

  useEffect(() => {
    // react-snap would otherwise bake this <script> into build/book/index.html
    // and every real visitor would pay for a duplicate request.
    if (navigator.userAgent === 'ReactSnap') return undefined;

    const el = containerRef.current;
    if (!el) return undefined;

    const t0 = (window.performance && window.performance.now()) || 0;
    const elapsed = () => Math.round(
      ((window.performance && window.performance.now()) || 0) - t0,
    );

    // Only the first outcome counts: onSizeChange fires repeatedly as the
    // widget resizes, and a CSP refusal trips both the violation event and
    // script.onerror.
    const settle = (event, props) => {
      if (settledRef.current) return;
      settledRef.current = true;
      track(event, { ...props, placement });
    };

    // Highest-signal detector on the page, and the one that would have caught
    // the 2026-05 outage on day one instead of month three.
    const onViolation = (e) => {
      if ((e.blockedURI || '').includes('ro.am')) {
        settle('booking_embed_failed', {
          reason: 'csp_blocked',
          blocked_uri: e.blockedURI,
          violated_directive: e.violatedDirective,
          elapsed_ms: elapsed(),
        });
      }
    };
    document.addEventListener('securitypolicyviolation', onViolation);

    const script = document.createElement('script');
    script.src = ROAM_EMBED_SCRIPT;
    script.async = true;
    script.onerror = () => settle('booking_embed_failed', {
      reason: 'script_error',
      elapsed_ms: elapsed(),
    });
    script.onload = () => {
      if (!window.Roam) {
        settle('booking_embed_failed', {
          reason: 'no_global',
          elapsed_ms: elapsed(),
        });
        return;
      }
      window.Roam.initLobbyEmbed({
        url: ROAM_LOBBY_URL,
        parentElement: el,
        accentColor: ACCENT_COLOR,
        theme: 'light',
        lobbyConfiguration: 'default',
        onSizeChange: (_width, height) => {
          el.style.height = `${height}px`;
          // Best available proof of life: onSizeChange only fires once the
          // cross-origin frame posts back, so the script loaded AND executed
          // AND the handshake succeeded.
          settle('booking_embed_loaded', { load_ms: elapsed() });
        },
      });
    };
    document.body.appendChild(script);

    const timer = setTimeout(() => {
      const frame = el.querySelector('iframe');
      if (!frame || !frame.offsetHeight) {
        settle('booking_embed_failed', {
          reason: 'timeout',
          elapsed_ms: LOAD_TIMEOUT_MS,
        });
      }
    }, LOAD_TIMEOUT_MS);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('securitypolicyviolation', onViolation);
      script.remove();
    };
  }, [placement]);

  return <div className="roam-embed-container" ref={containerRef} />;
};

RoamEmbed.propTypes = {
  placement: PropTypes.string,
};

RoamEmbed.defaultProps = {
  placement: 'book_page',
};

export default RoamEmbed;
