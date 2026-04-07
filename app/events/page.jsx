import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';
import FloatingButtons from '../_components/FloatingButtons';
import BottomNav from '../_components/BottomNav';
import EventsContent from './_components/EventsContent';

export const metadata = {
  title: 'Events & Programs — Hare Krishna Marwar Mandir',
  description: 'Discover upcoming festivals, spiritual programs, and seva opportunities at Hare Krishna Marwar Mandir, Jodhpur.',
};

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main><EventsContent /></main>
      <Footer />
      <FloatingButtons />
      <BottomNav />
    </>
  );
}
