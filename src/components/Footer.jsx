import React from 'react';
import { ArrowUp, Github, Mail, Phone, MapPin } from 'lucide-react';
import { cortexBrand } from '../data/cortexData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'Web Development',
    'AI & Machine Learning',
    'Software Development',
    'Automation',
    'Cybersecurity',
    'UI/UX Design',
    'Data & Analytics'
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-wrapper" data-surface="inverse" aria-label="Site Footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand & Parent Statement */}
          <div>
            <span className="brand-title" style={{ color: '#ffffff', marginBottom: '8px' }}>
              CORTEX
              <span className="brand-dot" aria-hidden="true" />
            </span>
            <p style={{ fontSize: '13px', color: 'var(--color-surface-accent)', fontWeight: 600, marginBottom: '8px' }}>
              {cortexBrand.parentOrganization}
            </p>
            <p style={{ fontSize: '14px', color: 'var(--color-text-on-inverse-muted)', lineHeight: 1.5, maxWidth: '36ch' }}>
              {cortexBrand.tagline}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <div className="footer-col-title">Navigation</div>
            <ul className="footer-links-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="footer-link"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="footer-col-title">Core Services</div>
            <ul className="footer-links-list">
              {services.map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="footer-link"
                    onClick={(e) => handleLinkClick(e, '#services')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <div className="footer-col-title">Contact & Location</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--color-text-on-inverse-muted)' }}>
              <a
                href={`mailto:${cortexBrand.primaryEmail}`}
                className="footer-link"
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Mail size={14} aria-hidden="true" />
                <span>{cortexBrand.primaryEmail}</span>
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Phone size={14} aria-hidden="true" />
                <span>+91 9428622853 / 9313198689</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} aria-hidden="true" />
                <span>{cortexBrand.location}</span>
              </div>

              <a
                href={cortexBrand.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}
                aria-label="Cortex on GitHub (opens in new tab)"
              >
                <Github size={14} aria-hidden="true" />
                <span>github.com/hackathon-cortex</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Cortex Freelancing. A Division of Cortex Intelligence and Technologies. All rights reserved.
          </div>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={scrollToTop}
            style={{ fontSize: '12px', minHeight: '36px', padding: '0 14px' }}
            aria-label="Back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
