---
name: design-system-cortex
description: Creates implementation-ready design-system guidance for Cortex, a freelance product engineering studio, combining Lil's structured visual system with Visuvate's editorial work showcase. Use when creating or updating Cortex UI rules, component specifications, page sections, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Cortex

## Mission

Deliver implementation-ready, token-driven design-system guidance for Cortex that creates a distinctive, credible freelance product-studio experience while staying consistent, accessible, responsive, and fast to implement.

Cortex guidance must combine:

- **Lil** as the primary visual foundation: structured layouts, bold Inter typography, compact spacing, rounded surfaces, strong contrast, restrained shadows, controlled interaction.
- **Visuvate** as the reference for **Our Work** only: editorial project presentation, strong hierarchy, work-first storytelling, varied project composition.
- **Cortex** as the brand layer: engineering-led, AI/ML-capable, youthful, technical, collaborative, human.

## Brand

- Product/studio: Cortex
- Surface: freelance / digital product studio marketing + portfolio website
- Audience: startups, founders, businesses, student organizations, teams, and individuals needing technical product development
- Core team: Ronak, Huzaifa, Saud
- Capabilities: web development, app development, AI/ML, automation, backend systems, product engineering, prototypes, technical consulting
- Primary goal: convert visitors into qualified project inquiries by demonstrating credibility through real work

## Brand Positioning

Cortex must feel like a small, highly capable product engineering studio, not a generic freelance agency.

> We don't just design ideas. We build working products.

Identity keywords: technical, bold, structured, modern, human, experimental, credible, implementation-focused.
The site must avoid feeling corporate, template-based, glossy, or generic.

## Style Foundations

- Visual style: structured, content-first, accessible, implementation-first
- Main font style: font.family.primary=Inter, font.family.stack=Inter, Geist, system-ui, sans-serif, font.size.base=15px, font.weight.base=500, font.lineHeight.base=1.5
- Font weights: font.weight.regular=500 (body), font.weight.strong=600 (labels, nav, buttons), font.weight.heading=700
- Typography scale: font.size.xs=12px, font.size.sm=13px, font.size.md=15px, font.size.lg=20px, font.size.xl=27px, font.size.2xl=40px, font.size.hero=clamp(48px, 8vw, 96px)
- Line height and tracking: font.lineHeight.heading=1.05, font.lineHeight.tight=1.15, letterSpacing.heading=-0.02em, letterSpacing.eyebrow=0.08em
- Color palette (raw, never used directly in components): color.ink=#212121, color.black=#000000, color.white=#ffffff, color.cream=#f0e2dd, color.red=#f0354d, color.blue=#35b5f0, color.peach=#f0a489, color.line=#dddedf, color.ink-muted=#5c5c5c, color.white-muted=#9a9a9a
- Spacing scale: space.1=5px, space.2=10px, space.3=15px, space.4=20px, space.5=30px, space.6=50px, space.7=100px, space.8=180px
- Radius/shadow/motion tokens: radius.xs=8px, radius.sm=30px | shadow.1=rgba(33, 33, 33, 0.5) 0px 1px 0px 0px, shadow.2=rgb(240, 226, 221) 0px 1px 0px 0px | motion.duration.instant=100ms, motion.duration.fast=300ms, motion.duration.normal=300ms, motion.duration.slow=500ms

## Semantic Tokens

Components must consume semantic tokens only.

```css
/* surfaces */
color.surface.page=color.cream
color.surface.card=color.white
color.surface.inverse=color.black
color.surface.accent=color.blue
color.surface.warm=color.peach

/* text */
color.text.primary=color.ink                   /* on page, card, accent, warm */
color.text.secondary=color.ink-muted           /* on page, card */
color.text.on-inverse=color.white
color.text.on-inverse-muted=color.white-muted
color.text.on-brand=color.black                /* on brand red */

/* brand */
color.brand.primary=color.red
color.brand.secondary=color.blue

/* borders, focus, status */
color.border.subtle=color.line                 /* decorative dividers only */
color.border.strong=color.ink                  /* inputs, outlined buttons */
color.focus.ring=color.ink
color.focus.ring-inverse=color.blue
color.status.error=#b3132b
color.status.error-inverse=color.red
color.status.success=#1a6b3c

/* spacing */
space.component.xs=space.1
space.component.sm=space.2
space.component.md=space.3
space.component.lg=space.4
space.gutter=space.5
space.block=space.6
space.section=space.7
space.hero=space.8

/* radius and motion */
radius.pill=radius.sm
motion.ease.standard=cubic-bezier(0.2, 0.8, 0.2, 1)
motion.ease.enter=cubic-bezier(0.16, 1, 0.3, 1)
motion.ease.exit=cubic-bezier(0.7, 0, 0.84, 0)
motion.distance.sm=4px
motion.distance.md=16px
motion.stagger=60ms
```

