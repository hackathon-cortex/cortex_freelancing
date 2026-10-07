import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { processSteps } from '../data/cortexData';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/config';

export default function ProcessSection() {
  const [activeStepIndex, setActiveStepIndex] = useState(2);
  const containerRef = useRef(null);
  const lineFillRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    // Scroll-linked progress line filling
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 70%',
      end: 'bottom 50%',
      onUpdate: (self) => {
        const progress = self.progress;
        if (lineFillRef.current) {
          lineFillRef.current.style.height = `${progress * 100}%`;
        }
        const calculatedIndex = Math.min(
          processSteps.length - 1,
          Math.floor(progress * processSteps.length)
        );
        setActiveStepIndex(calculatedIndex);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="process" className="section section-page" aria-labelledby="process-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent" aria-hidden="true" />
            <span>04 — DELIVERY PIPELINE</span>
          </div>
          <h2 id="process-heading" className="section-title">
            From Idea to Production
          </h2>
          <p className="section-intro">
            A disciplined engineering pipeline designed to finalize scope early and deliver
            tested software systematically.
          </p>
        </div>

        {/* Scroll-Reactive Pipeline Grid */}
        <div ref={containerRef} style={{ position: 'relative' }}>
          {/* Background Connector Progress Line */}
          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              bottom: '20px',
              width: '2px',
              backgroundColor: 'rgba(33, 33, 33, 0.1)',
              display: 'none', // Active on desktop pipeline view if needed
            }}
          >
            <div
              ref={lineFillRef}
              style={{
                width: '100%',
                height: '0%',
                backgroundColor: 'var(--color-brand-primary)',
                transition: 'height 150ms linear',
              }}
            />
          </div>

          <div className="process-grid" role="list">
            {processSteps.map((step, index) => {
              const isSelected = activeStepIndex === index;
              const isCompleted = index < activeStepIndex;

              return (
                <div
                  key={step.number}
                  className={`process-step-card ${isSelected ? 'active' : ''}`}
                  onClick={() => setActiveStepIndex(index)}
                  onMouseEnter={() => setActiveStepIndex(index)}
                  style={{
                    borderLeft: isSelected
                      ? '4px solid var(--color-brand-primary)'
                      : '1px solid var(--color-border-subtle)',
                    backgroundColor: isSelected ? '#faf5f3' : 'var(--color-surface-card)',
                    transform: isSelected ? 'translateY(-4px)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    boxShadow: isSelected ? '0 10px 30px rgba(0, 0, 0, 0.08)' : 'var(--shadow-1)',
                  }}
                  role="listitem"
                  tabIndex="0"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveStepIndex(index);
                    }
                  }}
                  aria-label={`Step ${step.number}: ${step.title}`}
                  data-cursor="explore"
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      className="process-step-num"
                      style={{
                        transform: isSelected ? 'scale(1.1)' : 'none',
                        transition: 'transform 200ms ease',
                      }}
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2
                        size={18}
                        style={{ color: 'var(--color-brand-primary)' }}
                        aria-hidden="true"
                      />
                    ) : (
                      <span
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: isSelected
                            ? 'var(--color-brand-primary)'
                            : 'rgba(33, 33, 33, 0.2)',
                          transition: 'background-color 200ms ease',
                        }}
                      />
                    )}
                  </div>

                  <h3
                    className="process-step-title"
                    style={{
                      color: isSelected ? 'var(--color-brand-primary)' : 'inherit',
                      transition: 'color 200ms ease',
                    }}
                  >
                    {step.title}
                  </h3>

                  <p className="process-step-desc">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section CTA */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={scrollToContact}
            data-cursor="explore"
          >
            Start a Project With Cortex
            <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
