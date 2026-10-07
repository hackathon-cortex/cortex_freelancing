# Cortex Freelancing — Remaining Work & Final Implementation Checklist

> **Purpose:** Master checklist for the remaining work on the Cortex Freelancing website.
>
> **Status:** Work remaining for the next implementation session.
>
> **Repository:** `https://github.com/hackathon-cortex/cortex_freelancing`
>
> **Important:** This document is a task list and implementation specification. Existing `design.md`, `details.md`, `skills.md`, and `structure.md` remain the source of truth for content, design tokens, capabilities, project information, accessibility, and site structure unless this document explicitly marks an animation/interaction enhancement.

---

# 0. CURRENT REPOSITORY BASELINE

The repository is already a Vite + React project and already includes:

- React 18
- Vite
- GSAP
- Lenis
- Lucide React

Therefore:

- **Do not replace the existing stack.**
- **Do not rebuild the website from scratch.**
- Reuse the existing design tokens and architecture.
- Extend the current implementation.
- Use GSAP + ScrollTrigger for advanced motion.
- Use Lenis for smooth scrolling where appropriate.
- Keep the existing responsive/accessibility foundations.

The current design system already defines:

- 12-column desktop grid
- responsive container system
- typography tokens
- color tokens
- spacing tokens
- motion tokens
- reduced-motion behavior
- section architecture
- project card anatomy
- accessibility states.

The remaining work is primarily **implementation quality, visual composition, motion design, project presentation, responsive refinement, and final QA**.

---

# 1. PRIORITY ORDER FOR TOMORROW

Implement in this order:

## P0 — MUST COMPLETE

1. Homepage motion-design sequence
2. Hero visual/composition redesign
3. Hero symmetry/grid alignment
4. Selected Work stacked-card animation
5. Project fan-out/reveal system
6. Project transitions
7. Scroll-driven project progression
8. Project image/UI motion
9. Section-to-section transitions
10. Responsive layout correction
11. Mobile project interaction
12. Accessibility and reduced-motion verification
13. Build/error/performance verification

## P1 — COMPLETE AFTER P0

14. Services interaction
15. Business Website showcase animation
16. Process scroll animation
17. Capabilities animation
18. Team microinteractions
19. FAQ animation
20. CTA cinematic animation
21. Navigation motion
22. Cursor/magnetic interactions
23. Footer/back-to-top interaction

## P2 — FINAL POLISH

24. Typography refinement
25. Spacing/symmetry refinement
26. Visual weight balancing
27. Image/media optimization
28. Loading states
29. Error/empty states
30. SEO metadata
31. Open Graph/social metadata
32. Final responsive QA
33. Final accessibility QA
34. Final browser QA
35. Final production build

---

# 2. HOMEPAGE — MOTION DESIGN

## Goal

The homepage must feel like a **motion-design composition that became an interactive website**.

It must NOT feel like:

> static website + fade-up animations.

Reference motion language:

- Jitter homepage reference supplied by the team
- Visuvate
- Lil Boxes

Do not copy their branding/assets/layouts.

Use the references for motion principles, pacing, composition, transitions, and visual storytelling.

---

## 2.1 Initial Page Load

Implement a short branded entrance.

Sequence:

1. dark/brand base appears
2. Cortex mark reveals
3. small supporting label appears
4. thin line/progress element expands
5. hero typography begins
6. hero visual begins constructing
7. page enters normal interaction state

Target:

- approximately 700–1400ms
- no unnecessary spinner
- no long blocking loader

Requirements:

- only show the full loader once per page session
- do not make the site unusable while loading
- respect reduced motion

---

# 3. HERO — KINETIC TYPOGRAPHY

## 3.1 Headline

The hero headline must use **line-based motion typography**.

Do NOT simply fade the complete heading.

Each line should:

- begin below its mask
- translate upward
- reveal through overflow/clip
- settle into position