### Approved color pairs (approximate ratios, verify with tooling)

- color.text.primary on color.surface.page (~12:1) and on color.surface.card (~16:1)
- color.text.secondary on color.surface.page (~5:1)
- color.text.on-inverse on color.surface.inverse (21:1); color.text.on-inverse-muted on color.surface.inverse (~7:1)
- color.text.primary on color.surface.accent (~7:1) and on color.surface.warm (~8:1)
- color.text.on-brand on color.brand.primary (~5:1)
- color.brand.primary on color.surface.inverse (~5:1)

### Prohibited color pairs

- color.brand.primary text on color.surface.page or color.surface.card (below 4.5:1; large decorative type only)
- White text on color.brand.primary or color.surface.accent
- color.border.subtle as the only boundary of an input or control

## Typography Rules

- Headings must use the approved scale and tight line height with a controlled max width (hero ~18ch, section headings ~24ch).
- Hero headings must use font.size.hero (responsive clamp), never a fixed size.
- Body text must use font.size.md with a 60–70 character measure.
- Labels, tags, metadata, and navigation use font.size.xs or font.size.sm. No text may be smaller than font.size.xs.
- Arbitrary per-component font sizes must not be introduced.
- Long headings must wrap and never clip.

## Spacing and Layout Rules

- Components must use semantic spacing tokens; grid gaps must come from the scale.
- Responsive spacing should use clamp() between two scale values; no one-off exceptions for aesthetic correction.
- Container: max-width 1440px; padding-inline 30px (≥1024px), 24px (640–1023px), 15px (<640px).
- Breakpoints: sm=640px, md=768px, lg=1024px, xl=1280px.
- Desktop uses a 12-column grid, tablet 6 columns, mobile 1 column.
- Sections should alternate surfaces (page → inverse → page) and use inverse text tokens on dark sections.
- A skip link must be the first focusable element.

## Radius, Shadow, Motion Rules

- radius.xs for cards, media, inputs; radius.pill for buttons, tags, pills.
- Unrelated corner radii must not be mixed without a documented reason.
- Shadows must stay subtle: no heavy multi-layer shadows, glossy effects, or excessive glassmorphism.
- Motion must communicate hierarchy, interaction, or continuity, and must not delay access to content.
- Animate only opacity and transform, plus color/background/border for state changes. Never animate layout properties.
- Reduced motion (`prefers-reduced-motion: reduce`) must remove parallax, large transforms, media zoom, and decorative movement, leaving opacity-only or instant transitions.

## Site Architecture

1. Navigation
2. Hero
3. Our Work
4. Services
5. Capabilities
6. Process
7. About Cortex
8. Team
9. Trust / proof (only real testimonials)
10. CTA + project inquiry form
11. Footer

Narrative: **What we build → What we have built → What we can do → Who we are → Start a project.**

## Component Rules

Every component must define: default, hover, focus-visible, active, disabled, loading, error.
Every interactive component must define: keyboard, pointer, and touch behavior, plus responsive, overflow, and empty-state behavior where applicable.

### Navigation

- Anatomy: Cortex wordmark, Work, Services, About, Team, Start a project CTA.
- Desktop: compact horizontal nav, transparent over hero, `surface.page` with shadow.1 after scroll. Mobile: collapsible menu.
- Default: color.text.primary on transparent. Hover: underline plus transition toward color.brand.primary on dark (underline only on light; red text must not be used on light surfaces). Focus-visible: 2px ring, 2px offset. Active: underline plus font.weight.strong with `aria-current`. Disabled: normally not rendered. Loading: stays usable. Error: one failed destination never breaks the rest.
- Keyboard: Tab in DOM order, Enter activates, Esc closes mobile menu and returns focus to trigger. Pointer: full link area clickable. Touch: targets at least 44×44 CSS px.
- The menu button must expose `aria-expanded` and `aria-controls`; the open menu must trap focus and lock body scroll.

