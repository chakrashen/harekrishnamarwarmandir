# SUMMARY.md — Session 2: Full Homepage + ICICI Payment Integration

## Session Update — 2026-04-14 (Dev CSP Fix for RSC/HMR)

### Scope
- Relaxed CSP in development to allow local HTTP/WebSocket traffic and avoid upgrading localhost requests to HTTPS.
- Prevented dev RSC fetch/HMR failures caused by CSP restrictions.

### Files Updated
- `lib/csp.js`

## Session Update — 2026-04-14 (Website Audit)

### Scope
- Audited donation and payment flow, security posture, conversion UX, and contact/newsletter funnels.
- Logged prioritized findings with file/line references in chat.

### Files Updated
- None (audit only)

## Session Update — 2026-04-14 (Hardening + Newsletter + CSP)

### Scope
- Hardened payment callback signature verification and kept email optional without breaking gateway flow.
- Added PII encryption/redaction support for PAN/Aadhaar and safe receipt handling.
- Implemented newsletter backend endpoint and wired frontend submission.
- Added CSP response headers and embedded map with safe external link handling.

### Files Updated
- `app/api/pay/route.js`
- `app/api/payment-callback/route.js`
- `app/api/newsletter/route.js` (new)
- `app/_components/Newsletter.jsx`
- `app/_components/Hero.module.css` (new)
- `app/contact/_components/ContactContent.jsx`
- `app/contact/_components/ContactContent.module.css`
- `app/thank-you/_components/ThankYouContent.jsx`
- `app/layout.jsx`
- `next.config.mjs`
- `lib/csp.js` (new)
- `lib/pii.js` (new)
- `lib/donation-receipt.js`

## Session Update — 2026-04-14 (Homepage Hero + Utility Bar)

### Scope
- Added a top utility bar (email/WhatsApp/phone + darshan hours) styled to match the saffron theme.
- Reworked the hero to a full-bleed image treatment while keeping the existing headline text.
- Renamed navigation label from "Seva & Events" to "Events".

### Files Updated
- `app/_components/Navbar.jsx`
- `app/_components/Navbar.module.css`
- `app/_components/Hero.jsx`
- `app/_components/Hero.module.css`

## Session Update — 2026-04-14 (Premium Scrolling UX)

### Scope
- Added Lenis smooth scrolling with reduced-motion and save-data safeguards.
- Added a gold scroll progress indicator at the top of the viewport.
- Tuned scroll reveal animation to 20px/0.8s ease-out and limited it to Hero, Seva highlights, and Testimonials.
- Made parallax on Gau Seva and Mandir Nirman cards more subtle for mobile performance.

### Files Updated
- `package.json`
- `app/layout.jsx`
- `app/page.jsx`
- `app/globals.css`
- `app/_components/SmoothScroll.jsx` (new)
- `app/_components/ScrollProgress.jsx` (new)
- `app/_components/ScrollProgress.module.css` (new)
- `app/_components/SevaHighlights.jsx`

## Session Update — 2026-04-14 (Scroll Performance Optimization)

### Scope
- Reduced scroll jank by disabling Lenis on mobile/low-power devices.
- Gated parallax effects to desktop only and skipped offscreen updates.
- Throttled WaveBackdrop parallax and removed unused logic.
- Removed unused legacy scroll-progress styles.

### Files Updated
- `app/_components/SmoothScroll.jsx`
- `app/_components/SevaHighlights.jsx`
- `app/_components/WaveBackdrop.jsx`
- `app/globals.css`

## Session Update — 2026-04-14 (Hero Jank Reduction)

### Scope
- Added compositor hints and containment for the hero background and trust badges.
- Switched hero image to eager async decoding for smoother first paint.
- Throttled navbar scroll updates via requestAnimationFrame.
- Isolated the quick donate card to reduce blending overhead.

### Files Updated
- `app/_components/Hero.jsx`
- `app/_components/Hero.module.css`
- `app/_components/Navbar.jsx`

## Session Update — 2026-04-14 (Hero Motion Lightness)

### Scope
- Added subtle hero background parallax (0.12 ratio) gated to desktop and low-power checks.
- Staggered hero headline, badges, and quick seva cards for a lighter entrance feel.
- Applied premium ease curve for reveal animations.
- Replaced heavy shadows on hero quick cards and Seva cards with thin gold borders.

### Files Updated
- `app/_components/Hero.jsx`
- `app/_components/Hero.module.css`
- `app/_components/SevaHighlights.module.css`
- `app/globals.css`

## Session Update — 2026-04-13 (About Page Premium Redesign)

### Scope
- Rebuilt About page with premium hierarchy, unified CTAs, and story-driven flow.
- Added depth, gradients, and hover interactions across impact sections.
- Aligned CTA labels to only "Offer Your Seva" and "Explore Mandir".

### Implemented

#### 1) Story Flow + Copy
- Reordered sections to Emotion → Mission → Impact → Action.
- Updated hero headline to "Be Part of Krishna's Seva in Marwar" and rewrote supporting copy.
- Consolidated all CTAs to two labels only.

