'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';
import {
  BagIllustration,
  LipstickIllustration,
  MatchaIllustration,
  MatKitIllustration,
  RingIllustration,
  PhoneIllustration,
  StarDoodle,
  HeartDoodle,
  SwirlDoodle,
} from './ScrapbookItems';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const HANDWRITTEN_FONT =
  "'Segoe Print', 'Bradley Hand', 'Comic Sans MS', 'Marker Felt', cursive";

interface HeroScrapbookProps {
  locale: string;
  className?: string;
}

interface ScrapItem {
  id: string;
  caption: { fr: string; en: string };
  /** Final resting spot, in % of the hero container */
  position: { top?: string; left?: string; right?: string; bottom?: string };
  /** Base tilt of the polaroid card, degrees */
  tilt: number;
  width: string;
  tape: 'gold' | 'rose' | 'sage';
  render: (className: string) => JSX.Element;
}

const ITEMS: ScrapItem[] = [
  {
    id: 'lipstick',
    caption: { fr: 'le rouge à lèvres', en: 'the lipstick' },
    position: { top: '16%', left: '7%' },
    tilt: -7,
    width: 'w-24 md:w-32',
    tape: 'rose',
    render: (c) => <LipstickIllustration className={c} />,
  },
  {
    id: 'matcha',
    caption: { fr: 'le matcha', en: 'the matcha' },
    position: { top: '52%', left: '4%' },
    tilt: 5,
    width: 'w-24 md:w-36',
    tape: 'sage',
    render: (c) => <MatchaIllustration className={c} />,
  },
  {
    id: 'matkit',
    caption: { fr: 'les accessoires de tapis', en: 'the mat accessories' },
    position: { bottom: '8%', left: '18%' },
    tilt: -4,
    width: 'w-28 md:w-40',
    tape: 'gold',
    render: (c) => <MatKitIllustration className={c} />,
  },
  {
    id: 'ring',
    caption: { fr: 'le ring de Pilates', en: 'the Pilates ring' },
    position: { top: '46%', right: '5%' },
    tilt: 6,
    width: 'w-28 md:w-40',
    tape: 'gold',
    render: (c) => <RingIllustration className={c} />,
  },
  {
    id: 'phone',
    caption: { fr: 'le téléphone', en: 'the phone' },
    position: { top: '13%', right: '9%' },
    tilt: 8,
    width: 'w-20 md:w-28',
    tape: 'rose',
    render: (c) => <PhoneIllustration className={c} />,
  },
];

const TAPE_COLORS: Record<ScrapItem['tape'], string> = {
  gold: 'rgba(212, 175, 55, 0.55)',
  rose: 'rgba(139, 46, 59, 0.35)',
  sage: 'rgba(44, 95, 45, 0.3)',
};