Recommended conceptual sequence:

```text
Line 1
  ↓
Line 2
  ↓
Accent line
  ↓
Supporting copy
  ↓
CTA
```

Use:

- transform
- clip-path/mask
- opacity
- stagger
- controlled easing

---

## 3.2 Hero Accent

The main accent phrase/word must have a distinct animation.

Use:

```text
clip-path reveal
+
scale
+
small translation
```

The accent should feel like a separate visual beat.

---

## 3.3 Hero Copy

Supporting copy should enter after the headline.

Use:

- opacity
- translateY
- slight stagger

Do not overanimate paragraphs.

---

## 3.4 Hero CTA

Primary CTA:

`Start a Conversation`

Animation:

- enter after copy
- hover expansion
- arrow movement
- active compression
- optional subtle magnetic behavior on desktop

---

# 4. HERO — LARGE VISUAL SYSTEM

The hero visual must be a major visual object.

It must NOT look like a tiny floating card.

It should communicate:

- technology
- systems
- AI
- product building
- digital products
- Cortex identity

Possible implementation:

- abstract Cortex system
- animated UI fragments
- network nodes
- data lines
- browser/product fragments
- code/system indicators

---

## 4.1 Visual Construction Animation

The visual should build itself:

1. base shape
2. central element
3. nodes
4. connecting paths
5. labels
6. system indicators
7. small continuous motion

SVG path drawing should be used where practical.

Use:

- `stroke-dasharray`
- `stroke-dashoffset`

for path construction.

---

## 4.2 Hero Layered Parallax

Use multiple depth layers.

Example:

```text
background: 1–2px
grid:        2–4px
glow:        4–6px
main visual: 6–10px
floating UI: 8–15px
```

Movement must be subtle.

Do not turn the hero into a distracting 3D scene.

---

# 5. HERO — SYMMETRY / COMPOSITION

Use the existing 12-column grid.

Desktop:

- left content ≈ 5–6 columns
- right visual ≈ 6–7 columns
- shared vertical alignment
- shared visual center
- balanced visual weight

The visual must be large enough to balance the headline.

Do not allow:

- huge typography + tiny visual
- huge empty area
- misaligned top edges
- unrelated bottom edges
- arbitrary absolute positioning of the whole layout

Absolute positioning is acceptable **inside the art-directed visual**, not for the overall page structure.

---

# 6. HERO → MARQUEE TRANSITION

The hero must transition into the capability strip.

Do not simply finish the hero and reveal the next section.

Use:

```text
hero visual moves/expands
        ↓
hero typography begins leaving
        ↓
capability strip enters
        ↓
marquee begins
```

The transition should feel continuous.

---

# 7. CAPABILITY MARQUEE

Implement a true infinite marquee.

Content:

- WEB DEVELOPMENT
- AI / ML
- SOFTWARE
- AUTOMATION
- UI / UX
- CYBERSECURITY
- DATA & ANALYTICS

Requirements:

- seamless loop
- duplicated content
- no visible jump
- responsive speed
- subtle hover slowdown
- no horizontal page overflow
- reduced-motion fallback

---

# 8. SELECTED WORK — COMPLETE REDESIGN OF MOTION

## Highest-priority section after the hero.

The Projects section must use the supplied Jitter stacked-card reference as the primary motion inspiration.

Core interaction:

```text
STACK
↓
FAN
↓
FOCUS
↓
REVEAL
↓
NEXT PROJECT
```

The project cards themselves are the animation.

Do NOT implement a generic grid as the primary presentation.

---

# 9. PROJECTS — DATA

Use the project list defined by the current site/content source.

Primary four-project showcase:

1. KrishiGrahan
2. Cortex P2P
3. Moodify
4. VivaAI

Do not invent metrics or client claims.

Do not display a project as a conventional website if it is actually an application/product.

---

# 10. STACKED PROJECT COMPOSITION

Desktop:

