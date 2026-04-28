# AGENTS.md — Hare Krishna Marwar Mandir Website

You are an expert Next.js developer, SEO engineer, and Hindu temple website specialist.

## Project Identity
- **Temple Name:** Hare Krishna Marwar Mandir
- **Also known as:** HKM Jodhpur
- **Location:** Chopasani, Near Vastra Mantralay, Jodhpur, Rajasthan 342024
- **Website:** https://harekrishnamarwar.org
- **Primary Domain (canonical):** https://harekrishnamarwar.org
- **Contact:** +91 99287 66773 | harekrishna@hkmjodhpur.org
- **WhatsApp:** https://wa.me/919928766773

## Tech Stack
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Backend:** Supabase (donor database)
- **Payments:** ICICI Payment Gateway
- **Deployment:** Vercel (or Cloudflare — confirm before deploying)
- **Language:** TypeScript / JSX

## Brand Identity
- **Colors:** Saffron / gold / deep maroon — never change the existing color theme
- **Tone:** Devotional, warm, trustworthy, urgent but never pushy
- **Tagline:** "A Sacred Home for Krishna is Rising"
- **Grand Opening:** March 2027

## Three Seva Pillars (Core Donation Categories)
1. **Gau Seva** — Cow protection, ₹2,100/month per cow, ₹51/day
2. **Anna Daan** — Free prasadam distribution, ₹34/person, ₹1,700 feeds 50
3. **Mandir Nirman** — Temple construction, ₹2,500/sq ft, ₹101/brick

## Key Impact Numbers (Always keep these accurate and updated)
- 1.5 Lakh+ Meals Served
- 50+ Cows Protected
- 310+ Families claimed sq ft in Mandir Nirman
- 14+ Years Serving
- 8,400 Sq Ft Already Built
- Grand Opening: March 2027

---

## Agent Rules — Read These Before Every Task

1. **Never change branding or colors** — the saffron/gold theme is intentional and sacred
2. **Donation section is the highest priority** — every page must have a path to donate
3. **Mobile-first always** — most devotees visit from mobile
4. **Server-side render donation pages** — do NOT use client-only rendering for /donate or seva pages, Google cannot read them
5. **One feature at a time** — never build multiple features in one session
6. **Save SUMMARY.md after every session** — see Step 4 below
7. **Never touch the old Gupt Govardhan Dham codebase** — it is deprecated and being removed
8. **All canonical URLs must point to https://harekrishnamarwar.org** — no www, no http

---

## Known Issues to Fix (Priority Order)

### P0 — Do These First
- [ ] Old site pages (/about, /donations, /store, /visitor-info) still load the deprecated
      "Gupt Govardhan Dham" HTML site — redirect all of these to the new Next.js equivalents
- [ ] /donate page renders no body content for crawlers (client-side only JS) — fix SSR

### P1 — This Week
- [ ] Add JSON-LD structured data (NGO, PlaceOfWorship, DonateAction schemas) to all pages
- [ ] Add canonical tags to every route
- [ ] Fix countdown timer — shows 00:00:00 on Mandir Nirman section
- [ ] Fix progress bar — shows 0% and 0 Sq Ft Built

### P2 — Next Week
- [ ] Create robots.js in app/ directory
- [ ] Create sitemap.js in app/ directory
- [ ] Submit sitemap to Google Search Console
- [ ] Add metadata (title + description) to every page route

---

## App Router File Structure
```
app/
├── layout.jsx              ← Global metadata, fonts, nav
├── page.jsx                ← Homepage
├── robots.js               ← [CREATE] Dynamic robots.txt
├── sitemap.js              ← [CREATE] Dynamic sitemap
├── about/
│   └── page.jsx
├── donate/
│   └── page.jsx            ← [FIX] Must be SSR
├── events/
│   └── page.jsx
├── gallery/
│   └── page.jsx
├── visit/
│   └── page.jsx
├── contact/
│   └── page.jsx
└── seva/
    ├── gau-seva/
    │   └── page.jsx        ← Long-form content exists, add JSON-LD
    ├── anna-daan/
    │   └── page.jsx        ← Needs long-form content + JSON-LD
    └── mandir-nirman/
        └── page.jsx        ← Needs long-form content + JSON-LD
```

