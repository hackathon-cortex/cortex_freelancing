import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap, prefersReducedMotion } from '../animations/config';

export default function Preloader({ onComplete }) {
  const containerRef = useRef(null);
  const markRef = useRef(null);
  const dotRef = useRef(null);
  const subtextRef = useRef(null);
  const barRef = useRef(null);
  const scrollHintRef = useRef(null);
  const dismissedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      if (containerRef.current) {
        containerRef.current.style.display = 'none';
      }
      onComplete?.();
      return;
    }

    const dismiss = () => {
      if (dismissedRef.current) return;
      dismissedRef.current = true;

      // Smooth slide-up exit transition
      gsap.to(containerRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        opacity: 0,
        duration: 0.65,
        ease: 'power3.inOut',
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display = 'none';
          }
          onComplete?.();
        }
      });
    };

    // Digital Boot Sequence
    const tl = gsap.timeline();

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
      .fromTo(
        scrollHintRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '+=0.1'
      );

    // Scroll, touch, key, or click triggers dismissal
    let isUserEngaged = false;

    // Reset scroll to top on initial boot
    window.scrollTo(0, 0);

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 2 || Math.abs(e.deltaX) > 2) {
        dismiss();
      }
    };

    let startTouchY = 0;
    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        startTouchY = e.touches[0].clientY;
        isUserEngaged = true;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const diff = Math.abs(e.touches[0].clientY - startTouchY);
        if (diff > 6) {
          dismiss();
        }
      }
    };

    const handleKeyDown = (e) => {
      if (['ArrowDown', 'PageDown', 'Space', 'Enter'].includes(e.key)) {
        dismiss();
      }
    };

    // Only listen to scroll after small delay to avoid browser scroll restoration triggering it
    const scrollTimeout = setTimeout(() => {
      const handleScroll = () => {
        if (isUserEngaged || window.scrollY > 20) {
          dismiss();
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
    }, 400);

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      tl.kill();
      clearTimeout(scrollTimeout);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <aside
      ref={containerRef}
      className="cortex-preloader"
      onClick={() => {
        if (!dismissedRef.current) {
          dismissedRef.current = true;
          gsap.to(containerRef.current, {
            clipPath: 'inset(0% 0% 100% 0%)',
            opacity: 0,
            duration: 0.65,
            ease: 'power3.inOut',
            onComplete: () => {
              if (containerRef.current) containerRef.current.style.display = 'none';
              onComplete?.();
            }
          });
        }
      }}
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
        cursor: 'pointer',
        userSelect: 'none'
      }}
      aria-label="Loading Cortex Freelancing. Scroll to enter."
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

      {/* Scroll indicator - prompts user to scroll */}
      <div
        ref={scrollHintRef}
        style={{
          marginTop: '44px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0,
        }}
      >
        <span
          style={{
            fontSize: '10px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.65)',
            fontWeight: 700,
          }}
        >
          Scroll to explore
        </span>
        <ChevronDown
          size={16}
          style={{
            color: 'var(--color-brand-primary)',
            animation: 'bounceHint 1.6s infinite ease-in-out',
          }}
          aria-hidden="true"
        />
      </div>

      <style>{`
        @keyframes bounceHint {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(5px); opacity: 1; }
        }
      `}</style>
    </aside>
  );
}
