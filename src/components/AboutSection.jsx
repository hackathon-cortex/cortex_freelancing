import React from 'react';
import { ShieldCheck, MapPin, Building2 } from 'lucide-react';
import { cortexBrand } from '../data/cortexData';

export default function AboutSection() {
  return (
    <section id="about" className="section section-page" aria-labelledby="about-heading">
      <div className="container">
        <div className="about-card">
          <div className="section-eyebrow">
            <span className="eyebrow-accent" aria-hidden="true" />
            <span>08 — ABOUT CORTEX</span>
          </div>

          <h2 id="about-heading" className="section-title">
            A Small Team Building Real Digital Products.
          </h2>

          <div style={{ maxWidth: '72ch', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p className="section-intro">
              Cortex Freelancing is a technology-driven freelance and digital solutions division focused on delivering software, AI, automation, design, and digital services.
            </p>

            <p style={{ fontSize: '15px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              The team combines industry-oriented technology, creative thinking, and practical business solutions to help clients transform ideas into reliable digital products. Whether a client needs a business website, AI-powered application, automation system, software solution, or complete digital presence, Cortex Freelancing turns requirements into practical digital solutions.
            </p>
          </div>

          {/* Core Promise Callout */}
          <div className="about-promise-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '14px', marginBottom: '6px' }}>
              <ShieldCheck size={18} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
              <span>Our Core Promise</span>
            </div>
            <p style={{ fontSize: '15px', fontWeight: 500, color: 'var(--color-text-primary)', lineHeight: 1.5 }}>
              "{cortexBrand.corePromise}"
            </p>
          </div>

          {/* Supporting Organization Metadata */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-border-subtle)',
            fontSize: '13px',
            color: 'var(--color-text-secondary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={16} style={{ color: 'var(--color-text-primary)' }} aria-hidden="true" />
              <span>{cortexBrand.parentOrganization}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
              <span>{cortexBrand.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