### Hero

- Anatomy: eyebrow (`CORTEX — DIGITAL PRODUCT STUDIO`), headline, supporting statement, primary CTA (`View our work`), secondary CTA (`Start a project`), optional product/project visual.
- Headline direction: "We build digital products that turn ambitious ideas into working systems." Supporting copy should name capabilities without becoming a technology dump.
- Motion: short staggered entrance (opacity + motion.distance.md, motion.stagger, motion.duration.slow, motion.ease.enter) that must not block interaction.
- Visuals: abstract technical graphics, real project UI, or product screenshots. No generic stock imagery. Hero media must define loading and error fallbacks and reserve dimensions.
- Responsive: large type and visual composition on desktop; readable headline wrapping and clear CTA hierarchy on mobile.

### Our Work (Visuvate-inspired editorial section)

- Intent: the most important proof section; combine Lil's component system with Visuvate's editorial, work-first approach.
- Anatomy: visual, project name, one-line outcome (~90 characters max), category, up to 4 tags, optional verified metric, descriptive action (`View [project] case study`).
- Candidate projects: KrishiGrahan, Moodify, Botnify, Mediqueue, Cortex AV, HackathonOS, Task2Reward, future client work. The implementation must use actual project information supplied by the team.
- Data model: `{ slug, name, outcome, category, tags[], media{src,alt,width,height}, metric?{value,label,verified}, featured?, href }`.
- Desktop layout (12 columns): row 1 featured project (8 cols) + one supporting (4); row 2 two supporting projects (6 + 6); row 3 full-width feature (21:9 media); row 4 compact cards (3–4 per row). Featured projects gain prominence through scale and placement, not a different component style.
- Default: color.surface.card, radius.xs media, image-first hierarchy. Hover: media scale 1.03 or translate motion.distance.sm, title underline, arrow shifts 4px, motion.duration.fast. Focus-visible: ring on the entire card link. Active: scale 0.99, motion.duration.instant. Disabled: normally not shown; if shown, `aria-disabled` and no hover effect. Loading: skeleton with final dimensions via aspect-ratio. Error: branded fallback with project name and category.
- Responsive: tablet uses 6 columns and keeps the featured hierarchy; mobile is single column with no horizontal scroll.
- Long content: titles wrap, descriptions clamp to 2 lines, full text lives on the project page.
- Empty state: intentional studio message plus `Start a project` CTA.
- Case study order: hero media → summary strip (role, timeline, stack) → problem → solution → key screens → technical notes → result → next project.

### Services and Service Card

- Services communicate outcomes: Web Development, App Development, AI / ML, Automation, Product Engineering.
- Card anatomy: index, title, description, capability tags, action (only if the card links somewhere).
- Default: color.surface.card, radius.xs, shadow.1. Hover: surface shift toward color.surface.accent or color.surface.warm plus arrow translate, motion.duration.fast. Focus-visible: visible ring. Active: translate/scale 0.99. Disabled: muted, `aria-disabled`. Loading: skeleton with preserved dimensions. Error: heading plus short fallback message.
- Non-link cards must not show hover or pointer affordances.
- Desktop should prefer a stacked list (number left, content right) over a uniform card wall; mobile stacks to one column and descriptions wrap without clipping.

### Capabilities

- Groups: Frontend, Backend, AI / ML, Databases, Cloud / Deployment, Automation, Product / UI.
- Use grouped text-label pills, roughly 4–8 per group. Logos are optional, secondary, and must always carry accessible text labels. No logo walls. List only technologies the team has shipped with.

### Process

- Steps: 01 Understand, 02 Design, 03 Build, 04 Test, 05 Launch.
- Use large numbered anchors and subtle progressive reveal. Steps are informational unless expandable; expandable steps must use `<button aria-expanded>`.
- Mobile: vertical list with connecting line, no horizontal scroll.

