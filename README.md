# Louna&Co Pilates — Editions-Style Marketing Site

> **Production-grade interactive marketing platform with scroll-driven animations, bilingual support, and baroque maximalist design.**

## 🎯 Project Overview

This is a Shopify Editions-class marketing site for Louna&Co Pilates, featuring:

- **Long-scroll Editions experience** with chapter navigation
- **Bilingual** (French/English) with `next-intl`
- **Baroque maximalist design** system (ornate frames, layered textures, dramatic typography)
- **Scroll-driven animations** using GSAP + ScrollTrigger + Lenis
- **CMS-ready data model** (Zod schemas for future Sanity/Contentful integration)
- **Performance optimized** (Server Components, dynamic imports, image optimization)
- **Full accessibility** (WCAG 2.1 AA, keyboard nav, reduced motion)
- **Production monitoring** (Analytics, Sentry-ready, Web Vitals)

---

## 🛠 Tech Stack

| Layer                  | Technology                                      |
| ---------------------- | ----------------------------------------------- |
| **Framework**          | Next.js 14+ App Router                          |
| **Language**           | TypeScript (strict mode)                        |
| **Styling**            | Tailwind CSS + CSS Variables                    |
| **Animations**         | GSAP ScrollTrigger (scroll) + Framer Motion (UI)|
| **Smooth Scroll**      | Lenis                                           |
| **Internationalization**| next-intl                                      |
| **Data Validation**    | Zod                                             |
| **Testing**            | Vitest (unit) + Playwright (E2E)                |
| **CI/CD**              | GitHub Actions → Vercel                         |

---

## 📁 Project Structure

```
lounaco/
├── app/                        # Next.js App Router
│   ├── [locale]/               # Localized routes (en, fr)
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Home (Editions long-scroll)
│   │   ├── classes/            # Classes list page
│   │   ├── memberships/        # Pricing tiers
│   │   ├── studio/             # Studio story
│   │   └── contact/            # Contact page
│   ├── globals.css             # Global styles
│   └── providers.tsx           # Client-side providers
├── components/                 # React components
│   ├── ChapterNav.tsx          # Sticky chapter navigation
│   ├── Chapter.tsx             # Scroll-driven chapter
│   ├── Section.tsx             # Section with card grid
│   ├── OrnamentLayer.tsx       # Baroque decorative layers
│   ├── Frame.tsx               # Ornate frame wrapper
│   ├── MediaBlock.tsx          # Responsive images/videos
│   └── VideoModal.tsx          # Video player modal
├── hooks/                      # Custom React hooks
│   ├── useActiveSection.ts     # IntersectionObserver for nav
│   ├── useScrollProgress.ts    # Scroll position 0..1
│   ├── useReducedMotion.ts     # Prefers-reduced-motion
│   └── useMediaQuery.ts        # Responsive breakpoints
├── lib/                        # Core libraries
│   ├── scroll/engine.ts        # Lenis + ScrollTrigger rAF loop
│   ├── i18n.ts                 # next-intl configuration
│   ├── analytics.ts            # Event tracking abstraction
│   ├── monitoring.ts           # Error tracking (Sentry-ready)
│   └── utils.ts                # Common utilities
├── data/                       # Data layer
│   ├── editions.ts             # Editions data + Zod schemas
│   └── classes.ts              # Classes data
├── styles/                     # Design system
│   ├── tokens.css              # CSS variables (colors, spacing, motion)
│   └── ornaments.css           # Baroque decorative styles
├── messages/                   # i18n translations
│   ├── en.json                 # English
│   └── fr.json                 # French
├── tests/                      # Test suites
│   ├── unit/                   # Vitest unit tests
│   ├── e2e/                    # Playwright E2E tests
│   └── setup.ts                # Test setup
├── public/                     # Static assets
│   ├── fonts/                  # Self-hosted fonts
│   ├── images/                 # Optimized images (WebP)
│   ├── videos/                 # Compressed videos
│   └── ornaments/              # SVG decorations
├── .github/workflows/          # CI/CD
│   └── ci.yml                  # GitHub Actions workflow
├── next.config.js              # Next.js config + security headers
├── tailwind.config.ts          # Tailwind config + design tokens
├── tsconfig.json               # TypeScript config (strict)
├── vitest.config.ts            # Vitest config
├── playwright.config.ts        # Playwright config
└── PERFORMANCE.md              # Performance budgets & checklist
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000/en](http://localhost:3000/en)

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run type-check   # TypeScript check
npm run test         # Run unit tests (Vitest)
npm run test:e2e     # Run E2E tests (Playwright)
```

