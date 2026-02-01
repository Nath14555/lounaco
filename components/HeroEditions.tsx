'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HeroEditionsProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export function HeroEditions({ title, subtitle, description, className }: HeroEditionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 3D Title animation on scroll
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          rotateX: -15,
          y: -100,
          scale: 0.9,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Subtitle parallax
      if (subtitleRef.current) {
        gsap.to(subtitleRef.current, {
          y: 150,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Description parallax (slower)
      if (descriptionRef.current) {
        gsap.to(descriptionRef.current, {
          y: 80,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }

      // Floating elements
      if (floatingRef.current) {
        const floatingElements = floatingRef.current.querySelectorAll('.floating-element');

        floatingElements.forEach((element, index) => {
          // Initial float animation
          gsap.to(element, {
            y: '+=30',
            rotation: index % 2 === 0 ? 5 : -5,
            duration: 3 + index,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });

          // Scroll-based parallax
          gsap.to(element, {
            y: (index + 1) * 100,
            rotation: (index % 2 === 0 ? 1 : -1) * 20,
            scale: 0.8,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5 + index * 0.2,
            },
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative h-screen overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950',
        className
      )}
      style={{ perspective: '1500px' }}
    >
      {/* Floating background elements */}
      <div ref={floatingRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Decorative floating shapes */}
        <div className="floating-element absolute top-1/4 left-1/4 w-64 h-64 bg-accent-400/20 rounded-full blur-3xl" />
        <div className="floating-element absolute top-1/3 right-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
        <div className="floating-element absolute bottom-1/4 left-1/3 w-80 h-80 bg-accent-300/20 rounded-full blur-3xl" />

        {/* Ornamental frames */}
        <div className="floating-element absolute top-20 right-20 w-32 h-32 border-4 border-accent-300/30 rotate-12"
             style={{ borderImage: 'linear-gradient(45deg, rgba(var(--color-accent-300), 0.3), transparent) 1' }} />
        <div className="floating-element absolute bottom-32 left-32 w-48 h-48 border-4 border-primary-300/30 -rotate-12"
             style={{ borderImage: 'linear-gradient(-45deg, rgba(var(--color-primary-300), 0.3), transparent) 1' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Eyebrow text */}
        {subtitle && (
          <p
            ref={subtitleRef}
            className="font-accent text-accent-200 text-xl md:text-2xl mb-6 tracking-widest uppercase"
          >
            {subtitle}
          </p>
        )}

        {/* Main title with 3D transform */}
        <h1
          ref={titleRef}
          className="font-display text-white text-7xl md:text-9xl lg:text-[12rem] font-bold mb-8 leading-none"
          style={{
            transformStyle: 'preserve-3d',
            textShadow: '0 10px 30px rgba(0,0,0,0.3), 0 20px 60px rgba(0,0,0,0.2)',
          }}
        >
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p
            ref={descriptionRef}
            className="font-body text-neutral-100 text-xl md:text-2xl lg:text-3xl max-w-3xl leading-relaxed"
          >
            {description}
          </p>
        )}

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-4 bg-white/60 rounded-full" />
          </div>
        </div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neutral-950/50 pointer-events-none" />
    </div>
  );
}
