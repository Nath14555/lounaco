'use client';

import { useTranslations } from 'next-intl';

export function SkipToContent() {
  const t = useTranslations('nav');

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-toast focus:px-6 focus:py-3 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-xl"
    >
      {t('skipToContent')}
    </a>
  );
}