#### 2) Premium Visual System
- Softer hero overlay with added bottom fade and texture for depth.
- New impact rows with alternating layouts, hover lift, and image zoom.
- Strengthened typography, spacing rhythm, and section transitions with warm gradients.

### Files Updated
- `app/about/_components/AboutContent.jsx`
- `app/about/_components/AboutContent.module.css`

## Session Update — 2026-04-13 (Olive Background System)

### Scope
- Replaced global creamy background with a single subtle olive radial gradient.
- Introduced alternating section surfaces (white / soft olive) and subtle separator lines.

### Files Updated
- `app/globals.css`

## Session Update — 2026-04-13 (WaveBackdrop for Hero Sections)

### Scope
- Added reusable SVG-based wave backdrop with soft layered gradients.
- Applied waves to Home, About, and Events hero sections with correct layering order.

### Files Updated
- `app/_components/WaveBackdrop.jsx`
- `app/_components/WaveBackdrop.module.css`
- `app/_components/Hero.jsx`
- `app/_components/Hero.module.css`
- `app/about/_components/AboutContent.jsx`
- `app/about/_components/AboutContent.module.css`
- `app/events/_components/EventsContent.jsx`
- `app/events/_components/EventsContent.module.css`

## Session Update — 2026-04-13 (WaveBackdrop Refinement)

### Scope
- Reduced wave opacity, added blur to a single layer, and offset layers vertically.
- Added bottom fade mask so waves taper out softly.

### Files Updated
- `app/_components/WaveBackdrop.jsx`
- `app/_components/WaveBackdrop.module.css`

## Session Update — 2026-04-13 (WaveBackdrop Micro-Enhancements)

### Scope
- Added subtle parallax motion, top glow, and two-sided mask fades.
- Introduced per-page tint variants while keeping waves ultra-subtle.

### Files Updated
- `app/_components/WaveBackdrop.jsx`
- `app/_components/WaveBackdrop.module.css`
- `app/_components/Hero.jsx`
- `app/about/_components/AboutContent.jsx`
- `app/events/_components/EventsContent.jsx`

## Session Update — 2026-04-13 (WaveBackdrop Final Polish)

### Scope
- Added eased parallax to reduce jitter.
- Warmed top glow and added ultra-subtle noise texture.
- Tuned mask fades and blur for smoother edges and performance.

### Files Updated
- `app/_components/WaveBackdrop.jsx`
- `app/_components/WaveBackdrop.module.css`

## Session Update — 2026-04-13 (Navbar Soft Edge)

### Scope
- Removed hard borders and added soft glass shadow for the navbar.
- Added a subtle bottom gradient fade for smoother blending into hero sections.

### Files Updated
- `app/_components/Navbar.module.css`

## Session Update — 2026-04-13 (80G Toggle + Receipt API Integration)

### Scope
- Added 80G checkbox with conditional PAN/Aadhaar capture and full postal address collection.
- Implemented donation receipt API integration with retries, timeouts, and masked logging.
- Mapped ICICI transaction ID to `remarks` for DCC bank reconciliation.

### Implemented

#### 1) Donation Receipt API (Production-Style)
- Added helper `lib/donation-receipt.js` to build payloads, mask logs, and retry failed calls.
- Environment overrides for preacher/company/series and request tuning:
  - `DONATION_RECEIPT_API_URL`, `DONATION_RECEIPT_API_TOKEN`
  - `DONATION_PREACHER`, `DONATION_COMPANY`, `DONATION_RECEIPT_SERIES`
  - `DONATION_RECEIPT_TIMEOUT_MS`, `DONATION_RECEIPT_MAX_RETRIES`, `RECEIPT_DEBUG`
- Callback flow now attempts receipt creation on `completed` payments and stores status.

#### 2) 80G Certificate UX
- Added 80G checkbox, helper text, and conditional PAN/Aadhaar fields.
- Address fields collected for all donations to satisfy receipt API requirement.
- Client and server validation for PIN code, PAN, Aadhaar.

### Files Updated
- `lib/donation-receipt.js` (new)
- `app/api/pay/route.js`
- `app/api/payment-callback/route.js`
- `app/donate/_components/DonateForm.jsx`
- `app/donate/_components/DonateForm.module.css`

### Notes
- Supabase `donations` table should include `receipt_meta` (JSON), `receipt_id`, `receipt_url`, `receipt_status` columns.
- If `receipt_meta` is missing, inserts fall back without it and receipt creation will be skipped.

## Session Update — 2026-04-13 (Reveal Utility + Typography + Mobile Conversion Pass)

### Scope
- Added reusable scroll-reveal animation utility and applied it across homepage sections.
- Executed dedicated typography refinement for Sanskrit-inspired premium identity.
- Performed focused mobile conversion improvements for thumb zones, CTA spacing, nav labels, and tap targets.

### Implemented

#### 1) Scroll-Reveal Utility (Uniform Application)
- Added reusable hook: `app/_hooks/useScrollReveal.js`
  - IntersectionObserver based
  - supports reduced-motion
  - once-by-default reveal behavior
- Added wrapper component: `app/_components/SectionReveal.jsx`
- Applied wrappers with staggered delays around all homepage blocks in `app/page.jsx`.
- Added global reveal classes (`.reveal`, `.revealed`) in `app/globals.css`.

