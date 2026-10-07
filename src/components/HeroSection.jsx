import React, { useEffect, useRef } from 'react';
import { ArrowRight, Cpu, Globe, Workflow, ShieldCheck, Sparkles } from 'lucide-react';
import { cortexBrand } from '../data/cortexData';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/config';
import { initMagnetic } from '../animations/magnetic';

export default function HeroSection() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const badgeDotRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const descRef = useRef(null);
  const ctasRef = useRef(null);
  const ctaBtnRef = useRef(null);
  const capRef = useRef(null);

  // System visual refs
  const visualRef = useRef(null);
  const gridLayerRef = useRef(null);
  const svgPathsRef = useRef([]);
  const coreRef = useRef(null);
  const nodesRef = useRef([]);
  const chipsRef = useRef([]);

  // Magnetic button on primary CTA
  useEffect(() => {
    if (ctaBtnRef.current) {
      const cleanup = initMagnetic(ctaBtnRef.current, 10);
      return cleanup;
    }
  }, []);

  // Master Motion Timeline & Parallax
  useEffect(() => {
    if (prefersReducedMotion()) return;

    // ------------------------------------------------------------
    // 01 & 02: CHOREOGRAPHED FRONT-PAGE TIMELINE
    // ------------------------------------------------------------
    const tl = gsap.timeline({
      delay: 0.15,
      defaults: { ease: 'power3.out' },
    });

    // 0.2s: Cortex mark badge with assembled dot & tracking
    tl.fromTo(
      badgeRef.current,
      { opacity: 0, scale: 0.92, letterSpacing: '0.22em', y: 15 },
      { opacity: 1, scale: 1, letterSpacing: '0.12em', y: 0, duration: 0.45, ease: 'power3.out' }
    )
      .fromTo(
        badgeDotRef.current,
        { scale: 0, x: -14, opacity: 0 },
        { scale: 1, x: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)' },
        '-=0.25'
      )

      // 0.4s: Digital grid structure & crosshairs reveal
      .fromTo(
        gridLayerRef.current,
        { opacity: 0 },
        { opacity: 0.8, duration: 0.5, ease: 'power2.inOut' },
        '-=0.2'
      )

      // 0.6s: Kinetic Typography (Line 1: TURNING IDEAS)
      .fromTo(
        line1Ref.current,
        { y: '120%', scale: 1.05, opacity: 0 },
        { y: '0%', scale: 1, opacity: 1, duration: 0.65, ease: 'expo.out' },
        '-=0.25'
      )

      // Kinetic Typography (Line 2: INTO)
      .fromTo(
        line2Ref.current,
        { y: '120%', scale: 1.05, opacity: 0 },
        { y: '0%', scale: 1, opacity: 1, duration: 0.6, ease: 'expo.out' },
        '-=0.45'
      )

      // 0.8s: Accent Word (Line 3: DIGITAL SOLUTIONS with clip-path wipe)
      .fromTo(
        line3Ref.current,
        {
          clipPath: 'inset(0 100% 0 0)',
          scale: 1.08,
          y: '120%',
          opacity: 0,
        },
        {
          clipPath: 'inset(0 0% 0 0)',
          scale: 1,
          y: '0%',
          opacity: 1,
          duration: 0.75,
          ease: 'expo.out',
        },
        '-=0.4'
      )

      // 1.0s: Cortex Intelligence System visual builds itself
      .fromTo(
        visualRef.current,
        { opacity: 0, scale: 0.94, y: 25 },
        { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'power3.out' },
        '-=0.5'
      )

      // Central Core nucleus expands & activates
      .fromTo(
        coreRef.current,
        { scale: 0, opacity: 0, rotate: -30 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.65, ease: 'back.out(1.5)' },
        '-=0.45'
      )

      // Connecting SVG lines draw themselves via strokeDashoffset
      .fromTo(
        svgPathsRef.current.filter(Boolean),
        { strokeDashoffset: 500, opacity: 0.2 },
        { strokeDashoffset: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: 'power2.inOut' },
        '-=0.4'
      )

      // Satellite system nodes emerge sequentially
      .fromTo(
        nodesRef.current.filter(Boolean),
        { scale: 0.85, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, stagger: 0.09, duration: 0.5, ease: 'power3.out' },
        '-=0.55'
      )

      // HUD Telemetry chips activate
      .fromTo(
        chipsRef.current.filter(Boolean),
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.45, ease: 'power2.out' },
        '-=0.35'
      )

      // 1.3s: Supporting editorial copy emerges
      .fromTo(
        descRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.45'
      )

      // 1.5s: Primary CTAs
      .fromTo(
        ctasRef.current?.children || [],
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.45, ease: 'power2.out' },
        '-=0.35'
      )

      // 1.8s: Micro-motion continuous indicator
      .fromTo(
        capRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.2'
      );

    // ------------------------------------------------------------
    // 15 & 16: LAYERED PARALLAX WITH POINTER MOVEMENT (5 DEPTH PLANES)
    // ------------------------------------------------------------
    const handleMouseMove = (e) => {
      if (!visualRef.current) return;
      const rect = heroRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      // Layer 1: Background grid & crosshairs (2-3px)
      if (gridLayerRef.current) {
        gsap.to(gridLayerRef.current, {
          x: x * 3,
          y: y * 3,
          duration: 0.4,
          ease: 'power1.out',
        });
      }

      // Layer 2: Main visual card 3D tilt (5px)
      gsap.to(visualRef.current, {
        rotateY: x * 4.5,
        rotateX: -y * 4.5,
        duration: 0.5,
        ease: 'power1.out',
      });

      // Layer 3: Central Core (8px)
      if (coreRef.current) {
        gsap.to(coreRef.current, {
          x: x * 8,
          y: y * 6,
          duration: 0.45,
          ease: 'power1.out',
        });
      }

      // Layer 4: Satellite Nodes (12px)
      nodesRef.current.filter(Boolean).forEach((nodeEl, idx) => {
        const factor = idx % 2 === 0 ? 1 : -0.7;
        gsap.to(nodeEl, {
          x: x * 12 * factor,
          y: y * 9 * factor,
          duration: 0.5,
          ease: 'power1.out',
        });
      });

      // Layer 5: Floating HUD Chips (16px)
      chipsRef.current.filter(Boolean).forEach((chipEl, idx) => {
        const factor = idx === 0 ? -1 : 1;
        gsap.to(chipEl, {
          x: x * 16 * factor,
          y: y * 12 * factor,
          duration: 0.55,
          ease: 'power1.out',
        });
      });

      // Counter-balance Parallax on Left Typography (-3px) for Optical Symmetry
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          x: x * -3,
          y: y * -2,
          duration: 0.6,
          ease: 'power1.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(
        [
          visualRef.current,
          gridLayerRef.current,
          coreRef.current,
          contentRef.current,
          ...nodesRef.current.filter(Boolean),
          ...chipsRef.current.filter(Boolean),
        ],
        {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
        }
      );
    };

    const heroEl = heroRef.current;
    if (heroEl) {
      heroEl.addEventListener('mousemove', handleMouseMove);
      heroEl.addEventListener('mouseleave', handleMouseLeave);
    }

    // ------------------------------------------------------------
    // 21: HERO SCROLL ANIMATION & TRANSITION (ScrollTrigger)
    // ------------------------------------------------------------
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroEl,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.8,
      },
    });

    scrollTl
      .to(contentRef.current, {
        y: -60,
        opacity: 0.45,
        ease: 'power1.in',
      }, 0)
      .to(visualRef.current, {
        scale: 1.04,
        y: -35,
        opacity: 0.9,
        ease: 'power1.out',
      }, 0);

    return () => {
      tl.kill();
      scrollTl.kill();
      if (heroEl) {
        heroEl.removeEventListener('mousemove', handleMouseMove);
        heroEl.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero-section section-page"
      aria-label="Cortex Freelancing Introduction"
      style={{ perspective: 1200 }}
    >
      <div className="container">
        <div className="hero-grid">
          {/* ------------------------------------------------------------
              LEFT COLUMN (~50%): KINETIC EDITORIAL TYPOGRAPHY
              ------------------------------------------------------------ */}
          <div ref={contentRef} className="hero-content">
            {/* 0.2s: Cortex Assembled Eyebrow Mark */}
            <div ref={badgeRef} className="hero-eyebrow" style={{ opacity: 0 }}>
              <span ref={badgeDotRef} className="eyebrow-accent-dot" aria-hidden="true" />
              <span>{cortexBrand.name.toUpperCase()} STUDIO</span>
            </div>

            {/* 0.6s - 0.8s: Kinetic Headline in Visual Units */}
            <h1 className="hero-headline">
              <span className="kinetic-line-mask">
                <span ref={line1Ref} className="kinetic-line-inner">
                  Turning Ideas
                </span>
              </span>
              <span className="kinetic-line-mask">
                <span ref={line2Ref} className="kinetic-line-inner">
                  Into
                </span>
              </span>
              <span className="kinetic-line-mask">
                <span ref={line3Ref} className="kinetic-line-inner kinetic-accent-word">
                  Digital Solutions.
                </span>
              </span>
            </h1>

            {/* 1.3s: Supporting Copy */}
            <p ref={descRef} className="hero-supporting" style={{ opacity: 0 }}>
              Websites, applications, AI/ML systems, automation, software, and digital experiences
              built around your actual requirements.
            </p>

            {/* 1.5s: Coordinated CTAs with Magnetic Effect */}
            <div ref={ctasRef} className="hero-ctas">
              <button
                ref={ctaBtnRef}
                type="button"
                className="btn btn-primary"
                onClick={() => scrollTo('contact')}
                data-cursor="explore"
              >
                Start Your Project
                <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => scrollTo('work')}
                data-cursor="view"
              >
                View Our Work
              </button>
            </div>

            {/* 1.8s: Bottom Continuity Micro-Motion Indicator */}
            <div ref={capRef} className="hero-capability-line" style={{ opacity: 0 }}>
              <Sparkles size={14} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
              <span>{cortexBrand.capabilityLine}</span>
            </div>
          </div>

          {/* ------------------------------------------------------------
              RIGHT COLUMN (~50%): CORTEX INTELLIGENCE SYSTEM VISUAL
              ------------------------------------------------------------ */}
          <div className="hero-visual-container">
            <div
              ref={visualRef}
              className="hero-system-visual"
              style={{
                opacity: 0,
                transformStyle: 'preserve-3d',
              }}
              data-cursor="explore"
              aria-label="Interactive Cortex Architecture System"
            >
              {/* Top HUD Telemetry Bar */}
              <div className="system-hud-bar">
                <div className="system-hud-left">
                  <div className="system-hud-dots" aria-hidden="true">
                    <span className="system-hud-dot hud-dot-red" />
                    <span className="system-hud-dot hud-dot-yellow" />
                    <span className="system-hud-dot hud-dot-green" />
                  </div>
                  <span className="system-hud-title">SYS: CORTEX-NEURAL-OS // v2.4</span>
                </div>
                <div className="system-hud-status">
                  <span className="status-ping" aria-hidden="true" />
                  <span>ONLINE · LATENCY 14MS</span>
                </div>
              </div>

              {/* Main Interactive Stage */}
              <div className="system-canvas-stage">
                {/* Layer 1: Coordinate Blueprint Grid & Crosshairs */}
                <div ref={gridLayerRef} className="system-grid-layer" style={{ opacity: 0 }}>
                  <span className="grid-crosshair cross-tl">[SYS.CTX-01]</span>
                  <span className="grid-crosshair cross-tr">[RADAR: 24.8°N]</span>
                  <span className="grid-crosshair cross-bl">[INFERENCE: EDGE]</span>
                  <span className="grid-crosshair cross-br">[100% PROD]</span>
                </div>

                {/* Layer 2: SVG Circuit Matrix with Drawing Paths & Traveling Particles */}
                <svg
                  className="system-svg-matrix"
                  viewBox="0 0 540 440"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  {/* Concentric Radar Range Rings */}
                  <circle cx="270" cy="210" r="75" className="radar-ring" />
                  <circle cx="270" cy="210" r="140" className="radar-ring" />
                  <circle cx="270" cy="210" r="200" className="radar-ring" />

                  {/* Path 1: Core -> Top-Left AI/ML Node */}
                  <path
                    ref={(el) => (svgPathsRef.current[0] = el)}
                    d="M 270 210 L 210 160 L 140 100 L 90 70"
                    className="circuit-path"
                    strokeDasharray="500"
                    strokeDashoffset="500"
                    id="path-ai"
                  />
                  {/* Path 2: Core -> Top-Right Web/Apps Node */}
                  <path
                    ref={(el) => (svgPathsRef.current[1] = el)}
                    d="M 270 210 L 330 160 L 400 100 L 450 70"
                    className="circuit-path"
                    strokeDasharray="500"
                    strokeDashoffset="500"
                    id="path-web"
                  />
                  {/* Path 3: Core -> Bottom-Right Automation Node */}
                  <path
                    ref={(el) => (svgPathsRef.current[2] = el)}
                    d="M 270 210 L 330 260 L 400 320 L 450 350"
                    className="circuit-path"
                    strokeDasharray="500"
                    strokeDashoffset="500"
                    id="path-auto"
                  />
                  {/* Path 4: Core -> Bottom-Left Security Node */}
                  <path
                    ref={(el) => (svgPathsRef.current[3] = el)}
                    d="M 270 210 L 210 260 L 140 320 L 90 350"
                    className="circuit-path"
                    strokeDasharray="500"
                    strokeDashoffset="500"
                    id="path-sec"
                  />

                  {/* Traveling Data Packet 1 (Along Path AI) */}
                  <circle r="3.5" className="circuit-particle">
                    <animateMotion
                      dur="3.2s"
                      repeatCount="indefinite"
                      path="M 270 210 L 210 160 L 140 100 L 90 70"
                      keyPoints="0;1"
                      keyTimes="0;1"
                    />
                  </circle>

                  {/* Traveling Data Packet 2 (Along Path Web) */}
                  <circle r="3.5" className="circuit-particle">
                    <animateMotion
                      dur="3.8s"
                      repeatCount="indefinite"
                      path="M 270 210 L 330 160 L 400 100 L 450 70"
                      keyPoints="0;1"
                      keyTimes="0;1"
                    />
                  </circle>

                  {/* Traveling Data Packet 3 (Along Path Automation) */}
                  <circle r="3.5" className="circuit-particle">
                    <animateMotion
                      dur="4.2s"
                      repeatCount="indefinite"
                      path="M 270 210 L 330 260 L 400 320 L 450 350"
                      keyPoints="0;1"
                      keyTimes="0;1"
                    />
                  </circle>

                  {/* Traveling Data Packet 4 (Along Path Security) */}
                  <circle r="3.5" className="circuit-particle">
                    <animateMotion
                      dur="3.6s"
                      repeatCount="indefinite"
                      path="M 270 210 L 210 260 L 140 320 L 90 350"
                      keyPoints="0;1"
                      keyTimes="0;1"
                    />
                  </circle>
                </svg>

                {/* Layer 3: Central Core ("Neural Nucleus") */}
                <div ref={coreRef} className="system-core-container" style={{ opacity: 0 }}>
                  <div className="core-ambient-aura" aria-hidden="true" />
                  <div className="core-outer-ring" aria-hidden="true" />
                  <div className="core-inner-ring" aria-hidden="true" />
                  <div className="core-nucleus">
                    <span className="core-emblem">CTX</span>
                    <span className="core-sublabel">KERNEL</span>
                  </div>
                </div>

                {/* Layer 4: Satellite Interactive System Nodes */}
                {/* Node 1: AI / ML */}
                <div
                  ref={(el) => (nodesRef.current[0] = el)}
                  className="system-node node-top-left"
                  style={{ opacity: 0 }}
                >
                  <div className="node-icon-box" style={{ color: 'var(--color-brand-primary)' }}>
                    <Cpu size={16} />
                  </div>
                  <div className="node-text">
                    <span className="node-title">AI / ML Engine</span>
                    <span className="node-detail">Neural Pipelines · 99.4%</span>
                  </div>
                </div>

                {/* Node 2: Web & Cloud */}
                <div
                  ref={(el) => (nodesRef.current[1] = el)}
                  className="system-node node-top-right"
                  style={{ opacity: 0 }}
                >
                  <div className="node-icon-box" style={{ color: 'var(--color-brand-secondary)' }}>
                    <Globe size={16} />
                  </div>
                  <div className="node-text">
                    <span className="node-title">Web & Cloud</span>
                    <span className="node-detail">React / Vite · Edge SSR</span>
                  </div>
                </div>

                {/* Node 3: Automation Hub */}
                <div
                  ref={(el) => (nodesRef.current[2] = el)}
                  className="system-node node-bottom-right"
                  style={{ opacity: 0 }}
                >
                  <div className="node-icon-box" style={{ color: '#ffbd2e' }}>
                    <Workflow size={16} />
                  </div>
                  <div className="node-text">
                    <span className="node-title">Automation</span>
                    <span className="node-detail">Autonomous Pipelines</span>
                  </div>
                </div>

                {/* Node 4: Cybersecurity */}
                <div
                  ref={(el) => (nodesRef.current[3] = el)}
                  className="system-node node-bottom-left"
                  style={{ opacity: 0 }}
                >
                  <div className="node-icon-box" style={{ color: '#27c93f' }}>
                    <ShieldCheck size={16} />
                  </div>
                  <div className="node-text">
                    <span className="node-title">Cybersecurity</span>
                    <span className="node-detail">Zero-Trust Audited Core</span>
                  </div>
                </div>

                {/* Layer 5: Floating Holographic Telemetry HUD Chips */}
                <div
                  ref={(el) => (chipsRef.current[0] = el)}
                  className="system-hud-chip chip-top"
                  style={{ opacity: 0 }}
                >
                  PRODUCTION-GRADE // SCALABLE ARCHITECTURE
                </div>
                <div
                  ref={(el) => (chipsRef.current[1] = el)}
                  className="system-hud-chip chip-bottom"
                  style={{ opacity: 0 }}
                >
                  LIVE: KRISHIGRAHAN · CORTEX P2P · MOODIFY · VIVA AI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
