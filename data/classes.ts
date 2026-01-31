import { z } from 'zod';
import { LocalizedStringSchema } from './editions';

// ============================================================================
// CLASS DATA MODEL (FILTERABLE, CMS-READY)
// ============================================================================

export const ClassScheduleSchema = z.object({
  dayOfWeek: z.number().min(0).max(6), // 0 = Sunday
  time: z.string(), // "09:00", "18:30"
  duration: z.number(), // minutes
  instructor: z.string(),
});

export const ClassSchema = z.object({
  id: z.string(),
  title: LocalizedStringSchema,
  description: LocalizedStringSchema,
  level: z.enum(['beginner', 'intermediate', 'advanced', 'all-levels']),
  equipment: z.array(z.enum(['mat', 'reformer', 'tower', 'chair', 'props'])),
  duration: z.number(), // minutes
  maxParticipants: z.number(),
  tags: z.array(z.string()).default([]),
  schedule: z.array(ClassScheduleSchema),
  price: z.number(), // EUR
  image: z.string().optional(),
});

export type ClassSchedule = z.infer<typeof ClassScheduleSchema>;
export type Class = z.infer<typeof ClassSchema>;

export const classesData: Class[] = [
  {
    id: 'reformer-foundations',
    title: {
      en: 'Reformer Foundations',
      fr: 'Fondations au Reformer',
    },
    description: {
      en: 'Master the fundamentals on the reformer. Perfect for beginners and those refining technique.',
      fr: 'Maîtrisez les fondamentaux au reformer. Parfait pour débutants et ceux qui affinent leur technique.',
    },
    level: 'beginner',
    equipment: ['reformer'],
    duration: 50,
    maxParticipants: 8,
    tags: ['beginner', 'reformer'],
    schedule: [
      { dayOfWeek: 1, time: '09:00', duration: 50, instructor: 'Sophie Laurent' },
      { dayOfWeek: 3, time: '18:00', duration: 50, instructor: 'Marie Dubois' },
      { dayOfWeek: 6, time: '10:00', duration: 50, instructor: 'Sophie Laurent' },
    ],
    price: 35,
    image: '/images/classes/reformer-foundations.jpg',
  },
  {
    id: 'baroque-mat',
    title: {
      en: 'Baroque Mat Flow',
      fr: 'Flow au Tapis Baroque',
    },
    description: {
      en: 'No equipment, pure movement. A dynamic mat sequence set to curated music.',
      fr: 'Pas d\'équipement, mouvement pur. Une séquence dynamique au tapis sur une musique sélectionnée.',
    },
    level: 'all-levels',
    equipment: ['mat', 'props'],
    duration: 45,
    maxParticipants: 12,
    tags: ['all-levels', 'mat', 'flow'],
    schedule: [
      { dayOfWeek: 2, time: '07:00', duration: 45, instructor: 'Claire Moreau' },
      { dayOfWeek: 4, time: '12:30', duration: 45, instructor: 'Lucie Bernard' },
      { dayOfWeek: 0, time: '09:30', duration: 45, instructor: 'Claire Moreau' },
    ],
    price: 28,
    image: '/images/classes/baroque-mat.jpg',
  },
  {
    id: 'tower-strength',
    title: {
      en: 'Tower Strength',
      fr: 'Force à la Tour',
    },
    description: {
      en: 'Advanced resistance work on the tower. Build power, stability, and endurance.',
      fr: 'Travail de résistance avancé à la tour. Développez puissance, stabilité et endurance.',
    },
    level: 'advanced',
    equipment: ['tower'],
    duration: 55,
    maxParticipants: 6,
    tags: ['advanced', 'tower', 'strength'],
    schedule: [
      { dayOfWeek: 2, time: '19:00', duration: 55, instructor: 'Élise Renard' },
      { dayOfWeek: 5, time: '18:00', duration: 55, instructor: 'Élise Renard' },
    ],
    price: 40,
    image: '/images/classes/tower-strength.jpg',
  },
  {
    id: 'chair-sculpt',
    title: {
      en: 'Chair Sculpt',
      fr: 'Sculpture à la Chaise',
    },
    description: {
      en: 'Targeted sculpting on the Pilates chair. Isolate, engage, transform.',
      fr: 'Sculpture ciblée à la chaise Pilates. Isolez, engagez, transformez.',
    },
    level: 'all-levels',
    equipment: ['chair'],
    duration: 50,
    maxParticipants: 8,
    tags: ['all-levels', 'chair', 'sculpt'],
    schedule: [
      { dayOfWeek: 1, time: '18:30', duration: 50, instructor: 'Marie Dubois' },
      { dayOfWeek: 4, time: '10:00', duration: 50, instructor: 'Sophie Laurent' },
    ],
    price: 35,
    image: '/images/classes/chair-sculpt.jpg',
  },
];