- active card is largest
- next cards remain partially visible
- cards overlap
- stack has depth
- active project is clearly dominant

Conceptual depth:

```text
ACTIVE
scale 1.00
y 0
opacity 1
rotation 0

NEXT
scale ~0.94
y ~20
opacity ~0.85
rotation ~1deg

NEXT
scale ~0.89
y ~40
opacity ~0.65

NEXT
scale ~0.84
y ~60
opacity ~0.45
```

Tune visually; these are not hard values.

---

# 11. PROJECT FAN-OUT

When changing projects:

1. current card moves away
2. current card scales down
3. current card rotates slightly
4. next card comes forward
5. next card scales to 1
6. next card rotates toward neutral
7. metadata changes
8. project progress changes

Everything must feel like one physical motion.

No hard swaps.

---

# 12. PROJECT SCROLL CONTROL

Preferred desktop interaction:

- pin the project showcase where appropriate
- scroll controls active project
- project stack remains visually present
- project changes are tied to scroll progress

Example:

```text
Scroll
  ↓
KrishiGrahan active

Scroll
  ↓
KrishiGrahan moves backward
Moodify comes forward

Scroll
  ↓
Moodify moves backward
VivaAI comes forward

Scroll
  ↓
VivaAI moves backward
Cortex P2P comes forward
```

Do not pin the entire page.

Pin only the project showcase if it improves the experience.

---

# 13. PROJECT PROGRESS

Display:

```text
01 / 04
```

or a compact progress indicator.

The number must animate rather than hard-swap.

Use vertical number movement:

```text
01
↓
02
```

---

# 14. PROJECT TITLE TRANSITION

Old title:

```text
translateY(0)
opacity: 1
```

→

```text
translateY(-30px)
opacity: 0
```

New title:

```text
translateY(30px)
opacity: 0
```

→

```text
translateY(0)
opacity: 1
```

Use a clipping/masked container.

---

# 15. PROJECT DESCRIPTION / TAGS / CTA

Reveal in sequence:

1. title
2. description
3. technology tags
4. CTA

Use a small stagger.

Do not make the entire information panel move as one block.

---

# 16. PROJECT IMAGE TRANSITION

Project image must not simply fade.

Use:

- clip-path
- scale
- translation
- optional subtle rotation

Example:

```text
old:
scale 1 → 1.05

new:
scale 1.06 → 1
```

Clip reveal:

```text
inset(0 100% 0 0)
→
inset(0 0 0 0)
```

---

# 17. PROJECT IMAGE INTERNAL ANIMATION

Where project media supports it:

- browser content moves
- dashboard UI reveals
- mobile screen transitions
- charts animate
- UI elements appear
- screen content scrolls subtly

The screenshot should feel like a real product demonstration.

Do not fake unavailable functionality.

---

# 18. PROJECT POINTER PARALLAX

Desktop only.

Inside active project:

- background layer: 2–3px
- screenshot: 5–7px
- floating UI: 8–12px
- metadata: 2–3px

Smooth interpolation.

Disable on touch/reduced-motion.

---

# 19. HOLD TO EXPLORE

If the current UI contains `HOLD TO EXPLORE`, make it a real interaction.

On pointer down:

```text
0%
→ 25%
→ 50%
→ 75%
→ 100%
```

At completion:

- open project
- or enter project preview state

On early release:

- progress reverses smoothly

Support:

- pointer
- touch
- keyboard

Keyboard alternative:

- Enter
- Space

Mobile:

`TAP TO EXPLORE`

if hold is not comfortable.

---

# 20. PROJECT HOVER

On desktop hover:

- card slightly lifts
- image scales ~1.02–1.04
- CTA arrow moves
- cursor can show `VIEW PROJECT`
- internal layers respond subtly

Do not make the card jump.

---

# 21. PROJECT DRAG / SWIPE

Optional enhancement if it does not conflict with page scrolling.

