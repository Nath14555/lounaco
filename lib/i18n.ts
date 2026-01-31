import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Supported locales
export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'en';

// Locale labels (for language switcher)
export const localeLabels: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
};

// Locale metadata
export const localeMetadata: Record<
  Locale,
  { direction: 'ltr' | 'rtl'; htmlLang: string }
> = {
  en: { direction: 'ltr', htmlLang: 'en-US' },
  fr: { direction: 'ltr', htmlLang: 'fr-FR' },
};

// Helper to check if a locale is valid
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// next-intl configuration
export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!isValidLocale(locale)) {
    notFound();
  }

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
