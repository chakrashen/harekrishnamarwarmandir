import Navbar from './_components/Navbar';
import Hero from './_components/Hero';
import AartiTicker from './_components/AartiTicker';
import Welcome from './_components/Welcome';
import ConstructionMeter from './_components/ConstructionMeter';
import SevaHighlights from './_components/SevaHighlights';
import TrustSection from './_components/TrustSection';
import GitaQuote from './_components/GitaQuote';
import DonationSpotlight from './_components/DonationSpotlight';
import ExploreTemple from './_components/ExploreTemple';
import Testimonials from './_components/Testimonials';
import Newsletter from './_components/Newsletter';
import Footer from './_components/Footer';
import FloatingButtons from './_components/FloatingButtons';
import BottomNav from './_components/BottomNav';
import SectionReveal from './_components/SectionReveal';

export default function Home() {
  const ngoSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    "name": "Hare Krishna Marwar Mandir",
    "alternateName": "HKM Jodhpur",
    "url": "https://harekrishnamarwar.org",
    "logo": "https://harekrishnamarwar.org/logo.png",
    "description": "A Krishna consciousness temple and gaushala in Jodhpur, Rajasthan serving the community through Gau Seva, Anna Daan, and Mandir Nirman.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jodhpur",
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Donations",
      "availableLanguage": ["Hindi", "English"]
    },
    "sameAs": [
      "https://www.facebook.com/Harekrishnamarwar",
      "https://www.instagram.com/harekrishnamarwar/",
      "https://www.youtube.com/@HareKrishnaMarwar"
    ],
    "nonprofitStatus": "Nonprofit501c3",
    "taxID": "AATCH7258QF20214"
  };

  const worshipSchema = {
    "@context": "https://schema.org",
    "@type": "PlaceOfWorship",
    "name": "Hare Krishna Marwar Mandir",
    "url": "https://harekrishnamarwar.org",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Jodhpur",
      "addressRegion": "Rajasthan",
      "addressCountry": "IN"
    },
    "openingHours": "Mo-Su 05:00-21:00",
    "telephone": "+919928766773"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ngoSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(worshipSchema) }} />
      <Navbar />
      <main className="home-main">
        <SectionReveal as="div" delay={0} immediate><Hero /></SectionReveal>
        <Welcome />
        <TrustSection />
        <DonationSpotlight />
        <SectionReveal as="div" delay={0}><SevaHighlights /></SectionReveal>
        <ConstructionMeter />
        <AartiTicker />
        <SectionReveal as="div" delay={0}><Testimonials /></SectionReveal>
        <ExploreTemple />
        <GitaQuote />
        <Newsletter />
      </main>
      <Footer />
      <FloatingButtons />
      <BottomNav />
    </>
  );
}