Desktop:

- drag project rail/stack
- slight momentum
- bounds

Mobile:

- swipe
- snap to project
- velocity-aware transition

Do not make dragging mandatory if it harms scroll usability.

---

# 22. PROJECT SYMMETRY

The project visual and project information must align to the same master grid.

Maintain:

- equal visual region
- consistent card geometry
- consistent information baseline
- consistent section padding
- consistent card height where applicable

The stack must remain visually centered.

---

# 23. SERVICES — PENDING

Services should use the existing stacked-list direction.

Services:

1. Web Development
2. AI & Machine Learning
3. Software Development
4. Automation & Business Solutions
5. Cybersecurity
6. UI/UX & Digital Design
7. Data & Analytics

Implement:

- numbered rows
- aligned title
- description
- capabilities
- arrow
- hover motion
- focus motion
- optional expansion

Do not turn the section into a generic card wall.

---

# 24. SERVICES ANIMATION

Entry:

```text
number reveal
→
title reveal
→
description reveal
→
arrow reveal
```

Hover:

- title shifts
- arrow moves
- border animates
- supporting content becomes more visible

Click/expand if implemented:

- smooth height/clip transition
- no layout jump
- accessible `aria-expanded`

---

# 25. BUSINESS WEBSITE SHOWCASE

Create a major visual showcase for the business website service.

Composition:

```text
LEFT:
copy + CTA

RIGHT:
large browser/product visual
```

Maintain visual balance.

Browser should be large enough to matter.

Animation:

1. browser enters
2. frame reveals
3. screen content reveals
4. internal UI animates
5. CTA appears

Use:

- scale
- clip-path
- parallax
- stagger

---

# 26. PROCESS — SCROLL ANIMATION

Use the process defined in `structure.md`.

Steps:

1. Requirements
2. Finalization
3. Design
4. Development
5. Testing
6. Deployment
7. Handover
8. Support

Desktop:

- central vertical axis
- alternating left/right content
- strong alignment

Scroll:

- progress line fills
- current step activates
- completed step receives indicator
- upcoming steps remain muted

---

# 27. PROCESS SYMMETRY

Do not put all steps randomly on one side.

Use:

```text
LEFT             AXIS             RIGHT

Requirements       │
                   │       Finalization

Design             │
                   │       Development

Testing            │
                   │       Deployment

Handover           │
                   │       Support
```

The exact ordering may be adjusted for content, but the central axis must remain visually strong.

---

# 28. CAPABILITIES

Capabilities should use a disciplined grid.

Groups:

- Frontend
- Backend
- AI / ML
- Databases
- Cloud / Deployment
- Automation
- Product / UI

Animation:

1. border/structure appears
2. group label
3. technology labels
4. subtle hover response

No giant logo wall.

---

# 29. WHY CORTEX

The six existing reasons should remain content-driven:

- Business First
- Modern Technology
- Customized Solutions
- Quality Focused
- Transparent Process
- Long-Term Support

Use a balanced grid/list.

Do not invent claims.

Animation should be restrained:

- staggered reveal
- subtle card/row interaction
- no excessive effects

---

# 30. INDUSTRIES

Keep industries compact.

Do not create 12 giant cards.

Use:

- pills
- compact list
- interactive rows

Hover:

- slight expansion
- arrow movement
- accent response

---

# 31. CLIENT SOLUTION PATHS

Four paths:

- Startups
- Businesses
- Organizations
- Individuals

Desktop:

four visually balanced columns.

Each card must have:

- equal geometry
- equal padding
- clear heading
- path visualization
- CTA/interaction if applicable

Animate the path sequentially on hover/focus.

---

# 32. ABOUT CORTEX

Requirements:

- human
- technical
- concise
- connected to projects
- connected to team

Add subtle text reveal.

Use evidence/project references rather than generic claims.

---

# 33. TEAM

Core team:

