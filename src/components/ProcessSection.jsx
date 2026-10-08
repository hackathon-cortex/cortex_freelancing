import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { processSteps } from '../data/cortexData';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/config';

const phases = [
  { name: 'Discover', span: [0, 1] },
  { name: 'Design', span: [2, 2] },
  { name: 'Build', span: [3, 4] },
  { name: 'Launch & Support', span: [5, 7] }
];

export default function ProcessSection() {
  const isReduced = prefersReducedMotion();
  const [activeStepIndex, setActiveStepIndex] = useState(isReduced ? 7 : 0);
  const [scrollProgress, setScrollProgress] = useState(isReduced ? 1 : 0);
  const sectionRef = useRef(null);
  const pipelineRef = useRef(null);
  const verticalRailRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion() || !pipelineRef.current) return;

    const ctx = gsap.context(() => {
      // Desktop Scrub
      ScrollTrigger.create({
        trigger: pipelineRef.current,
        start: 'top 75%',
        end: 'bottom 45%',
        scrub: 0.5,
        onUpdate: (self) => {
          const prog = self.progress;
          setScrollProgress(prog);
          const currentStep = Math.min(
            processSteps.length - 1,
            Math.floor(prog * processSteps.length)
          );
          setActiveStepIndex(currentStep);
        }
      });
    }, pipelineRef);

    return () => ctx.revert();
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

        {/* =========================================================================
            DESKTOP HORIZONTAL PIPELINE (≥1024px)
           ========================================================================= */}
        <div ref={pipelineRef} className="desktop-pipeline-wrapper" aria-hidden="false">
          {/* Phase Bracket Groupings Above/Below Track */}
          <div className="pipeline-phases-header" aria-hidden="true">
            {phases.map((phase) => (
              <div
                key={phase.name}
                className="pipeline-phase-tag"
                style={{
                  gridColumn: `${phase.span[0] + 1} / span ${phase.span[1] - phase.span[0] + 1}`
                }}
              >
                <span className="phase-tag-bracket">[</span>
                <span className="phase-tag-name">{phase.name}</span>
                <span className="phase-tag-bracket">]</span>
              </div>
            ))}
          </div>

          {/* Central Track & Alternating Cards Container */}
          <div className="desktop-pipeline-grid">
            {processSteps.map((step, index) => {
              const isEven = index % 2 === 0; // Even: Above track, Odd: Below track
              const isDone = index < activeStepIndex || (isReduced && index <= 7);
              const isActive = index === activeStepIndex && !isReduced;
              const isPending = index > activeStepIndex && !isReduced;

              return (
                <div
                  key={step.number}
                  className={`pipeline-slot ${isEven ? 'slot-top' : 'slot-bottom'}`}
                  style={{ gridColumn: index + 1 }}
                >
                  {/* Step Card */}
                  <div
                    className={`pipeline-card ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                    tabIndex="0"
                    role="region"
                    aria-label={`Step ${step.number}: ${step.title}`}
                    onFocus={() => setActiveStepIndex(index)}
                    onClick={() => setActiveStepIndex(index)}
                  >
                    <div className="pipeline-card-header">
                      <span className="pipeline-card-num">{step.number}</span>
                      {isDone ? (
                        <CheckCircle2
                          size={16}
                          style={{ color: 'var(--color-brand-primary)' }}
                          aria-hidden="true"
                        />
                      ) : isActive ? (
                        <span className="pipeline-status-pulse" aria-hidden="true" />
                      ) : (
                        <span className="pipeline-status-pending" aria-hidden="true" />
                      )}
                    </div>
                    <h3 className="pipeline-card-title">{step.title}</h3>
                    <p className="pipeline-card-desc">{step.description}</p>
                  </div>

                  {/* Connecting Stem to Track */}
                  <div className={`pipeline-stem ${isEven ? 'stem-down' : 'stem-up'}`} aria-hidden="true">
                    <span className={`pipeline-stem-line ${isDone || isActive ? 'active' : ''}`} />
                  </div>

                  {/* Track Node on the horizontal axis */}
                  <div
                    className={`pipeline-track-node ${isDone ? 'node-done' : ''} ${isActive ? 'node-active' : ''} ${isPending ? 'node-pending' : ''}`}
                    aria-hidden="true"
                  >
                    {isDone ? (
                      <CheckCircle2 size={14} className="node-icon-check" />
                    ) : (
                      <span className="node-dot" />
                    )}
                  </div>
                </div>
              );
            })}

            {/* Continuous Horizontal Line Rail Behind Nodes */}
            <div className="desktop-track-rail" aria-hidden="true">
              <div
                className="desktop-track-rail-fill"
                style={{ width: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
              />
              {/* Traveling Data Packet Dot */}
              {!isReduced && (
                <div
                  className="pipeline-data-packet"
                  style={{
                    left: `${Math.min(100, Math.max(0, scrollProgress * 100))}%`,
                    opacity: scrollProgress > 0.02 && scrollProgress < 0.98 ? 1 : 0
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            TABLET & MOBILE VERTICAL PIPELINE (<1024px)
           ========================================================================= */}
        <div ref={verticalRailRef} className="mobile-pipeline-wrapper">
          {/* Vertical Track Rail */}
          <div className="mobile-track-rail" aria-hidden="true">
            <div
              className="mobile-track-rail-fill"
              style={{ height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%` }}
            />
            {!isReduced && (
              <div
                className="mobile-data-packet"
                style={{
                  top: `${Math.min(100, Math.max(0, scrollProgress * 100))}%`,
                  opacity: scrollProgress > 0.02 && scrollProgress < 0.98 ? 1 : 0
                }}
              />
            )}
          </div>

          <div className="mobile-pipeline-list">
            {processSteps.map((step, index) => {
              const isDone = index < activeStepIndex || (isReduced && index <= 7);
              const isActive = index === activeStepIndex && !isReduced;
              const isPending = index > activeStepIndex && !isReduced;

              // Find phase label if this is start of phase
              const phase = phases.find(p => p.span[0] === index);

              return (
                <div key={step.number} className="mobile-pipeline-row">
                  {phase && (
                    <div className="mobile-phase-badge" aria-hidden="true">
                      <span>[{phase.name.toUpperCase()}]</span>
                    </div>
                  )}

                  <div className="mobile-pipeline-item">
                    {/* Node on Vertical Rail */}
                    <div
                      className={`pipeline-track-node ${isDone ? 'node-done' : ''} ${isActive ? 'node-active' : ''} ${isPending ? 'node-pending' : ''}`}
                      aria-hidden="true"
                    >
                      {isDone ? (
                        <CheckCircle2 size={14} className="node-icon-check" />
                      ) : (
                        <span className="node-dot" />
                      )}
                    </div>

                    {/* Step Card to the Right */}
                    <div
                      className={`pipeline-card mobile-card ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                      tabIndex="0"
                      role="region"
                      aria-label={`Step ${step.number}: ${step.title}`}
                      onClick={() => setActiveStepIndex(index)}
                    >
                      <div className="pipeline-card-header">
                        <span className="pipeline-card-num">{step.number}</span>
                        {isDone ? (
                          <CheckCircle2
                            size={16}
                            style={{ color: 'var(--color-brand-primary)' }}
                            aria-hidden="true"
                          />
                        ) : isActive ? (
                          <span className="pipeline-status-pulse" aria-hidden="true" />
                        ) : (
                          <span className="pipeline-status-pending" aria-hidden="true" />
                        )}
                      </div>
                      <h3 className="pipeline-card-title">{step.title}</h3>
                      <p className="pipeline-card-desc">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={scrollToContact}
          >
            Start a project
            <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
