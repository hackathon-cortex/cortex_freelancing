import React from 'react';
import { Briefcase } from 'lucide-react';
import { industriesData } from '../data/cortexData';

export default function IndustriesSection() {
  return (
    <section className="section section-page" aria-labelledby="industries-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent" aria-hidden="true" />
            <span>06 — DOMAINS</span>
          </div>
          <h2 id="industries-heading" className="section-title">
            Built For Different Kinds of Businesses
          </h2>
          <p className="section-intro">
            From consumer apps to business infrastructure, we adapt our engineering process to various domain requirements.
          </p>
        </div>

        {/* Compact visual badges grid (avoiding 12 large cards as required) */}
        <div className="industries-badges-wrap" role="list">
          {industriesData.map((industry) => (
            <div key={industry} className="industry-pill" role="listitem">
              <Briefcase size={14} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
              <span>{industry}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
