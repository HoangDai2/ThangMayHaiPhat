import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FloatingButtons } from '../../components/FloatingButtons';
import PromotionPopup from '../../components/PromotionPopup';
import QuickQuoteModal from '../../components/QuickQuoteModal';
import { QuickQuoteProvider } from '../../context/QuickQuoteContext';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QuickQuoteProvider>
      <div className="min-h-screen pb-20 md:pb-0">
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <FloatingButtons />
        <PromotionPopup />
        <QuickQuoteModal />
      </div>
    </QuickQuoteProvider>
  );
}

