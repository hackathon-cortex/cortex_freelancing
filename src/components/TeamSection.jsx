import React, { useState } from 'react';
import { Github, CheckCircle2, ArrowRight } from 'lucide-react';
import { teamMembers } from '../data/cortexData';

export default function TeamSection() {
  const [hoveredMember, setHoveredMember] = useState(null);

  return (
    <section id="team" className="section section-page" aria-labelledby="team-heading">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-eyebrow">
            <span className="eyebrow-accent" aria-hidden="true" />
            <span>09 — THE CORE TEAM</span>
          </div>
          <h2 id="team-heading" className="section-title">
            Meet Cortex Builders
          </h2>
          <p className="section-intro">
            A small, dedicated team of designers and engineers who work directly with you
            from concept through production deployment.
          </p>
        </div>

        {/* Tactile Team Grid */}
        <div className="team-grid">
          {teamMembers.map((member) => {
            const isHovered = hoveredMember === member.name;

            return (
              <article
                key={member.name}
                className="team-card"
                onMouseEnter={() => setHoveredMember(member.name)}
                onMouseLeave={() => setHoveredMember(null)}
                style={{
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  boxShadow: isHovered ? '0 16px 36px rgba(0, 0, 0, 0.08)' : 'var(--shadow-1)',
                  borderColor: isHovered ? 'var(--color-brand-primary)' : 'var(--color-border-subtle)',
                  transition: 'transform 250ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 250ms ease, border-color 250ms ease',
                }}
                data-cursor="view"
              >
                {/* Branded Initials Avatar with Scale Zoom */}
                <div
                  className="team-avatar-fallback"
                  style={{
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                    transition: 'transform 250ms ease',
                  }}
                  aria-hidden="true"
                >
                  {member.initials}
                </div>

                <h3
                  className="team-name"
                  style={{
                    color: isHovered ? 'var(--color-brand-primary)' : 'var(--color-text-primary)',
                    transition: 'color 200ms ease',
                  }}
                >
                  {member.name}
                </h3>

                <div
                  className="team-role"
                  style={{
                    transform: isHovered ? 'translateX(3px)' : 'none',
                    transition: 'transform 200ms ease',
                  }}
                >
                  {member.role}
                </div>

                {/* Strengths List with Staggered Hover Accent */}
                <ul className="team-strengths-list" aria-label={`Strengths of ${member.name}`}>
                  {member.strengths.map((strength, sIdx) => (
                    <li
                      key={strength}
                      className="team-strength-item"
                      style={{
                        transform: isHovered ? 'translateX(2px)' : 'none',
                        transition: `transform 200ms ease ${sIdx * 30}ms`,
                      }}
                    >
                      <CheckCircle2
                        size={13}
                        style={{ color: 'var(--color-brand-primary)' }}
                        aria-hidden="true"
                      />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>

                {/* Animated GitHub Button */}
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-github-btn"
                  style={{
                    backgroundColor: isHovered ? 'var(--color-text-primary)' : 'transparent',
                    color: isHovered ? 'var(--color-surface-card)' : 'var(--color-text-primary)',
                    transition: 'all 200ms ease',
                  }}
                  aria-label={`${member.name} on GitHub (opens in new tab)`}
                >
                  <Github size={16} aria-hidden="true" />
                  <span>GitHub Profile</span>
                  <ArrowRight
                    size={13}
                    style={{
                      transform: isHovered ? 'translateX(3px)' : 'none',
                      transition: 'transform 200ms ease',
                    }}
                  />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
