import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { FloatingButtons } from '../../components/FloatingButtons';

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
    </div>
  );
}