### About Cortex

- Must feel human rather than corporate, combining engineering, AI/ML, product thinking, design, and experimentation.
- One short paragraph plus ~3 evidence points linking to projects. Must connect visually and narratively to Team.

### Team

- Core team: Ronak, Huzaifa, Saud. The component must support additional members without redesign.
- Anatomy: profile image (consistent aspect ratio, 4:5 recommended), name, role, strengths, optional profile/social link with a descriptive accessible name (e.g. `Huzaifa on GitHub`).
- Roles and strengths must be supplied by the team; titles must not be invented.
- Default: image, name, role, strengths. Hover: image scale 1.02 and link underline. Focus-visible: ring on each link (or the card if it is a link). Active: press effect on interactive cards. Disabled: not shown. Loading: skeleton. Error: initials fallback on color.surface.accent or color.surface.warm.

### Buttons

- Variants: Primary (color.brand.primary background, color.text.on-brand label), Secondary (transparent, 2px color.border.strong), Ghost (text + arrow, underline on hover), Destructive (product use only, never marketing). On dark surfaces, secondary and ghost use inverse text and a white border.
- Specs: radius.pill, height 48px (minimum 44px), horizontal padding space.5, font.size.md, font.weight.strong.
- Hover: primary darkens via overlay token, secondary fills, arrow slides 4px, motion.duration.instant. Focus-visible: 2px ring, 2px offset (focus.ring or focus.ring-inverse). Active: scale 0.98. Disabled: reduced opacity, `aria-disabled`, not-allowed cursor, paired with explanatory text where relevant. Loading: width locked, spinner, `aria-busy="true"`, accessible status announcement. Error: error border/background with adjacent message linked by `aria-describedby`.
- Keyboard: Enter and Space activate native buttons. Pointer: entire surface clickable. Touch: at least 44×44 CSS px.

### Links

- Labels must be descriptive (`View KrishiGrahan case study`, not `Click here`).
- Inline links must be underlined. Hover and focus-visible must be visually distinct. Color must not be the only indicator.
- External links should include an icon, `rel="noopener noreferrer"`, and an accessible hint such as "opens in a new tab".

### Tags and Pills

- Types: technology, service category, project type, status. Use font.size.xs/sm, font.weight.strong, radius.pill, padding space.1 × space.3.
- Informational tags must not imply interaction (no hover, no pointer cursor). Interactive tags must be real `<button>` elements with `aria-pressed`, a non-color selected state, and all interactive states.
- Tag lists must wrap and never overflow horizontally.

### Project Inquiry Form

- Fields: Name, Email, Project type, Budget range (optional, includes "Not sure yet"), Project description, Timeline. Collect only what is needed to qualify a project.
- Input states: default (color.surface.card, 2px color.border.strong, radius.xs, 48px height), hover (border emphasis), focus-visible (ring plus border change), active, disabled (muted, not-allowed), loading (read-only while submitting), error (error-token border, icon, message below field).
- Every field must have a visible `<label>`; placeholders must not replace labels.
- Errors must appear next to the field, be linked via `aria-describedby`, and be announced (`role="alert"` or `aria-live="polite"`). On submit failure, move focus to the first invalid field or an error summary.
- Entered values must persist after validation errors. The submit button must show loading and prevent double submission.
- Success must show a clear confirmation of what happens next. Failure must give a retry action and an email fallback. An accessible anti-spam measure (e.g. honeypot) should be included.

### CTA

- One of the strongest visual moments, on color.surface.inverse or color.surface.accent with large type.
- Headline direction: "Have an idea worth building?" Supporting copy: visitors share their idea and Cortex helps turn it into a working product.
- Primary: `Start a project`. Secondary: `View our work`. Buttons must not rely on color alone for interactivity.

### Footer

- Contains Cortex identity, short studio statement, navigation, services, social links, contact CTA, copyright.
- Uses color.surface.inverse with inverse text tokens and the global spacing and typography tokens. Email must be a real `mailto:` link with visible text.

## Animation Guidelines

