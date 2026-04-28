import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';
import FloatingButtons from '../_components/FloatingButtons';
import BottomNav from '../_components/BottomNav';
import EventsContent from './_components/EventsContent';

export const metadata = {
  title: "Events & Festivals | Hare Krishna Marwar Mandir Jodhpur",
  description: "Join us for daily darshan, kirtans, Janmashtami, Ekadashi, and other spiritual events at Hare Krishna Marwar Mandir, Jodhpur.",
  alternates: { canonical: "https://harekrishnamarwar.org/events" }
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
