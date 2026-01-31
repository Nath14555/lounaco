'use client';

import { ReactNode, useEffect } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { initScrollEngine, destroyScrollEngine } from '@/lib/scroll/engine';
import { initAnalytics } from '@/lib/analytics';
import { initMonitoring, reportWebVitals } from '@/lib/monitoring';

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: any;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  useEffect(() => {
    // Initialize monitoring
    initMonitoring();

    // Initialize analytics
    initAnalytics();

    // Initialize scroll engine
    initScrollEngine();

    return () => {
      destroyScrollEngine();
    };
  }, []);

  // Report Web Vitals
  useEffect(() => {
    if (typeof window !== 'undefined' && 'web-vital' in window) {
      const { onCLS, onFID, onFCP, onLCP, onTTFB } = require('web-vitals');

      onCLS(reportWebVitals);
      onFID(reportWebVitals);
      onFCP(reportWebVitals);
      onLCP(reportWebVitals);
      onTTFB(reportWebVitals);
    }
  }, []);

  return (
    <ErrorBoundary>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </ErrorBoundary>
  );
}
