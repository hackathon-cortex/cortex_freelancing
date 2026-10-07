# Cortex — Freelance Studio Design System (v2)

> Implementation-ready, token-driven guidance for the Cortex portfolio and marketing site.
> Rule language: **must** = non-negotiable, **should** = strong recommendation.

---

## 1. Context and Goals

### Design intent

Cortex must feel like a small, highly capable product engineering studio that ships real work, not a template-based freelance agency.

### Visual direction

- **Lil Boxes** is the primary visual language: structured, content-first layouts, strong Inter typography, compact spacing, rounded surfaces, bold color accents, restrained motion.
- **Visuvate** is the reference for the **Our Work** section only: editorial project presentation, strong hierarchy, work-first storytelling.
- **Cortex** is the identity layer: engineering-led, AI-aware, collaborative, youthful.

### Brand

| Item        | Value                                                                                               |
| ----------- | --------------------------------------------------------------------------------------------------- |
| Studio      | Cortex                                                                                              |
| Surface     | Freelance / digital product studio marketing + portfolio website                                    |
| Core team   | Ronak, Huzaifa, Saud                                                                                |
| Positioning | Design + engineering + AI/ML + product development                                                  |
| Audience    | Startups, founders, businesses, student orgs, teams needing digital products or technical execution |

### Primary goals

1. Establish trust in the first viewport.
2. Show shipped work before long company story.
3. Communicate broad technical capability without sounding like a generic agency.
4. Make the team feel human and credible.
5. Convert visitors into project inquiries.
6. Keep everything token-driven so new pages stay consistent.

---

## 2. Design Principles

1. **Structured but expressive.** Disciplined grid and spacing; personality comes from project visuals, type, and motion.
2. **Work before claims.** Capability is proven by shipped projects, not by technology lists.
3. **Technical without being cold.** Technical terms where they add credibility; outcomes explained in plain language.
4. **Motion communicates hierarchy.** Animation reveals structure and gives feedback. It must never slow understanding.
5. **Consistency over exceptions.** Use existing tokens and variants before introducing any new value.
6. **Honest by default.** No fabricated clients, metrics, or testimonials. Unverified content must be marked as placeholder.

---

## 3. Foundations and Semantic Tokens

### 3.1 Typography

```css
--font-family-primary: "Inter";
--font-family-stack:
  "Inter", "Geist", system-ui, -apple-system, "Segoe UI", sans-serif;

--font-weight-regular: 500; /* body */
--font-weight-strong: 600; /* labels, nav, buttons */
--font-weight-heading: 700; /* headings */

--font-size-xs: 12px; /* tags, metadata (minimum allowed size) */
--font-size-sm: 13px; /* nav, captions */
--font-size-md: 15px; /* body, base */
--font-size-lg: 20px; /* lead text, card titles */
--font-size-xl: 27px; /* section sub-headings */
--font-size-2xl: 40px; /* section headings */
--font-size-hero: clamp(48px, 8vw, 96px);

--line-height-body: 1.5; /* 15px -> 22.5px, round to 23px in implementation if needed */
--line-height-heading: 1.05;
--line-height-tight: 1.15; /* card titles, sub-headings */
--letter-spacing-heading: -0.02em;
--letter-spacing-eyebrow: 0.08em;
```

Rules:

- Hero must use the responsive clamp, never a fixed desktop size.
- Headings must use tight line-height and a controlled max width (`max-width: 18ch` hero, `24ch` section headings).
- Body copy must use `--font-size-md` with a measure of 60–70 characters.
- Labels, metadata, tags, nav use `--font-size-sm` or `--font-size-xs`.
- No text may be smaller than `--font-size-xs`.

> Change from v1: removed duplicate `26.88px`/`27px` steps and raised the smallest size from 10px to 12px for WCAG readability. Body weight moved from 600 to 500 so bold headings and labels have clear hierarchy.

### 3.2 Color tokens

Core palette (from Lil Boxes):

```css
--color-ink: #212121;
--color-black: #000000;
--color-white: #ffffff;
--color-cream: #f0e2dd;
--color-red: #f0354d;
--color-blue: #35b5f0;
--color-peach: #f0a489;
--color-line: #dddedf;
--color-ink-muted: #5c5c5c; /* secondary text on light surfaces */
--color-white-muted: #9a9a9a; /* secondary text on black */
```

Semantic mapping (components must consume **only these**):

