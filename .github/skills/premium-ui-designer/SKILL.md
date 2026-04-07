---
name: premium-ui-designer
description: "Upgrade websites to modern premium UI with clean layout, refined typography, subtle gradients, shadow depth, smooth interactions, and responsive polish. Use for homepage redesign, section restyling, conversion-first donation pages, and design system cleanup inspired by Apple, Stripe, and modern SaaS."
argument-hint: "Describe page scope, brand tone, and priority sections to redesign."
user-invocable: true
---

# Premium UI Designer

## Outcome
Produce a premium, modern, and minimal interface that is:
- Visually clean and conversion-focused
- Consistent across desktop and mobile
- Structured with reusable components
- Smooth in interaction without heavy animation noise
- Ready for production implementation in Next.js

## When To Use
Use this skill when you need:
- Homepage redesign with premium look and feel
- Better spacing, hierarchy, and readability
- Typography and color refinement
- Better hover states and micro-interactions
- UI consistency pass before deployment

## Inputs To Collect
1. Scope: full website, homepage only, or specific sections
2. Visual direction: minimal spiritual, modern SaaS, or hybrid
3. Priority areas: hero, donation funnel, events, footer, mobile nav
4. Constraints: existing brand colors, fonts, logo, or assets to preserve
5. Conversion goals: donation clicks, form submissions, newsletter signups

## Workflow
1. Audit current UI
- Review spacing rhythm, typography scale, color usage, and visual noise.
- Identify friction points in key journeys, especially donation and contact.
- Mark outdated patterns, inconsistent buttons, and weak section hierarchy.

2. Define visual system
- Create spacing scale and section rhythm rules.
- Define typography roles for display, heading, body, label, and helper text.
- Set color roles: surface, text, accent, border, interactive states.
- Add subtle gradients and soft shadows for depth, not decoration overload.

3. Redesign structure
- Build strong hero composition with clear primary action.
- Improve section transitions and content grouping.
- Use clear cards, grids, and whitespace for readability.
- Keep layouts reusable and modular for future pages.

4. Add interaction polish
- Add hover/focus states for links, cards, and buttons.
- Apply motion only where it improves comprehension.
- Keep animation timing consistent and lightweight.
- Ensure keyboard and accessibility focus visibility remains strong.

5. Optimize responsiveness
- Validate all sections at mobile, tablet, and desktop breakpoints.
- Prevent text overflow, cramped cards, and uneven spacing.
- Prioritize thumb-friendly actions for booking and donation flows.

6. Validate quality and performance
- Confirm UI consistency across shared components.
- Avoid heavy effects that hurt render performance.
- Ensure semantic structure and readable contrast.
- Prepare final pass for SEO-facing content hierarchy.

## Decision Logic
1. If conversion is priority
- Favor higher contrast CTAs, tighter copy, and shorter decision paths.
- Reduce decorative elements around donate and booking actions.

2. If branding is strict
- Preserve existing color palette and logo treatment.
- Improve hierarchy and spacing without altering brand identity.

3. If legacy styles conflict
- Introduce a small design token layer and migrate section by section.
- Avoid full rewrite when incremental refactor can stabilize quality.

## Quality Checks
1. Every section has clear visual hierarchy and one primary purpose.
2. Buttons and links have consistent shape, size, and interaction states.
3. Typography scale is coherent and readable on all devices.
4. Spacing follows a repeatable rhythm, not one-off values.
5. Contrast is accessible for key text and interactive elements.
6. Motion is smooth and purposeful, not distracting.
7. Donation and booking flows are visually prominent and easy to complete.

## Deliverables
1. Updated component styling plan by section
2. Reusable UI patterns for cards, buttons, and section headers
3. Responsive behavior notes for each redesigned area
4. Final premium polish checklist

## Example Prompts
- Use /premium-ui-designer to redesign homepage hero and donation sections with premium minimal style.
- Use /premium-ui-designer to refine spacing, typography, and hover effects across all pages.
- Use /premium-ui-designer to create Apple-Stripe inspired UI polish while preserving mandir branding.
