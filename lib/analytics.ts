/**
 * ANALYTICS ABSTRACTION
 *
 * Pluggable analytics layer for tracking user events
 * Compatible with GA4, Segment, Mixpanel, etc.
 *
 * PRIVACY:
 * - No PII tracked
 * - Events are debounced/throttled
 * - Respects DNT headers
 *
 * USAGE:
 *   import { trackEvent } from '@/lib/analytics'
 *   trackEvent('chapter_view', { chapter: 'movement' })
 */

// ============================================================================
// TYPES
// ============================================================================

export type AnalyticsEvent =
  | 'chapter_view'
  | 'section_view'
  | 'cta_click'
  | 'video_play'
  | 'video_complete'
  | 'language_switch'
  | 'page_view';

export interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const DEBOUNCE_MS = 300;
const THROTTLE_MS = 1000;

// Respect Do Not Track
function shouldTrack(): boolean {
  if (typeof window === 'undefined') return false;
  if (process.env.NODE_ENV === 'development') return true; // Log in dev
  if (navigator.doNotTrack === '1') return false;
  return true;
}

// ============================================================================
// DEBOUNCE & THROTTLE UTILITIES
// ============================================================================

const eventTimestamps = new Map<string, number>();

function isThrottled(eventName: string): boolean {
  const now = Date.now();
  const lastTime = eventTimestamps.get(eventName);

  if (!lastTime || now - lastTime > THROTTLE_MS) {
    eventTimestamps.set(eventName, now);
    return false;
  }

  return true;
}

// ============================================================================
// TRACKING FUNCTIONS
// ============================================================================

/**
 * Track a custom event
 */
export function trackEvent(
  eventName: AnalyticsEvent,
  properties?: EventProperties
): void {
  if (!shouldTrack()) return;

  // Throttle certain events to avoid spam
  const throttledEvents: AnalyticsEvent[] = ['section_view'];
  if (throttledEvents.includes(eventName) && isThrottled(eventName)) {
    return;
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, properties);
  }

  // Send to analytics provider
  if (typeof window !== 'undefined' && (window as any).gtag) {
    // Google Analytics 4
    (window as any).gtag('event', eventName, properties);
  }

  // Add other providers here (Segment, Mixpanel, etc.)
  if (typeof window !== 'undefined' && (window as any).analytics) {
    // Segment
    (window as any).analytics.track(eventName, properties);
  }
}

/**
 * Track a page view
 */
export function trackPageView(url: string, title?: string): void {
  trackEvent('page_view', {
    page_path: url,
    page_title: title || document.title,
  });
}

/**
 * Track chapter view (with debounce)
 */
let chapterDebounceTimer: NodeJS.Timeout | null = null;
export function trackChapterView(chapterId: string): void {
  if (chapterDebounceTimer) {
    clearTimeout(chapterDebounceTimer);
  }

  chapterDebounceTimer = setTimeout(() => {
    trackEvent('chapter_view', { chapter: chapterId });
  }, DEBOUNCE_MS);
}

/**
 * Track section view (with throttle)
 */
export function trackSectionView(sectionId: string): void {
  trackEvent('section_view', { section: sectionId });
}

/**
 * Track CTA click
 */
export function trackCTAClick(ctaId: string, destination?: string): void {
  trackEvent('cta_click', {
    cta_id: ctaId,
    destination,
  });
}

/**
 * Track video events
 */
export function trackVideoPlay(videoId: string): void {
  trackEvent('video_play', { video_id: videoId });
}

export function trackVideoComplete(videoId: string): void {
  trackEvent('video_complete', { video_id: videoId });
}

/**
 * Track language switch
 */
export function trackLanguageSwitch(locale: string): void {
  trackEvent('language_switch', { locale });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize analytics (call once in root layout)
 */
export function initAnalytics(): void {
  if (!shouldTrack()) return;

  // Set up any global listeners here
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Initialized');
  }
}
