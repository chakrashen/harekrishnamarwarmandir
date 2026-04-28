import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';
import FloatingButtons from '../_components/FloatingButtons';
import BottomNav from '../_components/BottomNav';
import DonateForm from './_components/DonateForm';
import { Suspense } from 'react';

export const metadata = {
  title: "Donate for Gau Seva & Anna Daan | Hare Krishna Marwar Jodhpur | 80G Tax Benefit",
  description: "Donate online to support cow protection (Gau Seva) and free food distribution (Anna Daan) at Hare Krishna Marwar Mandir, Jodhpur. All donations are 80G tax exempt.",
  alternates: { canonical: "https://harekrishnamarwar.org/donate" }
};

export default function DonatePage() {
  const donateSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Donate - Hare Krishna Marwar Mandir",
    "url": "https://harekrishnamarwar.org/donate",
    "description": "Support Gau Seva and Anna Daan with your donation.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Hare Krishna Marwar Mandir",
      "url": "https://harekrishnamarwar.org",
      "nonprofitStatus": "Nonprofit501c3"
    },
    "potentialAction": {
      "@type": "DonateAction",
      "target": "https://harekrishnamarwar.org/donate",
      "name": "Donate for Gau Seva"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donateSchema) }} />
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <DonateForm />
        </Suspense>
      </main>
      <Footer />
      <FloatingButtons />
      <BottomNav />
    </>
  );
}