- Page entrance: opacity + translateY(motion.distance.md), staggered by motion.stagger, motion.duration.slow, motion.ease.enter.
- Section reveal: viewport-triggered via IntersectionObserver, run once, only where it improves hierarchy. Content must remain readable and usable during animation and must default to visible without JavaScript.
- Card hover: small translate or media scale plus border/background transition, motion.duration.fast.
- Button interaction: motion.duration.instant.
- Menus: opacity + translate, motion.duration.fast with enter/exit easing.
- Parallax, scroll-jacking, and looping decorative animation are not allowed. Animation must never be required to understand content.

## Responsive Rules

- Desktop: full editorial composition with substantial project visuals.
- Tablet: reduce column count, heading sizes, section spacing, and image complexity; keep featured-project hierarchy; do not remove essential content.
- Mobile: clean single column; no horizontal overflow at 320px; readable type (body stays font.size.md); 44×44 touch targets; natural heading wrapping; useful project image crops (`object-position` per project); collapsible navigation; preserved CTA hierarchy.

## Accessibility

- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

### Testable acceptance criteria

**Keyboard**

- PASS if every interactive element is reachable by keyboard and focus order follows DOM and visual order.
- PASS if Enter activates links and buttons and Space activates native buttons.
- PASS if the mobile menu traps focus when open and restores it on close.
- PASS if a working skip link exists.

**Focus**

- PASS if every interactive element has a visible `:focus-visible` indicator with at least 3:1 contrast against adjacent colors.
- PASS if focus is not obscured by sticky UI.
- FAIL if `outline: none` is used without an equivalent replacement.

**Contrast**

- PASS if normal text meets 4.5:1 and large text 3:1.
- PASS if UI boundaries and focus indicators meet 3:1.
- FAIL for any prohibited color pair listed above.

**Touch and pointer**

- PASS if interactive targets are at least 44×44 CSS px.
- PASS if no interaction requires dragging without a single-pointer alternative.

**Images and media**

- PASS if meaningful images have useful alt text and decorative images use empty alt.
- PASS if video has captions or a transcript and never autoplays with sound.

**Forms**

- PASS if every input has an accessible name.
- PASS if validation errors are programmatically associated with the field.
- PASS if dynamic status messages are announced without unnecessarily stealing focus.
- PASS if previously entered information is not requested again unnecessarily.

**Motion**

- PASS if `prefers-reduced-motion: reduce` is respected.
- PASS if nothing flashes more than 3 times per second.

**Structure**

- PASS if each page has one `<h1>`, headings do not skip levels, landmarks (`header`, `nav`, `main`, `footer`) exist, and `<html lang>` is set.

## Content and Tone

Tone: concise, confident, technical when useful, human, outcome-focused.

Avoid: generic agency clichés, excessive buzzwords, unsupported claims, fake metrics, vague calls to action, excessive jargon.

Prefer: "We design and build websites, applications, AI systems, and internal tools."
Avoid: "We are a revolutionary next-generation digital transformation agency."

Prefer: "From prototype to deployment, we handle the engineering needed to make the product work."
Avoid: "We turn your dreams into digital reality."

Label standards: use `Start a project` (not `Submit`), `View KrishiGrahan case study` (not `Learn more`), `Email the team` (not an ambiguous `Contact`).

## Project Content Standards

Every project presentation must answer:

1. What problem existed?
2. What did Cortex build?
3. What capabilities were involved?
4. What was the outcome?
5. What can the visitor explore next?

Project cards stay concise; case studies carry deeper technical and product detail. Claims about users, accuracy, revenue, speed, or performance must be backed by real evidence, otherwise omitted.

## Edge Cases

- Long project title: wrap naturally, never clip.
- Long description: clamp on cards, full text on the project page.
- Missing or broken image: branded fallback with project name and category.
- No projects: intentional empty state with contact CTA.
- Slow network: stable skeleton dimensions, no layout shift.
- Form failure: preserve data and provide retry.
- Small viewport (320px): no horizontal overflow.
- JavaScript disabled: content readable; reveal elements default to visible.
- Missing team photo: initials fallback.
- 404: branded page linking to work and contact.
- Reduced motion: disable transform-heavy animation.

## Component Architecture

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

Shared primitives: Button, Link, Tag, SectionHeader, Container, Card, IconButton, Input, Textarea, Select, Skeleton, StatusMessage, Reveal.
All components must consume semantic Cortex tokens.