---

## 🌐 Internationalization

**Supported Locales:** English (`en`), French (`fr`)

**Routing:**
- `/en` → English home
- `/fr` → French home
- `/en/classes` → English classes page
- `/fr/cours` → French classes page (if using translated slugs)

**Adding Translations:**

1. Edit `messages/en.json` and `messages/fr.json`
2. Use in components:
   ```typescript
   import { useTranslations } from 'next-intl';
   const t = useTranslations('nav');
   <button>{t('home')}</button>
   ```

**SEO:**
- Automatic `hreflang` tags
- Locale-specific metadata
- JSON-LD structured data

---

## 🎨 Design System

### Baroque Maximalism Principles

1. **Layered Backgrounds**
   - Texture base + vignette + grain + ornament SVGs
2. **Ornate Frames**
   - `<Frame ornate>` component with gilded borders
3. **Dramatic Typography**
   - Playfair Display (display), Inter (body), Cormorant (accent)
   - Generous scale (9xl = 8rem)
4. **Rich Color Palette**
   - Primary: warm browns/golds
   - Jewel tones: purple, emerald, ruby, sapphire, amber
5. **Controlled Motion**
   - Scroll-driven reveals with GSAP
   - Respect `prefers-reduced-motion`

### Design Tokens

Located in `styles/tokens.css`:

```css
--color-primary-600: #8b5a3c;
--color-gold: #d4af37;
--text-6xl: 3.75rem;
--space-24: 6rem;
--duration-medium: 500ms;
--ease-dramatic: cubic-bezier(0.87, 0, 0.13, 1);
```

Tailwind classes:
```jsx
<div className="bg-primary-600 text-6xl p-24 transition-medium ease-dramatic">
```

---

## 📊 Data Model (CMS-Ready)

### Zod Schemas

All data validated with Zod for type safety:

```typescript
// data/editions.ts
export const ChapterSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: LocalizedStringSchema,
  sections: z.array(SectionSchema),
  // ...
});
```

### Sample Data

Provided in `data/editions.ts`:
- 3 chapters (Movement, Classes, Studio)
- 12+ cards across sections
- Bilingual content

### Future CMS Integration

Ready for Sanity/Contentful:

```typescript
// Replace static data with CMS fetch
const chapters = await client.fetch(groq`*[_type == "chapter"]`);
```

---

## 🎬 Scroll Engine

### Architecture

**Single rAF loop** drives both Lenis and ScrollTrigger:

```typescript
// lib/scroll/engine.ts
lenis.on('scroll', () => {
  ScrollTrigger.update();
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
```

### Usage

```typescript
// In client component
useEffect(() => {
  initScrollEngine();
  return () => destroyScrollEngine();
}, []);
```

### Features

- Smooth scroll (Lenis)
- Scroll-triggered animations (GSAP)
- URL hash sync (IntersectionObserver)
- Keyboard navigation
- Reduced motion support

---

## 📈 Performance

See [`PERFORMANCE.md`](./PERFORMANCE.md) for full details.

### Budgets

- **JS Bundle:** < 250 KB (gzipped) per route
- **LCP:** < 2.5s
- **CLS:** < 0.1
- **Hero Video:** < 2 MB
- **Fonts:** < 150 KB total

### Optimization Strategies

1. **Code splitting:** Dynamic imports for VideoModal, GSAP
2. **Partial hydration:** Server Components for static content
3. **Image optimization:** `next/image` with WebP/AVIF
4. **Font subsetting:** `next/font` with automatic subsetting
5. **Memoization:** `useMemo` for expensive calculations

### Monitoring

- **RUM:** Vercel Analytics (Web Vitals)
- **Synthetic:** Lighthouse CI in GitHub Actions
- **Errors:** Sentry (via `lib/monitoring.ts`)

---

## ♿ Accessibility

