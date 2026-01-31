import { OrnamentLayer } from '@/components/OrnamentLayer';

interface StudioPageProps {
  params: {
    locale: string;
  };
}

export default function StudioPage({ params }: StudioPageProps) {
  const { locale } = params;

  const content = {
    en: {
      title: 'The Studio',
      subtitle: 'A baroque sanctuary for transformation',
      story: 'Our Story',
      storyText:
        'Founded in 2020, Louna&Co reimagines Pilates through a baroque lens. Every detail of our studio has been carefully curated to create an immersive aesthetic experience that elevates your practice into ritual.',
      design: 'Design Philosophy',
      designText:
        'Velvet drapes frame floor-to-ceiling mirrors. Gilded accents catch the light. Marble and brass harmonize with state-of-the-art equipment. We believe wellness should be beautiful, indulgent, transformative.',
      location: 'Our Space',
      locationText:
        'Located in the heart of Paris, our 2,000 sq ft studio features premium Pilates equipment, private changing rooms, and a baroque-inspired lounge for pre and post-session relaxation.',
    },
    fr: {
      title: 'Le Studio',
      subtitle: 'Un sanctuaire baroque pour la transformation',
      story: 'Notre Histoire',
      storyText:
        "Fondé en 2020, Louna&Co réinvente le Pilates à travers un prisme baroque. Chaque détail de notre studio a été soigneusement organisé pour créer une expérience esthétique immersive qui élève votre pratique en rituel.",
      design: 'Philosophie de Design',
      designText:
        "Des rideaux de velours encadrent des miroirs du sol au plafond. Des accents dorés captent la lumière. Le marbre et le laiton s'harmonisent avec des équipements de pointe. Nous croyons que le bien-être devrait être beau, généreux, transformateur.",
      location: 'Notre Espace',
      locationText:
        "Situé au cœur de Paris, notre studio de 2 000 pieds carrés dispose d'équipements Pilates haut de gamme, de vestiaires privés et d'un salon d'inspiration baroque pour la détente avant et après les séances.",
    },
  };

  const t = content[locale as 'en' | 'fr'];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src="/images/studio-hero.jpg"
          alt="Studio interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-neutral-950/40" />
        <OrnamentLayer variant="vignette" foreground />

        <div className="relative z-content h-full flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <h1 className="font-display text-7xl md:text-8xl text-white mb-6">
              {t.title}
            </h1>
            <p className="font-accent text-3xl text-neutral-100">{t.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-24">
        <section className="mb-16">
          <h2 className="font-display text-5xl text-primary-900 mb-6">{t.story}</h2>
          <p className="text-lg text-neutral-700 leading-relaxed">{t.storyText}</p>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-5xl text-primary-900 mb-6">{t.design}</h2>
          <p className="text-lg text-neutral-700 leading-relaxed">{t.designText}</p>
        </section>

        <section>
          <h2 className="font-display text-5xl text-primary-900 mb-6">{t.location}</h2>
          <p className="text-lg text-neutral-700 leading-relaxed">{t.locationText}</p>
        </section>
      </div>
    </div>
  );
}
