# PERFORMANCE BUDGETS & OPTIMIZATION

## PERFORMANCE BUDGETS

### JavaScript Bundle Size (Per Route)

| Route          | Max Bundle Size | Current | Status |
| -------------- | --------------- | ------- | ------ |
| `/en`          | 250 KB          | TBD     | ⏳     |
| `/en/classes`  | 150 KB          | TBD     | ⏳     |
| `/en/memberships` | 120 KB       | TBD     | ⏳     |
| `/en/studio`   | 120 KB          | TBD     | ⏳     |
| `/en/contact`  | 100 KB          | TBD     | ⏳     |

**Measurement**: Gzipped JS payload (first load)

### Core Web Vitals Targets

| Metric | Target | Good  | Needs Improvement |
| ------ | ------ | ----- | ----------------- |
| LCP    | < 2.5s | < 2.5s | 2.5s - 4.0s      |
| FID    | < 100ms| < 100ms| 100ms - 300ms    |
| CLS    | < 0.1  | < 0.1  | 0.1 - 0.25       |
| FCP    | < 1.8s | < 1.8s | 1.8s - 3.0s      |
| TTFB   | < 800ms| < 600ms| 600ms - 800ms    |

### Media Budget

| Asset Type     | Max Individual Size | Max Above-the-Fold Total |
| -------------- | ------------------- | ------------------------ |
| Hero Image     | 200 KB (WebP)       | 400 KB                   |
| Hero Video     | 2 MB (first 10s)    | 2 MB                     |
| Section Images | 100 KB (WebP)       | N/A                      |
| Fonts          | 150 KB total        | 150 KB (all)             |

### Font Budget

| Font Family        | Weights Used | Total Size |
| ------------------ | ------------ | ---------- |
| Playfair Display   | 400, 700, 900| ~60 KB     |
| Inter              | 400, 600     | ~50 KB     |
| Cormorant Garamond | 400, 600     | ~40 KB     |
| **Total**          |              | **~150 KB**|

---

## OPTIMIZATION STRATEGIES

### 1. Code Splitting & Dynamic Imports

**Implementation:**

```typescript
// Dynamic imports for heavy components
const VideoModal = dynamic(() => import('@/components/VideoModal'), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

// GSAP/ScrollTrigger loaded only on client
const gsapModules = import('gsap/all'); // Lazy load
```

**Files to split:**
- VideoModal (only when opened)
- GSAP ScrollTrigger (client-only)
- Analytics libraries (defer)

### 2. Partial Hydration

**Server Components (Static, No JS):**
- Layout shell
- Static content blocks
- Section headers
- Footer

**Client Components (Hydrated):**
- ChapterNav (scroll + keyboard)
- Chapter (scroll animations)
- VideoModal (interaction)
- LanguageSwitcher

### 3. Image Optimization

**next/image configuration:**
```typescript
// sizes attribute for responsive images
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"

// Priority for above-the-fold
priority={true} // Hero images only

// Lazy-load below fold (default)
loading="lazy"
```

**Asset pipeline:**
```bash
# Convert images to WebP/AVIF
npm run optimize:images

# Example using sharp/imagemin
npx @squoosh/cli --webp auto images/**/*.jpg
```

### 4. Video Optimization

**FFmpeg commands:**

```bash
# Compress hero video (first 10 seconds)
ffmpeg -i hero.mp4 -t 10 -vcodec libx264 -crf 28 -preset fast hero-compressed.mp4

# Generate poster image
ffmpeg -i hero.mp4 -ss 00:00:01 -vframes 1 hero-poster.jpg

# Create multiple formats
ffmpeg -i hero.mp4 -c:v libvpx-vp9 -crf 30 hero.webm
```

**Lazy-load strategy:**
- Hero video: autoplay, muted, loop (preload="metadata")
- Modal videos: load on open (preload="none")

### 5. Memoization & Virtualization

**React optimization:**

```typescript
// Memo expensive calculations
const sortedChapters = useMemo(
  () => [...chapters].sort((a, b) => a.order - b.order),
  [chapters]
);

// Memo components with stable props
const MemoizedSection = memo(Section);
```

**Virtualization:**
- Not needed for Editions (long-scroll with ~3 chapters)
- Consider for `/classes` if > 50 classes

### 6. Font Loading Strategy

**Self-hosted fonts with `next/font`:**
- Automatic subsetting
- Preload critical fonts
- `display: swap` to prevent FOIT

**Preload in `<head>`:**
```html
<link rel="preload" href="/fonts/playfair.woff2" as="font" type="font/woff2" crossorigin>
```

---

## MONITORING PLAN

### 1. Real User Monitoring (RUM)

**Tool:** Vercel Analytics or Google Analytics 4

