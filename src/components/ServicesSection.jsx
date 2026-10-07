import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ChevronDown, CheckCircle2, Sparkles } from 'lucide-react';
import { servicesData } from '../data/cortexData';
import { gsap, prefersReducedMotion } from '../animations/config';

export default function ServicesSection() {
  const [expandedIndex, setExpandedIndex] = useState(0); // first service expanded by default
  const listRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !listRef.current) return;

    // Desktop staggered alternating horizontal reveal
    const rows = listRef.current.children;
    gsap.fromTo(
      rows,
      {
        x: (i) => (i % 2 === 0 ? -24 : 24),
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const toggleRow = (index) => {
    setExpandedIndex(expandedIndex === index ? -1 : index);
  };

  const scrollToContact = (serviceTitle) => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const select = document.getElementById('projectType');
      if (select) {
        const options = Array.from(select.options);
        const match = options.find((opt) => opt.text.toLowerCase().includes(serviceTitle.toLowerCase()));
        if (match) {
          select.value = match.value;
          select.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }
  };

  return (
    <section id="services" className="section section-page" aria-labelledby="services-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent" aria-hidden="true" />
            <span>02 — WHAT WE BUILD</span>
          </div>
          <h2 id="services-heading" className="section-title">
            Engineering & Product Services
          </h2>
          <p className="section-intro">
            From modern business websites to intelligent software, we engineer digital solutions
            tailored to the specific problem you're solving.
          </p>
        </div>

        {/* Interactive Expandable Services Rows */}
        <div ref={listRef} className="services-list" role="list">
          {servicesData.map((service, index) => {
            const isExpanded = expandedIndex === index;

            return (
              <article
                key={service.number}
                className="service-card"
                style={{
                  borderLeft: isExpanded ? '4px solid var(--color-brand-primary)' : '1px solid var(--color-border-subtle)',
                  backgroundColor: isExpanded ? '#faf7f5' : 'var(--color-surface-card)',
                  cursor: 'pointer',
                  transition: 'background-color 250ms ease, border-left 250ms ease, box-shadow 250ms ease',
                  boxShadow: isExpanded ? '0 8px 24px rgba(0, 0, 0, 0.06)' : 'var(--shadow-1)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
                onClick={() => toggleRow(index)}
                role="listitem"
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleRow(index);
                  }
                }}
                aria-expanded={isExpanded}
                data-cursor="explore"
              >
                {/* Always-Visible Row Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span
                      className="service-number"
                      style={{
                        transform: isExpanded ? 'scale(1.08)' : 'none',
                        transition: 'transform 200ms ease',
                      }}
                      aria-hidden="true"
                    >
                      {service.number}
                    </span>
                    <h3
                      className="service-title"
                      style={{
                        margin: 0,
                        color: isExpanded ? 'var(--color-brand-primary)' : 'var(--color-text-primary)',
                        transition: 'color 200ms ease',
                      }}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)', display: 'none' }}>
                      {isExpanded ? 'Collapse' : 'Expand'}
                    </span>
                    <ChevronDown
                      size={20}
                      style={{
                        transform: isExpanded ? 'rotate(180deg)' : 'none',
                        transition: 'transform 250ms ease',
                        color: isExpanded ? 'var(--color-brand-primary)' : 'var(--color-text-secondary)',
                      }}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Animated Expandable Content Box */}
                <div
                  className={`faq-accordion-grid-anim ${isExpanded ? 'open' : ''}`}
                  style={{ width: '100%' }}
                >
                  <div className="faq-accordion-inner" style={{ padding: '8px 0 0 0' }}>
                    <p className="service-desc-text" style={{ marginBottom: '14px' }}>
                      {service.description}
                    </p>

                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-secondary)', fontWeight: 700, marginBottom: '6px' }}>
                        Deliverables & Scope
                      </div>
                      <div className="service-deliverables-pills">
                        {service.items.map((item) => (
                          <span key={item} className="tag tag-accent" style={{ fontSize: '11px' }}>
                            <CheckCircle2 size={11} style={{ marginRight: '2px', color: 'var(--color-brand-primary)' }} />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div style={{ paddingTop: '8px', borderTop: '1px solid var(--color-border-subtle)' }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{ minHeight: '40px', padding: '0 18px', fontSize: '13px' }}
                        onClick={(e) => {
                          e.stopPropagation();
                          scrollToContact(service.title);
                        }}
                      >
                        {service.ctaText}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Post-Services Action Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            padding: '24px 30px',
            backgroundColor: 'var(--color-surface-card)',
            borderRadius: 'var(--radius-xs)',
            border: '1px solid var(--color-border-subtle)',
            boxShadow: 'var(--shadow-1)',
          }}
        >
          <div>
            <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '4px' }}>
              Have unique technical or product requirements?
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              We architect custom solutions tailored to your workflows and infrastructure.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => scrollToContact('')}
            data-cursor="explore"
          >
            Discuss Your Requirements
            <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
