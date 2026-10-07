import { gsap, prefersReducedMotion } from './config';

/**
 * Apply 3D perspective mouse tilt to a card or stage
 * @param {HTMLElement} element
 * @param {number} maxRotation - degrees (default: 3)
 */
export const initTilt = (element, maxRotation = 3) => {
  if (!element || prefersReducedMotion()) return () => {};

  if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) {
    return () => {};
  }

  const handleMouseMove = (e) => {
    const rect = element.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(element, {
      rotateY: x * maxRotation * 2,
      rotateX: -y * maxRotation * 2,
      transformPerspective: 900,
      duration: 0.35,
      ease: 'power1.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  element.addEventListener('mousemove', handleMouseMove);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mousemove', handleMouseMove);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};
