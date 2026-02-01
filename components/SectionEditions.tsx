'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';
import { FloatingElement } from './FloatingElement';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionEditionsProps {
  id?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  layout?: 'full' | 'split' | 'centered';
  background?: 'light' | 'dark' | 'gradient';
  floatingElements?: Array<{
    content: React.ReactNode;
    position?: 'left' | 'right' | 'center';
    variant?: 'bubble' | 'card' | 'text' | 'stat';
    delay?: number;
  }>;
  className?: string;
}

export function SectionEditions({
  id,
  title,
  description,
  children,
  layout = 'centered',
  background = 'light',
  floatingElements = [],
  className,
}: SectionEditionsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Title reveal with 3D effect
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 100,
          rotateX: -30,
          scale: 0.9,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        // Parallax on scroll
        gsap.to(titleRef.current, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Content reveal with stagger
      if (contentRef.current) {
        const children = contentRef.current.children;

        gsap.from(children, {
          opacity: 0,
          y: 80,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const backgroundStyles = {
    light: 'bg-neutral-50',
    dark: 'bg-neutral-900 text-white',
    gradient: 'bg-gradient-to-br from-primary-50 via-neutral-50 to-accent-50',
  };

  const layoutStyles = {
    full: 'max-w-full',
    split: 'max-w-7xl grid md:grid-cols-2 gap-16',
    centered: 'max-w-5xl mx-auto text-center',
  };

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        'relative py-32 px-6 md:px-12 overflow-hidden',
        backgroundStyles[background],
        className
      )}
      style={{ perspective: '2000px' }}
    >
      {/* Floating elements */}
      {floatingElements.map((element, index) => (
        <FloatingElement
          key={index}
          variant={element.variant}
          content={element.content}
          position={element.position}
          delay={element.delay || index * 0.2}
          triggerElement={id ? `#${id}` : undefined}
        />
      ))}

      <div className={cn(layoutStyles[layout])}>
        {/* Title */}
        <h2
          ref={titleRef}
          className={cn(
            'font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight',
            background === 'dark' ? 'text-white' : 'text-primary-900'
          )}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {title}
        </h2>

        {/* Description */}
        {description && (
          <p
            className={cn(
              'font-body text-xl md:text-2xl lg:text-3xl mb-16 leading-relaxed',
              background === 'dark' ? 'text-neutral-300' : 'text-neutral-700',
              layout === 'centered' && 'max-w-3xl mx-auto'
            )}
          >
            {description}
          </p>
        )}

        {/* Content */}
        {children && (
          <div ref={contentRef} className="relative z-10">
            {children}
          </div>
        )}
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-radial from-accent-300/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-radial from-primary-300/20 to-transparent rounded-full blur-3xl" />
      </div>
    </section>
  );
}
