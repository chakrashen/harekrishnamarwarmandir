---
name: website-content-extractor
description: "Extract and modernize content from existing websites or HTML into reusable Next.js and Tailwind components. Use for mandir website migration, legacy HTML conversion, section extraction, and SEO-safe content refresh while preserving original meaning."
argument-hint: "Provide source URL or HTML path, target pages, and required sections."
user-invocable: true
---

# Website Content Extractor

## Outcome
Create a structured migration output that:
- Extracts key content from source website or HTML
- Preserves original meaning and devotional context
- Improves readability and SEO clarity
- Rebuilds sections in reusable Next.js components with Tailwind
- Produces mobile-first modern UI layout

## When To Use
Use this skill when you need:
- Legacy mandir website modernization
- Content migration from static HTML to Next.js App Router
- Section-wise extraction for hero, about, timings, events, donation, contact
- Faster redesign without losing source messaging

## Required Inputs
1. Source input: website URL, HTML files, or both
2. Target scope: homepage only or full site
3. Required sections: hero, about, darshan timings, events, donation, contact
4. Content policy: preserve religious wording vs lightly modernized language
5. SEO focus: local SEO, donation intent, event discoverability

## Workflow
1. Source analysis
- Parse provided URL or HTML files.
- Identify navigation structure and main content blocks.
- Extract text, headings, timings, contact data, donation messaging.

2. Section mapping
- Map extracted content into normalized sections.
- Remove duplicates and outdated fragments.
- Keep source-to-target traceability for each section.

3. Content cleanup and rewrite
- Rewrite lightly for clarity while preserving meaning.
- Maintain spiritual and respectful tone.
- Improve heading hierarchy and CTA wording.
- Add natural SEO keywords without stuffing.

4. UI transformation plan
- Define component structure for Next.js App Router.
- Assign each section to reusable component files.
- Apply responsive Tailwind patterns for spacing, layout, and typography.

5. Build-ready output
- Provide section content payloads and component blueprint.
- Include semantic HTML guidance and metadata recommendations.
- Include image alt text suggestions and internal linking opportunities.

6. Validation
- Confirm religious meaning is preserved.
- Confirm extracted facts (timings/contact) are accurate.
- Confirm structure is mobile-friendly and SEO-ready.

## Decision Logic
1. If source has incomplete section content:
- Keep known facts and mark missing fields clearly.
- Avoid fabricating timings or contact details.

2. If source contains duplicate/conflicting text:
- Prefer official-looking content blocks and recent references.
- Keep uncertainty notes for user review.

3. If source style is outdated but trusted:
- Preserve message intent, modernize sentence flow and section structure.

## Quality Checks
1. All required sections are extracted and mapped.
2. Content remains spiritually accurate and respectful.
3. Headings and paragraphs are concise and readable.
4. SEO intent is integrated naturally.
5. Output supports reusable component architecture.
6. Mobile responsiveness is addressed in layout guidance.

## Deliverables
1. Extracted section-wise content document
2. Clean rewritten copy for each section
3. Next.js + Tailwind component mapping plan
4. SEO notes: titles, descriptions, heading hierarchy, alt text

## Example Prompts
- Use /website-content-extractor on this legacy mandir homepage and rebuild in Next.js components.
- Use /website-content-extractor to extract darshan timings, events, and donation copy from HTML files.
- Use /website-content-extractor to migrate old website text into a modern mobile-first homepage.
