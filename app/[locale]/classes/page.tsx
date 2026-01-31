'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { classesData, Class } from '@/data/classes';
import { Frame } from '@/components/Frame';
import { cn, formatCurrency, formatDuration } from '@/lib/utils';

interface ClassesPageProps {
  params: {
    locale: string;
  };
}

type LevelFilter = 'all' | 'beginner' | 'intermediate' | 'advanced' | 'all-levels';

export default function ClassesPage({ params }: ClassesPageProps) {
  const { locale } = params;
  const t = useTranslations('classes');

  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');

  const filteredClasses = classesData.filter((cls) => {
    if (levelFilter === 'all') return true;
    return cls.level === levelFilter;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-container mx-auto">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="font-display text-6xl md:text-7xl text-primary-900 mb-4">
            {t('title')}
          </h1>
          <p className="font-accent text-2xl text-primary-700">
            {t('description')}
          </p>
        </header>

        {/* Filters */}
        <div className="mb-12 flex justify-center gap-4 flex-wrap">
          <span className="text-sm text-neutral-700 self-center">
            {t('filterByLevel')}:
          </span>
          {(['all', 'beginner', 'intermediate', 'advanced', 'all-levels'] as LevelFilter[]).map(
            (level) => (
              <button
                key={level}
                onClick={() => setLevelFilter(level)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  levelFilter === level
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                )}
              >
                {level === 'all'
                  ? 'All'
                  : level === 'all-levels'
                  ? t('allLevels')
                  : t(level)}
              </button>
            )
          )}
        </div>

        {/* Classes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.map((cls) => (
            <Frame key={cls.id} className="h-full flex flex-col">
              {/* Image */}
              {cls.image && (
                <div className="relative h-48 mb-6 -m-8 mb-8">
                  <img
                    src={cls.image}
                    alt={cls.title[locale as 'en' | 'fr']}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 flex flex-col">
                <h3 className="font-display text-3xl text-primary-900 mb-3">
                  {cls.title[locale as 'en' | 'fr']}
                </h3>

                <p className="text-neutral-700 mb-4 flex-1">
                  {cls.description[locale as 'en' | 'fr']}
                </p>

                {/* Meta info */}
                <div className="space-y-2 mb-6 text-sm text-neutral-600">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Level:</span>
                    <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded">
                      {cls.level === 'all-levels' ? t('allLevels') : t(cls.level)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span>{' '}
                    {formatDuration(cls.duration, locale)}
                  </div>
                  <div>
                    <span className="font-medium">Price:</span>{' '}
                    {formatCurrency(cls.price, locale)}
                  </div>
                  <div>
                    <span className="font-medium">Max participants:</span> {cls.maxParticipants}
                  </div>
                </div>

                {/* CTA */}
                <a
                  href={`/book?class=${cls.id}`}
                  className="block w-full text-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {t('bookNow')}
                </a>
              </div>
            </Frame>
          ))}
        </div>

        {/* Empty state */}
        {filteredClasses.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-600 text-lg">
              No classes found for this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
