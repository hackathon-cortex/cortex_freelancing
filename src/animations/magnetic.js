import { gsap, prefersReducedMotion } from './config';

/**
 * Apply magnetic hover physics to a button or interactive element
 * @param {HTMLElement} element
 * @param {number} strength - max movement in px (default: 8px)
 */
export const initMagnetic = (element, strength = 8) => {
  if (!element || prefersReducedMotion()) return () => {};

  // Check if touch device
  if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) {
    return () => {};
  }

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    gsap.to(element, {
      x: x * (strength / (rect.width / 2)),
      y: y * (strength / (rect.height / 2)),
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};