```css
/* Surfaces */
--color-surface-page: var(--color-cream);
--color-surface-card: var(--color-white);
--color-surface-inverse: var(--color-black);
--color-surface-accent: var(--color-blue);
--color-surface-warm: var(--color-peach);

/* Text */
--color-text-primary: var(--color-ink); /* on page, card, accent, warm */
--color-text-secondary: var(--color-ink-muted); /* on page, card */
--color-text-on-inverse: var(--color-white); /* on inverse */
--color-text-on-inverse-muted: var(--color-white-muted);
--color-text-on-brand: var(--color-black); /* on brand red */

/* Brand */
--color-brand-primary: var(--color-red);
--color-brand-secondary: var(--color-blue);

/* Borders and focus */
--color-border-subtle: var(--color-line); /* decorative dividers only */
--color-border-strong: var(--color-ink); /* inputs, outlined buttons (3:1+) */
--color-focus-ring: var(--color-ink); /* on light surfaces */
--color-focus-ring-inverse: var(--color-blue); /* on dark surfaces */

/* Status */
--color-status-error: #b3132b; /* on light surfaces */
--color-status-error-inverse: var(--color-red); /* on dark surfaces */
--color-status-success: #1a6b3c;
```

Approved text/background pairs (approximate ratios, verify with tooling):

| Foreground            | Background      | Ratio | Use                        |
| --------------------- | --------------- | ----- | -------------------------- |
| ink `#212121`         | cream `#f0e2dd` | ~12:1 | Body on page               |
| ink `#212121`         | white           | ~16:1 | Body on cards              |
| ink-muted `#5c5c5c`   | cream           | ~5:1  | Secondary text             |
| white                 | black           | 21:1  | Dark sections              |
| white-muted `#9a9a9a` | black           | ~7:1  | Secondary on dark          |
| ink                   | blue `#35b5f0`  | ~7:1  | Accent surfaces            |
| ink                   | peach `#f0a489` | ~8:1  | Warm surfaces              |
| black                 | red `#f0354d`   | ~5:1  | Primary button label       |
| red `#f0354d`         | black           | ~5:1  | Brand text/accents on dark |

Prohibited pairs: red text on cream or white (below 4.5:1, use only as large decorative type or non-text accent), white text on red or blue, `--color-border-subtle` as the sole boundary of an input.

Contextual overlays derived from these tokens are allowed. Arbitrary per-component colors are not.

> Change from v1: v1 mapped `text.primary` (dark `#212121`) onto a `#000000` page, which fails contrast. v2 assigns a cream page, a black inverse section, and explicit text pairings. It also adds a strong border token and focus tokens.

---

## 4. Spacing

```css
--space-1: 5px;
--space-2: 10px;
--space-3: 15px;
--space-4: 20px;
--space-5: 30px;
--space-6: 50px;
--space-7: 100px;
--space-8: 180px;
```

Semantic spacing:

```css
--space-component-xs: var(--space-1);
--space-component-sm: var(--space-2);
--space-component-md: var(--space-3);
--space-component-lg: var(--space-4);
--space-gutter: var(--space-5);
--space-block: var(--space-6);
--space-section: var(--space-7);
--space-hero: var(--space-8);
```

Rules:

- Responsive spacing must derive from the scale (use `clamp()` between two scale values, e.g. `clamp(var(--space-6), 8vw, var(--space-7))`).
- One-off values must not be introduced unless mathematically required by a layout constraint, and must be commented.
- Cards must use consistent internal padding: `--space-component-lg` (mobile `--space-component-md`).

---

## 5. Radius, Shadow, Motion

### Radius

```css
--radius-xs: 8px; /* cards, media, inputs */
--radius-sm: 30px; /* buttons, tags, pills */
--radius-pill: var(--radius-sm);
```

Media inside cards must use `radius-xs` and `overflow: hidden`.

### Shadows

```css
--shadow-1: rgba(33, 33, 33, 0.5) 0px 1px 0px 0px; /* hairline lift */
--shadow-2: rgb(240, 226, 221) 0px 1px 0px 0px; /* hairline on dark */
```

Shadows must stay subtle. No glossy, layered, or colored glows.

### Motion

```css
--motion-duration-instant: 100ms;
--motion-duration-fast: 300ms;
--motion-duration-normal: 300ms;
--motion-duration-slow: 500ms;

--motion-ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
--motion-ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
--motion-ease-exit: cubic-bezier(0.7, 0, 0.84, 0);

--motion-distance-sm: 4px; /* hover/press translate */
--motion-distance-md: 16px; /* entrance translate */
--motion-stagger: 60ms;
```

Rules:

- Animate only `opacity` and `transform` (and `background-color`, `border-color`, `color` for state changes). Never animate layout properties.
- All motion must respect `prefers-reduced-motion: reduce`.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  [data-reveal] {
    transform: none !important;
  } /* opacity-only reveal */
}
```

---

## 6. Global Layout

```css
--container-max: 1440px;
--container-pad-desktop: 30px; /* >= 1024px */
--container-pad-tablet: 24px; /* 640px–1023px */
--container-pad-mobile: 15px; /* < 640px */
```

Breakpoints (should be used consistently):

| Name | Min width |
| ---- | --------- |
| sm   | 640px     |
| md   | 768px     |
| lg   | 1024px    |
| xl   | 1280px    |

- Desktop uses a 12-column grid with `--space-gutter` gaps; it collapses to 6 columns on tablet and 1 on mobile.
- Major sections must use `--space-section` or `--space-hero` vertical rhythm.
- Alternate section surfaces (cream → black → cream) to create rhythm. Dark sections must use inverse tokens.
- A skip link ("Skip to main content") must be the first focusable element.

---

## 7. Site Architecture

1. Navigation
2. Hero
3. Our Work
4. Services
5. Capabilities
6. Process
7. About Cortex
8. Team
9. Trust signals (testimonials, only if real)
10. CTA + inquiry form
11. Footer

Homepage narrative: **What Cortex does → What Cortex has built → Why Cortex → How Cortex works → Start a project.**

Additional pages: `/work/[slug]` case studies, `/contact` (optional, mirrors homepage form), custom 404.

---

## 8. Navigation

### Anatomy

Cortex wordmark · Work · Services · About · Team · Primary CTA (`Start a project`)

Navigation must remain visually lightweight: transparent over hero, switching to `surface-page` with `shadow-1` after scroll.

### States

| State            | Behavior                                                                                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Default          | `text-primary`, transparent background                                                                                                                      |
| Hover            | Text and underline shift to `brand-primary` on dark, underline in `text-primary` on light (do not rely on red text on cream) over `motion-duration-instant` |
| Focus-visible    | 2px focus ring with 2px offset, `radius-pill`                                                                                                               |
| Active (current) | 2px underline plus `font-weight-strong`; `aria-current="page"` or `"location"`                                                                              |
| Disabled         | Not rendered unless a destination is genuinely unavailable                                                                                                  |
| Loading          | Remains usable while destination loads                                                                                                                      |
| Error            | One failed destination never disables the rest of the nav                                                                                                   |

### Interaction

- Keyboard: `Tab` in DOM order, `Enter` activates, `Esc` closes mobile menu and returns focus to the trigger.
- Pointer: the whole visible link area is clickable.
- Touch: targets at least 44×44 CSS px.
- Mobile: collapses to a menu button exposing `aria-expanded` and `aria-controls`. The open menu must trap focus and lock body scroll.

---

## 9. Hero

### Purpose

State what Cortex builds and set a technical but human tone within one viewport.

### Hierarchy

**Eyebrow:** `CORTEX — DIGITAL PRODUCT STUDIO` (uppercase, `font-size-sm`, `letter-spacing-eyebrow`)

**Headline:**

> We build digital products that turn ambitious ideas into working systems.

**Supporting copy:**

> Websites, mobile apps, AI/ML systems, and automation, designed and engineered end to end by a small team of builders.

**Actions:** `View our work` (primary) · `Start a project` (secondary)

**Proof strip (optional, only if true and verifiable):** a short row of real project names or a count of shipped projects.

### Behavior

- Content enters with opacity + `motion-distance-md` translateY, staggered by `motion-stagger`, duration `motion-duration-slow`, ease `motion-ease-enter`.
- Primary CTA uses the strongest brand emphasis; secondary stays visually quieter.
- Hero visuals should be abstract technical graphics, real project UI, or product screenshots. No generic stock imagery.
- The hero must reserve its media dimensions to prevent layout shift.

---

## 10. Our Work (Visuvate-inspired editorial section)

The most important proof section. It borrows Visuvate's editorial hierarchy while using Cortex tokens.

### Project anatomy

- Project media (image, video poster, or UI screenshot)
- Project name
- One-line outcome
- Category
- Technology / capability tags
- Optional metric (**only if verified**)
- `View [project name] case study` action

Known projects: KrishiGrahan, Moodify, Botnify, Mediqueue, Cortex AV, HackathonOS, Task2Reward, plus other shipped client/freelance work. Project descriptions and metrics must be confirmed by the team before publishing.

### Data model (recommended)

```ts
type Project = {
  slug: string;
  name: string;
  outcome: string; // one line, max ~90 chars
  category: "Web" | "App" | "AI/ML" | "Automation" | "Product";
  tags: string[]; // max 4 displayed
  media: { src: string; alt: string; width: number; height: number };
  metric?: { value: string; label: string; verified: true };
  featured?: boolean;
  href: string;
};
```

### Layout (desktop, 12 columns)

| Row | Pattern                                                                 |
| --- | ----------------------------------------------------------------------- |
| 1   | Featured project spanning 8 columns + one supporting project spanning 4 |
| 2   | Two supporting projects, 6 columns each                                 |
| 3   | Full-width feature project (12 columns, 21:9 media)                     |
| 4   | Compact cards, 3 or 4 per row                                           |

- Featured projects get more visual area, not a different design language.
- Cards must share one internal structure (media → meta → title → outcome → tags → action).
- Section header: numbered label (`01 — Selected work`), heading, and a `View all work` link.
- Optional category filter should be a keyboard-operable tab list with `aria-selected`, and must not cause layout jumps.

### Project card states

| State         | Behavior                                                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Default       | `surface-card` on cream page; media at `radius-xs`; clear image-first hierarchy                                                               |
| Hover         | Media scales to 1.03 or translates by `motion-distance-sm`; title underline appears; action arrow shifts 4px; duration `motion-duration-fast` |
| Focus-visible | Entire card link shows the focus ring (not just the title)                                                                                    |
| Active        | Card compresses to scale 0.99 for `motion-duration-instant`; readability unchanged                                                            |
| Disabled      | Normally not shown; if shown, clearly non-interactive with `aria-disabled="true"` and no hover effect                                         |
| Loading       | Skeleton with identical dimensions (use `aspect-ratio`)                                                                                       |
| Error         | Media failure → semantic fallback surface with project name and category                                                                      |

### Responsive behavior

- **Desktop:** full editorial grid.
- **Tablet:** 6-column grid; featured spans full width, others pair up.
- **Mobile:** single column; featured card keeps larger media; no horizontal scroll.

### Long content and empty state

- Card titles wrap, never clip. Card descriptions clamp to 2 lines (`line-clamp: 2`); full text lives on the case study page.
- No projects: show a concise studio message and a `Start a project` CTA instead of an empty grid.

### Case study template

Every project page must answer:

1. What was the problem?
2. What did Cortex build?
3. Which technologies or capabilities were involved?
4. What was the result?
5. What can the visitor explore next? (next project, live link, repository, contact CTA)

Recommended page order: hero media → summary strip (role, timeline, stack) → problem → solution → key screens → technical notes → result → next project.

---

## 11. Services

Services communicate outcomes, not just technologies.

| #   | Service             | Description                                                                        |
| --- | ------------------- | ---------------------------------------------------------------------------------- |
| 01  | Web Development     | Marketing sites, dashboards, web apps, responsive interfaces                       |
| 02  | App Development     | Cross-platform mobile apps and product prototypes                                  |
| 03  | AI / ML             | Machine learning systems, computer vision, recommendation systems, AI integrations |
| 04  | Automation          | Internal tools, workflows, APIs, integrations, process automation                  |
| 05  | Product Engineering | Prototype to deployable product: frontend, backend, database, auth, deployment     |

Each service contains: number, title, short description, capability tags, optional linked project.

Layout: a stacked list on desktop (number left, content right, tags below) is preferred over a uniform card wall. It must collapse to one column on mobile.

---

## 12. Service Card

### Anatomy

Index number · Heading · Description · Tags · Arrow/action (only if the card links somewhere)

### States

| State         | Behavior                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| Default       | `surface-card`, `radius-xs`, `shadow-1`                                                                   |
| Hover         | Background shifts toward `surface-accent` or `surface-warm`; arrow translates 4px; `motion-duration-fast` |
| Focus-visible | Clear focus ring on the card link                                                                         |
| Active        | Translate 1px / scale 0.99, `motion-duration-instant`                                                     |
| Disabled      | Muted text, no hover, `aria-disabled="true"`                                                              |
| Loading       | Skeleton with preserved dimensions                                                                        |
| Error         | Heading plus short fallback message if dynamic content fails                                              |

If a service card is not a link, it must not have hover or cursor affordances that suggest interactivity.

---

## 13. Capabilities / Technology

Technology supports credibility and must not dominate.

Groups: Frontend · Backend · AI / ML · Databases · Cloud / Deployment · Automation · Design / Prototyping

Rules:

- Use grouped text labels in pill-style tags; logos are optional and secondary.
- Logos must always be paired with a visible or accessible text name.
- No logo wall. Each group should show roughly 4–8 items.
- Only list technologies the team has actually shipped with.

---

## 14. Process

| Step | Title      | Description                                                              |
| ---- | ---------- | ------------------------------------------------------------------------ |
| 01   | Understand | Define the problem, users, constraints, and success criteria             |
| 02   | Design     | Translate requirements into architecture, flows, and interface direction |
| 03   | Build      | Develop iteratively with regular check-ins                               |
| 04   | Test       | Validate usability, responsiveness, functionality, and edge cases        |
| 05   | Launch     | Deploy, monitor, and hand over the finished system                       |

- Use large numbered anchors (`font-size-2xl`, `brand-primary` on dark surface).
- Reveal progressively on scroll (opacity + `motion-distance-md`, `motion-stagger`).
- Process steps are informational, not interactive, unless expandable. Expandable steps must use `<button aria-expanded>`.
- Mobile: vertical list with a connecting line; no horizontal scroll.

---

## 15. About Cortex

- Avoid generic agency language. State that Cortex is a team of builders combining engineering, AI/ML, product thinking, design, and experimentation.
- Support every claim with project evidence or a link to a case study.
- Visually connect to the Team section (shared surface, continuous layout), not a separate corporate page.
- Length: one short paragraph plus 3 evidence points.

---

## 16. Team

### Core team

Ronak · Huzaifa · Saud

Each member card contains: name, role, primary strengths, optional social/profile link. Roles and strengths must be supplied by the team. Do not invent titles.

### Behavior

- The component must support additional members without redesign.
- Images use one consistent aspect ratio (4:5 recommended) with `radius-xs`.
- If an image is missing, use a branded initials fallback on `surface-accent` or `surface-warm`.

### States

| State         | Behavior                                                         |
| ------------- | ---------------------------------------------------------------- |
| Default       | Image, name, role, strengths                                     |
| Hover         | Subtle image scale 1.02; links underline                         |
| Focus-visible | Ring on each link; if the card is a link, ring on the whole card |
| Active        | Brief press effect on interactive cards                          |
| Disabled      | Not shown                                                        |
| Loading       | Skeleton at final dimensions                                     |
| Error         | Initials fallback                                                |

Social links must have descriptive accessible names (e.g. `Huzaifa on GitHub`).

---

## 17. CTA

One of the strongest visual moments on the page. Use a `surface-inverse` or `surface-accent` background with large type.

**Headline:** Have an idea worth building?

**Copy:** Tell us what you're trying to create. We'll help turn it into a working product.

**Primary action:** `Start a project`
**Secondary action:** `View our work`

The CTA must not rely on color alone to communicate interactivity: buttons need a visible shape, label, and arrow or underline.

---

## 18. Buttons

### Variants

| Variant     | Light surface                                     | Dark surface                                     |
| ----------- | ------------------------------------------------- | ------------------------------------------------ |
| Primary     | `brand-primary` background, `text-on-brand` label | same                                             |
| Secondary   | Transparent, 2px `border-strong`, `text-primary`  | Transparent, 2px white border, `text-on-inverse` |
| Ghost       | Text + arrow, underline on hover                  | Same with inverse text                           |
| Destructive | Product-only, never for marketing CTAs            | —                                                |

Specs: `radius-pill`, height 48px (minimum 44px), horizontal padding `--space-5`, `font-size-md`, `font-weight-strong`.

### States (all variants)

| State         | Behavior                                                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Default       | Per variant above                                                                                                                      |
| Hover         | Primary darkens ~8% (via overlay token); secondary fills with `text-primary`/inverse text; arrow slides 4px; `motion-duration-instant` |
| Focus-visible | 2px ring, 2px offset (`focus-ring` / `focus-ring-inverse`)                                                                             |
| Active        | scale 0.98                                                                                                                             |
| Disabled      | 40–50% opacity, `cursor: not-allowed`, `aria-disabled`; paired with explanatory text where relevant                                    |
| Loading       | Width locked; spinner replaces or precedes label; `aria-busy="true"` and a status announcement                                         |
| Error         | Border/background shifts to error token; message shown adjacent, associated with `aria-describedby`                                    |

### Interaction

- Keyboard: `Enter` and `Space` activate native `<button>`; links styled as buttons activate with `Enter`.
- Pointer: the entire surface is clickable.
- Touch: minimum 44×44 CSS px.

---

## 19. Links

- Links must use descriptive labels. Good: `View KrishiGrahan case study`. Bad: `Click here`.
- Inline links must be underlined (not color alone).
- Hover and focus must be visually distinct from each other.
- External links should include an icon and, where useful, `rel="noopener noreferrer"` and an accessible hint (`opens in a new tab`).

---

## 20. Tags / Pills

- Types: technology, service category, project type, status.
- `font-size-xs` or `font-size-sm`, `font-weight-strong`, `radius-pill`, padding `--space-1` × `--space-3`.
- Tags are informational by default and must not look interactive (no hover state, no pointer cursor).
- If a tag filters content, it must be a real `<button>` with `aria-pressed` and a visible selected state beyond color.
- Tag lists wrap; they never cause horizontal overflow.

---

## 21. Forms / Project Inquiry

### Fields

Name · Email · Project type · Budget range · Project description · Timeline

Only collect necessary information. Budget range should be optional and include a "Not sure yet" option.

### Input states

| State         | Behavior                                                      |
| ------------- | ------------------------------------------------------------- |
| Default       | `surface-card`, 2px `border-strong`, `radius-xs`, 48px height |
| Hover         | Border thickens or shifts to `brand-primary` accent underline |
| Focus-visible | Focus ring plus border change (not color only)                |
| Active        | Same as focus while typing                                    |
| Disabled      | Muted background, `cursor: not-allowed`                       |
| Loading       | Fields remain visible and read-only while submitting          |
| Error         | Error-token border, icon, and message below the field         |

### Rules

- Every field has a visible `<label>`. Placeholders must not replace labels.
- Errors must appear next to the field, be linked via `aria-describedby`, and be announced (`role="alert"` or `aria-live="polite"`).
- On submit failure, focus moves to the first invalid field or an error summary.
- Entered values must be preserved after validation errors.
- Submit button shows a loading state and prevents double submission.
- Success shows a clear confirmation (what happens next, expected response time if the team can commit to one).
- Network failure shows a recoverable message with a retry action and an email fallback.
- Include a honeypot or equivalent anti-spam measure that does not harm accessibility.

---

## 22. Footer

Contains: Cortex identity, short studio statement, navigation, services, social links, contact CTA, copyright.

- Uses `surface-inverse` with inverse text tokens.
- Same spacing and typography system as the rest of the page.
- Email must be a real `mailto:` link with visible text.
- Optional back-to-top link must be keyboard accessible.

---

## 23. Animation System

Restrained interaction model inspired by Lil Boxes.

| Pattern                    | Properties                                               | Duration          | Easing           |
| -------------------------- | -------------------------------------------------------- | ----------------- | ---------------- |
| Page entrance              | opacity, translateY(16px→0), staggered 60ms              | `slow` (500ms)    | `enter`          |
| Section reveal             | opacity, translateY(16px→0), once per section            | `slow`            | `enter`          |
| Card hover                 | translateY(-4px) or media scale 1.03, border/background  | `fast` (300ms)    | `standard`       |
| Button interaction         | background, scale 0.98, arrow shift                      | `instant` (100ms) | `standard`       |
| Menu open/close            | opacity + translate                                      | `fast`            | `enter` / `exit` |
| Number counters / marquees | Not allowed unless reduced-motion safe and non-essential | —                 | —                |

Rules:

- Reveal animations must trigger via `IntersectionObserver` and run once.
- Content must remain readable and interactive during animation.
- No parallax, no scroll-jacking, no autoplaying looping animation that cannot be paused.
- Reduced motion: remove transform-heavy animation and large media zoom; use opacity-only or instant transitions.

---

## 24. Responsive Behavior

### Desktop (≥1024px)

Complete editorial layout; prioritize hierarchy and project imagery.

### Tablet (640–1023px)

Reduce column count, heading sizes, section spacing, and image complexity. Do not remove essential content.

### Mobile (<640px)

- Clean single-column experience.
- No horizontal overflow at 320px width.
- No text below `font-size-xs`; body stays at `font-size-md`.
- CTAs are full-width or comfortably tappable.
- Project images keep useful focal points (`object-position` per project).
- Navigation collapses cleanly.
- Long headings wrap (`overflow-wrap: anywhere` where needed), never clip.

---

## 25. Accessibility Requirements

Target: **WCAG 2.2 AA**.

### Keyboard

- PASS if every interactive element is reachable by keyboard.
- PASS if focus order follows visual/DOM order.
- PASS if `Enter` activates links and buttons, and `Space` activates native buttons.
- PASS if the mobile menu traps focus when open and returns focus on close.
- PASS if a skip link is present and works.

### Focus

- PASS if every interactive element shows a visible `:focus-visible` indicator with at least 3:1 contrast against adjacent colors.
- PASS if focus is not obscured by sticky headers (WCAG 2.2 Focus Not Obscured).
- FAIL if `outline: none` is used without an equivalent replacement.

### Contrast

- PASS if normal text is at least 4.5:1 and large text at least 3:1.
- PASS if UI component boundaries and focus indicators are at least 3:1.
- FAIL for any pair listed under "Prohibited pairs" in section 3.2.

### Touch and pointer

- PASS if targets are at least 44×44 CSS px (WCAG 2.2 minimum is 24×24; Cortex uses the stricter value).
- PASS if no interaction requires dragging without a single-pointer alternative.

### Images and media

- PASS if meaningful images have useful `alt` text; decorative images use `alt=""`.
- PASS if video has captions or a transcript and does not autoplay with sound.

### Motion

- PASS if `prefers-reduced-motion` is respected.
- PASS if nothing flashes more than 3 times per second.

### Forms

- PASS if every field has an accessible name.
- PASS if errors are programmatically associated with fields.
- PASS if status messages are announced without stealing focus unnecessarily.
- PASS if previously entered information is not requested again unnecessarily (WCAG 2.2 Redundant Entry).

### Structure

- PASS if there is one `<h1>` per page and headings do not skip levels.
- PASS if landmarks (`header`, `nav`, `main`, `footer`) are present.
- PASS if the language is set on `<html lang>`.

---

## 26. Content and Tone

Tone: concise, confident, technical when useful, human, outcome-focused.

Avoid: empty agency clichés, excessive buzzwords, fake claims, exaggerated metrics, vague statements like "we make dreams happen."

Prefer:

> We design and build websites, applications, AI systems, and internal tools.

Over:

> We are a revolutionary next-generation digital transformation agency.

Prefer:

> From first prototype to deployed product, we handle the engineering needed to make the idea work.

CTA and link label standards:

| Do                             | Don't                             |
| ------------------------------ | --------------------------------- |
| `Start a project`              | `Submit`                          |
| `View KrishiGrahan case study` | `Learn more` / `Click here`       |
| `Email the team`               | `Contact` (alone, when ambiguous) |

---

## 27. Project Content Standard

Project cards: short copy (outcome in one line). Case studies: deeper technical detail.

Every project should answer the five questions in section 10. Metrics, user counts, revenue, and performance claims must be verified and sourced, or omitted.

---

## 28. Anti-Patterns

The following are prohibited:

- Random one-off spacing values or font sizes
- Low-contrast text, including red text on cream or white
- Hidden or removed focus indicators
- Icon-only controls without accessible names
- Generic `Click here` links
- Excessive gradients, glassmorphism, or heavy shadows
- Unnecessary or looping decorative animation
- Horizontal scrolling on mobile
- Layout shift from image loading
- Cards with inconsistent internal spacing
- Technology logos without accessible labels
- Fake client logos, testimonials, or fabricated metrics
- Claims of accuracy, revenue, users, or performance without evidence
- Clickable `div` elements instead of semantic `a` / `button`
- Uniform "card wall" layout for the Our Work section

---

## 29. Migration Notes

1. Establish global tokens first (CSS variables or Tailwind theme).
2. Replace repeated raw values with semantic tokens.
3. Build primitives: Container, Button, Link, Tag, SectionHeader.
4. Build navigation and footer.
5. Build the project card system and Our Work editorial grid.
6. Add service and capability components.
7. Add team, process, and CTA sections.
8. Build the inquiry form with full validation.
9. Add responsive rules and test at 320, 768, 1024, 1440 px.
10. Add accessibility behavior and run audits.
11. Add motion only after the static experience is stable.

Teams should refactor existing components into the token system rather than creating visually similar duplicates.

**Tailwind note:** map semantic tokens in `tailwind.config` (`colors.surface.page`, `colors.text.primary`, etc.) so components never use raw hex values.

---

## 30. Page Density Guidance

Cortex should feel substantial without being crowded.

| Element                  | Target                 |
| ------------------------ | ---------------------- |
| Navigation links         | 5–7                    |
| Featured projects        | 1–2                    |
| Supporting project cards | 4–8                    |
| Services                 | 4–6                    |
| Process steps            | 4–5                    |
| Core team                | 3+                     |
| Primary CTAs             | 2–4                    |
| Forms                    | 1 primary inquiry form |

---

## 31. Edge Cases

| Case                    | Handling                                                     |
| ----------------------- | ------------------------------------------------------------ |
| Very long project title | Wrap naturally; never clip                                   |
| Very long description   | Clamp on cards; full text on project page                    |
| Missing project image   | Branded fallback visual                                      |
| Broken external image   | Show project name, category, fallback surface                |
| No projects             | Intentional empty state with contact CTA                     |
| Failed form submission  | Preserve input; clear retry action                           |
| Slow network            | Stable skeletons; no layout shift                            |
| Small viewport (320px)  | Readable content; no horizontal overflow                     |
| Reduced motion          | Disable transform-heavy effects                              |
| JavaScript disabled     | Content remains readable; reveal elements default to visible |
| Missing team photo      | Initials fallback                                            |
| 404                     | Branded page with link to work and contact                   |

---

## 32. Implementation Architecture

```text
App
├── SkipLink
├── Navigation
├── Hero
├── WorkSection
│   ├── FeaturedProject
│   └── ProjectCard
├── ServicesSection
│   └── ServiceCard
├── CapabilitiesSection
├── ProcessSection
├── AboutSection
├── TeamSection
│   └── TeamCard
├── CTASection
│   └── InquiryForm
└── Footer
```

Shared primitives:

```text
Button, Link, Tag, SectionHeader, Container, Card, IconButton,
Input, Textarea, Select, Skeleton, StatusMessage, Reveal
```

All components must consume semantic design tokens only.

**Performance requirements:** images served in modern formats with explicit `width`/`height`, lazy-loaded below the fold, LCP image prioritized, fonts loaded with `font-display: swap`, Largest Contentful Paint under 2.5s on a mid-range mobile connection.

**SEO basics:** unique title and meta description per page, Open Graph image per project, semantic headings, `sitemap.xml`, structured data (`Organization`, `CreativeWork` for projects).

---

## 33. QA Checklist

### Visual

- [ ] Typography uses approved tokens
- [ ] Spacing uses the Cortex scale
- [ ] No unexplained one-off values
- [ ] Project cards follow the editorial structure
- [ ] Colors use semantic tokens and approved pairs
- [ ] Border radius is consistent
- [ ] Shadows are restrained
- [ ] Section surfaces alternate with correct inverse tokens

### Interaction

- [ ] Every interactive component has all required states
- [ ] Hover behavior is subtle
- [ ] Active behavior provides feedback
- [ ] Loading states preserve layout
- [ ] Error states are recoverable
- [ ] Touch targets are at least 44×44px
- [ ] Keyboard interaction works end to end

### Accessibility

- [ ] WCAG 2.2 AA contrast passes (automated + manual)
- [ ] Every interactive element has visible focus not obscured by sticky UI
- [ ] Keyboard navigation reaches all controls; skip link works
- [ ] Images have appropriate alt text
- [ ] Forms have labels and associated errors
- [ ] Reduced-motion behavior works
- [ ] No interaction depends only on color
- [ ] Screen reader pass completed on nav, work grid, and form

### Responsive

- [ ] Desktop works at wide viewport sizes (up to 1440px+)
- [ ] Tablet remains readable
- [ ] Mobile has no horizontal overflow at 320px
- [ ] Navigation collapses correctly
- [ ] Project media remains useful on mobile
- [ ] Long content wraps correctly
- [ ] Buttons usable on touch devices

### Content

- [ ] Cortex positioning is clear above the fold
- [ ] Actual projects are prioritized
- [ ] Project descriptions explain outcomes
- [ ] Team information is accurate and approved by each member
- [ ] No unsupported performance or business claims
- [ ] CTAs use descriptive labels

### Performance

- [ ] Images compressed and sized correctly
- [ ] Images reserve layout space before loading
- [ ] Non-critical media lazy-loaded
- [ ] Animations do not block interaction
- [ ] Initial viewport loads quickly (LCP target met)

---

## 34. Final Design Rule

**Cortex should look like a small, highly capable product engineering studio, not a template-based freelance agency.**

- Use **Lil Boxes** for system discipline and visual personality.
- Use **Visuvate** for editorial quality and presentation of work.
- Use Cortex's real projects, people, capabilities, and story as the content layer.

The result should feel **bold, structured, technical, human, and immediately credible**.

---

## Appendix A — Changelog from v1

| Area           | Change                                                                                                                   | Reason                                                               |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Color          | Page is cream, black is an inverse section; added explicit text/background pairs, strong border, focus, and error tokens | v1 put dark text on a black page and relied on a low-contrast border |
| Brand red      | Restricted as text on cream/white; primary button uses black label                                                       | Red `#f0354d` fails 4.5:1 on light surfaces and with white text      |
| Typography     | Removed duplicate 26.88/27px steps; minimum size 12px; body weight 500                                                   | Cleaner scale, readability, clearer hierarchy                        |
| Spacing        | Added a 50px step, rounded 182.4px to 180px                                                                              | Fewer one-off values, simpler tokens                                 |
| Motion         | Added distance/stagger tokens, animation table, allowed properties                                                       | More implementable and consistent                                    |
| Our Work       | Added data model, grid table, case study template                                                                        | Faster implementation, stronger proof section                        |
| Accessibility  | Added WCAG 2.2 items (focus not obscured, redundant entry), skip link, landmarks                                         | Closer to the stated AA target                                       |
| Content        | Added link label table and "unverified content" rule                                                                     | Avoids fabricated claims                                             |
| Implementation | Added performance, SEO, Tailwind mapping notes                                                                           | Closer to production use                                             |

