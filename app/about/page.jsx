import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';
import FloatingButtons from '../_components/FloatingButtons';
import BottomNav from '../_components/BottomNav';
import AboutContent from './_components/AboutContent';

export const metadata = {
  title: 'About — Hare Krishna Marwar Mandir | Our Mission & History',
  description: 'Learn about Hare Krishna Marwar Mandir, Jodhpur — our mission, history, values, and the vision of Srila Prabhupada that guides our service.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main><AboutContent /></main>
      <Footer />
      <FloatingButtons />
      <BottomNav />
    </>
  );
}
