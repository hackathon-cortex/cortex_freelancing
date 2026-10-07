import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import CapabilityStrip from './components/CapabilityStrip';
import WorkSection from './components/WorkSection';
import ServicesSection from './components/ServicesSection';
import BusinessWebsiteSection from './components/BusinessWebsiteSection';
import CapabilitiesSection from './components/CapabilitiesSection';
import ProcessSection from './components/ProcessSection';
import TimelineSection from './components/TimelineSection';
import WhyCortexSection from './components/WhyCortexSection';
import IndustriesSection from './components/IndustriesSection';
import ClientSolutionsSection from './components/ClientSolutionsSection';
import AboutSection from './components/AboutSection';
import TeamSection from './components/TeamSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { initSmoothScroll } from './animations/config';

export default function App() {
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scrolling connected to GSAP ScrollTrigger
    const lenis = initSmoothScroll();

    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <div className={`cortex-app-root ${pageReady ? 'page-ready' : ''}`}>
      {/* Fast Intro Preloader */}
      <Preloader onComplete={() => setPageReady(true)} />

      {/* Desktop Contextual Custom Cursor */}
      <CustomCursor />

      {/* Accessible Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Global Navigation */}
      <Navigation />

      {/* Main Narrative Landmark */}
      <main id="main-content">
        <HeroSection />
        <CapabilityStrip />
        <WorkSection />
        <ServicesSection />
        <BusinessWebsiteSection />
        <CapabilitiesSection />
        <ProcessSection />
        <TimelineSection />
        <WhyCortexSection />
        <IndustriesSection />
        <ClientSolutionsSection />
        <AboutSection />
        <TeamSection />
        <FAQSection />
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
