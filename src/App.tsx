import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { ProjectDetail, ProjectsList } from './pages/ProjectDetail';
import { ServicesList } from './pages/ServicesPage';
import { ProductsList, ProductDetail } from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/AdminProjects';
import AdminProducts from './pages/admin/AdminProducts';
import AdminServices from './pages/admin/AdminServices';

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <Testimonials />
      <ContactSection />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes with Navbar and Footer */}
        <Route
          path="/*"
          element={
            <div className="min-h-screen">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/du-an" element={<ProjectsList />} />
                  <Route path="/du-an/:id" element={<ProjectDetail />} />
                  <Route path="/dich-vu" element={<ServicesList />} />
                  <Route path="/san-pham" element={<ProductsList />} />
                  <Route path="/san-pham/:id" element={<ProductDetail />} />
                  <Route path="/ve-chung-toi" element={<AboutPage />} />
                  <Route path="/lien-he" element={<ContactPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          }
        />

        {/* Admin routes - separate layout */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="services" element={<AdminServices />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
