import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Code, Server, Database, Cloud, Shield, Palette } from 'lucide-react';
import { technologyCapabilities } from '../data/cortexData';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/config';

const iconMap = {
  'AI / ML': Cpu,
  'Frontend': Code,
  'Backend': Server,
  'Database': Database,
  'Cloud & DevOps': Cloud,
  'Cybersecurity': Shield,
  'Design': Palette
};

export default function CapabilitiesSection() {
  const [activeCardId, setActiveCardId] = useState(null);
  const sectionRef = useRef(null);
  const linesRef = useRef([]);

  const leftCategories = [
    technologyCapabilities.find(c => c.category === 'AI / ML'),
    technologyCapabilities.find(c => c.category === 'Frontend'),
    technologyCapabilities.find(c => c.category === 'Backend')
  ].filter(Boolean);

  const rightCategories = [
    technologyCapabilities.find(c => c.category === 'Database'),
    technologyCapabilities.find(c => c.category === 'Cloud & DevOps'),
    technologyCapabilities.find(c => c.category === 'Cybersecurity')
  ].filter(Boolean);

  const designCategory = technologyCapabilities.find(c => c.category === 'Design') || {
    category: 'Design',
    skills: ['Figma', 'Adobe Tools', 'UI/UX Systems']
  };

  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Draw connector lines on scroll
      const validLines = linesRef.current.filter(Boolean);
      if (validLines.length > 0) {
        gsap.fromTo(
          validLines,
          { strokeDashoffset: 400 },
          {
            strokeDashoffset: 0,
            duration: 1.2,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="section section-page"
      aria-labelledby="capabilities-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent" aria-hidden="true" />
            <span>03 — TECH STACK</span>
          </div>
          <h2 id="capabilities-heading" className="section-title">
            Built With Modern Technology
          </h2>
          <p className="section-intro">
            We use current technologies and industry standards to build scalable, secure, and production-ready systems.
          </p>
        </div>

        {/* Symmetric 3 | Core | 3 Grid Composition */}
        <div className="tech-stack-layout">
          {/* SVG Connector Lines (Desktop >= 1024px) */}
          <svg
            className="tech-connector-svg"
            viewBox="0 0 1000 600"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {/* Left Connectors */}
            <path
              ref={el => (linesRef.current[0] = el)}
              d="M 370 260 C 345 260, 335 100, 315 100"
              className={`tech-connector-line ${activeCardId === 'left-0' ? 'active' : ''}`}
              strokeDasharray="400"
              strokeDashoffset="0"
            />
            <path
              ref={el => (linesRef.current[1] = el)}
              d="M 370 300 L 315 300"
              className={`tech-connector-line ${activeCardId === 'left-1' ? 'active' : ''}`}
              strokeDasharray="400"
              strokeDashoffset="0"
            />
            <path
              ref={el => (linesRef.current[2] = el)}
              d="M 370 340 C 345 340, 335 500, 315 500"
              className={`tech-connector-line ${activeCardId === 'left-2' ? 'active' : ''}`}
              strokeDasharray="400"
              strokeDashoffset="0"
            />

            {/* Right Connectors */}
            <path
              ref={el => (linesRef.current[3] = el)}
              d="M 630 260 C 655 260, 665 100, 685 100"
              className={`tech-connector-line ${activeCardId === 'right-0' ? 'active' : ''}`}
              strokeDasharray="400"
              strokeDashoffset="0"
            />
            <path
              ref={el => (linesRef.current[4] = el)}
              d="M 630 300 L 685 300"
              className={`tech-connector-line ${activeCardId === 'right-1' ? 'active' : ''}`}
              strokeDasharray="400"
              strokeDashoffset="0"
            />
            <path
              ref={el => (linesRef.current[5] = el)}
              d="M 630 340 C 655 340, 665 500, 685 500"
              className={`tech-connector-line ${activeCardId === 'right-2' ? 'active' : ''}`}
              strokeDasharray="400"
              strokeDashoffset="0"
            />
          </svg>

          {/* Left Column: AI/ML, Frontend, Backend */}
          <div className="tech-side-column tech-left-column">
            {leftCategories.map((group, idx) => {
              const Icon = iconMap[group.category] || Code;
              const cardId = `left-${idx}`;
              return (
                <div
                  key={group.category}
                  className={`capability-category-card ${activeCardId === cardId ? 'is-focused' : ''}`}
                  onMouseEnter={() => setActiveCardId(cardId)}
                  onMouseLeave={() => setActiveCardId(null)}
                  onFocus={() => setActiveCardId(cardId)}
                  onBlur={() => setActiveCardId(null)}
                  tabIndex="0"
                  aria-label={`${group.category} technologies`}
                >
                  <div className="capability-category-title">
                    <Icon size={16} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
                    <span>{group.category}</span>
                  </div>
                  <div className="tech-pills-list">
                    {group.skills.map(skill => (
                      <span key={skill} className="tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Column: Tall Core Card (Inverse Black Surface) */}
          <div className="tech-core-card" aria-label="Cortex Architecture Core">
            <div className="tech-core-top">
              <span className="tech-core-badge">CORE ARCHITECTURE</span>
            </div>

            {/* Animated CTX Mark & Concentric Rotating Rings */}
            <div className="tech-core-animation" aria-hidden="true">
              <div className="ctx-ring ctx-ring-outer" />
              <div className="ctx-ring ctx-ring-inner" />
              <div className="ctx-emblem-wrap">
                <span className="ctx-emblem-text">CTX</span>
                <span className="ctx-emblem-dot" />
              </div>
            </div>

            {/* Core Quote Caption */}
            <p className="tech-core-caption">
              “Technology remains secondary to outcomes.”
            </p>

            {/* Center Design Category Pills (7th Item) */}
            <div className="tech-core-design-section">
              <div className="tech-core-design-header">
                <Palette size={15} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
                <span>{designCategory.category}</span>
              </div>
              <div className="tech-pills-list tech-pills-core">
                {designCategory.skills.map(skill => (
                  <span key={skill} className="tag tag-inverse">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Database, Cloud & DevOps, Cybersecurity */}
          <div className="tech-side-column tech-right-column">
            {rightCategories.map((group, idx) => {
              const Icon = iconMap[group.category] || Server;
              const cardId = `right-${idx}`;
              return (
                <div
                  key={group.category}
                  className={`capability-category-card ${activeCardId === cardId ? 'is-focused' : ''}`}
                  onMouseEnter={() => setActiveCardId(cardId)}
                  onMouseLeave={() => setActiveCardId(null)}
                  onFocus={() => setActiveCardId(cardId)}
                  onBlur={() => setActiveCardId(null)}
                  tabIndex="0"
                  aria-label={`${group.category} technologies`}
                >
                  <div className="capability-category-title">
                    <Icon size={16} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
                    <span>{group.category}</span>
                  </div>
                  <div className="tech-pills-list">
                    {group.skills.map(skill => (
                      <span key={skill} className="tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Supporting Outcome Note - Perfectly Grid Aligned & Centered */}
        <div className="tech-stack-footer-note">
          <p>
            Technology remains secondary to outcomes. We pick the right tool based on your project goals, performance targets, and maintenance constraints.
          </p>
        </div>
      </div>
    </section>
  );
}
