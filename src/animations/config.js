import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Check reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Standardized easing and durations derived from design tokens
export const motionTokens = {
  duration: {
    micro: 0.15,
    small: 0.28,
    medium: 0.45,
    large: 0.75,
    cinematic: 1.1,
  },
  ease: {
    standard: 'power2.out',
    enter: 'power3.out',
    exit: 'power2.in',
    smooth: 'expo.out',
    spring: 'back.out(1.5)',
  },
};

// Lenis smooth scroll instance
let lenisInstance = null;

export const initSmoothScroll = () => {
  if (typeof window === 'undefined' || prefersReducedMotion()) return null;

  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential deceleration
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  // Synchronize Lenis with GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
};

export const getSmoothScroll = () => lenisInstance;

export { gsap, ScrollTrigger };
