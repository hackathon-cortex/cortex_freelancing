import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, CheckCircle2, Layers } from 'lucide-react';

export default function CaseStudyModal({ project, onClose }) {
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      closeBtnRef.current?.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal-container"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <span className="section-eyebrow" style={{ marginBottom: 0 }}>
              {project.category}
            </span>
            <h2 id="case-study-title" className="project-title" style={{ margin: 0 }}>
              {project.name}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close case study details"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div className="modal-body">
          {/* Visual Showcase Banner */}
          <div className={`modal-hero-visual ${project.id}-visual`}>
            <div className="mockup-header-bar">
              <span>{project.name.toLowerCase()}.cortex.system</span>
              <span>{project.category}</span>
            </div>
            <div style={{ marginTop: '24px' }}>
              <span className={`mockup-badge ${
                project.id === 'krishigrahan' ? 'mockup-badge-green' :
                project.id === 'cortex-p2p' ? 'mockup-badge-peach' :
                project.id === 'moodify' ? 'mockup-badge-red' : 'mockup-badge-blue'
              }`}>
                {project.positioning}
              </span>
              <p style={{ fontSize: '18px', color: '#ffffff', fontWeight: 600, marginTop: '8px' }}>
                {project.shortDescription}
              </p>
            </div>
          </div>

          {/* Project Details */}
          <div>
            <h3 className="modal-section-title">Overview & Solution</h3>
            <p className="section-intro" style={{ maxWidth: '100%' }}>
              {project.fullDescription}
            </p>
          </div>

          {/* Technology & Category Tags */}
          <div>
            <h3 className="modal-section-title">Technology & Capabilities</h3>
            <div className="project-tags-list">
              {project.tags.map((tag) => (
                <span key={tag} className="tag tag-accent">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Portfolio Role & Engineering Scope */}
          <div>
            <h3 className="modal-section-title">What This Demonstrates</h3>
            <ul className="modal-roles-list">
              {project.portfolioRole.map((item) => (
                <li key={item} className="modal-role-item">
                  <CheckCircle2 size={16} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid var(--color-border-subtle)',
            marginTop: '8px'
          }}>
            {project.hasLiveUrl && project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Open Live Application
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            ) : (
              <div style={{
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Layers size={16} style={{ color: 'var(--color-brand-primary)' }} />
                <span>Internal Digital Product Application (Public link to be added once production deployment is confirmed)</span>
              </div>
            )}

            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Back to Work
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
