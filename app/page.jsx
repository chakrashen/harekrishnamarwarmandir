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
  return (
    <>
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