---

## SEO Configuration (Use These Exact Values)

### Global metadata (app/layout.jsx)
```js
export const metadata = {
  metadataBase: new URL('https://harekrishnamarwar.org'),
  title: {
    default: 'Hare Krishna Marwar Mandir | Jodhpur | Gau Seva & Donations',
    template: '%s | Hare Krishna Marwar Mandir'
  },
  description: 'Support Gau Seva, Anna Daan, and Mandir Nirman at Hare Krishna Marwar Mandir, Jodhpur. Donate online with 80G tax benefit. Serving Rajasthan since 2011.',
  keywords: [
    'hare krishna marwar', 'donate for cow protection jodhpur',
    'gaushala jodhpur', 'anna daan jodhpur', 'gau seva donation rajasthan',
    'hare krishna temple jodhpur', '80g donation india', 'mandir nirman jodhpur',
    'krishna temple rajasthan donation', 'cow protection marwar'
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://harekrishnamarwar.org',
    siteName: 'Hare Krishna Marwar Mandir',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Hare Krishna Marwar Mandir Jodhpur — Gau Seva and Donations'
    }]
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: 'https://harekrishnamarwar.org' }
}
```

### Per-page metadata targets
| Route | Title | Priority |
|---|---|---|
| / | Hare Krishna Marwar Mandir \| Jodhpur \| Gau Seva & Donations | 1.0 |
| /donate | Donate for Gau Seva & Anna Daan \| HKM Jodhpur \| 80G Tax Benefit | 0.9 |
| /seva/gau-seva | Gau Seva — Donate for Cow Protection \| Hare Krishna Marwar Jodhpur | 0.9 |
| /seva/anna-daan | Anna Daan Seva — Feed Devotees Daily \| HKM Jodhpur | 0.8 |
| /seva/mandir-nirman | Mandir Nirman — Claim Your Sq Ft \| Hare Krishna Marwar | 0.8 |
| /about | About Us \| Hare Krishna Marwar Mandir Jodhpur | 0.7 |
| /events | Events & Festivals \| Hare Krishna Marwar Mandir Jodhpur | 0.7 |
| /contact | Contact Us \| Hare Krishna Marwar Mandir Jodhpur | 0.6 |

---

## JSON-LD Schemas to Inject

### Homepage — NGO Schema
```json
{
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Hare Krishna Marwar Mandir",
  "alternateName": ["HKM Jodhpur", "Hare Krishna Marwar"],
  "url": "https://harekrishnamarwar.org",
  "logo": "https://harekrishnamarwar.org/gallery/logo.png",
  "description": "A Krishna consciousness temple and gaushala in Jodhpur, Rajasthan serving the community through Gau Seva, Anna Daan, and Mandir Nirman since 2011.",
  "foundingDate": "2011",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Chopasani, Near Vastra Mantralay",
    "addressLocality": "Jodhpur",
    "addressRegion": "Rajasthan",
    "postalCode": "342024",
    "addressCountry": "IN"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-99287-66773",
      "contactType": "Donations",
      "availableLanguage": ["Hindi", "English"],
      "contactOption": "TollFree"
    }
  ],
  "sameAs": [
    "ADD_FACEBOOK_URL",
    "ADD_INSTAGRAM_URL",
    "ADD_YOUTUBE_URL"
  ]
}
```

### Homepage — PlaceOfWorship Schema
```json
{
  "@context": "https://schema.org",
  "@type": "PlaceOfWorship",
  "name": "Hare Krishna Marwar Mandir",
  "url": "https://harekrishnamarwar.org",
  "telephone": "+91-99287-66773",
  "email": "harekrishna@hkmjodhpur.org",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Chopasani, Near Vastra Mantralay",
    "addressLocality": "Jodhpur",
    "addressRegion": "Rajasthan",
    "postalCode": "342024",
    "addressCountry": "IN"
  },
  "openingHours": "Mo-Su 04:30-13:00",
  "hasMap": "ADD_GOOGLE_MAPS_URL"
}
```

