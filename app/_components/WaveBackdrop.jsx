'use client';
import styles from './WaveBackdrop.module.css';

const wavePalettes = {
  home: {
    olive: '#eef2e6',
    beige: '#f7f6eb',
    saffron: '#fff6ee',
  },
  about: {
    olive: '#edf1e7',
    beige: '#f7f3e6',
    saffron: '#fff3ea',
  },
  events: {
    olive: '#eef2e8',
    beige: '#f6f6ea',
    saffron: '#fff6ef',
  },
};

export default function WaveBackdrop({ className = '', variant = 'home' }) {
  const palette = wavePalettes[variant] || wavePalettes.home;
  const styleVars = {
    '--wave-olive': palette.olive,
    '--wave-beige': palette.beige,
    '--wave-saffron': palette.saffron,
  };

  return (
    <div
      className={`${styles.waveBackdrop} ${className}`}
      style={styleVars}
      aria-hidden="true"
    >
      <span className={styles.topGlow} />
      <span className={styles.noise} />
      <svg
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <linearGradient id="waveOlive" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="var(--wave-olive)" />
          </linearGradient>
          <linearGradient id="waveBeige" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--wave-beige)" />
            <stop offset="100%" stopColor="var(--wave-saffron)" />
          </linearGradient>
          <linearGradient id="waveSaffron" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--wave-saffron)" />
            <stop offset="100%" stopColor="var(--wave-olive)" />
          </linearGradient>
          <filter id="waveBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
          </filter>
        </defs>
        <path
          d="M0,180 C240,120 480,120 720,180 C960,240 1200,240 1440,180 L1440,600 L0,600 Z"
          fill="url(#waveOlive)"
          opacity="0.06"
          filter="url(#waveBlur)"
          transform="translate(0,-24)"
        />
        <path
          d="M0,300 C240,360 480,360 720,300 C960,240 1200,240 1440,300 L1440,600 L0,600 Z"
          fill="url(#waveBeige)"
          opacity="0.055"
          transform="translate(0,12)"
        />
        <path
          d="M0,430 C240,470 480,470 720,430 C960,390 1200,390 1440,430 L1440,600 L0,600 Z"
          fill="url(#waveSaffron)"
          opacity="0.05"
          transform="translate(0,28)"
        />
      </svg>
    </div>
  );
}
