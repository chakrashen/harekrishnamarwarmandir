import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';
import FloatingButtons from '../_components/FloatingButtons';
import DonateForm from './_components/DonateForm';

export const metadata = {
  title: 'Donate — Hare Krishna Marwar Mandir',
  description: 'Support temple construction, Gau Seva, and Anna Daan at Hare Krishna Marwar Mandir, Jodhpur.',
};

export default function DonatePage() {
  return (
    <>
      <Navbar />
      <main>
        <DonateForm />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
