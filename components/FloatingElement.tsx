'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type FloatingElementVariant = 'bubble' | 'card' | 'text' | 'stat';

interface FloatingElementProps {
  variant?: FloatingElementVariant;
  content: React.ReactNode;
  position?: 'left' | 'right' | 'center';
  delay?: number;
  triggerElement?: string;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function FloatingElement({
  variant = 'bubble',
  content,
  position = 'right',
  delay = 0,
  triggerElement,
  interactive = false,
  onClick,
  className,
}: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!elementRef.current || prefersReducedMotion) return;

    const element = elementRef.current;

    // Initial state - hidden and scaled down
    gsap.set(element, {
      opacity: 0,
      scale: 0.5,
      y: 50,
    });

    const ctx = gsap.context(() => {
      // Animate in when scrolled into view
      const trigger = triggerElement || element;

      ScrollTrigger.create({
        trigger,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(element, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            delay,
            ease: 'back.out(1.2)',
          });
        },
        once: true,
      });

      // Continuous floating animation
      gsap.to(element, {
        y: '+=15',
        rotation: variant === 'bubble' ? 3 : 0,
        duration: 2.5 + delay,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Parallax on scroll
      gsap.to(element, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [variant, delay, triggerElement, prefersReducedMotion]);

  // Hover animation
  useEffect(() => {
    if (!elementRef.current || prefersReducedMotion || !interactive) return;

    if (isHovered) {
      gsap.to(elementRef.current, {
        scale: 1.1,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else {
      gsap.to(elementRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }, [isHovered, interactive, prefersReducedMotion]);

  const variantStyles = {
    bubble: 'rounded-full bg-white shadow-2xl p-6',
    card: 'rounded-2xl bg-white shadow-xl p-8 backdrop-blur-sm bg-white/95',
    text: 'font-display text-4xl font-bold text-primary-900',
    stat: 'rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 text-white p-6 shadow-2xl',
  };

  const positionStyles = {
    left: 'left-[10%] md:left-[15%]',
    right: 'right-[10%] md:right-[15%]',
    center: 'left-1/2 -translate-x-1/2',
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        'absolute z-20',
        variantStyles[variant],
        positionStyles[position],
        interactive && 'cursor-pointer transition-all',
        className
      )}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
      onClick={onClick}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {content}
    </div>
  );
}
