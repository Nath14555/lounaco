import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Playfair_Display, Inter, Cormorant_Garamond } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales, isValidLocale, localeMetadata } from '@/lib/i18n';
import { Providers } from '../providers';
import { SkipToContent } from '@/components/SkipToContent';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import '../globals.css';

// ============================================================================
// FONTS
// ============================================================================

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '700', '900'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-accent',
  display: 'swap',
  weight: ['400', '600'],
});

// ============================================================================
// METADATA
// ============================================================================

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;

  if (!isValidLocale(locale)) {
    return {};
  }

  const isEnglish = locale === 'en';

  return {
    title: isEnglish
      ? 'Louna&Co Pilates — Baroque Movement Experience'
      : 'Louna&Co Pilates — Expérience de Mouvement Baroque',
    description: isEnglish
      ? 'Discover the art of movement through our signature Pilates methodology. A maximalist journey through strength, grace, and transformation.'
      : "Découvrez l'art du mouvement à travers notre méthodologie Pilates signature. Un voyage maximaliste à travers force, grâce et transformation.",
    keywords: ['pilates', 'baroque', 'movement', 'wellness', 'paris', 'fitness'],
    authors: [{ name: 'Louna&Co' }],
    creator: 'Louna&Co',
    publisher: 'Louna&Co',
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      alternateLocale: locale === 'fr' ? ['en_US'] : ['fr_FR'],
      siteName: 'Louna&Co Pilates',
      title: isEnglish
        ? 'Louna&Co Pilates — Baroque Movement Experience'
        : 'Louna&Co Pilates — Expérience de Mouvement Baroque',
      description: isEnglish
        ? 'Discover the art of movement through our signature Pilates methodology.'
        : "Découvrez l'art du mouvement à travers notre méthodologie Pilates signature.",
      images: [
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Louna&Co Pilates Studio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEnglish
        ? 'Louna&Co Pilates — Baroque Movement Experience'
        : 'Louna&Co Pilates — Expérience de Mouvement Baroque',
      description: isEnglish
        ? 'Discover the art of movement through our signature Pilates methodology.'
        : "Découvrez l'art du mouvement à travers notre méthodologie Pilates signature.",
      images: ['/images/og-image.jpg'],
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        fr: '/fr',
      },
    },
  };
}

// ============================================================================
// STATIC PARAMS
// ============================================================================

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ============================================================================
// LAYOUT
// ============================================================================

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  // Validate locale
  if (!isValidLocale(locale)) {
    notFound();
  }

  // Get messages for locale
  const messages = await getMessages();

  const { direction, htmlLang } = localeMetadata[locale];

  return (
    <html
      lang={htmlLang}
      dir={direction}
      className={`${playfair.variable} ${inter.variable} ${cormorant.variable}`}
    >
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Louna&Co Pilates',
              image: '/images/og-image.jpg',
              '@id': 'https://lounaco.com',
              url: 'https://lounaco.com',
              telephone: '+33-1-23-45-67-89',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Rue Example',
                addressLocality: 'Paris',
                postalCode: '75001',
                addressCountry: 'FR',
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '07:00',
                  closes: '21:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Saturday', 'Sunday'],
                  opens: '09:00',
                  closes: '18:00',
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <Providers locale={locale} messages={messages}>
          <SkipToContent />

          {/* Header with language switcher */}
          <header className="fixed top-4 right-4 z-nav">
            <LanguageSwitcher />
          </header>

          {/* Main content */}
          <main id="main-content">{children}</main>

          {/* Footer */}
          <footer className="bg-neutral-900 text-neutral-100 py-12 px-6">
            <div className="max-w-container mx-auto text-center">
              <p className="text-sm">
                © {new Date().getFullYear()} Louna&Co Pilates. All rights reserved.
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
