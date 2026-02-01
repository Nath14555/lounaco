'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CardEditionsProps {
  title: string;
  description?: string;
  image?: string;
  stat?: {
    value: string;
    label: string;
  };
  variant?: 'default' | 'featured' | 'minimal';
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CardEditions({
  title,
  description,
  image,
  stat,
  variant = 'default',
  interactive = true,
  onClick,
  className,
}: CardEditionsProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion) return;

    const card = cardRef.current;

    // Initial state
    gsap.set(card, {
      opacity: 0,
      y: 60,
      rotateX: -10,
    });

    const ctx = gsap.context(() => {
      // Reveal animation
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
        once: true,
      });

      // Parallax effect on image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, card);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // 3D tilt effect on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive || prefersReducedMotion) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !interactive || prefersReducedMotion) return;

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const variantStyles = {
    default: 'bg-white p-8 rounded-2xl shadow-xl',
    featured: 'bg-gradient-to-br from-primary-600 to-primary-800 text-white p-10 rounded-3xl shadow-2xl',
    minimal: 'bg-transparent p-6',
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden transition-all duration-300',
        variantStyles[variant],
        interactive && 'cursor-pointer hover:shadow-2xl',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      onClick={onClick}
    >
      {/* Image */}
      {image && (
        <div
          ref={imageRef}
          className="relative w-full h-64 mb-6 rounded-xl overflow-hidden"
          style={{ transform: 'translateZ(20px)' }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Stat (if provided) */}
      {stat && (
        <div className="mb-4" style={{ transform: 'translateZ(30px)' }}>
          <div className={cn(
            'font-display text-6xl font-bold mb-2',
            variant === 'featured' ? 'text-white' : 'text-primary-600'
          )}>
            {stat.value}
          </div>
          <div className={cn(
            'font-accent text-sm uppercase tracking-widest',
            variant === 'featured' ? 'text-primary-100' : 'text-neutral-600'
          )}>
            {stat.label}
          </div>
        </div>
      )}

      {/* Title */}
      <h3
        className={cn(
          'font-display text-3xl md:text-4xl font-bold mb-4',
          variant === 'featured' ? 'text-white' : 'text-primary-900'
        )}
        style={{ transform: 'translateZ(25px)' }}
      >
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p
          className={cn(
            'font-body text-lg leading-relaxed',
            variant === 'featured' ? 'text-primary-100' : 'text-neutral-700'
          )}
          style={{ transform: 'translateZ(20px)' }}
        >
          {description}
        </p>
      )}

      {/* Hover effect overlay */}
      {interactive && (
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-tr from-primary-500/0 to-accent-500/0 transition-all duration-500 rounded-2xl pointer-events-none',
            isHovered && 'from-primary-500/10 to-accent-500/10'
          )}
        />
      )}

      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent-300/20 to-transparent rounded-bl-full" />
    </div>
  );
}
