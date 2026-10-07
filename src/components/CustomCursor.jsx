import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default'); // 'default' | 'hover' | 'hold' | 'view' | 'drag'
  const [cursorLabel, setCursorLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Only enable on desktop with fine pointer and no reduced-motion
    const isTouch = window.matchMedia('(hover: none) or (pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target.closest(
        '[data-cursor], a, button, .project-card, .work-stage-visual-box, .marquee-container'
      );
      if (target) {
        const customCursor = target.getAttribute('data-cursor');
        if (customCursor) {
          setCursorType(customCursor.toLowerCase());
          setCursorLabel(customCursor.toUpperCase());
        } else if (target.classList.contains('work-stage-visual-box')) {
          setCursorType('hold');
          setCursorLabel('HOLD');
        } else if (target.classList.contains('marquee-container')) {
          setCursorType('drag');
          setCursorLabel('DRAG');
        } else if (target.tagName === 'A' || target.tagName === 'BUTTON') {
          setCursorType('hover');
          setCursorLabel('');
        }
      } else {
        setCursorType('default');
        setCursorLabel('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth Lerp Animation Loop (0.15 interpolation factor)
    const render = () => {
      const lerp = 0.18;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={cursorRef}
      className={`cortex-cursor ${cursorType}`}
      aria-hidden="true"
    >
      {cursorLabel && <span className="cursor-label">{cursorLabel}</span>}
    </div>
  );
}
