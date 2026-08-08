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
      <Hero />
      <AboutSection />
      <Services />
      <Projects />
      <Testimonials />
      <ContactSection />
    </>
  );
}
