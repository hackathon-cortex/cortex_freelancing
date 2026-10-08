import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, ExternalLink, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { selectedProjects } from '../data/cortexData';
import CaseStudyModal from './CaseStudyModal';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/config';

export default function WorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 100
  const [isHolding, setIsHolding] = useState(false);

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const tagsRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const holdRafRef = useRef(null);
  const touchStartY = useRef(null);

  const projects = selectedProjects.slice(0, 4);
  const currentProject = projects[activeIndex] || projects[0];

  // Handle Project Change with choreographed title & metadata animation
  const goToProject = useCallback((newIndex) => {
    if (newIndex < 0 || newIndex >= projects.length) return;
    setActiveIndex(newIndex);
  }, [projects.length]);

  // Animate metadata changes when activeIndex changes
  useEffect(() => {
    if (prefersReducedMotion()) return;

    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, ease: 'expo.out' }
      );
    }

    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', delay: 0.08 }
      );
    }

    if (tagsRef.current) {
      gsap.fromTo(
        tagsRef.current.children,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.4, ease: 'power2.out', delay: 0.14 }
      );
    }
  }, [activeIndex]);

  // Desktop Scroll-Driven Pinning via GSAP ScrollTrigger
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return;

    // Check screen width for pinning on desktop
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=2000',
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        // Map scroll progress across 4 projects (0, 1, 2, 3)
        const targetIdx = Math.min(projects.length - 1, Math.floor(progress * projects.length));
        setActiveIndex((prev) => (prev !== targetIdx ? targetIdx : prev));
      },
    });

    return () => {
      trigger.kill();
    };
  }, [projects.length]);

  // Press & Hold Animation Loop with smooth reversal on release
  useEffect(() => {
    let startTime = null;
    const holdDuration = 850; // ms to reach 100%

    const updateHold = (timestamp) => {
      if (isHolding) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(100, Math.round((elapsed / holdDuration) * 100));
        setHoldProgress(progress);

        if (progress >= 100) {
          setIsHolding(false);
          setActiveModalProject(currentProject);
          setHoldProgress(0);
          return;
        }
        holdRafRef.current = requestAnimationFrame(updateHold);
      } else {
        setHoldProgress((prev) => {
          if (prev <= 0) return 0;
          const next = Math.max(0, prev - 10);
          if (next > 0) {
            holdRafRef.current = requestAnimationFrame(updateHold);
          }
          return next;
        });
      }
    };

    holdRafRef.current = requestAnimationFrame(updateHold);
    return () => {
      if (holdRafRef.current) cancelAnimationFrame(holdRafRef.current);
    };
  }, [isHolding, currentProject]);

  // Keyboard navigation for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      goToProject(Math.min(projects.length - 1, activeIndex + 1));
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      goToProject(Math.max(0, activeIndex - 1));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveModalProject(currentProject);
    }
  };

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartY.current) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && activeIndex < projects.length - 1) {
        goToProject(activeIndex + 1);
      } else if (diff < 0 && activeIndex > 0) {
        goToProject(activeIndex - 1);
      }
    }
    touchStartY.current = null;
  };

  // Circular timer ring calculations
  const circleRadius = 8;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - (holdProgress / 100) * circumference;

  return (
    <section
      ref={sectionRef}
      id="work"
      className="work-section section-page"
      aria-label="Cortex Selected Work Showcase"
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header" style={{ marginBottom: 'var(--space-5)' }}>
          <div className="section-eyebrow">
            <span className="eyebrow-accent" aria-hidden="true" />
            <span>01 — SELECTED WORK</span>
          </div>
          <h2 className="section-title">
            Curated Systems & Products
          </h2>
          <p className="section-intro">
            Real engineering across AI/ML, applications, and web platforms.
            Scroll, tap, or hold to explore the full case study.
          </p>
        </div>

        {/* 12-Column Jitter Stacked Cards Layout */}
        <div className="work-showcase-layout">
          {/* ------------------------------------------------------------
              LEFT COLUMN (5 COLUMNS): PROJECT INFORMATION & RAIL
              ------------------------------------------------------------ */}
          <div className="work-info-col">
            {/* Project Index Tracker & Segmented Progress Track */}
            <div className="work-meta-tracker">
              <div className="rolling-number-box" aria-hidden="true">
                <div
                  className="rolling-number-inner"
                  style={{ transform: `translateY(-${activeIndex * 28}px)` }}
                >
                  <span className="rolling-digit">01</span>
                  <span className="rolling-digit">02</span>
                  <span className="rolling-digit">03</span>
                  <span className="rolling-digit">04</span>
                </div>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>
                / 04
              </span>

              {/* Segmented Progress Track */}
              <div className="segmented-progress-track" role="tablist" aria-label="Project tabs">
                {projects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => goToProject(idx)}
                    className={`progress-segment-pill ${
                      idx === activeIndex ? 'active' : idx < activeIndex ? 'completed' : ''
                    }`}
                    aria-label={`Jump to project 0${idx + 1}: ${proj.name}`}
                    role="tab"
                    aria-selected={idx === activeIndex}
                  />
                ))}
              </div>
            </div>

            {/* Positioning & Category Tag */}
            <div className="work-tag-row">
              <span className={`work-positioning-tag tag-${currentProject.id}`}>
                {currentProject.positioning}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                {currentProject.category}
              </span>
            </div>

            {/* Kinetic Masked Title */}
            <div className="work-title-mask">
              <h3 ref={titleRef} className="work-project-title">
                {currentProject.name}
              </h3>
            </div>

            {/* Project Description */}
            <p ref={descRef} className="work-project-desc">
              {currentProject.shortDescription}
            </p>

            {/* Tech Stack Badges */}
            <div ref={tagsRef} className="work-tech-tags">
              {currentProject.tags.map((tag) => (
                <span key={tag} className="tag tag-accent" style={{ fontSize: '11px' }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Interactive Actions */}
            <div className="work-actions-row">
              <button
                ref={ctaBtnRef}
                type="button"
                className="btn btn-primary"
                onClick={() => setActiveModalProject(currentProject)}
                data-cursor="explore"
              >
                Explore Case Study
                <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
              </button>

              {currentProject.hasLiveUrl && currentProject.liveUrl && (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                  data-cursor="view"
                >
                  Live System
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              )}
            </div>

            {/* Project Selector Rail */}
            <div className="work-rail-pills" role="tablist">
              {projects.map((proj, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={proj.id}
                    type="button"
                    onClick={() => goToProject(idx)}
                    className={`rail-pill-btn ${isActive ? 'active' : ''}`}
                    role="tab"
                    aria-selected={isActive}
                    data-cursor="view"
                  >
                    <div>
                      <span className="rail-pill-name">0{idx + 1} — {proj.name}</span>
                    </div>
                    <span className="rail-pill-cat">{proj.category.split('·')[0].trim()}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------------
              RIGHT COLUMN (7 COLUMNS): JITTER STACKED CARDS VIEWPORT
              ------------------------------------------------------------ */}
          <div className="work-stack-col">
            <div
              ref={stageRef}
              className="stacked-cards-viewport"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              aria-label="Stacked project cards preview"
            >
              {projects.map((project, idx) => {
                const diff = idx - activeIndex;
                const isActive = diff === 0;

                // Calculate Fan-Out Transform parameters
                let transformStyle = '';
                let opacity = 1;
                let zIndex = 1;
                let pointerEvents = 'none';

                if (diff === 0) {
                  // Active Card: Front and dominant
                  transformStyle = `translate3d(0, 0, 0) scale(${isHolding ? 1.025 : 1}) rotate(0deg)`;
                  opacity = 1;
                  zIndex = 10;
                  pointerEvents = 'auto';
                } else if (diff === 1) {
                  // Next Card 1: Peek below/behind
                  transformStyle = 'translate3d(0, 30px, -40px) scale(0.94) rotate(1.8deg)';
                  opacity = 0.85;
                  zIndex = 9;
                  pointerEvents = 'auto';
                } else if (diff === 2) {
                  // Next Card 2: Deeper peek
                  transformStyle = 'translate3d(0, 58px, -80px) scale(0.88) rotate(-1.8deg)';
                  opacity = 0.65;
                  zIndex = 8;
                  pointerEvents = 'auto';
                } else if (diff === 3) {
                  // Next Card 3: Deepest peek
                  transformStyle = 'translate3d(0, 84px, -120px) scale(0.82) rotate(2.2deg)';
                  opacity = 0.45;
                  zIndex = 7;
                  pointerEvents = 'auto';
                } else {
                  // Cards that physically left the stack: translated upward/outward
                  transformStyle = 'translate3d(-20px, -90px, 40px) scale(0.94) rotate(-3.5deg)';
                  opacity = 0;
                  zIndex = 0;
                  pointerEvents = 'none';
                }

                return (
                  <div
                    key={project.id}
                    className={`stacked-card ${isActive ? 'is-active' : ''}`}
                    style={{
                      transform: transformStyle,
                      opacity,
                      zIndex,
                      pointerEvents,
                    }}
                    onClick={() => {
                      if (isActive) {
                        setActiveModalProject(project);
                      } else {
                        goToProject(idx);
                      }
                    }}
                    onMouseDown={isActive ? () => setIsHolding(true) : undefined}
                    onMouseUp={isActive ? () => setIsHolding(false) : undefined}
                    onTouchStart={isActive ? () => setIsHolding(true) : undefined}
                    onTouchEnd={isActive ? () => setIsHolding(false) : undefined}
                    role="button"
                    tabIndex={isActive ? 0 : -1}
                    aria-label={`Project 0${idx + 1}: ${project.name} - ${isActive ? 'Active. Hold to explore or click for details' : 'Click to bring to front'}`}
                  >
                    {/* Mockup Header Bar */}
                    <div className="mockup-header-bar">
                      <div className="mockup-controls" aria-hidden="true">
                        <span className="mockup-control-dot dot-close" />
                        <span className="mockup-control-dot dot-min" />
                        <span className="mockup-control-dot dot-max" />
                      </div>
                      <span className="mockup-url-pill">
                        {project.id}.cortex.systems
                      </span>
                      <div className="mockup-status-live">
                        <span className="mockup-ping" aria-hidden="true" />
                        <span>LIVE</span>
                      </div>
                    </div>

                    {/* Card Body with Project-Specific Rich Interactive Graphics */}
                    <div className={`card-stage-body ${project.id}-stage`}>
                      {/* Project 01: KrishiGrahan Live Agro Radar */}
                      {project.id === 'krishigrahan' && (
                        <>
                          <div>
                            <span className="mockup-badge mockup-badge-green" style={{ fontSize: '10px' }}>
                              Agro ML Telemetry
                            </span>
                            <div className="krishi-hud-grid">
                              <div className="krishi-stat-box">
                                <div className="krishi-stat-label">Moisture</div>
                                <div className="krishi-stat-val">68.4%</div>
                              </div>
                              <div className="krishi-stat-box">
                                <div className="krishi-stat-label">NPK Index</div>
                                <div className="krishi-stat-val">Optimal</div>
                              </div>
                              <div className="krishi-stat-box">
                                <div className="krishi-stat-label">NDVI Health</div>
                                <div className="krishi-stat-val">0.84</div>
                              </div>
                            </div>
                          </div>

                          <div className="krishi-radar-box">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Sparkles size={16} style={{ color: '#a3f7bf' }} />
                              <div>
                                <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>Disease Diagnostics Model</div>
                                <div style={{ fontSize: '9px', fontFamily: 'monospace', color: 'rgba(163,247,191,0.8)' }}>
                                  Canopy Scan: 99.2% Accuracy · Zero Pathogens
                                </div>
                              </div>
                            </div>
                            <span className="tag" style={{ fontSize: '10px', background: 'rgba(39,201,63,0.2)', color: '#a3f7bf', border: '1px solid #27c93f' }}>
                              Auto-Scheduled
                            </span>
                          </div>
                        </>
                      )}

                      {/* Project 02: Moodify Emotion Audio Spectrum */}
                      {project.id === 'moodify' && (
                        <>
                          <div>
                            <span className="mockup-badge mockup-badge-red" style={{ fontSize: '10px' }}>
                              Facial CV Emotion Spectrum
                            </span>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}>
                              Face Stream: Energetic / Joyful (96.4%)
                            </div>
                          </div>

                          <div className="moodify-equalizer-wrap" aria-hidden="true">
                            {Array.from({ length: 16 }).map((_, bIdx) => (
                              <div
                                key={bIdx}
                                className="eq-bar"
                                style={{
                                  animationDelay: `${bIdx * 75}ms`,
                                  height: `${25 + (bIdx % 5) * 15}%`,
                                }}
                              />
                            ))}
                          </div>

                          <div className="moodify-track-hud">
                            <div>
                              <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>Now Playing: Dynamic Frequency</div>
                              <div style={{ fontSize: '9px', fontFamily: 'monospace', color: '#ff9da8' }}>
                                BPM: 128 · Mood Synced · Spotify API Edge
                              </div>
                            </div>
                            <span className="tag" style={{ fontSize: '10px', background: 'rgba(255,77,40,0.2)', color: '#ff9da8', border: '1px solid #ff4d28' }}>
                              Real-Time
                            </span>
                          </div>
                        </>
                      )}

                      {/* Project 03: VivaAI Multimodal Coaching */}
                      {project.id === 'vivaai' && (
                        <>
                          <div>
                            <span className="mockup-badge mockup-badge-blue" style={{ fontSize: '10px' }}>
                              Multimodal Interview Simulator
                            </span>
                            <div className="viva-interview-hud">
                              <div style={{ fontSize: '11px', color: '#9fe2ff', fontFamily: 'monospace' }}>
                                Prompt: "Explain distributed consensus trade-offs in Raft."
                              </div>
                              <div className="viva-speech-wave" aria-hidden="true">
                                {Array.from({ length: 24 }).map((_, sIdx) => (
                                  <div
                                    key={sIdx}
                                    className="speech-dot"
                                    style={{
                                      animationDelay: `${sIdx * 45}ms`,
                                      height: `${6 + (sIdx % 4) * 6}px`,
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="viva-coach-feedback">
                            <div>
                              <span style={{ fontWeight: 700, color: '#ffffff' }}>AI Telemetry: </span>
                              <span style={{ color: '#9fe2ff', fontFamily: 'monospace' }}>Clarity: 94% · Tone: Confident · Latency: 180ms</span>
                            </div>
                            <span className="tag" style={{ fontSize: '10px', background: 'rgba(40,116,255,0.2)', color: '#9fe2ff', border: '1px solid #2874ff' }}>
                              WebRTC
                            </span>
                          </div>
                        </>
                      )}

                      {/* Project 04: Cortex P2P Mesh Network */}
                      {project.id === 'cortex-p2p' && (
                        <>
                          <div>
                            <span className="mockup-badge mockup-badge-peach" style={{ fontSize: '10px' }}>
                              Encrypted Peer-to-Peer Topology
                            </span>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginTop: '6px' }}>
                              Zero Central Servers · Mesh Nodes Active
                            </div>
                          </div>

                          <div className="p2p-mesh-box" aria-hidden="true">
                            <svg viewBox="0 0 280 100" style={{ width: '100%', height: '100%' }}>
                              <line x1="40" y1="50" x2="110" y2="25" stroke="rgba(255,208,191,0.3)" strokeDasharray="4 3" />
                              <line x1="110" y1="25" x2="180" y2="70" stroke="rgba(255,208,191,0.3)" strokeDasharray="4 3" />
                              <line x1="180" y1="70" x2="240" y2="40" stroke="rgba(255,208,191,0.3)" strokeDasharray="4 3" />
                              <line x1="40" y1="50" x2="180" y2="70" stroke="rgba(255,77,40,0.4)" strokeWidth="1.5" />
                              <circle cx="40" cy="50" r="8" fill="#ff4d28" />
                              <circle cx="110" cy="25" r="7" fill="#ffd0bf" />
                              <circle cx="180" cy="70" r="9" fill="#ff4d28" />
                              <circle cx="240" cy="40" r="7" fill="#ffd0bf" />
                            </svg>
                          </div>

                          <div className="p2p-telemetry-hud">
                            <div>
                              <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>AES-256-GCM Handshake Verified</div>
                              <div style={{ fontSize: '9px', fontFamily: 'monospace', color: '#ffd0bf' }}>
                                Bitrate: 42.6 MB/s · Packet Loss: 0.00%
                              </div>
                            </div>
                            <span className="tag" style={{ fontSize: '10px', background: 'rgba(255,77,40,0.2)', color: '#ffd0bf', border: '1px solid #ff4d28' }}>
                              P2P Sync
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Signature Cortex "HOLD TO EXPLORE" indicator (Active Card Only) */}
                    {isActive && (
                      <div className="hold-progress-indicator" aria-hidden="true">
                        <svg className="hold-ring-svg" viewBox="0 0 20 20">
                          <circle
                            className="hold-ring-bg"
                            cx="10"
                            cy="10"
                            r={circleRadius}
                            fill="none"
                            strokeWidth="2.5"
                          />
                          <circle
                            className="hold-ring-progress"
                            cx="10"
                            cy="10"
                            r={circleRadius}
                            fill="none"
                            strokeWidth="2.5"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                          />
                        </svg>
                        <span>{isHolding ? `${holdProgress}% HOLDING` : 'HOLD TO EXPLORE'}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Work Bottom Conversion CTA */}
        <div className="work-bottom-cta" style={{ marginTop: 'var(--space-6)' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '4px' }}>
              Have a similar project in mind?
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              Whether you need an AI-powered system or a high-performance web product, let's talk.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            data-cursor="explore"
          >
            Let's Talk About Your Project
            <ArrowRight size={16} className="btn-arrow" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