## Appendix B — Starter CSS tokens

```css
:root {
  /* palette */
  --color-ink: #212121;
  --color-black: #000000;
  --color-white: #ffffff;
  --color-cream: #f0e2dd;
  --color-red: #f0354d;
  --color-blue: #35b5f0;
  --color-peach: #f0a489;
  --color-line: #dddedf;
  --color-ink-muted: #5c5c5c;
  --color-white-muted: #9a9a9a;

  /* semantic */
  --color-surface-page: var(--color-cream);
  --color-surface-card: var(--color-white);
  --color-surface-inverse: var(--color-black);
  --color-surface-accent: var(--color-blue);
  --color-surface-warm: var(--color-peach);
  --color-text-primary: var(--color-ink);
  --color-text-secondary: var(--color-ink-muted);
  --color-text-on-inverse: var(--color-white);
  --color-text-on-inverse-muted: var(--color-white-muted);
  --color-text-on-brand: var(--color-black);
  --color-brand-primary: var(--color-red);
  --color-brand-secondary: var(--color-blue);
  --color-border-subtle: var(--color-line);
  --color-border-strong: var(--color-ink);
  --color-focus-ring: var(--color-ink);
  --color-focus-ring-inverse: var(--color-blue);

  /* spacing */
  --space-1: 5px;
  --space-2: 10px;
  --space-3: 15px;
  --space-4: 20px;
  --space-5: 30px;
  --space-6: 50px;
  --space-7: 100px;
  --space-8: 180px;

  /* radius, shadow */
  --radius-xs: 8px;
  --radius-sm: 30px;
  --radius-pill: var(--radius-sm);
  --shadow-1: rgba(33, 33, 33, 0.5) 0px 1px 0px 0px;
  --shadow-2: rgb(240, 226, 221) 0px 1px 0px 0px;

  /* motion */
  --motion-duration-instant: 100ms;
  --motion-duration-fast: 300ms;
  --motion-duration-slow: 500ms;
  --motion-ease-standard: cubic-bezier(0.2, 0.8, 0.2, 1);
  --motion-ease-enter: cubic-bezier(0.16, 1, 0.3, 1);
  --motion-ease-exit: cubic-bezier(0.7, 0, 0.84, 0);
  --motion-distance-sm: 4px;
  --motion-distance-md: 16px;
  --motion-stagger: 60ms;
}

:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}
[data-surface="inverse"] :focus-visible {
  outline-color: var(--color-focus-ring-inverse);
}
```
