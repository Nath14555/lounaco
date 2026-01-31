/**
 * MONITORING & ERROR TRACKING
 *
 * Sentry-ready abstraction for error tracking and performance monitoring
 *
 * USAGE:
 *   import { captureError, captureMessage } from '@/lib/monitoring'
 *   try { ... } catch (error) { captureError(error) }
 */

// ============================================================================
// TYPES
// ============================================================================

export interface ErrorContext {
  [key: string]: any;
}

export type SeverityLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug';

// ============================================================================
// ERROR CAPTURE
// ============================================================================

/**
 * Capture an exception
 */
export function captureError(
  error: Error | unknown,
  context?: ErrorContext
): void {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Monitoring] Error:', error, context);
  }

  // Send to Sentry (if initialized)
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(error, {
      extra: context,
    });
  }
}

/**
 * Capture a message
 */
export function captureMessage(
  message: string,
  level: SeverityLevel = 'info',
  context?: ErrorContext
): void {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Monitoring] ${level.toUpperCase()}:`, message, context);
  }

  // Send to Sentry (if initialized)
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureMessage(message, {
      level,
      extra: context,
    });
  }
}

/**
 * Set user context (no PII)
 */
export function setUserContext(userId?: string, metadata?: ErrorContext): void {
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.setUser({
      id: userId,
      ...metadata,
    });
  }
}

/**
 * Clear user context
 */
export function clearUserContext(): void {
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.setUser(null);
  }
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

/**
 * Track Web Vitals
 */
export function reportWebVitals(metric: any): void {
  // Type is 'any' to support web-vitals library types (CLSMetric, FCPMetric, etc.)
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric);
  }

  // Send to analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Send to Sentry
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureMessage(`Web Vital: ${metric.name}`, {
      level: 'info',
      extra: {
        value: metric.value,
        id: metric.id,
        label: metric.label,
      },
    });
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize monitoring (call once in root layout)
 */
export function initMonitoring(): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Monitoring] Initialized');
  }

  // Sentry initialization would go here
  // Example:
  // if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  //   Sentry.init({
  //     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  //     environment: process.env.NODE_ENV,
  //     tracesSampleRate: 0.1,
  //   })
  // }
}
