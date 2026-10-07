import React from 'react';
import { Target, Zap, Wrench, ShieldCheck, MessageSquare, Headphones } from 'lucide-react';
import { whyCortexData } from '../data/cortexData';

const iconMap = [Target, Zap, Wrench, ShieldCheck, MessageSquare, Headphones];

export default function WhyCortexSection() {
  return (
    <section className="section section-page" aria-labelledby="why-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent" aria-hidden="true" />
            <span>05 — VALUES & PROMISE</span>
          </div>
          <h2 id="why-heading" className="section-title">
            Why Work With Cortex?
          </h2>
          <p className="section-intro">
            We operate as an agile product engineering partner, pairing technical depth with business-first execution.
          </p>
        </div>

        {/* 6 Value Cards */}
        <div className="why-cortex-grid">
          {whyCortexData.map((item, index) => {
            const Icon = iconMap[index] || Target;
            return (
              <div key={item.title} className="value-card">
                <h3 className="value-card-title">
                  <Icon size={18} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
                  <span>{item.title}</span>
                </h3>
                <p className="value-card-desc">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
