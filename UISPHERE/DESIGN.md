---
name: Cyber Bento DevFest
colors:
  surface: '#0f131d'
  surface-dim: '#0f131d'
  surface-bright: '#353944'
  surface-container-lowest: '#0a0e18'
  surface-container-low: '#171b26'
  surface-container: '#1c1f2a'
  surface-container-high: '#262a35'
  surface-container-highest: '#313540'
  on-surface: '#dfe2f1'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dfe2f1'
  inverse-on-surface: '#2c303b'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#adc6ff'
  on-tertiary: '#002e6a'
  tertiary-container: '#71a1ff'
  on-tertiary-container: '#00367a'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#adc6ff'
  on-tertiary-fixed: '#001a42'
  on-tertiary-fixed-variant: '#004395'
  background: '#0f131d'
  on-background: '#dfe2f1'
  surface-variant: '#313540'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-mono-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
  label-mono-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
  label-pill:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 2rem
  space-xl: 3.5rem
---

## Brand & Style

The design system is crafted for high-octane developer gatherings, tech summits, and collegiate hackathon ecosystems. The tone is deeply immersed in developer culture: hyper-technical, precision-engineered, forward-leaning, and electrifying. It communicates raw technological capability combined with polished craft, avoiding cluttered cyberpunk tropes in favor of an ultra-clean, high-end "cyber-bento" aesthetic.

### Aesthetic Pillars
- **Dark Obsidian Canvas:** Deep midnight tones that eliminate visual fatigue and make foreground data shine with high contrast.
- **Bento Grid Rigor:** Strict structural containment with rounded pill-inspired surfaces, modular compartmentalization, and information density tailored for quick scanning.
- **Phosphor Luminescence:** Electric emerald and neon cyan highlights evoking modern terminal emulators, quantum interfaces, and laser-lit tech stages.
- **Frosted Depth & Edge Highlights:** Subtle glassmorphism, whisper-thin translucid borders (`rgba(255, 255, 255, 0.08)`), and controlled ambient back-glows that give elements an elevated tactile feel without visual noise.

## Colors

The palette is engineered around an ultra-dark canvas punctuated by vivid, narrow-gamut spectral accents.

### Color Hierarchy
- **Base Canvas (`#0B0F19`):** Pure obsidian with a cool slate undertone. Serves as the primary stage background.
- **Card Tier 1 Surface (`#111827`):** Elevated slate container for bento modules, tab navigations, and list cards.
- **Card Tier 2 Surface (`#131B2E`):** Higher elevation container used for active states, nested interactive segments, chips, and modal overlays.
- **Primary Accent (`#10B981`):** Electric Emerald. Reserved for core validation, primary status indicators, successful registration badges, and live event signals.
- **Secondary Accent (`#06B6D4`):** Neon Cyan. Applied to interactive links, primary call-to-action glows, technical track icons, and countdown focal points.
- **Tertiary Accent (`#3B82F6`):** GDG Electric Blue. Anchors brand recognition, secondary interactive badges, and track categorization.
- **Text & Foreground Tokens:**
  - `text-primary`: `#F9FAFB` (high contrast for titles and numerical data)
  - `text-secondary`: `#94A3B8` (subtitles, descriptive paragraphs, prerequisites)
  - `text-muted`: `#64748B` (metadata, timestamps, icons)
  - `border-glass`: `rgba(255, 255, 255, 0.08)`
  - `border-glass-hover`: `rgba(6, 182, 212, 0.35)`

## Typography

The typographic hierarchy utilizes a modern three-font stack designed to balance expressive geometric punch with utilitarian developer ergonomics:

1. **Plus Jakarta Sans (Headlines & Display):** High-impact geometric sans with crisp terminals. Brings modern consumer-tech elegance to section headlines, metrics, and hero banners.
2. **Inter (Body Copy & Controls):** Unrivaled legibility for complex event itineraries, track summaries, and form interactions.
3. **JetBrains Mono (Code Badges, Tags & Overlines):** Monospaced precision for technical prerequisites, terminal prompts (`< GOOGLE DEVELOPER GROUP />`), timestamps, and track level tags (`Intermediate`, `Beginner`).

### Stylistic Guidelines
- Display headlines often feature dual-tone gradient fills or high-contrast chromatic emphasis (e.g., standard pure white text transitioning into `#38BDF8` or `#10B981` on numeric milestones).
- Overlines and subhead kickers should be rendered in uppercase monospaced text with `letter-spacing: 0.08em`.

## Layout & Spacing

This design system uses a strict fluid bento grid based on a 12-column layout on desktop, transforming into a 6-column grid on tablet and a single-column layout on mobile.

