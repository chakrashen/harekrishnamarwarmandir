import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';
import FloatingButtons from '../_components/FloatingButtons';
import BottomNav from '../_components/BottomNav';
import VisitContent from './_components/VisitContent';

export const metadata = {
  title: 'Visit — Hare Krishna Marwar Mandir | Plan Your Darshan',
  description: 'Plan your visit to Hare Krishna Marwar Mandir, Jodhpur. Temple hours, darshan timings, guidelines, and nearby attractions.',
};

export default function VisitPage() {
  return (
    <>
      <Navbar />
      <main><VisitContent /></main>
      <Footer />
      <FloatingButtons />
      <BottomNav />
    </>
  );
}