export function HeroScrapbook({ locale, className }: HeroScrapbookProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bagRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const isEnglish = locale === 'en';
  const t = {
    subtitle: isEnglish ? 'Everything you need, in one bag' : 'Tout ce qu’il te faut, dans un seul sac',
    title: 'Louna&Co',
    note: isEnglish ? 'unpack your ritual ✨' : 'déballe ton rituel ✨',
    bagCaption: isEnglish ? 'the studio bag' : 'le sac de studio',
    scroll: isEnglish ? 'scroll' : 'défiler',
  };

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const bag = bagRef.current;
    if (!container || !bag || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.scrap-item');
      const doodles = gsap.utils.toArray<HTMLElement>('.scrap-doodle');

      // Where the bag opening sits — items spawn from this point
      const bagRect = bag.getBoundingClientRect();
      const mouthX = bagRect.left + bagRect.width / 2;
      const mouthY = bagRect.top + bagRect.height * 0.25;

      // Offset of each item's final spot from the bag mouth
      const deltas = items.map((item) => {
        const r = item.getBoundingClientRect();
        return {
          dx: mouthX - (r.left + r.width / 2),
          dy: mouthY - (r.top + r.height / 2),
        };
      });

      // Tuck every item inside the bag before first paint
      items.forEach((item, i) => {
        gsap.set(item, {
          x: deltas[i].dx,
          y: deltas[i].dy,
          scale: 0.1,
          rotation: i % 2 === 0 ? -50 : 50,
          opacity: 0,
        });
      });
      gsap.set(doodles, { scale: 0, opacity: 0, rotation: -30 });
      gsap.set(noteRef.current, { opacity: 0, y: 12 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1 — the bag lands on the page
      tl.from(bag, {
        y: 140,
        scale: 0.7,
        rotation: -6,
        opacity: 0,
        duration: 0.9,
        ease: 'back.out(1.5)',
      });

      // 2 — the title drops in like a pasted cutout
      if (titleRef.current) {
        tl.from(
          titleRef.current.children,
          {
            y: -60,
            opacity: 0,
            rotation: () => gsap.utils.random(-10, 10),
            scale: 0.8,
            stagger: 0.08,
            duration: 0.7,
            ease: 'back.out(1.7)',
          },
          '-=0.4'
        );
      }

      // 3 — the bag jiggles, then everything pops out of it
      tl.to(bag, {
        keyframes: [
          { scaleY: 0.94, scaleX: 1.05, duration: 0.12 },
          { scaleY: 1.04, scaleX: 0.97, duration: 0.12 },
          { scaleY: 1, scaleX: 1, duration: 0.15 },
        ],
        ease: 'power1.inOut',
      });

      tl.to(
        items,
        {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.05,
          stagger: 0.16,
          ease: 'back.out(1.3)',
        },
        '-=0.05'
      );

      // 4 — doodles and the handwritten note appear
      tl.to(
        doodles,
        { scale: 1, opacity: 1, rotation: 0, stagger: 0.07, duration: 0.45, ease: 'back.out(2)' },
        '-=0.6'
      );
      tl.to(noteRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');

      // 5 & 6 — once everything is out of the bag: idle float + scroll scatter.
      // Created only after the intro so the scrubbed tweens capture the
      // settled positions, not the tucked-in-the-bag state.
      tl.eventCallback('onComplete', () => {
        ctx.add(() => {
          items.forEach((item, i) => {
            // Float the inner card so it never fights the scrubbed
            // scatter tween on the wrapper for the same properties
            const card = item.firstElementChild;
            if (card) {
              gsap.to(card, {
                y: i % 2 === 0 ? 10 : -10,
                rotation: i % 2 === 0 ? '+=2' : '-=2',
                duration: 2.6 + i * 0.4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
              });
            }

            gsap.to(item, {
              x: -deltas[i].dx * 0.35,
              y: -deltas[i].dy * 0.35 - 60,
              rotation: i % 2 === 0 ? -14 : 14,
              opacity: 0,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: 'bottom top',
                scrub: 0.6 + i * 0.15,
              },
            });
          });

          gsap.to(bag, {
            rotation: 1.5,
            duration: 3.4,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
          gsap.to(bag, {
            y: 120,
            scale: 0.9,
            opacity: 0.4,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: { trigger: container, start: 'top top', end: 'bottom top', scrub: 1 },
          });
          if (titleRef.current) {
            gsap.to(titleRef.current, {
              y: -80,
              opacity: 0.2,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: { trigger: container, start: 'top top', end: 'bottom top', scrub: 1 },
            });
          }
        });
      });
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn('relative h-screen overflow-hidden', className)}
      style={{
        backgroundColor: '#faf7f3',
        backgroundImage:
          'linear-gradient(rgba(166, 124, 82, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(166, 124, 82, 0.08) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      {/* Soft paper vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 55%, rgba(92, 55, 32, 0.12) 100%)',
        }}
      />

      {/* Torn-paper strips pinned in the corners */}
      <div
        className="absolute -top-8 -left-16 w-72 h-24 rotate-[-8deg] pointer-events-none"
        style={{
          backgroundColor: 'rgba(232, 215, 195, 0.8)',
          clipPath: 'polygon(0 0, 100% 8%, 97% 78%, 84% 70%, 68% 92%, 45% 76%, 22% 96%, 6% 74%, 0 88%)',
        }}
      />
      <div
        className="absolute -bottom-6 -right-12 w-80 h-24 rotate-[6deg] pointer-events-none"
        style={{
          backgroundColor: 'rgba(240, 216, 134, 0.5)',
          clipPath: 'polygon(2% 12%, 18% 0, 42% 22%, 60% 2%, 82% 18%, 100% 6%, 100% 100%, 0 100%)',
        }}
      />

      {/* Title — pasted-cutout style */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 z-30 text-center w-full px-4 pointer-events-none">
        <div ref={titleRef} className="inline-flex flex-col items-center gap-3">
          <span
            className="inline-block text-primary-700 text-base md:text-xl rotate-[-2deg] px-4 py-1"
            style={{ fontFamily: HANDWRITTEN_FONT }}
          >
            {t.subtitle}
          </span>
          <span className="relative inline-block rotate-[-1.5deg] bg-white px-6 py-2 md:px-10 md:py-4 shadow-xl border border-neutral-200">
            {/* Tape on the title card */}
            <span
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 rotate-[3deg]"
              style={{ backgroundColor: TAPE_COLORS.gold, backdropFilter: 'blur(1px)' }}
            />
            <span className="font-display text-primary-900 text-5xl md:text-8xl font-bold leading-none">
              {t.title}
            </span>
          </span>
        </div>
      </div>

      {/* Handwritten note with an arrow toward the bag */}
      <p
        ref={noteRef}
        className="absolute bottom-[34%] left-1/2 -translate-x-1/2 md:translate-x-[110%] z-20 text-primary-800 text-lg md:text-2xl rotate-[-4deg] whitespace-nowrap"
        style={{ fontFamily: HANDWRITTEN_FONT }}
      >
        {t.note}
      </p>

      {/* The bag — everything pops out of here */}
      <div
        ref={bagRef}
        className="absolute bottom-[4%] left-1/2 -translate-x-1/2 z-10 w-52 md:w-72"
        style={{ transformOrigin: '50% 90%' }}
      >
        <BagIllustration className="w-full h-auto drop-shadow-[0_16px_24px_rgba(92,55,32,0.35)]" />
        <p
          className="text-center text-primary-800 text-base md:text-xl mt-1 rotate-[2deg]"
          style={{ fontFamily: HANDWRITTEN_FONT }}
        >
          {t.bagCaption}
        </p>
      </div>

      {/* The items that come out of the bag */}
      {ITEMS.map((item) => (
        <div
          key={item.id}
          className="scrap-item absolute z-20 will-change-transform"
          style={item.position}
        >
          <div
            className={cn('relative bg-white p-2 pb-1 md:p-3 md:pb-2 shadow-lg border border-neutral-200', item.width)}
            style={{ transform: `rotate(${item.tilt}deg)` }}
          >
            {/* Washi tape */}
            <span
              className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-5 rotate-[-4deg]"
              style={{ backgroundColor: TAPE_COLORS[item.tape], backdropFilter: 'blur(1px)' }}
            />
            {item.render('w-full h-auto')}
            <p
              className="text-center text-neutral-800 text-xs md:text-sm leading-tight pb-1"
              style={{ fontFamily: HANDWRITTEN_FONT }}
            >
              {isEnglish ? item.caption.en : item.caption.fr}
            </p>
          </div>
        </div>
      ))}

      {/* Doodles sprinkled around */}
      <StarDoodle className="scrap-doodle absolute top-[10%] left-[26%] w-7 md:w-9 z-10" />
      <HeartDoodle className="scrap-doodle absolute top-[30%] right-[24%] w-6 md:w-8 z-10" />
      <StarDoodle className="scrap-doodle absolute bottom-[20%] right-[20%] w-5 md:w-7 z-10" />
      <SwirlDoodle className="scrap-doodle absolute top-[38%] left-[22%] w-10 md:w-14 z-10" />
      <HeartDoodle className="scrap-doodle absolute bottom-[12%] left-[8%] w-5 md:w-7 z-10" />

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-6 z-40 flex items-center gap-2 text-primary-700">
        <span className="text-sm md:text-base rotate-[-3deg]" style={{ fontFamily: HANDWRITTEN_FONT }}>
          {t.scroll} ↓
        </span>
      </div>

      {/* Torn paper edge into the next section */}
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-8 md:h-12 z-30 pointer-events-none"
        aria-hidden="true"
      >
        <path
          d="M0 48 L0 26 L48 14 L96 30 L168 10 L240 28 L312 12 L390 32 L470 8 L560 26 L640 14 L730 30 L820 10 L910 28 L1000 14 L1090 30 L1180 10 L1270 26 L1360 12 L1440 24 L1440 48 Z"
          fill="#faf9f7"
        />
      </svg>
    </div>
  );
}
