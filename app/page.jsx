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
        <SectionReveal as="div" delay={0}><Hero /></SectionReveal>
        <SectionReveal as="div" delay={40}><Welcome /></SectionReveal>
        <SectionReveal as="div" delay={80}><TrustSection /></SectionReveal>
        <SectionReveal as="div" delay={120}><DonationSpotlight /></SectionReveal>
        <SectionReveal as="div" delay={160}><SevaHighlights /></SectionReveal>
        <SectionReveal as="div" delay={200}><ConstructionMeter /></SectionReveal>
        <SectionReveal as="div" delay={240}><AartiTicker /></SectionReveal>
        <SectionReveal as="div" delay={280}><Testimonials /></SectionReveal>
        <SectionReveal as="div" delay={320}><ExploreTemple /></SectionReveal>
        <SectionReveal as="div" delay={360}><GitaQuote /></SectionReveal>
        <SectionReveal as="div" delay={400}><Newsletter /></SectionReveal>
      </main>
      <Footer />
      <FloatingButtons />
      <BottomNav />
    </>
  );
}