#### 2) Typography Identity Upgrade
- Added new premium heading font + Sanskrit-compatible label font in `app/layout.jsx`:
  - `Cormorant Garamond` (`--font-cormorant`)
  - `Noto Serif Devanagari` (`--font-devanagari`)
- Updated global typography tokens in `app/globals.css`:
  - `--font-heading` -> `--font-cormorant`
  - `--font-display` -> `--font-cinzel`
  - `--font-spiritual` -> `--font-devanagari`
- Refined heading weights/letter spacing for more elegant premium tone.
- Upgraded section label style and divider to include subtle spiritual marker (`ॐ`).
- Applied typography refinements in hero CSS (`app/_components/Hero.module.css`) for kicker/headline/supporting hierarchy.

#### 3) Mobile Conversion Pass
- Improved base button ergonomics in `app/globals.css`:
  - min target size (`44px` desktop, `48px` mobile)
  - touch-action optimization
- Upgraded bottom navigation for thumb-zone use in `app/_components/BottomNav.module.css`:
  - larger nav height and spacing
  - improved item min-size and label readability
  - better sticky CTA visual dominance and hover affordance
- Updated bottom nav label clarity in `app/_components/BottomNav.jsx`:
  - "Events" -> "Seva"
- Enhanced hero mobile CTA spacing/sizing and badge touch comfort in `app/_components/Hero.module.css`.

### Files Updated
- `app/_hooks/useScrollReveal.js` (new)
- `app/_components/SectionReveal.jsx` (new)
- `app/page.jsx`
- `app/layout.jsx`
- `app/globals.css`
- `app/_components/Hero.module.css`
- `app/_components/BottomNav.jsx`
- `app/_components/BottomNav.module.css`

### Validation
- Diagnostics show no errors in all modified/new files.

## Session Update — 2026-04-13 (Testimonials YouTube Embed)

### Change
- Replaced testimonial video placeholder with embedded YouTube video.
- Added reusable embed URL and iframe with responsive aspect ratio.

### Files Updated
- `app/_components/Testimonials.jsx`
- `app/_components/Testimonials.module.css`

## Session Update — 2026-04-13 (Homepage Movement-Style Conversion Redesign)

### Objective
- Shift homepage positioning from donation ask to spiritual belonging:
  - from "help/donate" framing
  - to "Offer Your Seva" identity-based participation.

### Key UX + Copy Changes
- Unified homepage CTA language:
  - Primary CTA: "Offer Your Seva"
  - Secondary CTA: "Explore Mandir"
- Hero rewritten with emotional movement framing:
  - Headline: "Be Part of Krishna's Seva in Marwar"
  - Subtext: "Every contribution builds devotion, feeds devotees, and serves dharma."
- Added hero trust badges:
  - 80G Tax Benefit
  - Secure Payment
  - 10,000+ Devotees
- Donation spotlight updated with impact-linked amounts:
  - ₹501 -> Feeds devotees
  - ₹1101 -> 1 Day Prasadam Seva (recommended)
  - ₹2101 -> Temple Construction Support
- Added urgency line:
  - "Grand Opening March 2027 - Be part before completion."

### Visual + Interaction Improvements
- Hero contrast improved with stronger gradient overlay over image for readability.
- Added subtle motif texture and premium saffron gradients in core action sections.
- Enhanced depth and hover-lift interactions for cards and trust proof modules.
- Standardized transitions to `0.3s ease` via global token for cleaner micro-interactions.
- Upgraded mobile sticky CTA to match premium saffron pill style.

### Section Flow Optimization
- Reordered homepage sequence to follow emotional conversion flow:
  1. Hero (emotional identity)
  2. Welcome (belonging)
  3. Trust (proof + stats + visual activities)
  4. Donation Spotlight (action)
  5. Seva Highlights + Construction (impact)
  6. Testimonials (social proof)

### Files Updated
- `app/page.jsx`
- `app/globals.css`
- `app/_components/Hero.jsx`
- `app/_components/Hero.module.css`
- `app/_components/DonationSpotlight.jsx`
- `app/_components/DonationSpotlight.module.css`
- `app/_components/SevaHighlights.jsx`
- `app/_components/SevaHighlights.module.css`
- `app/_components/TrustSection.jsx`
- `app/_components/TrustSection.module.css`
- `app/_components/ConstructionMeter.jsx`
- `app/_components/Navbar.jsx`
- `app/_components/BottomNav.jsx`
- `app/_components/BottomNav.module.css`
- `app/_components/Welcome.jsx`

### Validation
- File diagnostics show no errors in all modified files.

## Session Update — 2026-04-13 (Premium Spiritual Navbar Redesign)

### Scope
- Redesigned main navbar for a premium, spiritual, trust-first feel using saffron gradient glass styling.
- Focused on hierarchy, CTA strength, active navigation clarity, and responsive behavior.

### Changes Applied
- Updated menu labels:
  - Donate -> Be a Part of Mandir
  - Visit -> Darshan
  - Events -> Seva & Events
