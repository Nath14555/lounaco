import { setRequestLocale } from 'next-intl/server';
import { Frame } from '@/components/Frame';

const membershipTiers = [
  {
    id: 'essentials',
    name: { en: 'Essentials', fr: 'Essentiel' },
    price: 89,
    classes: 4,
    features: {
      en: ['4 classes per month', 'Access to mat classes', 'Online booking'],
      fr: ['4 cours par mois', 'Accès aux cours au tapis', 'Réservation en ligne'],
    },
  },
  {
    id: 'signature',
    name: { en: 'Signature', fr: 'Signature' },
    price: 149,
    classes: 8,
    featured: true,
    features: {
      en: [
        '8 classes per month',
        'All equipment classes',
        'Priority booking',
        'Guest passes (2/month)',
      ],
      fr: [
        '8 cours par mois',
        'Tous les cours avec équipement',
        'Réservation prioritaire',
        'Invitations (2/mois)',
      ],
    },
  },
  {
    id: 'unlimited',
    name: { en: 'Unlimited', fr: 'Illimité' },
    price: 249,
    classes: -1,
    features: {
      en: [
        'Unlimited classes',
        'All equipment & specialty',
        'First-class booking',
        'Private session discount (20%)',
        'Guest passes (4/month)',
      ],
      fr: [
        'Cours illimités',
        'Tous équipements & spécialités',
        'Réservation prioritaire absolue',
        'Réduction sessions privées (20%)',
        'Invitations (4/mois)',
      ],
    },
  },
];

interface MembershipsPageProps {
  params: {
    locale: string;
  };
}

export default async function MembershipsPage({ params }: MembershipsPageProps) {
  const { locale } = params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-container mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="font-display text-6xl md:text-7xl text-primary-900 mb-4">
            {locale === 'fr' ? 'Abonnements' : 'Memberships'}
          </h1>
          <p className="font-accent text-2xl text-primary-700">
            {locale === 'fr'
              ? 'Choisissez le plan qui correspond à votre parcours'
              : 'Choose the plan that fits your journey'}
          </p>
        </header>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {membershipTiers.map((tier) => (
            <Frame
              key={tier.id}
              ornate={tier.featured}
              className="flex flex-col h-full"
            >
              <h3 className="font-display text-3xl text-primary-900 mb-2">
                {tier.name[locale as 'en' | 'fr']}
              </h3>

              <div className="mb-6">
                <span className="font-display text-5xl text-primary-700">
                  €{tier.price}
                </span>
                <span className="text-neutral-600">/
                  {locale === 'fr' ? 'mois' : 'month'}
                </span>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {tier.features[locale as 'en' | 'fr'].map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-gold flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/contact"
                className="block w-full text-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {locale === 'fr' ? 'Commencer' : 'Get Started'}
              </a>
            </Frame>
          ))}
        </div>
      </div>
    </div>
  );
}
