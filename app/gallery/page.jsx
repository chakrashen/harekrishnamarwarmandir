import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';
import FloatingButtons from '../_components/FloatingButtons';
import BottomNav from '../_components/BottomNav';
import GalleryContent from './_components/GalleryContent';

export const metadata = {
  title: 'Gallery — Hare Krishna Marwar Mandir',
  description: 'View photos and moments from festivals, events, and daily life at Hare Krishna Marwar Mandir, Jodhpur.',
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main><GalleryContent /></main>
      <Footer />
      <FloatingButtons />
      <BottomNav />
    </>
  );
}
