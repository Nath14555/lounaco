'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Section as SectionType, LocalizedString } from '@/data/editions';
import { MediaBlock } from './MediaBlock';
import { Frame } from './Frame';
import { OrnamentLayer } from './OrnamentLayer';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { trackSectionView } from '@/lib/analytics';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionProps {
  section: SectionType;
  locale: string;
}

function getLocalizedText(text: LocalizedString, locale: string): string {
  return text[locale as 'en' | 'fr'] || text.en;
}

export function Section({ section, locale }: SectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current || prefersReducedMotion) return;

    // Reveal animation for cards
    const cards = cardsRef.current.querySelectorAll('.section-card');

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 40%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Track section view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackSectionView(section.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, [section.id, prefersReducedMotion]);

  const layoutClass = {
    grid: 'grid grid-cols-1 md:grid-cols-2 gap-8',
    carousel: 'flex overflow-x-auto gap-8 snap-x snap-mandatory',
    stack: 'flex flex-col gap-12',
    masonry: 'columns-1 md:columns-2 gap-8',
  }[section.layout ?? 'grid'];

  return (
    <section
      ref={sectionRef}
      id={section.id}
      className={cn(
        'relative py-24 px-6',
        section.backgroundColor && `bg-[${section.backgroundColor}]`
      )}
    >
      {/* Ornament layers */}
      {(section.ornamentStyle ?? 'light') !== 'none' && (
        <>
          <OrnamentLayer variant="grain" />
          {section.ornamentStyle === 'heavy' && <OrnamentLayer variant="vignette" />}
        </>
      )}

      <div className="relative z-content max-w-section mx-auto">
        {/* Section header */}
        <header className="mb-16 text-center">
          <h2 className="font-display text-5xl md:text-6xl text-primary-900 mb-4">
            {getLocalizedText(section.title, locale)}
          </h2>
          {section.subtitle && (
            <p className="font-accent text-2xl text-primary-700 mb-6">
              {getLocalizedText(section.subtitle, locale)}
            </p>
          )}
          {section.description && (
            <p className="text-lg text-neutral-700 max-w-2xl mx-auto">
              {getLocalizedText(section.description, locale)}
            </p>
          )}
        </header>

        {/* Cards */}
        <div ref={cardsRef} className={layoutClass}>
          {section.cards?.map((card) => (
            <div
              key={card.id}
              className={cn(
                'section-card',
                section.layout === 'carousel' && 'flex-none w-80 snap-center',
                section.layout === 'masonry' && 'break-inside-avoid mb-8'
              )}
            >
              <Frame ornate={card.featured ?? false}>
                {card.media && (
                  <div className="mb-6">
                    <MediaBlock media={card.media} locale={locale} />
                  </div>
                )}
                <h3 className="font-display text-3xl text-primary-900 mb-3">
                  {getLocalizedText(card.title, locale)}
                </h3>
                <p className="text-neutral-700 mb-6">
                  {getLocalizedText(card.description, locale)}
                </p>
                {card.cta && (
                  <a
                    href={card.cta.href}
                    className={cn(
                      'inline-block px-6 py-3 rounded-lg font-medium transition-colors',
                      card.cta.variant === 'primary' &&
                        'bg-primary-600 text-white hover:bg-primary-700',
                      card.cta.variant === 'secondary' &&
                        'bg-neutral-200 text-neutral-900 hover:bg-neutral-300',
                      card.cta.variant === 'ghost' &&
                        'text-primary-700 hover:bg-primary-100'
                    )}
                  >
                    {getLocalizedText(card.cta.label, locale)}
                  </a>
                )}
              </Frame>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
