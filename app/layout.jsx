import './globals.css';
import InitialLoaderGate from './_components/InitialLoaderGate';
import ScrollProgress from './_components/ScrollProgress';
import SmoothScroll from './_components/SmoothScroll';
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

export const metadata = {
  metadataBase: new URL('https://harekrishnamarwar.org'),
  title: 'Hare Krishna Marwar Mandir | Jodhpur | Gau Seva & Donations',
  description: 'Support Gau Seva, Anna Daan, and Mandir Nirman at Hare Krishna Marwar Mandir, Jodhpur. Donate online with 80G tax benefit.',
  keywords: [
    'hare krishna marwar', 'donate for cow protection jodhpur', 
    'gaushala jodhpur', 'anna daan jodhpur', 'hare krishna temple rajasthan', 
    '80g donation india', 'gau seva donation'
  ],
  openGraph: {
    title: 'Hare Krishna Marwar Mandir | Jodhpur | Gau Seva & Donations',
    siteName: 'Hare Krishna Marwar Mandir',
    description: 'Support Gau Seva, Anna Daan, and Mandir Nirman at Hare Krishna Marwar Mandir, Jodhpur. Donate online with 80G tax benefit.',
    type: 'website',
    locale: 'en_IN',
    url: 'https://harekrishnamarwar.org',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Hare Krishna Marwar Mandir Jodhpur - Gau Seva and Donations' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: 'https://harekrishnamarwar.org',
  },
  verification: {
    google: 'uDy95pAF3Kan_TgqMoC3yLyHhJTkZAyKQBuUTQYPP6w',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzelDecorative.variable} ${ebGaramond.variable} ${inter.variable} ${cormorantGaramond.variable} ${notoSerifDevanagari.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/gallery/logo.png" type="image/png" />
      </head>
      <body>
        <ScrollProgress />
        <SmoothScroll />
        <InitialLoaderGate>{children}</InitialLoaderGate>
      </body>
    </html>
  );
}
