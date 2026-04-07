# **HARE KRISHNA MARWAR MANDIR – DESIGN SYSTEM**
## Soft, Minimal, Earthy & Spiritual Aesthetic

---

## **1. DESIGN PHILOSOPHY**

The website embodies a **soft, minimal, and earthy** design language inspired by modern spiritual and lifestyle aesthetics. The design prioritizes:

- **Simplicity**: Clean layouts with ample whitespace and minimal visual clutter
- **Spirituality**: Warm, natural colors that evoke calm and devotion
- **Trust**: Premium finishes and refined details that communicate reliability
- **Nature**: Earthy tones and soft textures inspired by natural environments
- **Accessibility**: Clear typography and high contrast ratios for readability

---

## **2. COLOR SYSTEM**

### **Primary Colors**

| Color | Hex | Purpose | Usage |
|-------|-----|---------|-------|
| **Saffron** | `#E67E22` | Primary accent, temple identity | Buttons, links, highlights |
| **Dark Grey** | `#2C2C2C` | Primary text | All body text and headings |
| **Cream** | `#FFFBF5` | Primary background | Main page background |
| **Light Beige** | `#FFF8F0` | Secondary background | Alternate sections |
| **Off-White** | `#F3E9DC` | Tertiary background | Section backgrounds |

### **Secondary Accents**

| Color | Hex | Purpose | Usage |
|-------|-----|---------|-------|
| **Soft Gold** | `#D4AF37` | Premium accent | Dividers, decorative elements |
| **Muted Green** | `#6B8E7A` | Earthy accent | Secondary buttons, borders |
| **Soft Green** | `#8FA892` | Soft earth tone | Hover states, subtle accents |

### **Text Colors**

| Level | Hex | Use Case |
|-------|-----|----------|
| **Primary Text** | `#2C2C2C` | Main content, headings |
| **Secondary Text** | `#5D544B` | Descriptive text, metadata |
| **Muted Text** | `#8D8378` | Tertiary information, labels |
| **Light Text** | `#A99C91` | Subtle text, dates |

### **Borders & Subtle UI**

| Element | Hex | Purpose |
|---------|-----|---------|
| **Light Border** | `rgba(230, 126, 34, 0.14)` | Card borders, dividers |
| **Gold Border** | `rgba(212, 175, 55, 0.34)` | Premium elements |

---

## **3. BACKGROUNDS & LAYOUT**

### **Background Palette**

1. **Primary Background** (`#FFFBF5`)
   - Main page background
   - Ensures clean, minimal aesthetic

2. **Secondary Background** (`#FFF8F0`)
   - Alternate section backgrounds
   - Provides subtle visual separation without harshness

3. **Tertiary Background** (`#F3E9DC`)
   - Accent section backgrounds
   - Warmest background tone

### **Layout Principles**

- **Spacious**: Ample margins and padding (8px to 96px scale)
- **Centered**: Max-width 1280px with responsive scaling
- **Minimal**: Clean whitespace, no overcrowding
- **Hierarchical**: Clear section structure with visual separation

---

## **4. TYPOGRAPHY**

### **Font Families**

| Style | Font | Purpose |
|-------|------|---------|
| **Headings** | Cinzel Decorative | Spiritual, decorative titles |
| **Body** | EB Garamond | Elegant, readable body text |
| **UI** | Inter | Clean, modern interface labels |

### **Scale System**

| Element | Size | Line-Height | Usage |
|---------|------|-------------|-------|
| **H1** | clamp(2.2rem, 5vw, 3.5rem) | 1.2 | Page titles |
| **H2** | clamp(1.8rem, 4vw, 2.8rem) | 1.25 | Section titles |
| **H3** | clamp(1.4rem, 3vw, 2rem) | 1.3 | Subsections |
| **H4** | 1.2rem | 1.3 | Cards, moduleslems |
| **Body** | 1rem | 1.65 | Text content |
| **Small** | 0.85rem | 1.6 | Metadata, labels |
| **Tiny** | 0.75rem | 1.5 | UI labels, captions |

