'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './InitialLoaderGate.module.css';

const SESSION_KEY = 'hkmm-loader-seen-v2';
const MIN_LOADER_MS = 1200;
const MAX_LOADER_MS = 2500;
const FADE_MS = 600;

export default function InitialLoaderGate({ children }) {
  const [showLoader, setShowLoader] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const finishedRef = useRef(false);

  useEffect(() => {
    const forceLoader = new URLSearchParams(window.location.search).get('loader') === '1';

    // Some mobile browsers block/throw on sessionStorage (privacy modes, etc).
    // If that happens, we must still allow the loader to finish/hide.
    let alreadySeen = false;
    try {
      alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      alreadySeen = false;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection?.saveData === true;

    // Skip loader on slow connections (2g, slow-2g, 3g) — these users need content ASAP
    const effectiveType = navigator.connection?.effectiveType;
    const isSlowConnection = effectiveType === 'slow-2g' || effectiveType === '2g' || effectiveType === '3g';

    if ((alreadySeen && !forceLoader) || (saveData && !forceLoader) || (prefersReducedMotion && !forceLoader) || (isSlowConnection && !forceLoader)) {
      return;
    }

    setShowLoader(true);
    const startedAt = Date.now();
    let delayedFinishId;

    const finish = () => {
      if (finishedRef.current) {
        return;
      }
      finishedRef.current = true;
      setFadingOut(true);
      window.setTimeout(() => {
        setShowLoader(false);
        try {
          window.sessionStorage.setItem(SESSION_KEY, '1');
        } catch {
          // Ignore storage failures; loader visibility is the important part.
        }
      }, FADE_MS);
    };

    const finishWhenMinTimeReached = () => {
      const elapsed = Date.now() - startedAt;
      const waitMs = Math.max(0, MIN_LOADER_MS - elapsed);
      if (waitMs === 0) {
        finish();
        return;
      }
      delayedFinishId = window.setTimeout(finish, waitMs);
    };

    const timeoutId = window.setTimeout(finish, MAX_LOADER_MS);
    // Extra hard fail-safe so the overlay can never remain visible indefinitely.
    const hardTimeoutId = window.setTimeout(finish, MAX_LOADER_MS + FADE_MS + 250);
    const onLoaded = () => finishWhenMinTimeReached();

    if (document.readyState === 'complete') {
      finishWhenMinTimeReached();
    } else {
      window.addEventListener('load', onLoaded, { once: true });
    }

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(delayedFinishId);
      window.clearTimeout(hardTimeoutId);
      window.removeEventListener('load', onLoaded);
    };
  }, []);



  return (
    <>
      {showLoader && (
        <div
          className={`${styles.loaderOverlay} ${fadingOut ? styles.fadeOut : ''}`}
          role="status"
          aria-live="polite"
          aria-label="Loading website"
        >
          <img
            className={styles.loaderLogo}
            src="/gallery/logo.png"
            alt="Hare Krishna Marwar Mandir"
            aria-hidden="true"
          />
          {/* CSS-only spinner fallback */}
          <div className={styles.spinnerFallback} aria-hidden="true" />
        </div>
      )}

      <div id="main-content" className={showLoader ? styles.mainHidden : styles.mainVisible}>
        {children}
      </div>
    </>
  );
}