## Performance and SEO

- Images should be served in modern formats with explicit width/height, lazy-loaded below the fold, with the LCP image prioritized.
- Fonts should use `font-display: swap`. LCP should stay under 2.5s on a mid-range mobile connection.
- Each page needs a unique title and meta description; project pages need an Open Graph image; structured data (`Organization`, `CreativeWork`) should be included.

## Anti-Patterns and Prohibited Implementations

- Arbitrary font sizes or spacing values
- Low-contrast text, including brand red text on light surfaces
- Hidden or removed focus indicators
- Ambiguous links, generic `Click here` actions
- Icon-only controls without accessible names
- Excessive gradients, glassmorphism, or shadows
- Parallax, animation-heavy navigation, or looping decorative animation
- Horizontal mobile overflow
- Layout shift from unloaded media
- Inconsistent card spacing
- Technology logos without accessible labels
- Fake testimonials, fabricated client logos, unsupported metrics or AI/ML accuracy claims
- Clickable `div` elements instead of semantic `a` / `button`
- A uniform card wall for Our Work
- Copying reference websites directly or creating sections that break the system

Cortex must retain its own content, projects, identity, and positioning even when using Lil and Visuvate as references.

## Migration Notes

1. Establish global tokens first.
2. Create shared layout primitives.
3. Build navigation, footer, and button primitives.
4. Build the project card system.
5. Implement the Visuvate-inspired editorial Our Work section.
6. Build services and capability components.
7. Build process, About, and Team.
8. Add the inquiry form and CTA.
9. Implement responsive behavior (test at 320, 768, 1024, 1440px).
10. Implement accessibility behavior and run audits.
11. Add motion after the static experience is stable.
12. Run the QA checklist before release.

Teams should refactor repeated visual values into tokens instead of introducing component-specific exceptions. In Tailwind, map semantic tokens in the theme config so components never use raw hex values.

## QA Checklist

### Visual

- [ ] Typography uses approved tokens
- [ ] Spacing uses the Cortex scale
- [ ] Colors use semantic tokens and approved pairs
- [ ] Radius usage is consistent
- [ ] Shadows remain restrained
- [ ] Our Work follows the editorial showcase direction
- [ ] Lil-inspired system language is consistent
- [ ] Cortex branding remains distinct
- [ ] No section feels like an unrelated template

### Interaction

- [ ] Every interactive component has all required states
- [ ] Hover is subtle and active state gives feedback
- [ ] Focus-visible is obvious
- [ ] Loading preserves layout
- [ ] Error states are recoverable
- [ ] Touch targets are at least 44×44px
- [ ] Keyboard navigation works end to end

### Accessibility

- [ ] WCAG 2.2 AA contrast passes (automated + manual)
- [ ] Focus is visible and not obscured by sticky UI
- [ ] Skip link works
- [ ] Images have appropriate alt text
- [ ] Forms have labels and associated errors
- [ ] Reduced-motion behavior works
- [ ] No interaction depends only on color
- [ ] Screen reader pass completed on nav, Our Work, and form

### Responsive

- [ ] Desktop works at wide viewports
- [ ] Tablet preserves hierarchy
- [ ] Mobile has no horizontal overflow at 320px
- [ ] Navigation collapses correctly
- [ ] Project media remains useful on mobile
- [ ] Long content wraps correctly
- [ ] Buttons remain touch-friendly

### Content

- [ ] Cortex positioning is clear above the fold
- [ ] Actual work is prioritized
- [ ] Project descriptions explain outcomes
- [ ] Team information is accurate and approved
- [ ] Claims are evidence-based
- [ ] CTA labels are descriptive
- [ ] Project inquiry path is obvious

### Performance

- [ ] Images are optimized and reserve layout space
- [ ] Non-critical media is lazy-loaded
- [ ] Animations do not block interaction
- [ ] Initial viewport loads quickly

## Quality Gates

- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.
- Cortex must use Lil as the primary visual system and Visuvate as the reference for editorial work presentation.
- The final implementation must feel like Cortex, not a clone of either reference.

<!-- TYPEUI_SH_MANAGED_END -->
