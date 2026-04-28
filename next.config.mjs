import { buildCsp } from './lib/csp.js';

const isDev = process.env.NODE_ENV !== 'production';
const contentSecurityPolicy = buildCsp({ isDev });

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/donations.html', destination: '/donate', permanent: true },
      { source: '/events.html', destination: '/events', permanent: true },
      { source: '/gallery.html', destination: '/gallery', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/visit.html', destination: '/visit', permanent: true },
      { source: '/index.html', destination: '/', permanent: true }
    ];
  },
};

export default nextConfig;
