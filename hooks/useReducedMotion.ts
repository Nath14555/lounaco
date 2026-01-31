'use client';

import { useEffect, useState } from 'react';

/**
 * useReducedMotion
 *
 * Detects user's prefers-reduced-motion setting
 * Returns true if user prefers reduced motion
 *
 * USAGE:
 *   const prefersReducedMotion = useReducedMotion()
 *   if (!prefersReducedMotion) {
 *     // Apply scroll animations
 *   }
 */

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Legacy browsers
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}
