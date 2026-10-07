import { gsap, prefersReducedMotion, motionTokens } from './config';

/**
 * Animate elements line-by-line using mask/clipping
 * @param {HTMLElement|string} target
 * @param {Object} options
 */
export const initTextReveal = (target, options = {}) => {
  if (prefersReducedMotion()) return null;

  const elements = typeof target === 'string' ? document.querySelectorAll(target) : [target];
  if (!elements || elements.length === 0) return null;

  return gsap.fromTo(
    elements,
    {
      y: '115%',
      opacity: 0,
    },
    {
      y: '0%',
      opacity: 1,
      duration: options.duration || motionTokens.duration.large,
      stagger: options.stagger !== undefined ? options.stagger : 0.08,
      ease: motionTokens.ease.smooth,
      delay: options.delay || 0,
      scrollTrigger: options.scrollTrigger || null,
    }
  );
};