- Upgraded navbar visual language:
  - soft glassmorphism with `backdrop-filter` blur,
  - saffron/orange gradient surfaces (`#ff7a00`, `#ffae42`),
  - smoother sticky-on-scroll transformation.
- Added interaction polish:
  - 0.3s ease transitions,
  - animated underline hover for nav links,
  - active route highlight with persistent underline + glow.
- Strengthened CTA treatment:
  - pill-shaped gradient button,
  - heart icon,
  - shadow depth and hover lift effect.
- Accessibility improvements:
  - focus-visible outlines for links/buttons,
  - `aria-current` on active links,
  - `aria-controls` and `aria-expanded` on mobile menu trigger.
- Refactored nav links to Next.js `Link` and route-aware active state via `usePathname()`.

### Files Updated
- `app/_components/Navbar.jsx`
- `app/_components/Navbar.module.css`

### Validation
- File diagnostics report no errors in modified navbar files.

## Session Update — 2026-04-11 (Homepage Conversion + Visual Optimization)

### Scope
- Full homepage optimization pass focused on hero quality, conversion sequencing, and mobile clarity.
- No payment gateway logic or backend API behavior changed.

### Changes Applied
- Rebuilt home hero section structure to keep image clean and move conversion copy below the image area.
- Added a new conversion-focused hero copy block with devotional value proposition.
- Improved hero composition and spacing:
  - top offset to avoid navbar visual collision,
  - tuned background focal point,
  - refined section spacing and CTA stacking behavior for mobile.
- Updated aarti ticker behavior:
  - removed sticky behavior to avoid scroll conflict with sticky navbar,
  - improved visual integration with surrounding sections.
- Reordered homepage section sequence for stronger donation funnel:
  - Hero → Donation Spotlight → Aarti Ticker → Seva Highlights → Welcome → Trust Section → remaining content.
- Added homepage-level scroll/section rhythm improvements in global styles.

### Files Updated
- `app/_components/Hero.jsx`
- `app/_components/Hero.module.css`
- `app/_components/AartiTicker.module.css`
- `app/page.jsx`
- `app/globals.css`

### Validation
- File diagnostics reported no errors in all modified files.

## What Was Built

### Framework & Foundation
- **Migrated from Vite → Next.js App Router**
- Clean `package.json` with `next dev/build/start`
- `.env.local` with Supabase placeholders + ICICI gateway credentials (backend-only)
- Warm-light design system: cream bg (`#FFFBF5`), deep maroon (`#8B1A1A`), gold accents (`#C8961E`)
- Typography: Cinzel Decorative (headings), EB Garamond (body), Inter (UI)

### Homepage Sections (10 components)
1. **Top Info Bar** — email, WhatsApp, social icons
2. **Glassmorphic Navbar** — sticky, responsive, glowing Donate CTA
3. **Hero Section** — full-viewport maroon gradient, Sanskrit verse, animated stats (14+ Years, 50k+ Lives, 50L+ Meals)
4. **Aarti Ticker** — live countdown to next darshan
5. **Welcome Section** — video placeholder + temple introduction
6. **Construction Meter** — 35,000 sq ft progress bar (24%), March 2027 countdown timer
7. **Seva Cards** — 4 seva types with impact text, optional recurring checkbox
8. **Explore Temple** — 6 facility cards with hover effects
9. **Testimonials** — video carousel with navigation
10. **Newsletter** — email signup with success state

### Mobile-First Features
- **Bottom Navigation Bar** — mobile-only with elevated Donate button
- **Floating WhatsApp + Donate buttons**
- **Full-screen slide-out mobile menu** (Framer Motion)
- All grids collapse to single column on mobile

### Donation Page (`/donate`) — ICICI EazyPay Integrated
- **3-step flow**: Choose Seva → Your Details → Payment
- **4 Seva options**: Anna Daan (₹4,500/100 meals), Vidya Daan (₹5,100/10 students), Mandir Nirman (₹2,100/sq ft), Gau Seva (₹2,100/month/cow)
- **Quick-select amounts**: ₹501, ₹1,100, ₹2,100, ₹5,100, ₹11,000, ₹21,000, ₹51,000
- **Custom amount input** with ₹ prefix
- **Optional recurring** checkbox (non-pushy)
- **Dedication field** ("In memory of / On behalf of")
- **Donation Summary sidebar** with trust badges (Secure Payment, ICICI Bank Gateway, 80G)
- **Server-side AES-128-ECB encryption** for ICICI EazyPay
- **API route** `/api/pay` that builds encrypted payment URL
- **Thank-you page** with WhatsApp share button + Gita verse

### ICICI Payment Gateway Details
- Merchant ID: 395014, ICID: 392370
- AES Key: stored in `.env.local` (backend-only)
- Return URL: harekrishnamarwar.org/thank-you
- Domain whitelisted: harekrishnamarwar.org

### Conversion Optimization Features
1. Sticky "Donate Now" in navbar
2. Impact numbers on every card
3. Construction progress bar
4. Grand Opening countdown
5. Social proof ("1,247+ donated this month")
6. Optional recurring (not pushy)
7. Floating donate on mobile
8. Mobile bottom nav with Donate highlight
9. Trust badges (80G, Secure, ICICI)
10. Post-donation WhatsApp share