### **Typography Hierarchy**

All typography uses **dark grey (#2C2C2C)** for primary text, creating a cohesive, readable experience across the site.

---

## **5. SPACING SYSTEM**

### **8-Pixel Grid Scale**

```
--space-xs:  0.5rem  (8px)
--space-sm:  1rem    (16px)
--space-md:  1.5rem  (24px)
--space-lg:  2rem    (32px)
--space-xl:  3rem    (48px)
--space-2xl: 4rem    (64px)
--space-3xl: 5rem    (80px)
--space-4xl: 6rem    (96px)
```

### **Application**

- **Padding**: 16px, 24px, 32px, 48px
- **Margins**: 24px, 32px, 48px, 64px
- **Section Padding**: 60px top/bottom (responsive)
- **Gaps**: 16px, 24px, 32px

---

## **6. BUTTONS**

### **Primary Button**

- **Background**: Saffron gradient (`#E67E22` → `#D35400`)
- **Text**: White
- **Padding**: 0.875rem 2rem
- **Border Radius**: 9999px (full round)
- **Shadow**: Subtle soft shadow
- **Hover**: 2px lift + enhanced shadow

```css
.btn-primary {
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #E67E22, #D35400);
  color: #FFFFFF;
  box-shadow: 0 8px 22px rgba(44, 44, 44, 0.08);
  border-radius: 9999px;
  transition: all 0.5s ease-in-out;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 34px rgba(44, 44, 44, 0.11);
}
```

### **Secondary Button**

- **Background**: Outline with saffron border
- **Text**: Saffron
- **On Hover**: Filled background with white text

### **Tertiary Button** (Earthy Green)

- **Background**: Outline with muted green border
- **Text**: Muted green (#6B8E7A)
- **On Hover**: Filled green background with white text
- **Use**: Alternative CTAs, wellness-focused sections

### **Button Sizes**

- **Standard**: `0.875rem 2rem` (medium)
- **Small** (`.btn-sm`): `0.625rem 1.5rem`

---

## **7. CARDS & CONTAINERS**

### **Card Styling**

```css
.card {
  background: #FFFFFF;
  border: 1px solid rgba(230, 126, 34, 0.14);
  border-radius: 1.5rem;
  box-shadow: 0 3px 12px rgba(44, 44, 44, 0.06);
  transition: all 0.5s ease-in-out;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(44, 44, 44, 0.08);
  border-color: #E67E22;
}
```

### **Key Features**

- **Background**: White for pristine clarity
- **Border**: Soft saffron-tinted border (14% opacity)
- **Radius**: 1.5rem (soft, rounded corners)
- **Shadow**: Subtle (3px–14px blur) for depth without harshness
- **Hover**: Minimal lift (2px translateY) with enhanced shadow

---

## **8. SHADOWS**

The shadow system emphasizes softness and subtlety:

| Shadow | CSS | Purpose |
|--------|-----|---------|
| **Small** | `0 3px 12px rgba(44, 44, 44, 0.06)` | Cards, subtle elements |
| **Medium** | `0 8px 22px rgba(44, 44, 44, 0.08)` | Hover states, elevated content |
| **Large** | `0 14px 34px rgba(44, 44, 44, 0.11)` | Deep elevation, modals |

---

## **9. ANIMATIONS & TRANSITIONS**

### **Core Animations**

All animations emphasize **calm, subtle movement**:

- **Fade-in**: Smooth entrance (0.3–1.2 seconds)
- **Slide-up**: Gentle upward movement (0.5–1 second)
- **Fade-up**: Combined fade + slide (0.5–0.7 seconds)
- **Float**: Gentle floating motion (18 second loop)
- **Pulse**: Soft breathing effect (2 second loop)

### **Easing Functions**

- **Ease In-Out**: `cubic-bezier(0.4, 0, 0.2, 1)` – standard for 0.5s transitions
- **Ease Out**: `cubic-bezier(0, 0, 0.2, 1)` – quick, responsive interactions

### **Duration Guidelines**

- **0.3s**: Quick hover feedback, state changes
- **0.5s**: Standard transitions, card interactions
- **0.7–1s**: Section animations, content entrance
- **14–18s**: Background animations (slow zoom, floating elements)

### **Accessibility**

All animations respect `prefers-reduced-motion` media query:

```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; }
}
```

---

## **10. COMPONENT GUIDELINES**

### **Navbar**

- Light cream background with minimal shadow
- Saffron accents for highlights
- Responsive at 1024px and 480px breakpoints
- Logo: 40px–58px responsive sizing

### **Hero Section**

- Cinematic 14-second zoom animation
- Soft overlay (no harsh darkening)
- Center-aligned content with max-width 840px
- Premium typography with proper text shadows

### **Section Dividers**

- **Gold Divider**: Horizontal line with gold gradient
- **Green Divider** (alternative): Muted green gradient for earthy sections

### **Forms & Inputs**

- Light backgrounds with soft borders
- Saffron focus state
- Rounded corners (1rem)
- Ample padding for touch-friendly interaction

---

## **11. COLOR PALETTE APPLICATIONS**

### **By Section Type**

| Section Type | Background | Accent | Text |
|--------------|-----------|--------|------|
| **Featured** | `#FFF8F0` | Saffron | Dark Grey |
| **Earthy** | `#F3E9DC` | Green | Dark Grey |
| **Card** | `#FFFFFF` | Saffron border | Dark Grey |
| **Call-to-Action** | `#FFFBF5` | Saffron button | Dark Grey |

### **For Content Hierarchy**

- **Primary Accent**: Saffron (#E67E22) – Main CTAs, key highlights
- **Secondary Accent**: Muted Green (#6B8E7A) – Alternative options
- **Tertiary Accent**: Soft Gold (#D4AF37) – Dividers, decorative elements

---

## **12. DESIGN PRINCIPLES SUMMARY**

✅ **Minimal**: Only essential elements; clean whitespace  
✅ **Earthy**: Warm, natural colors inspired by nature  
✅ **Spiritual**: Calm, inviting aesthetic that evokes devotion  
✅ **Premium**: Refined details, soft shadows, elegant typography  
✅ **Accessible**: High contrast, readable fonts, motion alternatives  
✅ **Responsive**: Fluid scaling, mobile-first approach  
✅ **Consistent**: Centralized design tokens, unified branding  

---

## **13. CURRENT IMPLEMENTATION STATUS**

✅ Global design tokens defined in `globals.css`  
✅ All components refactored for light theme  
✅ Button system with primary/secondary/tertiary variants  
✅ Card styling with subtle shadows and interactions  
✅ Typography system with proper hierarchy  
✅ Spacing scale applied throughout  
✅ Animations optimized for performance  
✅ Accessibility features (reduced-motion support)  
✅ Responsive design tested on multiple breakpoints  

---

## **14. FUTURE ENHANCEMENTS**

### **Recommended Additions**

1. **Micro-interactions**: Refined hover states for all interactive elements
2. **Dark Mode (Optional)**: Variant using complementary dark tones
3. **Typography Variations**: Italic styles for spiritual/devotional quotes
4. **Visual Assets**: High-quality temple photography integrated seamlessly
5. **Custom Illustrations**: Subtle spiritual/nature-inspired graphics

---

## **15. DESIGNER NOTES**

This design system strikes a balance between **modern minimalism** and **spiritual devotion**. The saffron color provides temple identity, while muted greens add an earthy, nature-inspired dimension. The generous whitespace and soft typography create an inviting, trustworthy experience suitable for both spiritual seekers and donors.

The system is intentionally **flexible** to accommodate real content (images, testimonials, event details) while maintaining visual consistency and premium quality.

---

**Last Updated**: April 1, 2026  
**Version**: 1.0 – Initial Earthy & Minimal Theme  
**Design Lead**: AI Assistant  
**Project**: Hare Krishna Marwar Mandir Website
