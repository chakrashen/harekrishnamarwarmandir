import './globals.css';
import InitialLoaderGate from './_components/InitialLoaderGate';
import { Cinzel_Decorative, EB_Garamond, Inter, Cormorant_Garamond, Noto_Serif_Devanagari } from 'next/font/google';

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
  variable: '--font-cinzel',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-eb-garamond',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cormorant',
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-devanagari',
});

const isDevelopment = process.env.NODE_ENV !== 'production';
const contentSecurityPolicy = isDevelopment
  ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; object-src 'none'; base-uri 'self'; form-action 'self' https://eazypay.icicibank.com; upgrade-insecure-requests"
  : "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self' https:; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com; object-src 'none'; base-uri 'self'; form-action 'self' https://eazypay.icicibank.com; upgrade-insecure-requests";

export const metadata = {
  title: 'Hare Krishna Marwar Mandir | Temple & Seva — Jodhpur, Rajasthan',
  description: 'Hare Krishna Marwar Mandir, Jodhpur — A magnificent spiritual landmark. Donate for Gau Seva, Anna Daan, and Temple Construction. Join festivals, darshan, and spiritual events in the heart of Marwar.',
  keywords: 'Hare Krishna Marwar, ISKCON Jodhpur, Temple Donation, Gau Seva, Anna Daan, Rajasthan Temple, Gupt Govardhan Dham',
  openGraph: {
    title: 'Hare Krishna Marwar Mandir | Jodhpur, Rajasthan',
    description: 'A magnificent spiritual landmark dedicated to Lord Krishna. Donate for Gau Seva, Anna Daan, Temple Construction.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzelDecorative.variable} ${ebGaramond.variable} ${inter.variable} ${cormorantGaramond.variable} ${notoSerifDevanagari.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="Content-Security-Policy" content={contentSecurityPolicy} />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <InitialLoaderGate>{children}</InitialLoaderGate>
      </body>
    </html>
  );
}