## File Structure
```
app/
  layout.jsx          # Root layout with SEO
  page.jsx            # Homepage
  globals.css         # Design system
  _components/
    Navbar.jsx + .module.css
    Hero.jsx + .module.css
    AartiTicker.jsx + .module.css
    Welcome.jsx + .module.css
    ConstructionMeter.jsx + .module.css
    SevaCards.jsx + .module.css
    ExploreTemple.jsx + .module.css
    Testimonials.jsx + .module.css
    Newsletter.jsx + .module.css
    Footer.jsx + .module.css
    FloatingButtons.jsx + .module.css
    BottomNav.jsx + .module.css
  donate/
    page.jsx
    _components/
      DonateForm.jsx + .module.css
  thank-you/
    page.jsx
    _components/
      ThankYouContent.jsx + .module.css
  api/
    pay/route.js      # ICICI payment API
lib/
  icici-pay.js        # AES encryption utility
.env.local            # Credentials (backend-only)
```

## Next Steps
- **Session 3**: About page, Events page, Gallery page
- **Session 4**: Contact page, Visit page, FAQ page
- **Session 5**: Interactive scroll effects + video sections
- **Session 6**: Supabase backend (donor database)
- **Session 7**: Resend email automation
- **Session 8**: Vercel deployment

## How to Add Real Images
Place photos in `public/` folder with these exact names:
- `temple-hero-bg.jpg` — aerial/front view of temple
- `anna-daan-seva.jpg` — food distribution photo
- `vidya-daan-seva.jpg` — education/classroom photo
- `mandir-nirman-seva.jpg` — construction progress photo
- `gau-seva.jpg` — cow shelter photo
- `explore-gaushala.jpg`, `explore-kitchen.jpg`, `explore-gita-class.jpg`, etc.
- `testimonial-1.jpg`, `testimonial-2.jpg`, `testimonial-3.jpg`

## Session Update — 2026-04-08 (ICICI Redirect Error Fix)

### Issue Observed
- Donors were redirected to ICICI Eazypay error page: "The page you have requested is not available at this time."

### Root Cause
- Encrypted gateway parameters were being sent as raw Base64 in query string.
- Characters like `+`, `/`, and `=` can be misinterpreted in URL query parsing, causing ICICI to receive corrupted encrypted payload.

### Fix Applied
- Updated `lib/icici-pay.js` URL construction to URL-encode all query keys and values.
- Preserved ICICI-required parameter names (`mandatory fields`, `Reference No`, `transaction amount`, etc.) while safely encoding them.
- Added config guard for required ICICI env variables.
- Added AES key length validation (`16 bytes`) for AES-128-ECB.
- Sanitized pipe (`|`) in donor input fields to protect mandatory-field delimiter format.

### Verification
- Generated a sample payment URL and confirmed encrypted values now appear URL-safe (`%2B`, `%2F`, `%3D`).
- File-level diagnostics report no errors in payment files.

### Follow-up Recommendation
- Run one real transaction in ICICI UAT/production to validate full loop to callback and thank-you page.

## Session Update — 2026-04-08 (ICICI Payload Format Adjustment)

### Why Another Fix Was Needed
- Gateway error persisted even after query encoding fix.

### Additional Root-Cause Hypothesis Applied
- `mandatory fields` payload likely too verbose for strict ICICI validation.
- Moved to spec-safe minimal format in mandatory payload.

### Additional Fix Applied
- Updated `lib/icici-pay.js` to use mandatory payload as:
  - `ReferenceNo|SubMerchantId|Amount`
- Moved donor metadata to encrypted `optional fields`:
  - `mobile|email|name|sevaType`
- Normalized amount string before encrypting (`2100` or `2100.50`).

### Git
- Commit: `591f9d6`
- Message: Align ICICI mandatory fields payload with gateway format

## Session Update — 2026-04-08 (Deep ICICI Hardening Pass)

### Scope Covered
- `lib/icici-pay.js` (encryption and URL generation)
- `app/api/pay/route.js` (server diagnostics)
- `app/donate/_components/DonateForm.jsx` (redirect timing)

### Key Fixes
- Added strict `encrypt()` type guard so non-string plaintext throws early.
- Added return URL validation to reject pre-encoded `ICICI_RETURN_URL`.
- Added amount formatter to force ICICI-safe amount strings:
  - integer: `500`
  - decimal: `500.50`
- Kept exact mandatory format: `refNo|subMerchantId|amount`.
- Kept exact EazyPay parameter key names and single URL encoding pass.
- Added encryption integrity check by decrypting mandatory field and comparing to plaintext.
- Added API diagnostics:
  - plaintext mandatory fields (+ masked mobile/email)
  - encrypted mandatory fields
  - final payment URL preview (first 100 chars)
- Removed intermediate step transition before redirect; now redirects immediately after API response via `window.location.replace(...)`.

### Validation Done
- File diagnostics show no code errors in all updated files.
- Local sanity run verified mandatory field formatting, encrypted output generation, and URL preview construction.

## Session Update — 2026-04-08 (Donation Phase Hardening)

