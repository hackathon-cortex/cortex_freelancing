import React from 'react';
import { Clock, Check, AlertCircle } from 'lucide-react';
import { timelineData } from '../data/cortexData';

export default function TimelineSection() {
  return (
    <section className="section section-page" aria-labelledby="timeline-heading">
      <div className="container">
        <div className="timeline-card">
          {/* Header */}
          <div className="timeline-header-wrap">
            <div>
              <div className="section-eyebrow" style={{ color: 'var(--color-surface-accent)' }}>
                <Clock size={14} aria-hidden="true" />
                <span>PROJECT TIMELINE</span>
              </div>
              <h2 id="timeline-heading" style={{ fontSize: 'clamp(28px, 4vw, 36px)', color: '#ffffff', fontWeight: 700 }}>
                Typical Delivery Schedule
              </h2>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: 'var(--color-text-on-inverse-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Standard Target
              </div>
              <div className="timeline-target-badge">
                {timelineData.target}
              </div>
            </div>
          </div>

          {/* 3-Week Visualization Grid */}
          <div className="timeline-weeks-grid">
            {timelineData.weeks.map((item) => (
              <div key={item.week} className="timeline-week-box">
                <div className="timeline-week-title">
                  {item.week}
                </div>
                <ul className="timeline-tasks-list">
                  {item.tasks.map((task) => (
                    <li key={task} className="timeline-task-item">
                      <Check size={14} style={{ color: 'var(--color-surface-accent)' }} aria-hidden="true" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Scope & Complexity Clarification Note */}
          <div className="timeline-clarification-box">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--color-brand-primary)', marginBottom: '4px' }}>
              <AlertCircle size={14} aria-hidden="true" />
              <span>Scope & Complexity Conditions</span>
            </div>
            <p>
              {timelineData.clarification}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
