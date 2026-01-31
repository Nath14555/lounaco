'use client';

import { useEffect, useState } from 'react';

/**
 * useMediaQuery
 *
 * Reactive media query hook
 * Returns true if the media query matches
 *
 * USAGE:
 *   const isMobile = useMediaQuery('(max-width: 768px)')
 *   const isDesktop = useMediaQuery('(min-width: 1024px)')
 */

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
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
  }, [query]);

  return matches;
}