### Issues Addressed
- Payment callback route previously redirected to thank-you without decrypting or updating donation status.
- Donation creation could crash when Supabase admin client was missing.
- Payment debug logs were always-on.
- Frontend payment submit assumed JSON response unconditionally.

### Fixes Applied
- `app/api/payment-callback/route.js`
  - Added callback payload extraction with case-insensitive field lookup.
  - Added encrypted response decryption attempt using ICICI AES key.
  - Added status inference (`completed` / `pending` / `failed`) from callback payload.
  - Added DB fetch + status update by `ref_no`.
  - Added idempotent email send (only when transitioning to `completed`).
  - Redirects now include callback status query param (`/thank-you?status=...`).
- `app/api/pay/route.js`
  - Added Supabase admin null guard to avoid runtime 500 when misconfigured.
  - Restricted gateway debug logs to non-production or `PAYMENT_DEBUG=1`.
- `app/donate/_components/DonateForm.jsx`
  - Added response content-type check before parsing JSON.
  - Added HTTP status handling and surfaced backend error messages.

### Notes
- Full cryptographic callback authenticity verification still depends on exact ICICI response contract/signature docs from bank kit.

## Session Update — 2026-04-08 (Conversion-Safe Donation UX Pass)

### Objective
- Improve donation conversion KPIs using frontend-only changes.
- Keep ICICI encryption and backend payment APIs untouched.

### What Changed (Safe UI Only)
- Removed recurring donation option from donation UI.
- Simplified donation flow to clear 2-step indicator:
  - Step 1: Details
  - Step 2: Payment
- Added trust text near final pay CTA:
  - 80G Tax Benefit Available
  - Secure Payment via ICICI Bank
- Reduced form friction:
  - Email is now optional
  - Mobile remains required
- Updated final payment CTA copy to conversion-first wording:
  - Donate Now
- Mobile CTA optimization:
  - Sticky bottom Donate CTA is now always visible on mobile (no scroll-hide logic).
  - Added mobile bottom nav/CTA to Donate and Thank-You pages for consistency.
- Removed competing hero secondary CTA and kept one primary hero CTA:
  - Donate Now
- Improved mobile spacing offsets to avoid overlap between:
  - Sticky Donate CTA
  - Bottom nav
  - Floating WhatsApp button

### Files Updated
- app/donate/_components/DonateForm.jsx
- app/donate/_components/DonateForm.module.css

## Session Update — 2026-04-11 (NPM Audit + Next.js Upgrade Plan)

### What Was Done
- Ran a read-only npm audit; 1 high severity advisory for Next.js Server Components DoS.
- No code or configuration changes applied.

### Plan Prepared
- Minimal upgrade plan to move Next.js to the latest patched 16.x after ICICI backend mapping is confirmed.
- Validation steps will include lint, build, and a donation flow smoke test without changing payment logic.

### Safety Note
- No functional changes to payment flow made in this session.

## Session Update — 2026-04-11 (Events/Gallery/Visit/Donate Trust + Mobile UX)

### Objective
- Increase donation intent with trust cues and impact framing while keeping page hero images unchanged.
- Improve mobile friendliness on Events, Gallery, Visit, and Donate pages.

### Frontend-Only Changes
- Added hero descriptions, donation CTAs, and trust strips to Events, Gallery, and Visit pages.
- Added anchor targets for quick in-page navigation (Upcoming Events, Gallery Grid, Darshan Timings).
- Added donation header trust chips and impact stats on Donate page.
- Improved mobile layout for hero actions and gallery filters.

### Files Updated
- app/events/_components/EventsContent.jsx
- app/events/_components/EventsContent.module.css
- app/gallery/_components/GalleryContent.jsx
- app/gallery/_components/GalleryContent.module.css
- app/visit/_components/VisitContent.jsx
- app/visit/_components/VisitContent.module.css
- app/donate/_components/DonateForm.jsx
- app/donate/_components/DonateForm.module.css

## Session Update — 2026-04-11 (Hero Contrast + CTA Readability Pass)

### Objective
- Fix odd-looking hero contrast and button visibility while keeping hero images unchanged.

### Frontend-Only Changes
- Adjusted hero overlays for clearer contrast against text.
- Styled hero outline CTAs for better readability on warm backgrounds.
- Converted trust chips to light background for improved legibility.

### Files Updated
- app/events/_components/EventsContent.module.css
- app/gallery/_components/GalleryContent.module.css
- app/visit/_components/VisitContent.module.css

## Session Update — 2026-04-11 (Homepage Hero Background Image)

### Objective
- Use the newly added homepage background image from public assets.

### Frontend-Only Changes
- Updated the hero background image to use the new public asset file.

### Files Updated
- app/_components/Hero.module.css

## Session Update — 2026-04-11 (Homepage Hero Overlay + Layout Cleanup)

### Objective
- Remove dark animated overlays and prevent hero text from sitting directly on the image.

### Frontend-Only Changes
- Disabled hero rays/particles/overlay layers.
- Moved hero text onto a light card for readability.
- Simplified hero background to the new image without dark filters.

### Files Updated
- app/_components/Hero.module.css

## Session Update — 2026-04-11 (Homepage Hero Text-on-Image)

