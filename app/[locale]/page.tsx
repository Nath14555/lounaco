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
  const { chapters } = editionsData;

  // Sort chapters by order
  const sortedChapters = [...chapters].sort((a, b) => a.order - b.order);

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
