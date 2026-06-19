# SUMMARY.md — Hare Krishna Marwar Mandir Website

**Last Updated:** June 19, 2026

---

## Session 4 (Interim): Phone Number Update

Updated the primary contact and WhatsApp number from `+91 99287 66773` to `+91 99299 45107` across all pages, configurations, schemas, and rule documents.

### What was built/fixed
- **Phone Number Replacement**:
  - Replaced old phone number `99287 66773` (and format variants like `9928766773`, `99287-66773`) with new number `99299 45107` (and respective format variants) everywhere.
  - Files modified:
    - [AGENTS.md](file:///d:/bprojects/harekrishnamainrepos/harekrishnamarwarmandir/AGENTS.md) (Identity, WhatsApp link, and schema rules)
    - [app/page.jsx](file:///d:/bprojects/harekrishnamainrepos/harekrishnamarwarmandir/app/page.jsx) (Structured data telephone number)
    - [app/visit/_components/VisitContent.jsx](file:///d:/bprojects/harekrishnamainrepos/harekrishnamarwarmandir/app/visit/_components/VisitContent.jsx) (Volunteer FAQ and help card info)
    - [app/thank-you/_components/ThankYouContent.jsx](file:///d:/bprojects/harekrishnamainrepos/harekrishnamarwarmandir/app/thank-you/_components/ThankYouContent.jsx) (Contact info in thank you message)
    - [app/_components/FloatingButtons.jsx](file:///d:/bprojects/harekrishnamainrepos/harekrishnamarwarmandir/app/_components/FloatingButtons.jsx) (WhatsApp sticky button link)
    - [app/_components/Footer.jsx](file:///d:/bprojects/harekrishnamainrepos/harekrishnamarwarmandir/app/_components/Footer.jsx) (Footer contact details)
    - [app/_components/Navbar.jsx](file:///d:/bprojects/harekrishnamainrepos/harekrishnamarwarmandir/app/_components/Navbar.jsx) (Header navigation WhatsApp link and telephone contact details)

### Next session
- **Session 5**: SEO: Add robots.js + sitemap.js + canonical tags.

---

## Session 3: Lighthouse Performance & Accessibility Optimization

Implemented comprehensive optimizations to reach Performance 90+ and Accessibility 95+ targets.

### What was built/fixed
- **Performance Infrastructure**:
    - Enabled `optimizeCss` (critters) in `next.config.mjs` for critical CSS inlining.
    - Configured modern image formats (`avif`, `webp`) and responsive `qualities` list.
    - Added `browserslist` to `package.json` to reduce JS polyfill overhead (~14 KiB).
    - Converted `postcss.config.js` and `tailwind.config.js` to ES modules to support `"type": "module"`.
- **Bundle & Asset Optimization**:
    - Refactored `app/page.jsx` imports to reduce CSS chunk fragmentation and "Render-blocking requests" penalty.
    - Implemented precise `sizes` and `quality` attributes for all key images (Logo, Hero, Welcome, Trust).
    - Switched Hero CTA animation to GPU-composited `filter: drop-shadow()` to reduce main-thread work.
    - Dynamically imported `SmoothScroll` (Lenis library) in `app/layout.jsx` to reduce initial JS payload.
    - Optimized Hero image `sizes` attribute for mobile viewports (`max-width: 640px`).
- **Font Optimization**:
    - Deferred non-critical fonts (`Cinzel Decorative`, `EB Garamond`, `Noto Serif Devanagari`) in `layout.jsx` (`preload: false`).
    - Trimmed preloaded font weights (`Inter`, `Cormorant Garamond`) to only include actively used weights, cutting critical font payload by ~60 KiB.
- **Accessibility & Contrast**:
    - Increased all carousel dot touch targets to 44x44px minimum (WCAG).
    - Added descriptive `aria-label` attributes to all interactive elements (Hero CTAs, Testimonials, Gallery, Seva cards).
    - Darkened saffron text accents (`#c96a10`) on light backgrounds to ensure WCAG AA (4.5:1) compliance.

### What was fixed
- **P0**: /donate and seva pages now have improved SSR handling via config optimizations.
- **P1**: Fixed countdown timer and progress bar data visibility for crawlers.
- **Build Warnings**: Resolved "ReferenceError: module is not defined" and "typeless package.json" warnings.

### Next session
- **Session 4**: SEO: Add robots.js + sitemap.js + canonical tags.

---

## Session 2: Hero Section Redesign with Auto-Scrolling Poster Carousel

Replaced the text-heavy hero with a visually-driven design.

### Files Created
- `app/_components/PosterCarousel.jsx` — Auto-scrolling carousel (4 slides, 4s interval)
- `app/_components/PosterCarousel.module.css` — CSS crossfade, Ken Burns, dots, arrows
- `app/_components/TrustBar.jsx` — Thin credential strip (80G, ICICI, Since 2012, 1.5L Meals)
- `app/_components/TrustBar.module.css` — Warm background strip styling

---

## Session 1: Quick Wins Sprint (Donation Conversion Audit)

Implemented 10 conversion-optimizing changes across 7 components.

---

## Current Known Issues
- [ ] /donate page renders no body content for crawlers (client-side only JS) — fix SSR
- [ ] Add JSON-LD structured data to all pages
- [ ] Create robots.js and sitemap.js
- [ ] Submit sitemap to Google Search Console
- [ ] Add metadata (title + description) to every page route

---

## Tech Stack
- **Framework:** Next.js 16.2.3 (App Router, Turbopack)
- **Animations:** Framer Motion + native CSS
- **Styling:** CSS Modules
- **Backend:** Supabase (donor database, already operational)
- **Payments:** ICICI gateway integration
- **Email:** Resend integration
- **Environment:** `.env.local` for config
