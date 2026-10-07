import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Globe, Sparkles, Monitor, Smartphone } from 'lucide-react';
import { businessWebsiteDeliverables, businessWebsiteAudiences } from '../data/cortexData';

const previewExamples = {
  startup: {
    title: 'SaaS & Tech Startup Platform',
    headline: 'High-Converting Digital Flagship',
    features: ['Modern Product Hero', 'Feature Walkthrough', 'Pricing & Conversion Funnel', 'API Docs Integration']
  },
  restaurant: {
    title: 'Hospitality & Café Experience',
    headline: 'Visual Menu & Table Reservation',
    features: ['Dynamic Menu Showcase', 'Table Request System', 'Location & Hours', 'Instagram Feed Sync']
  },
  retail: {
    title: 'Modern Brand & Retail Store',
    headline: 'Speed-Optimized Product Showcase',
    features: ['Fast Catalog Filtering', 'Lookbook Gallery', 'WhatsApp Order Flow', 'Secure Payments']
  }
};

export default function BusinessWebsiteSection() {
  const [activeTab, setActiveTab] = useState('startup');
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  const handleBuildWebsiteClick = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const select = document.getElementById('projectType');
      if (select) {
        select.value = 'Business Website';
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  };

  const handleBtnMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setBtnOffset({ x: x * 0.18, y: y * 0.18 });
  };

  const handleBtnMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const currentPreview = previewExamples[activeTab];

  return (
    <section className="section section-page" aria-labelledby="business-website-heading">
      <div className="container">
        <div className="business-website-card">
          {/* Left Column: Positioning & Copy */}
          <div>
            <div className="section-eyebrow" style={{ color: 'var(--color-surface-accent)' }}>
              <Globe size={14} aria-hidden="true" />
              <span>FREELANCE SERVICE HIGHLIGHT</span>
            </div>

            <h2
              id="business-website-heading"
              style={{
                fontSize: 'clamp(28px, 4vw, 36px)',
                lineHeight: 1.1,
                color: '#ffffff',
                marginBottom: '16px',
                fontWeight: 700
              }}
            >
              Need a Website for Your Business?
            </h2>

            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'var(--color-text-on-inverse-muted)',
              marginBottom: '20px'
            }}>
              We build responsive, modern websites for startups, restaurants, cafés,
              hospitality, retail, professional services, personal brands, and growing businesses.
            </p>

            <div style={{ marginBottom: '24px' }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--color-text-on-inverse-muted)',
                marginBottom: '8px'
              }}>
                Target Sectors
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {businessWebsiteAudiences.map((audience) => (
                  <span
                    key={audience}
                    style={{
                      fontSize: '11px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-pill)',
                      color: '#ffffff'
                    }}
                  >
                    {audience}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-magnetic"
              style={{
                transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`
              }}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              onClick={handleBuildWebsiteClick}
              data-cursor="explore"
            >
              Build My Website
              <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
            </button>
          </div>

          {/* Right Column: Sliding Browser Preview Frame with Live Tab Switcher */}
          <div className="browser-preview-frame">
            <div className="browser-header-controls">
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }} />
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }} />
              </div>

              <div className="browser-tabs" role="tablist" aria-label="Business Sector Preview">
                <button
                  type="button"
                  className={`browser-tab-btn ${activeTab === 'startup' ? 'active' : ''}`}
                  onClick={() => setActiveTab('startup')}
                >
                  Startup
                </button>
                <button
                  type="button"
                  className={`browser-tab-btn ${activeTab === 'restaurant' ? 'active' : ''}`}
                  onClick={() => setActiveTab('restaurant')}
                >
                  Hospitality
                </button>
                <button
                  type="button"
                  className={`browser-tab-btn ${activeTab === 'retail' ? 'active' : ''}`}
                  onClick={() => setActiveTab('retail')}
                >
                  Retail
                </button>
              </div>
            </div>

            {/* Inner Live View */}
            <div style={{ padding: '24px', background: '#111111', color: '#ffffff' }}>
              <div style={{ fontSize: '11px', color: 'var(--color-surface-accent)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
                {currentPreview.title}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '14px' }}>
                {currentPreview.headline}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '16px' }}>
                {currentPreview.features.map((f) => (
                  <div key={f} style={{ fontSize: '12px', background: 'rgba(255,255,255,0.06)', padding: '6px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-brand-primary)' }} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: '12px', color: 'var(--color-text-on-inverse-muted)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                ✓ Includes Responsive Testing, Basic SEO, Deployment & Maintenance Support
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
