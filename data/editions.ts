import { z } from 'zod';

// ============================================================================
// ZOD SCHEMAS (CMS-READY, BILINGUAL)
// ============================================================================

export const LocalizedStringSchema = z.object({
  en: z.string(),
  fr: z.string(),
});

export const MediaSchema = z.object({
  type: z.enum(['image', 'video']),
  src: z.string(),
  alt: LocalizedStringSchema.optional(),
  poster: z.string().optional(), // For videos
  width: z.number().optional(),
  height: z.number().optional(),
  blurDataURL: z.string().optional(),
  priority: z.boolean().optional(),
});

export const CardSchema = z.object({
  id: z.string(),
  title: LocalizedStringSchema,
  description: LocalizedStringSchema,
  media: MediaSchema.optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  cta: z
    .object({
      label: LocalizedStringSchema,
      href: z.string(),
      variant: z.enum(['primary', 'secondary', 'ghost']).default('primary'),
    })
    .optional(),
});

export const SectionSchema = z.object({
  id: z.string(),
  title: LocalizedStringSchema,
  subtitle: LocalizedStringSchema.optional(),
  description: LocalizedStringSchema.optional(),
  layout: z.enum(['grid', 'carousel', 'stack', 'masonry']).optional(),
  cards: z.array(CardSchema).optional(),
  backgroundColor: z.string().optional(),
  ornamentStyle: z.enum(['none', 'light', 'heavy']).optional(),
});

export const ChapterSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: LocalizedStringSchema,
  subtitle: LocalizedStringSchema.optional(),
  hero: z
    .object({
      media: MediaSchema,
      overlay: z.boolean().optional(),
      height: z.enum(['screen', 'half', 'third']).optional(),
    })
    .optional(),
  sections: z.array(SectionSchema).optional(),
  order: z.number().optional(),
  color: z.string().optional(), // Theme color for chapter
});

export const EditionsDataSchema = z.object({
  chapters: z.array(ChapterSchema),
  metadata: z.object({
    title: LocalizedStringSchema,
    description: LocalizedStringSchema,
    keywords: z.array(z.string()).default([]),
  }),
});

// ============================================================================
// TYPESCRIPT TYPES (INFERRED FROM ZOD)
// ============================================================================

export type LocalizedString = z.infer<typeof LocalizedStringSchema>;
export type Media = z.infer<typeof MediaSchema>;
export type Card = z.infer<typeof CardSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type Chapter = z.infer<typeof ChapterSchema>;
export type EditionsData = z.infer<typeof EditionsDataSchema>;

// ============================================================================
// SAMPLE DATASET (>= 3 CHAPTERS, >= 12 CARDS)
// ============================================================================

