'use client';

import { useEffect, useState } from 'react';
import { Chapter, LocalizedString } from '@/data/editions';
import { useActiveSection } from '@/hooks/useActiveSection';
import { scrollTo } from '@/lib/scroll/engine';
import { cn } from '@/lib/utils';

interface ChapterNavProps {
  chapters: Chapter[];
  locale: string;
}

function getLocalizedText(text: LocalizedString, locale: string): string {
  return text[locale as 'en' | 'fr'] || text.en;
}

export function ChapterNav({ chapters, locale }: ChapterNavProps) {
  const chapterIds = chapters.map((ch) => ch.id);
  const activeSection = useActiveSection(chapterIds, {
    threshold: 0.3,
    updateHash: true,
  });

  const [isVisible, setIsVisible] = useState(false);

  // Show nav after scrolling past first screen
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChapterClick = (chapterId: string) => {
    scrollTo(`#${chapterId}`, {
      offset: -80, // Account for sticky nav height
      duration: 1.2,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, chapterId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleChapterClick(chapterId);
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-nav bg-neutral-50/95 backdrop-blur-md border-b border-neutral-200 transition-transform duration-500',
        isVisible ? 'translate-y-0' : '-translate-y-full'
      )}
      aria-label="Chapter navigation"
    >
      <div className="max-w-container mx-auto px-6 py-4">
        <ul className="flex items-center justify-center gap-2 md:gap-6">
          {chapters.map((chapter, index) => {
            const isActive = activeSection === chapter.id;

            return (
              <li key={chapter.id}>
                <button
                  onClick={() => handleChapterClick(chapter.id)}
                  onKeyDown={(e) => handleKeyDown(e, chapter.id)}
                  className={cn(
                    'relative px-4 py-2 text-sm md:text-base font-medium transition-colors rounded-lg',
                    isActive
                      ? 'text-primary-900 bg-primary-100'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  )}
                  aria-current={isActive ? 'true' : undefined}
                  aria-label={`Go to chapter ${index + 1}: ${getLocalizedText(
                    chapter.title,
                    locale
                  )}`}
                >
                  {getLocalizedText(chapter.title, locale)}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
