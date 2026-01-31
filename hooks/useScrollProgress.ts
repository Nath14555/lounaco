'use client';

import { useEffect, useState } from 'react';
import { getLenis } from '@/lib/scroll/engine';

/**
 * useScrollProgress
 *
 * Returns scroll progress (0 to 1) for:
 * - Entire page (no target)
 * - Specific element (pass ref or selector)
 *
 * Updates on scroll via Lenis event listener
 *
 * USAGE:
 *   const progress = useScrollProgress() // Page progress
 *   const sectionProgress = useScrollProgress('#section-id') // Section progress
 */

export function useScrollProgress(target?: string | HTMLElement | null): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    function updateProgress() {
      if (!target) {
        // Page progress
        const { scroll, limit } = lenis!;
        setProgress(limit > 0 ? scroll / limit : 0);
      } else {
        // Element progress
        const element =
          typeof target === 'string' ? document.querySelector(target) : target;

        if (!element) {
          setProgress(0);
          return;
        }

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;

        const scrollStart = elementTop - windowHeight;
        const scrollEnd = elementTop + elementHeight;
        const scrollRange = scrollEnd - scrollStart;

        const currentScroll = window.scrollY;
        const elementProgress = (currentScroll - scrollStart) / scrollRange;

        setProgress(Math.max(0, Math.min(1, elementProgress)));
      }
    }

    // Initial calculation
    updateProgress();

    // Listen to Lenis scroll events
    lenis.on('scroll', updateProgress);

    return () => {
      lenis.off('scroll', updateProgress);
    };
  }, [target]);

  return progress;
}
