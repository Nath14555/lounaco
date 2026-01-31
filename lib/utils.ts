import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with proper precedence
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency (EUR)
 */
export function formatCurrency(amount: number, locale: string = 'en'): string {
  return new Intl.NumberFormat(locale === 'fr' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

/**
 * Format duration (minutes to readable string)
 */
export function formatDuration(minutes: number, locale: string = 'en'): string {
  if (minutes < 60) {
    return `${minutes} ${locale === 'fr' ? 'min' : 'min'}`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) {
    return `${hours} ${locale === 'fr' ? 'h' : 'h'}`;
  }
  return `${hours}${locale === 'fr' ? 'h' : 'h'}${mins}`;
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Generate a unique ID
 */
export function generateId(prefix: string = ''): string {
  const id = Math.random().toString(36).substring(2, 9);
  return prefix ? `${prefix}-${id}` : id;
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation
 */
export function lerp(start: number, end: number, amount: number): number {
  return start + (end - start) * amount;
}

/**
 * Map a value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Check if code is running on server
 */
export const isServer = typeof window === 'undefined';

/**
 * Check if code is running on client
 */
export const isClient = !isServer;

/**
 * Safe localStorage wrapper
 */
export const storage = {
  get: (key: string): string | null => {
    if (isServer) return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key: string, value: string): void => {
    if (isServer) return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silently fail (e.g., in private browsing)
    }
  },
  remove: (key: string): void => {
    if (isServer) return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Silently fail
    }
  },
};