### Bento Grid Rules
- **Desktop (1024px+):** Max layout container capped at `1280px`. Bento units typically span 3, 4, 6, or 12 columns with uniform row heights and `gutter: 1.5rem`.
- **Tablet (768px - 1023px):** 6 columns with `gutter: 1.25rem` and outer margins of `2rem`. Modular metric cards shift from 4-across to 2x2 grids.
- **Mobile (<768px):** Single-column stacked cards with `gutter-mobile: 1rem` and `margin-mobile: 1.25rem`. Interactive filters and schedule switchers become horizontally swipeable carousels.

### Padding Within Modules
- Cards leverage proportional inner spacing: `space-lg` (32px) on desktop and `space-md` (20px) on mobile to maintain comfortable internal breathing room around tags and action buttons.

## Elevation & Depth

Visual hierarchy is constructed through multi-layered dark luminosity rather than harsh directional dropshadows.

### Layering Architecture
- **Base Canvas (`#0B0F19`):** Layer 0. Receives dynamic radial background gradients with low opacity (`rgba(6, 182, 212, 0.08)` and `rgba(16, 185, 129, 0.05)`) centered around focal headers.
- **Bento Modules (`#111827` / `#131B2E`):** Layer 1. Bordered by a `1px` crisp frosted glass boundary: `border: 1px solid rgba(255, 255, 255, 0.07)`. Soft ambient glow: `box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.6)`.
- **Focused & Hovered Bento Modules:** Layer 2. Transition border to `rgba(6, 182, 212, 0.35)` with an ethereal edge drop: `box-shadow: 0 16px 40px -10px rgba(6, 182, 212, 0.15)`.
- **Floating Controls & Modals:** Layer 3. `backdrop-filter: blur(16px)` on a `rgba(17, 24, 39, 0.85)` surface, highlighted with an interior top specular highlight `inset 0 1px 0 rgba(255, 255, 255, 0.12)`.

## Shapes

The design system establishes a sleek rounded visual cadence. The geometry avoids aggressive sharp corners while steering clear of overly bubbly aesthetics.

- **Bento Cards & Containers:** Medium-rounded corners (`rounded-lg: 1rem / 16px`) delivering distinct modular boundaries.
- **Interactive Badges, Metric Modules & Modals:** Generous smooth corners (`rounded-xl: 1.5rem / 24px`) for prominent metrics, countdown counters, and track cards.
- **Buttons, Filter Tabs & High-Contrast UI Tags:** Full stadium/pill geometry (`rounded-full: 9999px`) creating an energetic, developer-badge profile.

## Components

### Buttons
- **Primary CTA ("Register Now"):** Radiant gradient fill from `#2563EB` to `#06B6D4` or intense `#10B981` to `#06B6D4`. Pill shaped (`rounded-full`), white bold text, accompanied by an ambient bloom shadow: `box-shadow: 0 0 20px rgba(6, 182, 212, 0.4)`.
- **Secondary CTA ("Explore Schedule", "Add to Calendar"):** Elevated slate surface (`#131B2E`) with a fine border (`rgba(255, 255, 255, 0.12)`). On hover, subtle cyan border glow and `background: rgba(19, 27, 46, 0.8)`.

### Chips & UI Tags
- **Status & Overline Badges:** Pill-shaped capsules with translucent backgrounds:
  - *Emerald Track / Live Status:* `background: rgba(16, 185, 129, 0.1)`, `border: 1px solid rgba(16, 185, 129, 0.3)`, text in `#34D399`. Contains a pulsating green radar dot.
  - *Level Badges (Beginner, Intermediate, Advanced):* Compact monospaced pills using contextual yellow/amber (`#F59E0B`), cyan (`#06B6D4`), or rose (`#F43F5E`) hues.
  - *Prerequisite Badges:* Pill containers with dark fill (`#0E1626`), `border: 1px solid rgba(255, 255, 255, 0.08)`, and green checkmark icons.

### Countdown & Stat Bento Tiles
- Individual module cards set to `#111827` with inset highlights.
- Giant numerical values displayed in `display-hero` with dynamic color accents (e.g., `#38BDF8`, `#F87171`, `#FBBF24`, `#34D399`).
- Subtitle labels set in monospaced uppercase typography (`label-mono-sm`) with wide tracking.

### Track Cards & Bento Modules
- Structured vertical layout:
  1. Top bar: Category icon in rounded frosted square + Level Pill.
  2. Headline and paragraph description.
  3. Prerequisites & Key Modules section with custom bullet points.
  4. Bottom action footer with "View Syllabus" link and "Register Track" button.

### Schedule List Rows
- Horizontal bento strips featuring:
  - Timestamp indicator in monospaced accent typography.
  - Title and speaker avatar thumbnail with GDG affiliation metadata.
  - Quick-action buttons ("Add to Calendar") nested on the trailing end.