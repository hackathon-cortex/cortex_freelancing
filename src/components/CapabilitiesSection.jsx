import React from 'react';
import { Cpu, Code, Server, Database, Cloud, Shield, Palette } from 'lucide-react';
import { technologyCapabilities } from '../data/cortexData';

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
  return (
    <section className="section section-page" aria-labelledby="capabilities-heading">
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

        {/* Grouped Capabilities Grid */}
        <div className="capabilities-grid">
          {technologyCapabilities.map((group) => {
            const Icon = iconMap[group.category] || Code;
            return (
              <div key={group.category} className="capability-category-card">
                <div className="capability-category-title">
                  <Icon size={16} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
                  <span>{group.category}</span>
                </div>

                <div className="tech-pills-list">
                  {group.skills.map((skill) => (
                    <span key={skill} className="tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Supporting Outcome Note */}
        <p style={{
          fontSize: '13px',
          color: 'var(--color-text-secondary)',
          marginTop: '24px',
          textAlign: 'center'
        }}>
          Technology remains secondary to outcomes. We pick the right tool based on your project goals, performance targets, and maintenance constraints.
        </p>
      </div>
    </section>
  );
}
