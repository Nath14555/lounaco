import { setRequestLocale } from 'next-intl/server';
import { editionsData } from '@/data/editions';
import { Chapter } from '@/components/Chapter';
import { ChapterNav } from '@/components/ChapterNav';

interface HomePageProps {
  params: {
    locale: string;
  };
}

export default function HomePage({ params }: HomePageProps) {
  const { locale } = params;

  // Enable static rendering
  setRequestLocale(locale);

  const { chapters } = editionsData;

  // Sort chapters by order
  const sortedChapters = [...chapters].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return (
    <>
      {/* Sticky chapter navigation */}
      <ChapterNav chapters={sortedChapters} locale={locale} />

      {/* Chapters (long-scroll experience) */}
      <div className="relative">
        {sortedChapters.map((chapter) => (
          <Chapter key={chapter.id} chapter={chapter} locale={locale} />
        ))}
      </div>
    </>
  );
}