**WCAG 2.1 AA Compliant:**

- ✅ Contrast ratios (4.5:1 for text)
- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ Skip-to-content link
- ✅ ARIA labels on interactive elements
- ✅ Semantic HTML
- ✅ Alt text for images
- ✅ Reduced motion support

**Testing:**
```bash
# Automated
npm run lint  # Includes a11y checks

# Manual
# 1. Keyboard: Tab through page
# 2. Screen reader: Test with NVDA/VoiceOver
```

---

## 🧪 Testing

### Unit Tests (Vitest)

```bash
npm run test
```

Located in `tests/unit/`:
- Hook tests
- Utility function tests

### E2E Tests (Playwright)

```bash
npm run test:e2e
```

Located in `tests/e2e/`:
- Page navigation
- Language switching
- Chapter scroll behavior
- Class filtering

**Cross-browser testing:** Chrome, Firefox, Safari, Mobile

---

## 🚢 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Environment Variables:**
   ```
   NEXT_PUBLIC_SENTRY_DSN=...
   NEXT_PUBLIC_GA_ID=...
   ```
4. **Deploy:** Auto-deploys on push to `main`

### CI/CD Pipeline

See `.github/workflows/ci.yml`:

1. **Lint & Type Check**
2. **Unit Tests**
3. **E2E Tests**
4. **Build**
5. **Deploy to Vercel** (on `main` branch)

**Preview Deployments:** Automatic for PRs

---

## 📊 Analytics

### Event Tracking

Implemented in `lib/analytics.ts`:

```typescript
import { trackEvent } from '@/lib/analytics';

trackEvent('chapter_view', { chapter: 'movement' });
trackEvent('cta_click', { cta_id: 'book-now', destination: '/book' });
```

**Events:**
- `chapter_view`
- `section_view`
- `cta_click`
- `video_play`
- `video_complete`
- `language_switch`

**Providers:** Pluggable (GA4, Segment, Mixpanel)

---

## 🔒 Security

### HTTP Headers

Configured in `next.config.js`:

- `Strict-Transport-Security`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Content-Security-Policy` (customizable)
- `Referrer-Policy`

### Safe Practices

- No sensitive data in client code
- Environment variables for secrets
- CSP prevents XSS
- Input validation with Zod

---

## 🎨 Asset Guidelines

### Images

**Format:** WebP (with JPEG fallback)
**Compression:** TinyPNG or Squoosh
**Naming:** `{section}-{purpose}.jpg` (e.g., `hero-movement.jpg`)

**Optimization:**
```bash
npx @squoosh/cli --webp auto public/images/**/*.jpg
```

### Videos

**Format:** MP4 (H.264) + WebM (VP9)
**Max size:** 2 MB for hero videos
**Compression:**
```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 output.mp4
```

### Fonts

**Self-hosted** via `next/font`:
- Playfair Display (400, 700, 900)
- Inter (400, 600)
- Cormorant Garamond (400, 600)

---

## 🔧 Configuration

### Environment Variables

Create `.env.local`:

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Monitoring
NEXT_PUBLIC_SENTRY_DSN=https://...

# Feature Flags
NEXT_PUBLIC_ENABLE_VIDEO_MODAL=true
NEXT_PUBLIC_MOTION_INTENSITY=high
```

### Next.js Config

See `next.config.js`:
- Image optimization
- Security headers
- Redirects
- i18n with `next-intl`

---

## 🤝 Contributing

### Code Style

- **Formatter:** Prettier (`npm run format`)
- **Linter:** ESLint (`npm run lint`)
- **TypeScript:** Strict mode

### Git Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Run tests: `npm run test && npm run test:e2e`
4. Commit: `git commit -m "feat: add new feature"`
5. Push: `git push origin feature/your-feature`
6. Open PR

---

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [GSAP ScrollTrigger](https://greensock.com/scrolltrigger/)
- [Lenis Smooth Scroll](https://github.com/studio-freight/lenis)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📄 License

© 2024 Louna&Co Pilates. All rights reserved.

---

## 🆘 Support

For issues or questions:
- **GitHub Issues:** [Report bug](https://github.com/org/repo/issues)
- **Email:** dev@lounaco.com