### Objective
- Place hero text directly on the image without a large light card, keeping the image visible.

### Frontend-Only Changes
- Removed the large light card background from hero content.
- Restored text readability with soft shadows and a subtle glass quick-donate block.
- Kept the hero background image unchanged.

### Files Updated
- app/_components/Hero.module.css

## Session Update — 2026-04-11 (Homepage Hero Left-Align + Conversion Layout)

### Objective
- Left-align hero content, preserve deity visibility on the right, and improve readability with a left-side gradient.

### Frontend-Only Changes
- Introduced a 45/55 hero grid with left-aligned content and right-side image focus.
- Added a left-only gradient overlay for readability.
- Strengthened CTA hierarchy and added a secondary Explore Temple CTA.
- Repositioned Quick Donate under the CTA with improved glass styling.
- Added a 0.6s fade-in for hero content.

### Files Updated
- app/_components/Hero.jsx
- app/_components/Hero.module.css

## Session Update — 2026-04-11 (Homepage Hero Centered Premium Layout)

### Objective
- Restore a centered, balanced hero layout with clear vertical hierarchy and minimal clutter.

### Frontend-Only Changes
- Center-aligned hero layout with top label, heading, subtext, CTAs, trust line, and bottom quick donate.
- Added soft radial + vertical gradient overlay for controlled contrast.
- Tuned typography, spacing, and CTA sizing to a premium hierarchy.
- Reworked Quick Donate glass card spacing and equal-width buttons.

### Files Updated
- app/_components/Hero.jsx
- app/_components/Hero.module.css

## Session Update — 2026-04-11 (Remove Hero Dark Overlay)

### Objective
- Remove the dark overlay effect from the homepage hero image.

### Frontend-Only Changes
- Disabled the hero overlay gradient to keep the image clean.

### Files Updated
- app/_components/Hero.module.css

## Session Update — 2026-04-11 (Hero Content Below Image)

### Objective
- Move all hero content below the background image so nothing sits on the image.

### Frontend-Only Changes
- Converted hero image into a standalone top block with fixed height.
- Moved CTAs, trust line, and Quick Donate into a clean section below.
- Restyled Quick Donate for light background context.

### Files Updated
- app/_components/Hero.module.css

## Session Update — 2026-04-11 (Hero 21:9 Full-Image Backdrop)

### Objective
- Keep the full image visible in a 21:9 frame without cropping while avoiding empty side gaps.

### Frontend-Only Changes
- Added a soft blurred backdrop of the same image behind the main contain image.
- Tightened spacing between the image block and the CTA section.

### Files Updated
- app/_components/Hero.module.css

## Session Update — 2026-04-11 (Hero Vignette + Zoom)

### Objective
- Add blackish corners with a vignette and zoom/stretch the hero image slightly.

### Frontend-Only Changes
- Switched hero image to `cover` with a slight scale for a closer crop.
- Added a soft radial vignette overlay for darkened corners.

### Files Updated
- app/_components/Hero.module.css

## Session Update — 2026-04-09 (User-Triggered ICICI Payment Flow)

### Objective
- Ensure ICICI payment is initiated only after user click and avoid direct URL testing.

### Frontend-Only Changes
- Donate form now calls a dedicated endpoint: `/api/create-payment`.
- Logs the generated payment URL before redirect for verification.

### Backend Changes
- Added `/api/create-payment` as an alias to the existing `/api/pay` handler (no logic change).

### Files Updated
- app/donate/_components/DonateForm.jsx
- app/api/create-payment/route.js

## Session Update — 2026-04-08 (Homepage Spiritual Sections)

### Objective
- Add Krishna-centered seva, trust, and Gita quote sections that deepen devotion and trust.

### Frontend-Only Changes
- Added a Seva Highlights section with three devotional cards:
  - Gau Seva
  - Anna Daan
  - Mandir Nirman
- Added a Trust section with clear proof points:
  - 1000+ Devotees
  - Serving since 2012
  - 80G Tax Benefit Available
- Added a Bhagavad Gita quote section:
  - "yoga-kshemam vahamy aham"
  - "I carry what My devotees lack, and I preserve what they have."
  - Bhagavad Gita 9.22
- Inserted new sections into homepage flow after Welcome.

### Files Updated
- app/page.jsx
- app/_components/SevaHighlights.jsx
- app/_components/SevaHighlights.module.css
- app/_components/TrustSection.jsx
- app/_components/TrustSection.module.css
- app/_components/GitaQuote.jsx
- app/_components/GitaQuote.module.css

## Session Update — 2026-04-08 (Homepage Conversion CTA Optimization)

### Objective
- Increase donation conversion with a single clear hero CTA and fast amount selection.

### Frontend-Only Changes
- Updated hero CTA copy: "Be Part of Krishna's Seva".
- Added quick donate buttons: ₹501, ₹1101, ₹2101.
- Added trust line: "Secure • 80G • Trusted".
- Hero quick donate buttons link to /donate?amount=... and donation form now pre-fills amount.
- Reduced mobile clutter by hiding secondary seva card CTAs on small screens.

