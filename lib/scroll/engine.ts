/**
 * SCROLL ENGINE
 * Single rAF loop driving Lenis smooth scroll + GSAP ScrollTrigger
 *
 * LIFECYCLE:
 * 1. Client component mounts → initScrollEngine()
 * 2. Lenis instance created → smooth scroll active
 * 3. rAF loop starts → update(time) called every frame
 * 4. ScrollTrigger.update() syncs with Lenis scroll position
 * 5. On unmount → destroyScrollEngine() cleans up
 *
 * USAGE:
 *   import { initScrollEngine, destroyScrollEngine } from '@/lib/scroll/engine'
 *
 *   useEffect(() => {
 *     initScrollEngine()
 *     return () => destroyScrollEngine()
 *   }, [])
 */

import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================================================
// STATE
// ============================================================================

let lenis: Lenis | null = null;
let rafId: number | null = null;

// ============================================================================
// INITIALIZATION
// ============================================================================

export function initScrollEngine(options?: {
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
}) {
  if (typeof window === 'undefined') return;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Destroy existing instance
  if (lenis) {
    destroyScrollEngine();
  }

  // Create Lenis instance
  lenis = new Lenis({
    duration: prefersReducedMotion ? 0 : (options?.duration ?? 1.2),
    easing: options?.easing ?? ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: prefersReducedMotion ? false : (options?.smoothWheel ?? true),
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Integrate with ScrollTrigger
  lenis.on('scroll', () => {
    ScrollTrigger.update();
  });

  // Start rAF loop
  function raf(time: number) {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  }

  rafId = requestAnimationFrame(raf);

  // Expose to window for debugging
  if (process.env.NODE_ENV === 'development') {
    (window as any).lenis = lenis;
  }

  return lenis;
}

// ============================================================================
// DESTRUCTION
// ============================================================================

export function destroyScrollEngine() {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  if (lenis) {
    lenis.destroy();
    lenis = null;
  }

  // Clean up ScrollTrigger instances
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Get current Lenis instance (if initialized)
 */
export function getLenis(): Lenis | null {
  return lenis;
}

/**
 * Scroll to a target element or position
 */
export function scrollTo(
  target: string | number | HTMLElement,
  options?: {
    offset?: number;
    duration?: number;
    easing?: (t: number) => number;
    immediate?: boolean;
    onComplete?: () => void;
  }
) {
  if (!lenis) {
    console.warn('Lenis not initialized. Call initScrollEngine() first.');
    return;
  }

  lenis.scrollTo(target, {
    offset: options?.offset ?? 0,
    duration: options?.duration,
    easing: options?.easing,
    immediate: options?.immediate ?? false,
    onComplete: options?.onComplete,
  });
}

/**
 * Stop smooth scroll (useful for modals, etc.)
 */
export function stopScroll() {
  lenis?.stop();
}

/**
 * Resume smooth scroll
 */
export function startScroll() {
  lenis?.start();
}

/**
 * Get current scroll position
 */
export function getScrollPosition(): number {
  return lenis?.scroll ?? window.scrollY ?? 0;
}

/**
 * Get scroll progress (0 to 1) for the entire page
 */
export function getScrollProgress(): number {
  if (!lenis) return 0;
  const { scroll, limit } = lenis;
  return limit > 0 ? scroll / limit : 0;
}
