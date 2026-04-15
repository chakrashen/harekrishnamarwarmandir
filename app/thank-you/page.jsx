import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';
import FloatingButtons from '../_components/FloatingButtons';
import BottomNav from '../_components/BottomNav';
import ThankYouContent from './_components/ThankYouContent';
import { Suspense } from 'react';

export const metadata = {
  title: 'Thank You — Hare Krishna Marwar Mandir',
  description: 'Your donation has been received. Hare Krishna!',
};

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={null}>
          <ThankYouContent />
        </Suspense>
      </main>
      <Footer />
      <FloatingButtons />
      <BottomNav />
    </>
  );
}
