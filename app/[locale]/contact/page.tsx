import { setRequestLocale } from 'next-intl/server';
import { Frame } from '@/components/Frame';

interface ContactPageProps {
  params: {
    locale: string;
  };
}

export default function ContactPage({ params }: ContactPageProps) {
  const { locale } = params;

  // Enable static rendering
  setRequestLocale(locale);

  const content = {
    en: {
      title: 'Visit Us',
      subtitle: 'Experience the baroque difference',
      address: 'Address',
      addressValue: '123 Rue de Example, 75001 Paris, France',
      phone: 'Phone',
      phoneValue: '+33 1 23 45 67 89',
      email: 'Email',
      emailValue: 'hello@lounaco.com',
      hours: 'Hours',
      hoursValue: [
        'Monday - Friday: 7:00 AM - 9:00 PM',
        'Saturday - Sunday: 9:00 AM - 6:00 PM',
      ],
      cta: 'Book a Trial Class',
    },
    fr: {
      title: 'Nous Rendre Visite',
      subtitle: 'Découvrez la différence baroque',
      address: 'Adresse',
      addressValue: '123 Rue de Example, 75001 Paris, France',
      phone: 'Téléphone',
      phoneValue: '+33 1 23 45 67 89',
      email: 'Email',
      emailValue: 'hello@lounaco.com',
      hours: 'Horaires',
      hoursValue: [
        'Lundi - Vendredi: 7h00 - 21h00',
        'Samedi - Dimanche: 9h00 - 18h00',
      ],
      cta: 'Réserver un cours d\'essai',
    },
  };

  const t = content[locale as 'en' | 'fr'];

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="font-display text-6xl md:text-7xl text-primary-900 mb-4">
            {t.title}
          </h1>
          <p className="font-accent text-2xl text-primary-700">{t.subtitle}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact info */}
          <Frame ornate>
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl text-primary-900 mb-2">
                  {t.address}
                </h3>
                <p className="text-neutral-700">{t.addressValue}</p>
              </div>

              <div>
                <h3 className="font-display text-2xl text-primary-900 mb-2">
                  {t.phone}
                </h3>
                <a
                  href="tel:+33123456789"
                  className="text-neutral-700 hover:text-primary-700"
                >
                  {t.phoneValue}
                </a>
              </div>

              <div>
                <h3 className="font-display text-2xl text-primary-900 mb-2">
                  {t.email}
                </h3>
                <a
                  href="mailto:hello@lounaco.com"
                  className="text-neutral-700 hover:text-primary-700"
                >
                  {t.emailValue}
                </a>
              </div>

              <div>
                <h3 className="font-display text-2xl text-primary-900 mb-2">
                  {t.hours}
                </h3>
                {t.hoursValue.map((hours, index) => (
                  <p key={index} className="text-neutral-700">
                    {hours}
                  </p>
                ))}
              </div>
            </div>
          </Frame>

          {/* Map placeholder */}
          <Frame>
            <div className="aspect-square bg-neutral-200 rounded flex items-center justify-center">
              <p className="text-neutral-600">Map Placeholder</p>
            </div>
          </Frame>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/book"
            className="inline-block px-12 py-4 bg-primary-600 text-white text-lg font-medium rounded-lg hover:bg-primary-700 transition-colors"
          >
            {t.cta}
          </a>
        </div>
      </div>
    </div>
  );
}
