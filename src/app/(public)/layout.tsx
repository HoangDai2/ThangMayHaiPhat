import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FloatingButtons } from '../../components/FloatingButtons';
import PromoPopup from '../../components/PromoPopup';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      <FloatingButtons />
      <PromoPopup />
    </div>
  );
}
