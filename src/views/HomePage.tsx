"use client";
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import Services from '../components/Services';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <>
      <section className="bg-[#f7f9fc] px-3 pb-24 pt-3 sm:px-6 lg:px-8 lg:pb-28 lg:pt-5">
        <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[24px] bg-white shadow-[0_18px_45px_rgba(13,31,53,0.18)]">
          <Hero />
          <AboutSection />
        </div>
      </section>
      <Services />
      <Projects />
      <Testimonials />
      <ContactSection />
    </>
  );
}