- Huzaifa Lokhandwala
- Saud Rana
- Ronak Solanki

Maintain consistent:

- media ratio
- name baseline
- role baseline
- links
- card height

Hover:

- image zoom
- card lift
- social link reveal
- accent motion

Do not invent roles/strengths not present in the source data.

---

# 34. FAQ

Implement:

- animated height expansion
- icon rotation
- border/background transition
- accessible button
- `aria-expanded`
- keyboard support

No abrupt layout jump.

---

# 35. CTA

Final CTA must be a cinematic section.

Sequence:

1. label
2. headline line 1
3. headline line 2
4. supporting text
5. CTA
6. accent/decorative element

Use:

- line reveal
- clip-path
- stagger
- scale
- subtle background transition

The CTA should visually conclude the page.

---

# 36. NAVIGATION

Implement:

- transparent hero state
- scrolled state
- active link
- smooth active indicator
- mobile menu
- focus management
- body scroll lock for mobile menu
- Escape closes menu

Do not allow navigation motion to become distracting.

---

# 37. CUSTOM CURSOR

Desktop only.

Optional but recommended.

States:

- normal
- `VIEW PROJECT`
- `DRAG`
- `HOLD`
- `OPEN`

Requirements:

- no mobile custom cursor
- no reduced-motion cursor
- native cursor fallback
- no accessibility loss

---

# 38. MAGNETIC CTA

Desktop only.

Primary CTA can have subtle magnetic movement.

Maximum:

~6–10px.

Return smoothly to neutral.

Disable:

- touch
- reduced motion

---

# 39. BACK TO TOP

Appears after scroll.

Hover:

- arrow moves upward

Click:

- smooth scroll to top

Keyboard:

- accessible

---

# 40. PAGE TRANSITIONS

If project detail routes are implemented:

Do not hard-swap the page.

Use:

```text
project card
↓
project expands
↓
visual transition
↓
case study
```

Case study sequence should follow the existing architecture:

- hero media
- summary strip
- problem
- solution
- key screens
- technical notes
- result
- next project

Do not invent unsupported results/metrics.

---

# 41. GLOBAL SYMMETRY / LAYOUT FIX

This is a major pending task.

Audit every section against the same master grid.

Desktop:

- 12 columns

Tablet:

- 6 columns

Mobile:

- 1-column primary content flow

Check:

- left edge alignment
- right edge alignment
- heading width
- card width
- gutter consistency
- section padding
- visual center
- baseline alignment

No random one-off margins.

---

# 42. SPACING AUDIT

Use the existing spacing system.

Do not randomly introduce:

- 17px
- 23px
- 37px
- 51px
- 67px

unless mathematically/optically justified and documented.

Fix:

- inconsistent section gaps
- inconsistent card padding
- inconsistent heading gaps
- inconsistent CTA spacing
- inconsistent grid gutters

---

# 43. TYPOGRAPHY AUDIT

Check:

- hero scale
- heading line-height
- body measure
- metadata size
- nav size
- button typography
- letter spacing

No arbitrary font sizes.

No text smaller than the existing minimum token.

---

# 44. RESPONSIVE WORK

Test:

- 1440px
- 1280px
- 1024px
- 768px
- 640px
- 390px
- 375px

Check:

- no overflow
- no clipped text
- no broken stack
- no broken marquee
- no pinned-section issues
- no overlapping cards
- no oversized hero
- no unusable CTA

---

# 45. MOBILE MOTION

Mobile must NOT be a shrunken desktop animation.

Disable/reduce:

- custom cursor
- magnetic buttons
- 3D tilt
- heavy parallax
- complicated pinning

Keep:

- kinetic text
- clip reveals
- project stack
- swipe
- marquee
- FAQ motion
- CTA reveal

---

# 46. ACCESSIBILITY

Verify:

- keyboard navigation
- focus-visible
- skip link
- semantic headings
- button vs link semantics
- project interaction keyboard alternative
- mobile menu focus trap
- Escape behavior
- reduced motion
- sufficient contrast
- 44px touch targets
- accessible project names
- accessible image alt text
- form labels/errors

---

# 47. PROJECT ACCESSIBILITY

For project stack:

- active project must be identifiable
- project navigation must be keyboard reachable
- Enter/Space opens
- arrows can move between projects if implemented
- Escape closes expanded preview
- focus ring remains visible
- reduced motion simplifies transitions

---

# 48. FORM — FINAL CHECK

Fields must match the approved project inquiry requirements.

Verify:

- required fields
- project type
- timeline
- budget
- description
- validation
- loading state
- success state
- error state
- accessible error messages
- submission behavior
- CTA text

Primary CTA:

`Start a Conversation`

Do not expose private pricing.

---

# 49. CONTENT INTEGRITY

Before final build:

- remove placeholder copy
- remove fake metrics
- remove fake testimonials
- remove fake client names
- remove invented technologies
- verify project links
- verify team information
- verify contact details
- verify service descriptions
- verify project descriptions

Content must remain consistent with `details.md` and `structure.md`.

---

# 50. PROJECT MEDIA

For every project verify:

- correct image/screenshot
- correct aspect ratio
- correct alt text
- optimized file size
- no broken URL
- no stretched image
- no misleading representation

Project media should distinguish:

- app
- web app
- AI product
- software system

---

# 51. PERFORMANCE

Audit:

- image sizes
- lazy loading
- code splitting where useful
- GSAP lifecycle cleanup
- ScrollTrigger cleanup
- event listener cleanup
- Lenis lifecycle
- animation memory leaks
- unnecessary rerenders
- large video usage

Avoid:

- animating layout properties
- unnecessary DOM duplication
- huge unoptimized images
- excessive continuous animations

---

# 52. GSAP ARCHITECTURE

Centralize reusable animation logic.

Recommended structure:

```text
src/
  animations/
    config
    reveal
    textReveal
    marquee
    hero
    projects
    parallax
    process
    pageTransition
```

Use reusable functions/components.

Do not scatter large animation timelines throughout random components.

---

# 53. GSAP CONTEXT / CLEANUP

Every component with GSAP/ScrollTrigger must clean up correctly.

Verify:

- route changes
- component unmount
- responsive breakpoint changes
- StrictMode behavior
- duplicated timelines
- duplicated ScrollTriggers

No memory leaks.

---

# 54. LENIS

Verify:

- smooth scroll works
- ScrollTrigger sync works
- anchor navigation works
- mobile behavior is acceptable
- reduced motion disables/simplifies it
- no scroll locking bugs

Do not make scrolling feel slow.

---

# 55. ANIMATION QUALITY RULE

Do NOT use:

```text
fade-up
fade-up
fade-up
fade-up
fade-up
```

for the whole website.

Use different motion languages:

| Section           | Motion                                   |
| ----------------- | ---------------------------------------- |
| Hero              | kinetic typography + visual construction |
| Marquee           | continuous horizontal                    |
| Projects          | stacked cards + fan-out                  |
| Services          | row reveal/expansion                     |
| Business showcase | scale + clip + parallax                  |
| Process           | scroll progress                          |
| Capabilities      | staggered grid                           |
| Team              | tactile hover                            |
| FAQ               | accordion                                |
| CTA               | cinematic text reveal                    |

---

# 56. MOTION TIMING SYSTEM

Use the existing tokens as the base.

For advanced motion, tune within a controlled system:

- micro: 100–180ms
- UI: 220–350ms
- content: 350–600ms
- major transition: 600–1000ms
- cinematic: 900–1400ms
- hold interaction: ~1000–1500ms

Avoid arbitrary timing everywhere.

---

# 57. MOTION HIERARCHY

Highest motion:

1. Hero
2. Projects
3. Business Website showcase
4. Process
5. CTA