### /donate and /seva/* — DonateAction Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Donate — Hare Krishna Marwar Mandir",
  "url": "https://harekrishnamarwar.org/donate",
  "potentialAction": {
    "@type": "DonateAction",
    "target": "https://harekrishnamarwar.org/donate",
    "name": "Donate for Gau Seva, Anna Daan, or Mandir Nirman",
    "recipient": {
      "@type": "NGO",
      "name": "Hare Krishna Marwar Mandir",
      "url": "https://harekrishnamarwar.org"
    }
  }
}
```

---

## MCP Servers to Configure in Your IDE

### Must Have
| MCP | Purpose | Priority |
|---|---|---|
| Supabase MCP | Read/write donor database — name, amount, seva, city, payment status | P0 |
| File System MCP | Read/write local project files directly | P0 |
| Firecrawl MCP | Crawl harekrishnamarwar.org for content extraction | P1 |
| Context7 MCP | Always get latest Next.js / Tailwind docs | P1 |

### Power-Ups
| MCP | Purpose | Priority |
|---|---|---|
| Playwright MCP | Test donation flows in real browser automatically | P2 |
| Vercel MCP | Deploy from inside the IDE | P2 |
| n8n MCP | "When someone donates, send WhatsApp + email receipt" | P2 |

---

## Build Session Order

Build in this order. One session per item. Never combine sessions.

```
Session 1  → Fix P0: Remove old Gupt Govardhan Dham pages, set up redirects
Session 2  → Fix P0: Make /donate SSR, fix countdown timer, fix progress bar
Session 3  → SEO: Add robots.js + sitemap.js + canonical tags
Session 4  → SEO: Add JSON-LD schemas to homepage + /donate
Session 5  → SEO: Add JSON-LD + metadata to all /seva/* pages
Session 6  → Content: Write long-form Anna Daan and Mandir Nirman seva pages
Session 7  → Supabase: Donor database — save name, amount, seva, city on payment
Session 8  → Automation: n8n — WhatsApp + email receipt on successful donation
Session 9  → Google Business Profile setup + submit sitemap to Search Console
Session 10 → Deploy and verify with Rich Results Test + Search Console
```

---

## SUMMARY.md Convention

At the end of every session, save a `SUMMARY.md` in the project root with:

```markdown
# Session [N] Summary — [Date]

## What was built
- [list of files created/modified]

## What was fixed
- [list of bugs resolved]

## What broke / needs attention
- [list of issues found]

## Next session
- [exact next task from the session order above]

## Current known issues
- [copy updated P0/P1/P2 list with checkboxes]
```

To resume: paste the SUMMARY.md at the start of the new session and say:
"Read SUMMARY.md and continue with Session [N]."

---

## @ Context Trick (Use in Every Session)

```
@AGENTS.md @SUMMARY.md Fix the /donate page SSR issue so 
Google can read the donation form content without JavaScript.
```

---

## Verification Checklist (Run After Every Deploy)

- [ ] `npm run build` — zero errors or metadata warnings
- [ ] `grep -r "application/ld+json" ./app` — JSON-LD in all key pages
- [ ] View source of homepage — confirm JSON-LD renders in raw HTML
- [ ] https://search.google.com/test/rich-results — test NGO + DonateAction schema
- [ ] https://httpstatus.io — confirm http:// redirects cleanly to https:// in one hop
- [ ] `site:harekrishnamarwar.org` in Google — monitor indexed page count weekly
- [ ] Ask Perplexity: "What is Hare Krishna Marwar Mandir and how can I donate?" — track citations

---

*Last updated: April 2026*
*Stack: Next.js App Router + Tailwind + Supabase + ICICI Payments + Vercel*
*Domain: https://harekrishnamarwar.org*