### Files Updated
- app/_components/Hero.jsx
- app/_components/Hero.module.css
- app/donate/_components/DonateForm.jsx
- app/_components/SevaCards.jsx
- app/_components/SevaCards.module.css
- app/_components/SevaHighlights.module.css

## Session Update — 2026-04-08 (Premium Krishna Homepage Conversion Pass)

### Objective
- Create a calm, divine Krishna-centered homepage that increases donation conversion without touching backend or payment logic.

### Frontend-Only Changes
- Applied a soft divine gradient background to the site.
- Hero CTA set to "Offer Your Seva" with fast 200–300ms motion.
- Added Seva Highlights cards with emotional one-line focus and subtle hover scale.
- Added a Trust section with four proof points and spiritual icons.
- Added a Donation Spotlight section with quick amounts (₹501, ₹1101, ₹2101), recommended highlight, CTA "Donate Securely", and reassurance line.
- Updated Bhagavad Gita quote to a centered offering-focused line.
- Reduced homepage clutter by removing duplicate SevaCards section.

### Files Updated
- app/globals.css
- app/_components/Hero.jsx
- app/_components/Hero.module.css
- app/_components/SevaHighlights.jsx
- app/_components/SevaHighlights.module.css
- app/_components/TrustSection.jsx
- app/_components/TrustSection.module.css
- app/_components/DonationSpotlight.jsx
- app/_components/DonationSpotlight.module.css
- app/_components/GitaQuote.jsx
- app/page.jsx

## Session Update — 2026-04-08 (Fast Amount Selection Optimization)

### Objective
- Reduce donation decision time and increase completion rate via amount selection UX.

### Frontend-Only Changes
- Added 3 featured one-tap amount cards:
  - ₹501 (Feed 5 people)
  - ₹1101 (Support a family)
  - ₹2101 (Make a bigger impact)
- Set default selected amount to ₹1101.
- Added visual recommended tag on ₹1101.
- Moved higher values into an "Other Amount" section.
- Kept custom amount input as optional fallback.

### Conversion Intent
- Most users can now complete amount selection with one tap and no typing.
- Emotional microcopy is embedded next to each featured amount to improve confidence and intent.

### Files Updated
- app/donate/_components/DonateForm.jsx
- app/donate/_components/DonateForm.module.css

## Session Update — 2026-04-08 (Krishna-Centered Hero Redesign)

### Objective
- Create a devotional, Krishna-focused full-screen hero that inspires seva and trust.

### Frontend-Only Changes
- Rebuilt hero layout with a single primary CTA: "Offer Your Seva".
- Applied deep blue + gold divine palette with soft glow and light-ray/particle animation.
- Updated hero copy:
  - Heading: Experience Divine Seva with Lord Krishna
  - Subtext: Serve, Support, and Be Blessed
- Added Krishna-themed placeholder image for the hero background.

### Files Updated
- app/_components/Hero.jsx
- app/_components/Hero.module.css
- public/krishna-hero-placeholder.svg
- app/_components/BottomNav.jsx
- app/_components/BottomNav.module.css
- app/_components/FloatingButtons.module.css
- app/_components/Hero.jsx
- app/donate/page.jsx
- app/thank-you/page.jsx
- app/globals.css

### Safety Note
- No changes made to:
  - lib/icici-pay.js encryption logic
  - app/api/pay/route.js
  - app/api/payment-callback/route.js

## Session Update — 2026-04-08 (Donation Microcopy + Trust UX Refinement)

### Scope
- Frontend-only donation UX improvements for conversion.
- No backend or payment logic changes.

### Changes
- Updated final CTA copy to:
  - Donate ₹{amount} Securely
- Added reassurance lines below CTA:
  - 100% Secure Payment via ICICI Bank
  - Eligible for 80G Tax Benefit
  - Your donation helps serve meals today
- Added trust strip near CTA with subtle icon support:
  - Trusted by 1000+ Devotees

## Session Update — 2026-04-09 (About Page Conversion Upgrade Plan + Copy)

### Objective
- Deliver a conversion-focused About page upgrade with stronger trust, identity-shift messaging, and donation triggers for first-time donors.

### What Was Produced
- Section-by-section analysis (hero, mission, services, trust, CTA) with friction points and psychological gaps.
- Full rewritten copy with identity-shift language and emotional resonance.
- CTA strategy: Donate Now primary, Volunteer secondary, plus mid-page CTA blocks.
- Trust Stack placement after Mission using verified impact stats:
  - 1,00,000+ members (Jodhpur)
  - 1+ crore global community
  - 1.51+ lakh meals served (Jodhpur)
  - 500+ crore meals served globally
- Timeline enhancement plan merging legacy milestones into a premium visual timeline format.

### Implementation Targets
- app/about/_components/AboutContent.jsx
- app/about/_components/AboutContent.module.css
- _legacy_html/about.html (reference only)
  - Serving since 2012
- Added inline field validation for name/mobile/email.
- Added autofocus for first actionable input fields.
- Kept inputs thumb-friendly with larger mobile height.
- Reduced donation step transition timing to sub-300ms.

### Files Updated
- app/donate/_components/DonateForm.jsx
- app/donate/_components/DonateForm.module.css
