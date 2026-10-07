import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { cortexBrand } from '../data/cortexData';
import { initMagnetic } from '../animations/magnetic';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const triggerRef = useRef(null);
  const drawerRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const linksContainerRef = useRef(null);

  useEffect(() => {
    // Apply magnetic hover to nav CTA
    if (ctaBtnRef.current) {
      const cleanup = initMagnetic(ctaBtnRef.current, 6);
      return cleanup;
    }
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Section spy
      const sections = ['work', 'services', 'process', 'about', 'team', 'contact'];
      let found = false;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            found = true;
            break;
          }
        }
      }
      if (!found && currentScrollY < 200) {
        setActiveSection('home');
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate traveling active indicator between links
  useEffect(() => {
    if (!linksContainerRef.current) return;
    const activeLinkEl = linksContainerRef.current.querySelector(`[data-nav-id="${activeSection}"]`);
    if (activeLinkEl) {
      const containerRect = linksContainerRef.current.getBoundingClientRect();
      const linkRect = activeLinkEl.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  // Trap focus and body scroll lock for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const focusable = drawerRef.current?.querySelectorAll('button, a, [tabindex="0"]');
      if (focusable && focusable.length > 0) {
        focusable[0].focus();
      }
    } else {
      document.body.style.overflow = '';
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Work', href: '#work', id: 'work' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Process', href: '#process', id: 'process' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Team', href: '#team', id: 'team' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}
        style={{
          height: isScrolled ? '64px' : '72px',
          transition: 'all 300ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
      >
        <div className="container">
          <nav
            className="navbar"
            style={{ height: isScrolled ? '64px' : '72px' }}
            aria-label="Main Navigation"
          >
            <a
              href="#home"
              className="nav-brand"
              onClick={(e) => handleLinkClick(e, '#home')}
              aria-label="Cortex Freelancing - Home"
            >
              <span className="brand-title">
                CORTEX
                <span className="brand-dot" aria-hidden="true" />
              </span>
              <span className="brand-sub">Digital Solutions</span>
            </a>

            {/* Desktop Links with Sliding Active Indicator */}
            <div style={{ position: 'relative' }}>
              <ul ref={linksContainerRef} className="nav-desktop-links" role="list">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      data-nav-id={link.id}
                      className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      aria-current={activeSection === link.id ? 'location' : undefined}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Animated Traveling Indicator Bar */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '2px',
                  height: '2px',
                  backgroundColor: 'var(--color-brand-primary)',
                  transition: 'left 300ms cubic-bezier(0.2, 0.8, 0.2, 1), width 300ms cubic-bezier(0.2, 0.8, 0.2, 1), opacity 200ms ease',
                  pointerEvents: 'none',
                  ...indicatorStyle,
                }}
                aria-hidden="true"
              />
            </div>

            {/* Nav Actions with Magnetic CTA */}
            <div className="nav-actions">
              <a
                ref={ctaBtnRef}
                href="#contact"
                className="btn btn-primary btn-desktop-cta"
                onClick={(e) => handleLinkClick(e, '#contact')}
                data-cursor="explore"
              >
                Start a Project
                <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
              </a>

              {/* Mobile Menu Trigger */}
              <button
                ref={triggerRef}
                type="button"
                className="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-drawer"
                aria-label="Open navigation menu"
              >
                <Menu size={24} aria-hidden="true" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-drawer-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        id="mobile-nav-drawer"
        ref={drawerRef}
        className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <div className="mobile-drawer-header">
          <span className="brand-title">
            CORTEX
            <span className="brand-dot" aria-hidden="true" />
          </span>
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <ul className="mobile-nav-links" role="list">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.href}
                className="mobile-nav-link"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-drawer-footer">
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={(e) => handleLinkClick(e, '#contact')}
          >
            Start a Project
            <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
          </a>
          <span className="form-hint" style={{ textAlign: 'center' }}>
            {cortexBrand.primaryEmail}
          </span>
        </div>
      </div>
    </>
  );
}