Medium:

6. Services
7. Capabilities
8. Team

Subtle:

9. Industries
10. FAQ
11. Footer

---

# 58. STILLNESS IS REQUIRED

Do not keep every element moving continuously.

Use:

```text
MOTION
↓
REST
↓
MOTION
↓
REST
```

Stillness creates emphasis.

---

# 59. SECTION TRANSITIONS

Add controlled visual transitions between major sections.

Possible patterns:

- dark panel expands
- project visual grows
- typography moves into next section
- background surface transitions
- marquee bridges sections

Use sparingly.

Do not make every section transition cinematic.

---

# 60. FINAL QA — DESKTOP

Test manually at:

- 1440
- 1280
- 1024

Verify:

- grid
- symmetry
- spacing
- hero balance
- project stack
- scroll behavior
- hover
- hold
- drag
- navigation
- CTA
- footer

---

# 61. FINAL QA — MOBILE

Test:

- 390
- 375

Verify:

- menu
- hero
- headline
- visual
- marquee
- projects
- swipe
- services
- process
- team
- FAQ
- form
- CTA
- footer

No horizontal scrolling.

---

# 62. FINAL QA — ACCESSIBILITY

Run through:

- keyboard only
- screen-reader semantics where applicable
- focus visibility
- reduced motion
- touch targets
- contrast
- error states
- form labels

---

# 63. FINAL QA — BROWSER

Test:

- Chrome
- Edge
- Firefox
- Safari if available

Check:

- animation timing
- clip-path
- SVG animation
- sticky/pinned sections
- touch
- smooth scroll
- responsive behavior

---

# 64. FINAL QA — BUILD

Run:

```bash
npm install
npm run build
npm run preview
```

There must be:

- no build errors
- no runtime errors
- no console errors caused by the implementation
- no missing imports
- no broken routes
- no broken assets

---

# 65. FINAL ACCEPTANCE CHECKLIST

## Homepage

- [ ] loader/entrance
- [ ] kinetic headline
- [ ] masked text reveal
- [ ] hero visual construction
- [ ] SVG/data-line animation
- [ ] hero parallax
- [ ] hero symmetry
- [ ] CTA interaction
- [ ] hero-to-marquee transition

## Marquee

- [ ] infinite
- [ ] seamless
- [ ] responsive
- [ ] reduced motion

## Projects

- [ ] stacked-card composition
- [ ] active card dominance
- [ ] card depth
- [ ] fan-out
- [ ] sequential reveal
- [ ] project scroll progression
- [ ] project number animation
- [ ] title animation
- [ ] metadata stagger
- [ ] image clip reveal
- [ ] internal product animation
- [ ] pointer parallax
- [ ] hold interaction
- [ ] keyboard alternative
- [ ] mobile swipe
- [ ] project detail navigation

## Services

- [ ] stacked rows
- [ ] hover
- [ ] focus
- [ ] expansion
- [ ] responsive behavior

## Business Website

- [ ] browser mockup
- [ ] entrance animation
- [ ] internal UI motion
- [ ] parallax
- [ ] balanced composition

## Process

- [ ] central axis
- [ ] alternating cards
- [ ] scroll progress
- [ ] active step
- [ ] completed state
- [ ] mobile version

## Capabilities

- [ ] grouped grid
- [ ] stagger
- [ ] hover
- [ ] responsive

## Team

- [ ] consistent cards
- [ ] hover
- [ ] social links
- [ ] responsive

## FAQ

- [ ] accordion
- [ ] animation
- [ ] keyboard
- [ ] accessibility

## CTA

- [ ] cinematic reveal
- [ ] headline animation
- [ ] CTA interaction
- [ ] responsive

## Footer

- [ ] grid alignment
- [ ] links
- [ ] contact
- [ ] social links
- [ ] back to top

---

# 66. DEFINITION OF DONE

The website is NOT complete when:

