import React, { useEffect, useRef } from 'react';
import { gsap, prefersReducedMotion } from '../animations/config';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const markRef = useRef(null);
  const dotRef = useRef(null);
  const subtextRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onComplete?.();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
      },
    });

    // Digital Boot Sequence (~1100ms total)
    tl.set(containerRef.current, { display: 'flex', opacity: 1 })
      .fromTo(
        markRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' }
      )
      .fromTo(
        dotRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.2, ease: 'back.out(2)' },
        '-=0.15'
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
        '-=0.1'
      )
      .fromTo(
        barRef.current,
        { width: '0%' },
        { width: '100%', duration: 0.45, ease: 'power2.inOut' },
        '-=0.1'
      )
      .to(containerRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        opacity: 0,
        duration: 0.45,
        ease: 'power3.inOut',
        delay: 0.05,
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <aside
      ref={containerRef}
      className="cortex-preloader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#000000',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        clipPath: 'inset(0% 0% 0% 0%)',
      }}
      aria-label="Loading Cortex Freelancing"
      role="status"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span
          ref={markRef}
          style={{
            fontSize: 'clamp(36px, 6vw, 68px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          CORTEX
        </span>
        <span
          ref={dotRef}
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-brand-primary)',
            display: 'inline-block',
          }}
          aria-hidden="true"
        />
      </div>

      <div
        ref={subtextRef}
        style={{
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginTop: '16px',
          color: 'var(--color-text-on-inverse-muted)',
          fontWeight: 600,
        }}
      >
        DIGITAL SOLUTIONS · INTELLIGENT TECHNOLOGY
      </div>

      <div
        style={{
          width: 'min(260px, 65vw)',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.15)',
          marginTop: '20px',
          borderRadius: '999px',
          overflow: 'hidden',
        }}
      >
        <div
          ref={barRef}
          style={{
            height: '100%',
            width: '0%',
            backgroundColor: 'var(--color-brand-primary)',
          }}
        />
      </div>
    </aside>
  );
}
