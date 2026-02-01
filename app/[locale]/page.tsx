import { setRequestLocale } from 'next-intl/server';
import { HeroEditions } from '@/components/HeroEditions';
import { SectionEditions } from '@/components/SectionEditions';
import { CardEditions } from '@/components/CardEditions';

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default function HomePage({ params }: HomePageProps) {
  const { locale } = params;

  // Enable static rendering
  setRequestLocale(locale);

  const isEnglish = locale === 'en';

  const content = {
    hero: {
      subtitle: isEnglish ? 'Winter 2026' : 'Hiver 2026',
      title: isEnglish ? 'Louna&Co' : 'Louna&Co',
      description: isEnglish
        ? 'A baroque renaissance in Pilates. Discover the extraordinary.'
        : 'Une renaissance baroque du Pilates. Découvrez l\'extraordinaire.',
    },
    chapter1: {
      title: isEnglish ? 'Transform Your Practice' : 'Transformez Votre Pratique',
      description: isEnglish
        ? 'Experience Pilates reimagined through the lens of baroque artistry and modern innovation.'
        : 'Découvrez le Pilates réinventé à travers l\'art baroque et l\'innovation moderne.',
    },
    chapter2: {
      title: isEnglish ? 'Our Classes' : 'Nos Cours',
      description: isEnglish
        ? 'From foundational to advanced, each class is a masterpiece of movement and mindfulness.'
        : 'Du fondamental à l\'avancé, chaque cours est un chef-d\'œuvre de mouvement et de pleine conscience.',
    },
    chapter3: {
      title: isEnglish ? 'The Studio Experience' : 'L\'Expérience Studio',
      description: isEnglish
        ? 'Step into our baroque-inspired sanctuary where luxury meets wellness.'
        : 'Entrez dans notre sanctuaire d\'inspiration baroque où le luxe rencontre le bien-être.',
    },
    stats: [
      {
        value: '500+',
        label: isEnglish ? 'Happy Clients' : 'Clients Satisfaits',
      },
      {
        value: '50+',
        label: isEnglish ? 'Classes Weekly' : 'Cours par Semaine',
      },
      {
        value: '10+',
        label: isEnglish ? 'Expert Instructors' : 'Instructeurs Experts',
      },
    ],
    classes: [
      {
        title: isEnglish ? 'Reformer Pilates' : 'Pilates Reformer',
        description: isEnglish
          ? 'Dynamic resistance training that sculpts and strengthens your entire body.'
          : 'Entraînement en résistance dynamique qui sculpte et renforce tout votre corps.',
      },
      {
        title: isEnglish ? 'Mat Pilates' : 'Pilates au Sol',
        description: isEnglish
          ? 'Classical floor work focusing on core strength and body awareness.'
          : 'Travail au sol classique axé sur la force du tronc et la conscience corporelle.',
      },
      {
        title: isEnglish ? 'Aerial Pilates' : 'Pilates Aérien',
        description: isEnglish
          ? 'Defy gravity with suspended movement that challenges your balance and coordination.'
          : 'Défiez la gravité avec des mouvements suspendus qui mettent au défi votre équilibre et coordination.',
      },
    ],
    features: [
      {
        title: isEnglish ? 'Personalized Attention' : 'Attention Personnalisée',
        description: isEnglish
          ? 'Small class sizes ensure every student receives individualized guidance.'
          : 'Les petits groupes garantissent que chaque élève reçoit des conseils individualisés.',
      },
      {
        title: isEnglish ? 'Luxurious Amenities' : 'Équipements Luxueux',
        description: isEnglish
          ? 'State-of-the-art equipment in an opulent baroque setting.'
          : 'Équipement de pointe dans un cadre baroque opulent.',
      },
      {
        title: isEnglish ? 'Flexible Scheduling' : 'Horaires Flexibles',
        description: isEnglish
          ? 'Classes from dawn to dusk, seven days a week.'
          : 'Cours de l\'aube au crépuscule, sept jours sur sept.',
      },
    ],
  };

  return (
    <>
      {/* Hero Section */}
      <HeroEditions
        subtitle={content.hero.subtitle}
        title={content.hero.title}
        description={content.hero.description}
      />

      {/* Chapter 1: Transform Your Practice */}
      <SectionEditions
        id="transform"
        title={content.chapter1.title}
        description={content.chapter1.description}
        background="light"
        layout="centered"
        floatingElements={[
          {
            content: (
              <div className="text-center">
                <div className="text-5xl mb-2">✨</div>
                <div className="text-sm font-semibold">Transform</div>
              </div>
            ),
            position: 'left',
            variant: 'bubble',
            delay: 0.2,
          },
          {
            content: (
              <div className="text-center">
                <div className="text-5xl mb-2">🌟</div>
                <div className="text-sm font-semibold">Elevate</div>
              </div>
            ),
            position: 'right',
            variant: 'bubble',
            delay: 0.4,
          },
        ]}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {content.stats.map((stat, index) => (
            <CardEditions
              key={index}
              title={stat.value}
              description={stat.label}
              variant="featured"
            />
          ))}
        </div>
      </SectionEditions>

      {/* Chapter 2: Our Classes */}
      <SectionEditions
        id="classes"
        title={content.chapter2.title}
        description={content.chapter2.description}
        background="gradient"
        layout="centered"
        floatingElements={[
          {
            content: (
              <div className="p-4 text-center">
                <div className="font-display text-2xl font-bold text-primary-900">
                  {isEnglish ? 'New!' : 'Nouveau!'}
                </div>
                <div className="text-sm text-neutral-700 mt-1">
                  {isEnglish ? 'Aerial Classes' : 'Cours Aériens'}
                </div>
              </div>
            ),
            position: 'right',
            variant: 'card',
            delay: 0.3,
          },
        ]}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {content.classes.map((classItem, index) => (
            <CardEditions
              key={index}
              title={classItem.title}
              description={classItem.description}
              variant="default"
            />
          ))}
        </div>
      </SectionEditions>

      {/* Chapter 3: Studio Experience */}
      <SectionEditions
        id="studio"
        title={content.chapter3.title}
        description={content.chapter3.description}
        background="dark"
        layout="centered"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16">
          {content.features.map((feature, index) => (
            <CardEditions
              key={index}
              title={feature.title}
              description={feature.description}
              variant="minimal"
            />
          ))}
        </div>
      </SectionEditions>

      {/* CTA Section */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-display text-6xl md:text-8xl font-bold mb-8">
            {isEnglish ? 'Begin Your Journey' : 'Commencez Votre Voyage'}
          </h2>
          <p className="font-body text-2xl md:text-3xl mb-12 text-neutral-200">
            {isEnglish
              ? 'Join us for a complimentary trial class and experience the Louna&Co difference.'
              : 'Rejoignez-nous pour un cours d\'essai gratuit et découvrez la différence Louna&Co.'}
          </p>
          <a
            href={`/${locale}/classes`}
            className="inline-block px-16 py-6 bg-white text-primary-900 text-xl font-bold rounded-full hover:bg-accent-100 transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            {isEnglish ? 'Book Your Trial' : 'Réservez Votre Essai'}
          </a>
        </div>

        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
        </div>
      </section>
    </>
  );
}