- GSAP is installed
- animations technically run
- cards fade in
- the page is responsive

The website is complete only when:

### VISUAL

- [ ] every major section belongs to the same design system
- [ ] grid alignment is consistent
- [ ] symmetry/optical balance is strong
- [ ] whitespace is intentional
- [ ] typography hierarchy is clear
- [ ] no section feels accidentally empty
- [ ] no section feels overcrowded

### MOTION

- [ ] homepage behaves like a motion-design composition
- [ ] projects behave like a stacked motion showcase
- [ ] motion has hierarchy
- [ ] transitions are choreographed
- [ ] no generic fade-everything approach
- [ ] interaction has meaningful feedback
- [ ] motion does not reduce usability

### UX

- [ ] navigation works
- [ ] projects work
- [ ] contact works
- [ ] mobile works
- [ ] keyboard works
- [ ] reduced motion works

### TECHNICAL

- [ ] production build passes
- [ ] no runtime errors
- [ ] no broken assets
- [ ] no horizontal overflow
- [ ] no obvious performance problems
- [ ] GSAP/ScrollTrigger cleaned up correctly
- [ ] responsive breakpoints tested

---

# 67. TOMORROW'S IMPLEMENTATION ORDER

Use this exact order to avoid wasting time.

## PHASE 1 — FIX THE FOUNDATION

1. Inspect current implementation.
2. Preserve existing content.
3. Confirm master grid.
4. Confirm container.
5. Confirm spacing.
6. Fix obvious symmetry/alignment issues.

## PHASE 2 — BUILD HOMEPAGE MOTION

7. Hero timeline.
8. Kinetic typography.
9. Hero visual construction.
10. Hero parallax.
11. Hero-to-marquee transition.
12. Marquee.

## PHASE 3 — BUILD PROJECT MOTION

13. Replace static project presentation.
14. Build stacked cards.
15. Build card depth.
16. Build fan-out.
17. Build project transitions.
18. Build project metadata transitions.
19. Build image transitions.
20. Add scroll progression.
21. Add hold interaction.
22. Add keyboard support.
23. Add mobile swipe.

## PHASE 4 — SECONDARY MOTION

24. Services.
25. Business website showcase.
26. Process.
27. Capabilities.
28. Team.
29. FAQ.
30. CTA.

## PHASE 5 — POLISH

31. Navigation.
32. Cursor.
33. Magnetic CTA.
34. Section transitions.
35. Back to top.
36. Microinteractions.

## PHASE 6 — QUALITY

37. Responsive audit.
38. Accessibility audit.
39. Reduced-motion audit.
40. Performance audit.
41. Build.
42. Runtime/console audit.
43. Final visual review.

---

# 68. DO NOT DO TOMORROW

Do NOT:

- rebuild the project from zero
- replace React/Vite
- replace the existing content system
- invent new projects
- invent client testimonials
- invent metrics
- add random gradients
- add random 3D effects
- add excessive particles
- add animation to every element
- use a generic template
- make every section a card grid
- make every animation a fade-up
- break the existing accessibility rules
- create desktop-only interactions without mobile alternatives

---

# 69. FINAL TARGET

The finished Cortex website should feel like:

> **A premium interactive digital technology studio.**

The experience should communicate:

```text
IDEA
  ↓
DESIGN
  ↓
ENGINEERING
  ↓
INTELLIGENCE
  ↓
PRODUCT
  ↓
RESULT
```

The homepage should feel like a motion-design composition.

The Projects section should feel like an interactive motion showreel.

The entire site should maintain:

```text
SYMMETRY
+
GRID
+
TYPOGRAPHY
+
MOTION
+
INTERACTION
+
VISUAL STORYTELLING
+
PERFORMANCE
```

**Final quality bar:**

> Do not ask whether the website has animations.
>
> Ask whether the animation, composition, and interaction make Cortex feel like a real creative technology studio.
> s
