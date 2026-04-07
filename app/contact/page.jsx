import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';
import FloatingButtons from '../_components/FloatingButtons';
import BottomNav from '../_components/BottomNav';
import ContactContent from './_components/ContactContent';

export const metadata = {
  title: 'Contact — Hare Krishna Marwar Mandir',
  description: 'Get in touch with Hare Krishna Marwar Mandir, Jodhpur. Call, email, WhatsApp, or visit us.',
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main><ContactContent /></main>
      <Footer />
      <FloatingButtons />
      <BottomNav />
    </>
  );
}
