'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales, localeLabels } from '@/lib/i18n';
import { trackLanguageSwitch } from '@/lib/analytics';
import { cn } from '@/lib/utils';

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === locale) return;

    // Preserve current hash (chapter navigation)
    const hash = window.location.hash;

    // Replace locale in pathname
    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);

    // Track analytics
    trackLanguageSwitch(newLocale);

    // Navigate
    router.push(`${newPathname}${hash}`);
  };

  return (
    <div className={cn('flex gap-2', className)}>
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          className={cn(
            'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
            locale === loc
              ? 'bg-gold text-neutral-950'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
          )}
          aria-current={locale === loc ? 'true' : undefined}
          aria-label={`Switch to ${localeLabels[loc]}`}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}
