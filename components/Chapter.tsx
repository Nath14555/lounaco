'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Chapter as ChapterType, LocalizedString } from '@/data/editions';
import { Section } from './Section';
import { MediaBlock } from './MediaBlock';
import { OrnamentLayer } from './OrnamentLayer';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { trackChapterView } from '@/lib/analytics';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ChapterProps {
  chapter: ChapterType;
  locale: string;
}

function getLocalizedText(text: LocalizedString, locale: string): string {
  return text[locale as 'en' | 'fr'] || text.en;
}

export function Chapter({ chapter, locale }: ChapterProps) {
  const chapterRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!chapterRef.current || prefersReducedMotion) return;

    // Hero parallax effect
    if (heroRef.current) {
      gsap.to(heroRef.current.querySelector('.hero-media'), {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // Track chapter view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackChapterView(chapter.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (chapterRef.current) {
      observer.observe(chapterRef.current);
    }

    return () => {
      observer.disconnect();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === chapterRef.current || trigger.vars.trigger === heroRef.current) {
          trigger.kill();
        }
      });
    };
  }, [chapter.id, prefersReducedMotion]);

  const heroHeight = {
    screen: 'h-screen',
    half: 'h-[50vh]',
    third: 'h-[33vh]',
  }[chapter.hero?.height || 'screen'];

  return (
    <div
      ref={chapterRef}
      id={chapter.id}
      className="relative"
      style={{ '--chapter-color': chapter.color } as React.CSSProperties}
    >
      {/* Hero section */}
      {chapter.hero && (
        <div
          ref={heroRef}
          className={cn('relative overflow-hidden', heroHeight)}
        >
          {/* Hero media */}
          <div className="hero-media absolute inset-0">
            <MediaBlock
              media={chapter.hero.media}
              locale={locale}
              className="w-full h-full"
              priority
            />
          </div>

          {/* Overlay */}
          {chapter.hero.overlay && (
            <div className="absolute inset-0 bg-neutral-950/50 z-ornament-bg" />
          )}

          {/* Ornament layers */}
          <OrnamentLayer variant="vignette" foreground />

          {/* Hero content */}
          <div className="relative z-content h-full flex items-center justify-center px-6">
            <div className="text-center max-w-4xl">
              <h1 className="font-display text-6xl md:text-8xl text-white mb-6 drop-shadow-2xl">
                {getLocalizedText(chapter.title, locale)}
              </h1>
              {chapter.subtitle && (
                <p className="font-accent text-2xl md:text-4xl text-neutral-100">
                  {getLocalizedText(chapter.subtitle, locale)}
                </p>
              )}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-content">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-2">
              <div className="w-1 h-3 bg-white rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      )}

      {/* Sections */}
      <div className="relative bg-neutral-50">
        {chapter.sections?.map((section) => (
          <Section key={section.id} section={section} locale={locale} />
        ))}
      </div>
    </div>
  );
}
