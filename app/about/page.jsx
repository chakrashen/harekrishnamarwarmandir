import Navbar from '../_components/Navbar';
import Footer from '../_components/Footer';
import FloatingButtons from '../_components/FloatingButtons';
import BottomNav from '../_components/BottomNav';
import AboutContent from './_components/AboutContent';

export const metadata = {
  title: "About Us | Hare Krishna Marwar Mandir Jodhpur",
  description: "Learn about Hare Krishna Marwar Mandir in Jodhpur — our mission for Gau Seva, Anna Daan, and spreading Krishna consciousness in the Marwar region of Rajasthan.",
  alternates: { canonical: "https://harekrishnamarwar.org/about" }
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
