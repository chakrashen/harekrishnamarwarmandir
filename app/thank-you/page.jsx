import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';
import ThankYouContent from './_components/ThankYouContent';

export const metadata = {
  title: 'Thank You — Hare Krishna Marwar Mandir',
  description: 'Your donation has been received. Hare Krishna!',
};

export default function ThankYouPage() {
  return (
    <>
      <Navbar />
      <main>
        <ThankYouContent />
      </main>
      <Footer />
    </>
  );
}
