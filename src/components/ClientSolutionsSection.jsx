import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { clientSolutions } from '../data/cortexData';

export default function ClientSolutionsSection() {
  const [hoveredSegment, setHoveredSegment] = useState(null);

  return (
    <section className="section section-page" aria-labelledby="solutions-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent" aria-hidden="true" />
            <span>07 — ENGAGEMENT PATHS</span>
          </div>
          <h2 id="solutions-heading" className="section-title">
            Structured Engagement Models
          </h2>
          <p className="section-intro">
            Interactive solution pathways tailored to your project scale, speed requirements, and organizational structure.
          </p>
        </div>

        {/* 4 Solution Path Cards with Sequential Arrow Stagger */}
        <div className="solutions-grid">
          {clientSolutions.map((item) => {
            const isHovered = hoveredSegment === item.segment;

            return (
              <div
                key={item.segment}
                className="solution-card"
                onMouseEnter={() => setHoveredSegment(item.segment)}
                onMouseLeave={() => setHoveredSegment(null)}
                style={{
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  transition: 'transform 250ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 250ms ease, border-color 250ms ease',
                  borderColor: isHovered ? 'var(--color-brand-primary)' : 'var(--color-border-subtle)',
                  boxShadow: isHovered ? '0 12px 30px rgba(0, 0, 0, 0.08)' : 'var(--shadow-1)',
                  cursor: 'pointer',
                }}
                data-cursor="explore"
              >
                <span className="solution-segment" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{item.segment}</span>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: isHovered ? 'var(--color-brand-primary)' : 'transparent',
                      transition: 'background-color 200ms ease',
                    }}
                  />
                </span>

                <div className="solution-flow">
                  {item.steps.map((step, idx) => (
                    <div key={step}>
                      {idx > 0 && (
                        <div
                          style={{
                            paddingLeft: '6px',
                            color: isHovered ? 'var(--color-brand-primary)' : 'rgba(33, 33, 33, 0.25)',
                            transform: isHovered ? 'translateY(2px)' : 'none',
                            transition: `color 200ms ease ${idx * 60}ms, transform 200ms ease ${idx * 60}ms`,
                          }}
                        >
                          <ArrowDown size={14} />
                        </div>
                      )}
                      <div
                        className="flow-step"
                        style={{
                          color: isHovered && idx === item.steps.length - 1 ? 'var(--color-brand-primary)' : 'inherit',
                          fontWeight: isHovered ? 700 : 600,
                          transition: 'color 200ms ease',
                        }}
                      >
                        {step}
                      </div>
                    </div>
                  ))}
                </div>

                <p
                  style={{
                    fontSize: '13px',
                    color: 'var(--color-text-secondary)',
                    marginTop: 'auto',
                    lineHeight: 1.45,
                    borderTop: '1px solid var(--color-border-subtle)',
                    paddingTop: '12px',
                  }}
                >
                  {item.summary}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
