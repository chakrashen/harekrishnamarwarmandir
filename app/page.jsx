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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="home-main">
        <Hero />
        <AartiTicker />
        <Welcome />
        <SevaHighlights />
        <TrustSection />
        <DonationSpotlight />
        <GitaQuote />
        <ConstructionMeter />
        <ExploreTemple />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <FloatingButtons />
      <BottomNav />
    </>
  );
}
