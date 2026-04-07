import Navbar from './_components/Navbar';
import Hero from './_components/Hero';
import AartiTicker from './_components/AartiTicker';
import Welcome from './_components/Welcome';
import ConstructionMeter from './_components/ConstructionMeter';
import SevaCards from './_components/SevaCards';
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
      <main>
        <Hero />
        <AartiTicker />
        <Welcome />
        <ConstructionMeter />
        <SevaCards />
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
