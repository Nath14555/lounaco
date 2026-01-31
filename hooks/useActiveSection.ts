'use client';

import { useEffect, useState } from 'react';

/**
 * useActiveSection
 *
 * Detects which section is currently in view using IntersectionObserver
 * Returns the ID of the active section
 *
 * USAGE:
 *   const activeSection = useActiveSection(['chapter-movement', 'chapter-classes'])
 *
 * MAPPING:
 * - Observer watches each section with threshold 0.3 (30% visible)
 * - When intersection ratio > threshold, section becomes active
 * - Updates URL hash without scroll jitter
 */

export function useActiveSection(
  sectionIds: string[],
  options?: {
    threshold?: number;
    rootMargin?: string;
    updateHash?: boolean;
  }
): string | null {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || sectionIds.length === 0) return;

    const threshold = options?.threshold ?? 0.3;
    const rootMargin = options?.rootMargin ?? '0px 0px -50% 0px';
    const updateHash = options?.updateHash ?? true;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the most visible section
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);

      if (visibleEntries.length > 0) {
        // Sort by intersection ratio (most visible first)
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const mostVisible = visibleEntries[0];
        const sectionId = mostVisible.target.id;

        setActiveSection(sectionId);

        // Update URL hash without triggering scroll
        if (updateHash && sectionId) {
          const newHash = `#${sectionId}`;
          if (window.location.hash !== newHash) {
            history.replaceState(null, '', newHash);
          }
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold,
      rootMargin,
    });

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, options?.threshold, options?.rootMargin, options?.updateHash]);

  return activeSection;
}
