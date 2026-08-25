import Hero from '../components/Hero';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';
import { supabase } from '../lib/supabase';
import { FALLBACK_BANNERS, Banner } from '../data/banners';

async function getBanners(): Promise<Banner[]> {
  const { data, error } = await supabase
    .from('banners')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (!error && data && data.length > 0) {
    if (data.length < 2) {
      const combined = [...data];
      FALLBACK_BANNERS.forEach((fb) => {
        if (combined.length < 2 && !combined.some(b => b.title === fb.title)) {
          combined.push({ ...fb, sort_order: combined.length + 1 } as Banner);
        }
      });
      return combined;
    } else {
      return data;
    }
  }
  return FALLBACK_BANNERS;
}

export default async function HomePage() {
  const initialBanners = await getBanners();

  return (
    <>
      <Hero initialBanners={initialBanners} />
      <Services />
      <Projects />
      <Testimonials />
      <ContactSection />
    </>
  );
}
