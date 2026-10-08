import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Layers, CheckCircle2, Terminal, BarChart2, MessageSquare } from 'lucide-react';
import { cortexBrand } from '../data/cortexData';
import { gsap, ScrollTrigger, prefersReducedMotion } from '../animations/config';

export default function HeroSection() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const descRef = useRef(null);
  const ctasRef = useRef(null);
  const capRef = useRef(null);

  // Idea -> Solution Morph Canvas Refs
  const canvasCardRef = useRef(null);
  const wireframeSvgRef = useRef(null);
  const filledUiRef = useRef(null);
  const chipsLayerRef = useRef(null);
  const loopTlRef = useRef(null);

  // Entrance Timeline & Looping Canvas
  useEffect(() => {
    const isReduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // 1. Entrance timeline for left column typography
      const entranceTl = gsap.timeline({
        delay: 0.15,
        defaults: { ease: 'power3.out' }
      });

      if (!isReduced) {
        entranceTl
          .fromTo(badgeRef.current, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.5 })
          .fromTo(
            [line1Ref.current, line2Ref.current, line3Ref.current],
            { y: '105%', opacity: 0 },
            {
              y: '0%',
              opacity: 1,
              duration: 0.7,
              stagger: 0.12,
              clearProps: 'transform,clipPath'
            },
            '-=0.25'
          )
          .fromTo(descRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
          .fromTo(ctasRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
          .fromTo(capRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2')
          .fromTo(canvasCardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.6');
      } else {
        gsap.set(
          [
            badgeRef.current,
            line1Ref.current,
            line2Ref.current,
            line3Ref.current,
            descRef.current,
            ctasRef.current,
            capRef.current,
            canvasCardRef.current
          ],
          { opacity: 1, y: 0, clearProps: 'transform,clipPath' }
        );
      }

      // 2. Looping "Idea -> Solution" Morph Animation (~8s cycle)
      if (!isReduced && wireframeSvgRef.current && filledUiRef.current && chipsLayerRef.current) {
        const wirePaths = wireframeSvgRef.current.querySelectorAll('.wire-path');
        const filledElements = filledUiRef.current;
        const chips = chipsLayerRef.current.querySelectorAll('.morph-floating-chip');

        // Master 8s looping timeline
        const loopTl = gsap.timeline({
          repeat: -1,
          repeatDelay: 1.2
        });
        loopTlRef.current = loopTl;

        // Stage 1: Reset to Wireframe & Draw dashed outlines (0s -> 2.6s)
        loopTl
          .set(filledElements, { opacity: 0 })
          .set(chips, { opacity: 0, y: 10, scale: 0.9 })
          .set(wirePaths, { strokeDashoffset: 350, opacity: 1 })
          .to(wirePaths, {
            strokeDashoffset: 0,
            duration: 1.8,
            stagger: 0.1,
            ease: 'power2.inOut'
          })
          // Stage 2: Morph Wireframe -> Filled Production UI (2.6s -> 5.2s)
          .to(wirePaths, {
            opacity: 0.15,
            duration: 0.5,
            ease: 'power1.out'
          }, '+=0.2')
          .fromTo(
            filledElements,
            { opacity: 0, scale: 0.98 },
            { opacity: 1, scale: 1, duration: 0.7, ease: 'power2.out' },
            '<0.1'
          )
          // Stage 3: Real Service & Project Chips Pop (5.2s -> 7.4s)
          .to(chips, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.18,
            ease: 'back.out(1.7)'
          }, '+=0.3')
          // Stage 4: Hold view before looping (7.4s -> 8.0s)
          .to({}, { duration: 1.2 });
      } else if (isReduced) {
        // Show Stage 2 static completed state
        if (filledUiRef.current) {
          gsap.set(filledUiRef.current, { opacity: 1, scale: 1 });
        }
        if (chipsLayerRef.current) {
          const chips = chipsLayerRef.current.querySelectorAll('.morph-floating-chip');
          gsap.set(chips, { opacity: 1, y: 0, scale: 1 });
        }
        if (wireframeSvgRef.current) {
          gsap.set(wireframeSvgRef.current, { opacity: 0 });
        }
      }
    }, heroRef);

    // Visibility & Intersection Observers to pause/resume loop
    const handleVisibilityChange = () => {
      if (!loopTlRef.current) return;
      if (document.hidden) {
        loopTlRef.current.pause();
      } else {
        loopTlRef.current.resume();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!loopTlRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loopTlRef.current.resume();
          } else {
            loopTlRef.current.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (canvasCardRef.current) {
      observer.observe(canvasCardRef.current);
    }

    return () => {
      ctx.revert();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
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
    >
      <div className="container">
        <div className="hero-grid">
          {/* ------------------------------------------------------------
              LEFT COLUMN: KINETIC EDITORIAL TYPOGRAPHY
              ------------------------------------------------------------ */}
          <div ref={contentRef} className="hero-content">
            {/* Eyebrow Mark */}
            <div ref={badgeRef} className="hero-eyebrow">
              <span className="eyebrow-accent-dot" aria-hidden="true" />
              <span>{cortexBrand.name.toUpperCase()} STUDIO</span>
            </div>

            {/* Kinetic Headline */}
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

            {/* Supporting Copy */}
            <p ref={descRef} className="hero-supporting">
              Websites, applications, AI/ML systems, automation, software, and digital experiences
              built around your actual requirements.
            </p>

            {/* Coordinated CTAs (Standard CSS hover, casing consistent) */}
            <div ref={ctasRef} className="hero-ctas">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => scrollTo('contact')}
              >
                Start a project
                <ArrowRight size={18} className="btn-arrow" aria-hidden="true" />
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => scrollTo('work')}
              >
                View Our Work
              </button>
            </div>

            {/* Bottom Continuity Indicator */}
            <div ref={capRef} className="hero-capability-line">
              <Sparkles size={14} style={{ color: 'var(--color-brand-primary)' }} aria-hidden="true" />
              <span>{cortexBrand.capabilityLine}</span>
            </div>
          </div>

          {/* ------------------------------------------------------------
              RIGHT COLUMN: "IDEA -> SOLUTION" LIGHT CANVAS MORPH CARD
              ------------------------------------------------------------ */}
          <div className="hero-visual-container">
            <div
              ref={canvasCardRef}
              className="morph-canvas-card"
              role="region"
              aria-label="Interactive product canvas demonstrating the transformation from wireframe idea to shipped digital solution"
            >
              {/* Card Header: Mini Browser Chrome */}
              <div className="morph-card-header">
                <div className="morph-header-dots" aria-hidden="true">
                  <span className="dot dot-red" />
                  <span className="dot dot-amber" />
                  <span className="dot dot-green" />
                </div>
                <div className="morph-header-title">
                  <span className="morph-brand-indicator">CTX // PRODUCT CANVAS</span>
                </div>
                <div className="morph-header-badge">
                  <span className="morph-live-dot" aria-hidden="true" />
                  <span>PRODUCTION ARCHITECTURE</span>
                </div>
              </div>

              {/* Main Interactive Morph Stage */}
              <div className="morph-stage-area">
                {/* ============================================================
                    STAGE 1: HAND-DRAWN WIREFRAME SVG (Dashed Outlines)
                   ============================================================ */}
                <svg
                  ref={wireframeSvgRef}
                  className="morph-wireframe-svg"
                  viewBox="0 0 460 330"
                  fill="none"
                  preserveAspectRatio="xMidYMid meet"
                  aria-hidden="true"
                >
                  {/* Top Header Bar Wireframe */}
                  <rect
                    x="20"
                    y="18"
                    width="420"
                    height="32"
                    rx="4"
                    className="wire-path"
                    strokeDasharray="350"
                  />
                  {/* Nav Dots */}
                  <line x1="45" y1="34" x2="90" y2="34" className="wire-path" strokeDasharray="350" />
                  <line x1="330" y1="34" x2="360" y2="34" className="wire-path" strokeDasharray="350" />
                  <line x1="380" y1="34" x2="420" y2="34" className="wire-path" strokeDasharray="350" />

                  {/* Hero Block Wireframe */}
                  <rect
                    x="20"
                    y="62"
                    width="420"
                    height="95"
                    rx="6"
                    className="wire-path"
                    strokeDasharray="350"
                  />
                  <line x1="40" y1="90" x2="220" y2="90" className="wire-path" strokeDasharray="350" strokeWidth="2.5" />
                  <line x1="40" y1="110" x2="180" y2="110" className="wire-path" strokeDasharray="350" />
                  <rect
                    x="40"
                    y="126"
                    width="85"
                    height="20"
                    rx="10"
                    className="wire-path"
                    strokeDasharray="350"
                  />

                  {/* 3 Grid Cards Wireframe */}
                  <rect
                    x="20"
                    y="170"
                    width="130"
                    height="135"
                    rx="6"
                    className="wire-path"
                    strokeDasharray="350"
                  />
                  <rect
                    x="165"
                    y="170"
                    width="130"
                    height="135"
                    rx="6"
                    className="wire-path"
                    strokeDasharray="350"
                  />
                  <rect
                    x="310"
                    y="170"
                    width="130"
                    height="135"
                    rx="6"
                    className="wire-path"
                    strokeDasharray="350"
                  />
                </svg>

                {/* ============================================================
                    STAGE 2: FILLED PRODUCTION UI (Real Tokens + Details)
                   ============================================================ */}
                <div ref={filledUiRef} className="morph-filled-ui" aria-hidden="true">
                  {/* Production Header */}
                  <div className="filled-header">
                    <div className="filled-brand">
                      <span className="brand-dot" />
                      <span className="brand-name">CORTEX</span>
                    </div>
                    <div className="filled-nav">
                      <span className="nav-item">Work</span>
                      <span className="nav-item">Services</span>
                      <span className="nav-btn">Launch</span>
                    </div>
                  </div>

                  {/* Production Hero Banner */}
                  <div className="filled-hero">
                    <div className="filled-hero-text">
                      <span className="filled-hero-badge">AI & WEB SYSTEMS</span>
                      <h4 className="filled-hero-title">Intelligent Digital Products</h4>
                      <p className="filled-hero-sub">Engineered for real business results.</p>
                    </div>
                    <button type="button" className="filled-hero-cta" tabIndex="-1">
                      Explore
                    </button>
                  </div>

                  {/* Production 3-Card Architecture Grid */}
                  <div className="filled-cards-row">
                    {/* Card 1: Blue Analytics / Chart Block */}
                    <div className="filled-card card-blue">
                      <div className="card-top">
                        <BarChart2 size={14} className="card-icon" />
                        <span className="card-title">Analytics</span>
                      </div>
                      <div className="mini-chart">
                        <span className="chart-bar" style={{ height: '40%' }} />
                        <span className="chart-bar" style={{ height: '75%' }} />
                        <span className="chart-bar" style={{ height: '60%' }} />
                        <span className="chart-bar" style={{ height: '90%' }} />
                      </div>
                      <span className="card-foot">Live telemetry</span>
                    </div>

                    {/* Card 2: Peach AI Chat Block */}
                    <div className="filled-card card-peach">
                      <div className="card-top">
                        <MessageSquare size={14} className="card-icon" />
                        <span className="card-title">Viva AI</span>
                      </div>
                      <div className="mini-bubble">
                        <span className="bubble-text">Pipeline ready.</span>
                      </div>
                      <span className="card-foot">Smart assistant</span>
                    </div>

                    {/* Card 3: Black Code Snippet Block */}
                    <div className="filled-card card-dark">
                      <div className="card-top">
                        <Terminal size={14} className="card-icon" />
                        <span className="card-title">Build</span>
                      </div>
                      <div className="mini-code">
                        <code>cortex deploy</code>
                      </div>
                      <span className="card-foot">Verified ready</span>
                    </div>
                  </div>
                </div>

                {/* ============================================================
                    STAGE 3: FLOATING SERVICE & PROJECT CHIPS (Real Data Only)
                   ============================================================ */}
                <div ref={chipsLayerRef} className="morph-chips-layer" aria-hidden="true">
                  {/* Real Service Chip 1 */}
                  <div className="morph-floating-chip chip-service-1">
                    <span className="chip-pill">Web</span>
                    <span className="chip-project">KrishiGrahan</span>
                  </div>

                  {/* Real Service Chip 2 */}
                  <div className="morph-floating-chip chip-service-2">
                    <span className="chip-pill chip-pill-ai">AI/ML</span>
                    <span className="chip-project">Moodify</span>
                  </div>

                  {/* Real Service Chip 3 */}
                  <div className="morph-floating-chip chip-service-3">
                    <span className="chip-pill chip-pill-auto">Automation</span>
                    <span className="chip-project">Mediqueue</span>
                  </div>
                </div>
              </div>

              {/* Bottom Caption Strip: "Idea → Design → Build → Ship" */}
              <div className="morph-caption-strip">
                <span className="caption-step">Idea</span>
                <span className="caption-arrow">→</span>
                <span className="caption-step">Design</span>
                <span className="caption-arrow">→</span>
                <span className="caption-step">Build</span>
                <span className="caption-arrow">→</span>
                <span className="caption-step caption-ship">Ship</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