export const editionsData: EditionsData = {
  metadata: {
    title: {
      en: 'Louna&Co Pilates — Baroque Movement Experience',
      fr: 'Louna&Co Pilates — Expérience de Mouvement Baroque',
    },
    description: {
      en: 'Discover the art of movement through our signature Pilates methodology. A maximalist journey through strength, grace, and transformation.',
      fr: 'Découvrez l\'art du mouvement à travers notre méthodologie Pilates signature. Un voyage maximaliste à travers force, grâce et transformation.',
    },
    keywords: ['pilates', 'baroque', 'movement', 'wellness', 'paris'],
  },
  chapters: [
    {
      id: 'chapter-movement',
      slug: 'movement',
      title: {
        en: 'The Art of Movement',
        fr: 'L\'Art du Mouvement',
      },
      subtitle: {
        en: 'Where baroque aesthetics meet modern precision',
        fr: 'Où l\'esthétique baroque rencontre la précision moderne',
      },
      hero: {
        media: {
          type: 'video',
          src: '/videos/hero-movement.mp4',
          poster: '/images/hero-movement-poster.jpg',
          priority: true,
          alt: {
            en: 'Flowing Pilates movements in baroque studio',
            fr: 'Mouvements de Pilates fluides dans un studio baroque',
          },
        },
        overlay: true,
        height: 'screen',
      },
      order: 1,
      color: '#8B5A3C',
      sections: [
        {
          id: 'movement-philosophy',
          title: {
            en: 'Our Philosophy',
            fr: 'Notre Philosophie',
          },
          subtitle: {
            en: 'Movement as expression',
            fr: 'Le mouvement comme expression',
          },
          description: {
            en: 'Every session is a performance. Every breath, a choreography. We believe Pilates transcends exercise—it becomes art.',
            fr: 'Chaque séance est une performance. Chaque souffle, une chorégraphie. Nous croyons que le Pilates transcende l\'exercice—il devient art.',
          },
          layout: 'grid',
          ornamentStyle: 'heavy',
          cards: [
            {
              id: 'card-precision',
              title: {
                en: 'Precision',
                fr: 'Précision',
              },
              description: {
                en: 'Every movement is intentional. We refine alignment, breath, and control to create a practice that transforms.',
                fr: 'Chaque mouvement est intentionnel. Nous affinons l\'alignement, la respiration et le contrôle pour créer une pratique transformatrice.',
              },
              media: {
                type: 'image',
                src: '/images/precision.jpg',
                alt: {
                  en: 'Detailed Pilates alignment',
                  fr: 'Alignement Pilates détaillé',
                },
                width: 800,
                height: 600,
              },
              featured: true,
              order: 1,
            },
            {
              id: 'card-flow',
              title: {
                en: 'Flow',
                fr: 'Fluidité',
              },
              description: {
                en: 'Transitions are as important as poses. We cultivate seamless, breath-synchronized movement.',
                fr: 'Les transitions sont aussi importantes que les poses. Nous cultivons un mouvement fluide synchronisé avec la respiration.',
              },
              media: {
                type: 'image',
                src: '/images/flow.jpg',
                alt: {
                  en: 'Flowing movement sequence',
                  fr: 'Séquence de mouvements fluides',
                },
                width: 800,
                height: 600,
              },
              order: 2,
            },
            {
              id: 'card-presence',
              title: {
                en: 'Presence',
                fr: 'Présence',
              },
              description: {
                en: 'Mind and body unite. Each session is a meditative journey into awareness and strength.',
                fr: 'L\'esprit et le corps s\'unissent. Chaque séance est un voyage méditatif vers la conscience et la force.',
              },
              media: {
                type: 'image',
                src: '/images/presence.jpg',
                alt: {
                  en: 'Meditative Pilates practice',
                  fr: 'Pratique méditative de Pilates',
                },
                width: 800,
                height: 600,
              },
              order: 3,
            },
            {
              id: 'card-transformation',
              title: {
                en: 'Transformation',
                fr: 'Transformation',
              },
              description: {
                en: 'True change happens from within. We sculpt not just bodies, but confidence and resilience.',
                fr: 'Le vrai changement vient de l\'intérieur. Nous sculptons non seulement les corps, mais aussi la confiance et la résilience.',
              },
              media: {
                type: 'image',
                src: '/images/transformation.jpg',
                alt: {
                  en: 'Personal transformation journey',
                  fr: 'Voyage de transformation personnelle',
                },
                width: 800,
                height: 600,
              },
              featured: true,
              order: 4,
            },
          ],
        },
      ],
    },
    {
      id: 'chapter-classes',
      slug: 'classes',
      title: {
        en: 'Our Classes',
        fr: 'Nos Cours',
      },
      subtitle: {
        en: 'Curated experiences for every body',
        fr: 'Des expériences organisées pour tous les corps',
      },
      order: 2,
      color: '#6B4E71',
      sections: [
        {
          id: 'classes-signature',
          title: {
            en: 'Signature Classes',
            fr: 'Cours Signature',
          },
          subtitle: {
            en: 'Our most beloved formats',
            fr: 'Nos formats les plus aimés',
          },
          layout: 'grid',
          ornamentStyle: 'light',
          cards: [
            {
              id: 'card-reformer-foundations',
              title: {
                en: 'Reformer Foundations',
                fr: 'Fondations au Reformer',
              },
              description: {
                en: 'Master the fundamentals on the reformer. Perfect for beginners and those refining technique. 50 minutes of precision and control.',
                fr: 'Maîtrisez les fondamentaux au reformer. Parfait pour débutants et ceux qui affinent leur technique. 50 minutes de précision et contrôle.',
              },
              tags: ['beginner', 'reformer'],
              cta: {
                label: { en: 'Book Now', fr: 'Réserver' },
                href: '/book?class=reformer-foundations',
                variant: 'primary',
              },
              order: 1,
            },
            {
              id: 'card-mat-flow',
              title: {
                en: 'Baroque Mat Flow',
                fr: 'Flow au Tapis Baroque',
              },
              description: {
                en: 'No equipment, pure movement. A dynamic mat sequence set to curated music. All levels welcome. 45 minutes.',
                fr: 'Pas d\'équipement, mouvement pur. Une séquence dynamique au tapis sur une musique sélectionnée. Tous niveaux. 45 minutes.',
              },
              tags: ['all-levels', 'mat'],
              featured: true,
              cta: {
                label: { en: 'Book Now', fr: 'Réserver' },
                href: '/book?class=baroque-mat',
                variant: 'primary',
              },
              order: 2,
            },
            {
              id: 'card-tower-strength',
              title: {
                en: 'Tower Strength',
                fr: 'Force à la Tour',
              },
              description: {
                en: 'Advanced resistance work on the tower. Build power, stability, and endurance. Intermediate to advanced. 55 minutes.',
                fr: 'Travail de résistance avancé à la tour. Développez puissance, stabilité et endurance. Intermédiaire à avancé. 55 minutes.',
              },
              tags: ['advanced', 'tower', 'strength'],
              cta: {
                label: { en: 'Book Now', fr: 'Réserver' },
                href: '/book?class=tower-strength',
                variant: 'primary',
              },
              order: 3,
            },
            {
              id: 'card-chair-sculpt',
              title: {
                en: 'Chair Sculpt',
                fr: 'Sculpture à la Chaise',
              },
              description: {
                en: 'Targeted sculpting on the Pilates chair. Isolate, engage, transform. All levels with modifications. 50 minutes.',
                fr: 'Sculpture ciblée à la chaise Pilates. Isolez, engagez, transformez. Tous niveaux avec modifications. 50 minutes.',
              },
              tags: ['all-levels', 'chair', 'sculpt'],
              cta: {
                label: { en: 'Book Now', fr: 'Réserver' },
                href: '/book?class=chair-sculpt',
                variant: 'primary',
              },
              order: 4,
            },
          ],
        },
        {
          id: 'classes-specialty',
          title: {
            en: 'Specialty Sessions',
            fr: 'Sessions Spéciales',
          },
          subtitle: {
            en: 'Unique experiences',
            fr: 'Expériences uniques',
          },
          layout: 'carousel',
          ornamentStyle: 'heavy',
          cards: [
            {
              id: 'card-prenatal',
              title: {
                en: 'Prenatal Pilates',
                fr: 'Pilates Prénatal',
              },
              description: {
                en: 'Safe, nurturing movement for expecting mothers. All trimesters welcome with medical clearance. 45 minutes.',
                fr: 'Mouvement sûr et nourrissant pour futures mamans. Tous trimestres bienvenus avec autorisation médicale. 45 minutes.',
              },
              tags: ['prenatal', 'gentle'],
              cta: {
                label: { en: 'Learn More', fr: 'En savoir plus' },
                href: '/classes/prenatal',
                variant: 'secondary',
              },
              order: 1,
            },
            {
              id: 'card-postnatal',
              title: {
                en: 'Postnatal Recovery',
                fr: 'Récupération Postnatale',
              },
              description: {
                en: 'Rebuild strength and reconnect with your body. Focus on core restoration and pelvic floor. 45 minutes.',
                fr: 'Reconstruisez la force et reconnectez avec votre corps. Focus sur la restauration du core et plancher pelvien. 45 minutes.',
              },
              tags: ['postnatal', 'recovery'],
              cta: {
                label: { en: 'Learn More', fr: 'En savoir plus' },
                href: '/classes/postnatal',
                variant: 'secondary',
              },
              order: 2,
            },
            {
              id: 'card-injury-rehab',
              title: {
                en: 'Injury Rehabilitation',
                fr: 'Rééducation des Blessures',
              },
              description: {
                en: 'Private sessions tailored to your recovery needs. Work 1-on-1 with certified instructors. 60 minutes.',
                fr: 'Sessions privées adaptées à vos besoins de récupération. Travail 1-à-1 avec instructeurs certifiés. 60 minutes.',
              },
              tags: ['private', 'rehab'],
              cta: {
                label: { en: 'Contact Us', fr: 'Nous contacter' },
                href: '/contact',
                variant: 'ghost',
              },
              order: 3,
            },
            {
              id: 'card-masterclass',
              title: {
                en: 'Monthly Masterclass',
                fr: 'Masterclass Mensuelle',
              },
              description: {
                en: 'Deep-dive workshops with guest instructors. Explore advanced concepts and specialized techniques. 90 minutes.',
                fr: 'Ateliers approfondis avec instructeurs invités. Explorez des concepts avancés et techniques spécialisées. 90 minutes.',
              },
              tags: ['workshop', 'advanced'],
              featured: true,
              cta: {
                label: { en: 'View Calendar', fr: 'Voir le calendrier' },
                href: '/events',
                variant: 'primary',
              },
              order: 4,
            },
          ],
        },
      ],
    },
    {
      id: 'chapter-studio',
      slug: 'studio',
      title: {
        en: 'The Studio',
        fr: 'Le Studio',
      },
      subtitle: {
        en: 'A baroque sanctuary for transformation',
        fr: 'Un sanctuaire baroque pour la transformation',
      },
      order: 3,
      color: '#2C5F2D',
      hero: {
        media: {
          type: 'image',
          src: '/images/studio-hero.jpg',
          priority: true,
          alt: {
            en: 'Louna&Co baroque studio interior',
            fr: 'Intérieur du studio baroque Louna&Co',
          },
          width: 1920,
          height: 1080,
        },
        overlay: true,
        height: 'half',
      },
      sections: [
        {
          id: 'studio-story',
          title: {
            en: 'Our Story',
            fr: 'Notre Histoire',
          },
          description: {
            en: 'Founded in 2020, Louna&Co reimagines Pilates through a baroque lens. Our studio is a gallery, a sanctuary, an atelier of movement.',
            fr: 'Fondé en 2020, Louna&Co réinvente le Pilates à travers un prisme baroque. Notre studio est une galerie, un sanctuaire, un atelier du mouvement.',
          },
          layout: 'stack',
          ornamentStyle: 'heavy',
          cards: [
            {
              id: 'card-vision',
              title: {
                en: 'Vision',
                fr: 'Vision',
              },
              description: {
                en: 'We believe wellness should be beautiful, indulgent, transformative. Pilates isn\'t just fitness—it\'s an aesthetic experience.',
                fr: 'Nous croyons que le bien-être devrait être beau, généreux, transformateur. Le Pilates n\'est pas juste du fitness—c\'est une expérience esthétique.',
              },
              order: 1,
            },
            {
              id: 'card-design',
              title: {
                en: 'Design',
                fr: 'Design',
              },
              description: {
                en: 'Velvet drapes, gilded mirrors, marble accents. Every detail curated to elevate your practice into ritual.',
                fr: 'Rideaux de velours, miroirs dorés, accents de marbre. Chaque détail organisé pour élever votre pratique en rituel.',
              },
              media: {
                type: 'image',
                src: '/images/studio-design.jpg',
                alt: {
                  en: 'Baroque studio design details',
                  fr: 'Détails du design baroque du studio',
                },
                width: 1200,
                height: 800,
              },
              order: 2,
            },
          ],
        },
      ],
    },
  ],
};

// Validate at module load (dev safety)
if (process.env.NODE_ENV === 'development') {
  EditionsDataSchema.parse(editionsData);
}