**Metrics to track:**
- Core Web Vitals (LCP, FID, CLS)
- Custom events (chapter_view, video_play)
- Page load time by route

### 2. Synthetic Monitoring

**Tools:**
- Lighthouse CI (automated in GitHub Actions)
- WebPageTest (weekly manual checks)

**Lighthouse targets:**
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 95

### 3. Error Tracking

**Tool:** Sentry (via `lib/monitoring.ts`)

**Tracked:**
- JavaScript errors
- Network failures
- Performance degradation alerts

### 4. Bundle Analysis

**Tool:** `@next/bundle-analyzer`

```bash
# Analyze bundle
ANALYZE=true npm run build
```

**Check for:**
- Duplicate dependencies
- Large packages (> 50 KB)
- Unused code

---

## FEATURE FLAGS / EXPERIMENTS

**Environment-based flags:**

```typescript
// .env.local
NEXT_PUBLIC_ENABLE_VIDEO_MODAL=true
NEXT_PUBLIC_MOTION_INTENSITY=high # high | low | none

// Usage
const enableVideoModal = process.env.NEXT_PUBLIC_ENABLE_VIDEO_MODAL === 'true';
```

**Data-level flags:**

```typescript
// data/editions.ts
export const featureFlags = {
  enableChapter: (chapterId: string) => {
    // Hide chapters during maintenance
    return !['chapter-beta'].includes(chapterId);
  },
};
```

---

## ACCESSIBILITY CHECKLIST

### ✅ WCAG 2.1 AA Compliance

- [x] Contrast ratio ≥ 4.5:1 for text
- [x] Contrast ratio ≥ 3:1 for large text (18pt+)
- [x] Keyboard navigation (Tab, Enter, Escape)
- [x] Focus indicators visible
- [x] Skip-to-content link
- [x] ARIA labels on interactive elements
- [x] Semantic HTML (headings hierarchy)
- [x] Alt text for all images
- [x] Captions/transcripts for videos
- [x] Reduced motion support (`prefers-reduced-motion`)
- [x] Screen reader testing (NVDA, VoiceOver)

### Testing Tools

- **Automated:** axe DevTools, Lighthouse
- **Manual:** Keyboard navigation, screen reader

---

## ASSET MANAGEMENT

### Directory Structure

```
public/
├── fonts/
│   ├── playfair-display-v400.woff2
│   ├── inter-v400.woff2
│   └── cormorant-garamond-v400.woff2
├── images/
│   ├── hero-movement-poster.jpg (WebP, < 200 KB)
│   ├── precision.jpg
│   └── og-image.jpg (1200x630)
├── videos/
│   ├── hero-movement.mp4 (< 2 MB, 10s)
│   └── hero-movement.webm
└── ornaments/
    └── frame-baroque.svg
```

### Naming Conventions

- **Images:** `{section}-{purpose}.{ext}` (e.g., `hero-movement-poster.jpg`)
- **Videos:** `{section}-{purpose}.{ext}` (e.g., `hero-movement.mp4`)
- **Fonts:** `{family}-{weight}.{ext}` (e.g., `playfair-display-400.woff2`)

### Optimization Scripts

```json
// package.json
"scripts": {
  "optimize:images": "imagemin public/images/**/*.{jpg,png} --out-dir=public/images --plugin=webp",
  "optimize:videos": "bash scripts/optimize-videos.sh"
}
```

---

## DEPLOYMENT CHECKLIST

### Pre-Deploy

- [ ] Run `npm run build` locally
- [ ] Run `npm run lint`
- [ ] Run `npm run type-check`
- [ ] Run `npm run test`
- [ ] Run `npm run test:e2e`
- [ ] Check bundle size (< budgets)
- [ ] Review Lighthouse scores

### Post-Deploy

- [ ] Verify production URL loads
- [ ] Test language switching (EN ↔ FR)
- [ ] Test chapter navigation
- [ ] Test on mobile devices
- [ ] Check Web Vitals in Vercel Analytics
- [ ] Monitor error rates in Sentry

---

## BROWSER SUPPORT

| Browser         | Min Version | Notes                          |
| --------------- | ----------- | ------------------------------ |
| Chrome          | 90+         | Primary testing target         |
| Firefox         | 88+         | Full support                   |
| Safari          | 14+         | Test smooth scroll behavior    |
| Edge            | 90+         | Chromium-based, same as Chrome |
| Mobile Safari   | iOS 14+     | Test touch scroll              |
| Mobile Chrome   | 90+         | Primary mobile target          |

**Graceful degradation:**
- Smooth scroll fallback to native `scroll-behavior: smooth`
- Animations disabled with `prefers-reduced-motion`
