'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './InitialLoaderGate.module.css';

const SESSION_KEY = 'hkmm-loader-seen-v2';
const MIN_LOADER_MS = 1500;
const MAX_LOADER_MS = 3500;
const FADE_MS = 600;

export default function InitialLoaderGate({ children }) {
  const [showLoader, setShowLoader] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const videoRef = useRef(null);
  const finishedRef = useRef(false);

  useEffect(() => {
    const isDev = process.env.NODE_ENV !== 'production';
    const forceLoader = new URLSearchParams(window.location.search).get('loader') === '1';
    const alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === '1';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData = navigator.connection?.saveData === true;

    if ((alreadySeen && !forceLoader && !isDev) || (saveData && !forceLoader) || (prefersReducedMotion && !forceLoader)) {
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
        window.sessionStorage.setItem(SESSION_KEY, '1');
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
    const onLoaded = () => finishWhenMinTimeReached();

    if (document.readyState === 'complete') {
      finishWhenMinTimeReached();
    } else {
      window.addEventListener('load', onLoaded, { once: true });
    }

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(delayedFinishId);
      window.removeEventListener('load', onLoaded);
    };
  }, []);

  useEffect(() => {
    if (!showLoader || !videoRef.current) {
      return;
    }

    const videoEl = videoRef.current;
    const setPlaybackSpeed = () => {
      videoEl.playbackRate = 2;
    };

    setPlaybackSpeed();
    // Some browsers need an explicit play call even with autoplay+muted.
    videoEl.play().catch(() => {});
    videoEl.addEventListener('loadedmetadata', setPlaybackSpeed);
    return () => {
      videoEl.removeEventListener('loadedmetadata', setPlaybackSpeed);
    };
  }, [showLoader]);

  return (
    <>
      {showLoader && (
        <div
          className={`${styles.loaderOverlay} ${fadingOut ? styles.fadeOut : ''}`}
          role="status"
          aria-live="polite"
          aria-label="Loading website"
        >
          <video
            ref={videoRef}
            className={styles.loaderVideo}
            src="/gallery/loading-video.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
          />
        </div>
      )}

      <div id="main-content" className={showLoader ? styles.mainHidden : styles.mainVisible}>
        {children}
      </div>
    </>
  );
}
