# Cortex Freelancing --- Website Structure & Implementation Brief

## 01. Purpose

This document defines the complete website structure for **Cortex
Freelancing**.

It answers:

- What pages/sections the website has
- What content appears in each section
- What order sections appear in
- What each section is supposed to achieve
- What actions visitors can take
- How projects are presented
- How the inquiry flow works
- How the site behaves responsively
- What the implementation hierarchy should look like

This document must be used together with:

1.  `design-system-cortex-skill.md` --- visual system and interaction
    rules
2.  `cortex-portfolio-details-final.md` --- Cortex business, team,
    services, projects, contact and content source of truth

The implementation must not invent business information that is not
present in the source files.

---

# 02. Website Type

## Primary

**Freelance technology studio / digital solutions marketing website**

## Primary objective

Convert visitors into project inquiries while demonstrating that Cortex
can build:

- Business websites
- Web applications
- AI/ML solutions
- Software
- Automation systems
- UI/UX experiences
- Data solutions
- Security-focused solutions

## Secondary objectives

- Establish Cortex credibility
- Showcase real work
- Explain the development process
- Introduce the team
- Make contacting Cortex easy
- Communicate the 3-week standard target for appropriate projects
- Explain that pricing is discussed privately

---

# 03. Global Navigation

Desktop navigation:

```text
CORTEX

Work
Services
Process
About
Team

[ Start a Project ]
```

Recommended navigation behavior:

- Logo → Home
- Work → Our Work section
- Services → Services section
- Process → Process section
- About → About section
- Team → Team section
- Start a Project → Contact / project inquiry section

The navigation should remain concise.

Mobile navigation:

```text
CORTEX                              [Menu]

Menu opened:

Work
Services
Process
About
Team
Start a Project
```

The mobile menu must provide an accessible close action.

---

# 04. Homepage Structure

The homepage should follow this exact narrative:

```text
1. Navigation
2. Hero
3. Trust / capability strip
4. Selected Work
5. Services
6. Capabilities
7. Process
8. Why Cortex
9. Industries
10. About Cortex
11. Team
12. FAQ
13. Contact / Start a Project
14. Footer
```

The page should progressively answer:

```text
WHO ARE YOU?
        ↓
WHAT DO YOU BUILD?
        ↓
WHAT HAVE YOU BUILT?
        ↓
HOW CAN YOU HELP ME?
        ↓
HOW DO YOU WORK?
        ↓
WHY SHOULD I TRUST YOU?
        ↓
WHO IS BEHIND CORTEX?
        ↓
HOW DO I START?
```

---

# 05. Hero Section

## Goal

Immediately communicate Cortex's purpose.

### Eyebrow

```text
CORTEX FREELANCING
```

### Main headline

```text
Turning Ideas Into
Digital Solutions.
```

### Supporting text

```text
Websites, applications, AI/ML systems,
automation, software, and digital experiences
built around your actual requirements.
```

### Primary CTA

```text
Start Your Project →
```

### Secondary CTA

```text
View Our Work
```

### Supporting capability line

```text
WEB • AI/ML • SOFTWARE • AUTOMATION • DESIGN
```

Cybersecurity and Data & Analytics can appear in the broader Services
section rather than making the hero overcrowded.

## Hero visual

The visual should communicate:

- technology
- building
- systems
- digital products
- Cortex identity

Avoid generic stock-business imagery.

Use project UI, abstract system visuals, product fragments, or an
art-directed Cortex visual.

---

# 06. Trust / Capability Strip

Immediately below the hero, use a compact credibility/capability strip.

Possible content:

```text
WEB DEVELOPMENT
AI / ML
SOFTWARE
AUTOMATION
UI / UX
CYBERSECURITY
DATA & ANALYTICS
```

This is not a logo wall.

Its purpose is to quickly establish the range of Cortex's work.

---

# 07. Selected Work

## Heading

```text
Selected Work
```

### Supporting copy

```text
Real projects across web development,
AI, applications, and intelligent digital systems.
```

## Project order

### 01 --- KrishiGrahan

Featured project.

Category:

```text
AI / ML · Web Application · Agriculture
```

Live:

```text
https://krishigrahan-857872478296.asia-south1.run.app
```

Card description:

```text
An intelligent agricultural platform combining
machine learning and computer vision.
```

CTA:

```text
View Project →
```

---

### 02 --- Cortex P2P

Category:

```text
Application · Digital Product · Frontend
```

Description:

```text
A peer-to-peer digital product focused on
modern interaction and practical application design.
```

CTA:

```text
View Project →
```

Because P2P is an app, the UI must not falsely represent it as a
conventional website.

---

### 03 --- Moodify

Category:

```text
Web Application · AI · Music
```

Live:

```text
https://moodify-nu-henna.vercel.app/
```

Description:

```text
A personalized music experience combining
modern product design with recommendation technology.
```

CTA:

```text
View Project →
```

---

### 04 --- VivaAI

Category:

```text
AI · Web Application · Education
```

Live:

```text
https://ai-viva-system.vercel.app/
```

Description:

```text
An intelligent examination platform combining
AI evaluation, voice interaction, and automated proctoring.
```

CTA:

```text
View Project →
```

## Work layout

Desktop:

```text
┌───────────────────────────────────────────────┐
│                                               │
│                 KRISHIGRAHAN                  │
│              FEATURED PROJECT                 │
│                                               │
└───────────────────────────────────────────────┘

┌───────────────────────┐  ┌───────────────────────┐
│                       │  │                       │
│      CORTEX P2P       │  │       MOODIFY         │
│                       │  │                       │
└───────────────────────┘  └───────────────────────┘

┌───────────────────────────────────────────────┐
│                    VIVAAI                     │
└───────────────────────────────────────────────┘
```

Mobile:

```text
KRISHIGRAHAN
↓
CORTEX P2P
↓
MOODIFY
↓
VIVAAI
```

The Work section must feel editorial rather than like a generic 4-column
card grid.

---

# 08. Services

## Heading

```text
What We Build
```

## Intro

```text
From business websites to intelligent software,
we build digital solutions around the problem
you're trying to solve.
```

## Service cards

### Web Development

```text
Business websites, portfolio websites,
e-commerce, landing pages, web applications,
dashboards, APIs and database integrations.
```

CTA:

```text
Build a Website →
```

### AI & Machine Learning

```text
AI applications, ML models, generative AI,
chatbots, recommendation systems, computer vision,
NLP and predictive analytics.
```

### Software Development

```text
Custom software, SaaS solutions,
management systems, business applications,
APIs and cloud applications.
```

### Automation & Business Solutions

```text
Workflow automation, AI automation,
data automation, CRM automation,
reporting and internal tools.
```

### Cybersecurity

```text
Security assessment, web security,
vulnerability assessment, secure development
and security testing.
```

### UI/UX & Digital Design

```text
UI/UX, website design, app interfaces,
branding, presentations and digital creatives.
```

### Data & Analytics

```text
Data analysis, visualization, dashboards,
data processing, reporting and business intelligence.
```

## Layout

Desktop:

```text
01 Web Development
02 AI / ML
03 Software Development

04 Automation
05 Cybersecurity
06 UI/UX & Design

07 Data & Analytics
```

Mobile: single-column or two-column depending on viewport.

---

# 09. Business Website Subsection

Because Business Website Development is an important freelance offering,
it should receive additional emphasis inside Web Development.

## Heading

```text
Need a Website for Your Business?
```

## Copy

```text
We build responsive, modern websites for
startups, restaurants, cafés, hospitality,
retail, professional services, personal brands,
and growing businesses.
```

## Deliverables

```text
Responsive Design
Business Pages
Landing Pages
Contact Forms
Menus / Galleries
Booking or Request Flows
Basic SEO
Deployment
Maintenance
```

## CTA

```text
Build My Website →
```

This section should not claim that the selected portfolio projects are
all business websites.

---

# 10. Capabilities

## Heading

```text
Built With Modern Technology
```

The capability section should group technologies rather than displaying
an enormous logo wall.

### AI / ML

Python\
TensorFlow\
PyTorch\
Scikit-learn\
OpenAI APIs\
Generative AI

### Frontend

HTML\
CSS\
JavaScript\
React\
Next.js

### Backend

Node.js\
Python\
FastAPI\
Django\
REST APIs

### Database

MySQL\
PostgreSQL\
MongoDB\
Firebase

### Cloud & DevOps

AWS\
Google Cloud\
Docker\
GitHub\
CI/CD

### Design

Figma\
Adobe Tools\
UI/UX Systems

Technology must remain secondary to outcomes.

---

# 11. Process

## Heading

```text
From Idea to Launch
```

### 01 --- Requirements

Understand:

- business
- audience
- goals
- requirements
- references
- desired functionality

### 02 --- Finalization

Finalize:

- scope
- features
- content
- visual direction
- deliverables
- expectations

### 03 --- Design

Create and finalize the UI/UX direction.

### 04 --- Development

Build the agreed solution.

### 05 --- Testing

Validate:

- functionality
- responsiveness
- usability
- performance
- compatibility
- agreed requirements

### 06 --- Deployment

Deploy the completed product.

### 07 --- Handover

Deliver the completed project and agreed project materials/access.

### 08 --- Support

Provide maintenance, updates and improvements when agreed.

---

# 12. Timeline

## Heading

```text
Typical Delivery
```

### Standard target

```text
~ 3 Weeks
```

### Timeline visualization

```text
WEEK 01
Requirements
Finalization
Design
Setup

        ↓

WEEK 02
Development
Integrations
Responsive Implementation

        ↓

WEEK 03
Testing
Refinement
Deployment
Handover
```

## Important note

The 3-week target applies to projects with an agreed scope and timely
client feedback.

The final timeline may change based on:

- project complexity
- number of features
- integrations
- content availability
- client feedback
- scope changes

---

# 13. Why Cortex

## Heading

```text
Why Work With Cortex?
```

Six cards:

### Business First

We focus on the business problem behind the technology.

### Modern Technology

We use current technologies and development practices.

### Customized Solutions

Every project is designed around the client's requirements.

### Quality Focused

Testing, performance, security and usability are considered throughout
development.

### Transparent Process

Clear communication about scope, progress and deliverables.

### Long-Term Support

Maintenance and improvements can continue after delivery.

---

# 14. Industries

## Heading

```text
Built For Different Kinds of Businesses
```

Use a compact visual list:

```text
Startups
Small & Medium Businesses
Restaurants & Hospitality
Education
Healthcare
Retail & E-commerce
Finance & FinTech
Real Estate
Technology Companies
Professional Services
Research & Innovation
Personal Brands
```

Avoid creating 12 large cards.

The section should remain compact.

---

# 15. Client Solution Paths

Use four visual paths.

### Startups

```text
Idea
→ MVP
→ Product
→ Launch
```

### Businesses

```text
Problem
→ Digital Solution
→ Automation
→ Growth
```

### Organizations

```text
Requirements
→ Custom Software
→ Deployment
→ Support
```

### Individuals

```text
Concept
→ Design
→ Development
→ Professional Digital Presence
```

---

# 16. About Cortex

## Heading

```text
A Small Team Building Real Digital Products.
```

## Copy

```text
Cortex Freelancing is a technology-driven
freelance and digital solutions division focused
on software, AI, automation, design and digital services.

We combine technology, creative thinking and practical
business solutions to turn requirements into working
digital products.
```

## Supporting identity

```text
Cortex Freelancing
A Division of Cortex Intelligence and Technologies
Ahmedabad, Gujarat, India
```

Keep this section human and concise.

---

# 17. Team

## Heading

```text
Meet Cortex
```

### Saud Rana

```text
Designer & SEO Manager
```

GitHub:

https://github.com/saudrana

### Ronak Solanki

```text
Developer
```

GitHub:

https://github.com/ronak6609-ops

### Huzaifa Lokhandwala

```text
Head & UI/UX Designer
```

GitHub:

https://github.com/huzaifalokhandwala0307

## Team card behavior

Each card should support:

- profile image
- name
- role
- GitHub
- optional social links

If photos are not supplied, use a clean initials fallback.

---

# 18. FAQ

## Heading

```text
Frequently Asked Questions
```

Questions:

### What services does Cortex provide?

Web development, AI/ML, software development, automation, cybersecurity,
UI/UX and digital design, and data/analytics.

### How long does a typical project take?

The standard target is approximately 3 weeks for an agreed project.
Complex projects may require a different timeline.

### How much does a project cost?

Pricing is discussed privately based on requirements, scope and
complexity.

### Do you build websites for small businesses?

Yes. Cortex builds websites for startups, SMBs, restaurants, cafés,
hospitality, retail, professional services and other businesses.

### Can you build custom web applications?

Yes.

### Can you integrate AI into an existing application?

Yes, when the requirement is appropriate for AI/ML integration.

### Can you work on an existing website?

Yes. Cortex can support improvements, redesign, integrations,
maintenance and additional functionality.

### Do you provide deployment?

Yes, when deployment is included in the agreed scope.

### Do you provide maintenance?

Yes. Post-delivery maintenance and improvements can be discussed.

### What happens after I submit an inquiry?

The Cortex team reviews the requirements and contacts the client to
clarify the project and discuss the next steps.

---

# 19. Contact / Start a Project

## Heading

```text
Have an Idea?
We Can Build It.
```

## Supporting text

```text
Tell us what you're trying to build.
We'll review your requirements and discuss
the best way to turn the idea into a working solution.
```

## Form

### Contact information

```text
Name *
Email *
Phone / WhatsApp
Company / Business
```

### Project information

```text
Project Type *
What do you want to build? *
Current Website / App URL
Preferred Timeline
Budget Range
Additional Requirements
```

### Project type

```text
Business Website
Portfolio Website
E-commerce
Web Application
Mobile Application
AI / ML Solution
Automation
Custom Software
UI/UX Design
Other
```

### Pricing

Do not show fixed public prices.

Use:

```text
Pricing discussed based on requirements.
```

### Submit

```text
Start a Conversation →
```

## Success state

```text
Thanks!

We've received your project details.
The Cortex team will review your requirements
and get back to you.
```

## Error state

```text
Something went wrong.

Please try again or contact
hackathoncortex@gmail.com directly.
```

---

# 20. Contact Details

Primary:

```text
hackathoncortex@gmail.com
```

Phone:

```text
9428622853
9313198689
```

GitHub:

```text
https://github.com/hackathon-cortex
```

Location:

```text
Ahmedabad, Gujarat, India
```

---

# 21. Footer

Footer structure:

```text
┌──────────────────────────────────────────────┐
│ CORTEX                                       │
│ Turning Ideas Into Digital Solutions.        │
│                                              │
│ Work       Services      Process             │
│ About      Team          Contact             │
│                                              │
│ hackathoncortex@gmail.com                    │
│ Ahmedabad, Gujarat, India                    │
│                                              │
│ GitHub                                       │
│                                              │
│ Cortex Freelancing                           │
│ A Division of Cortex Intelligence            │
│ and Technologies                             │
└──────────────────────────────────────────────┘
```

Copyright can be added at the bottom.

---

# 22. Optional Project Detail Pages

The initial release can remain a single-page website.

However, the architecture should support future project detail routes:

```text
/work
/work/krishigrahan
/work/cortex-p2p
/work/moodify
/work/vivaai
```

Each case study can contain:

```text
Project Hero
Problem
Objective
Solution
Features
Technology
Screenshots
Development Process
Outcome
Live Project
GitHub
Back to Work
```

Only create these pages when sufficient project-specific information is
available.

---

# 23. Suggested URL Structure

If implemented as a single-page site:

```text
/
#work
#services
#process
#about
#team
#faq
#contact
```

Future routes:

```text
/work
/work/krishigrahan
/work/cortex-p2p
/work/moodify
/work/vivaai
```

---

# 24. Interaction Rules

## Navigation

Clicking a navigation item should smoothly scroll to the corresponding
section when on the homepage.

Keyboard navigation must remain native and accessible.

## Project cards

The entire project card may be clickable if the destination is
unambiguous.

The card must still expose a descriptive accessible name.

## Service cards

Services may reveal more information on hover/focus, but important
information must not exist only inside hover states.

## FAQ

FAQ items should use an accessible disclosure/accordion pattern.

Keyboard:

- Enter/Space toggles.
- Focus must remain visible.
- Open/closed state must be announced appropriately.

## Contact form

Submission must show a loading state.

The form must preserve values if submission fails.

---

# 25. Responsive Structure

## Desktop

```text
Navigation
Hero
Capability strip
Editorial Work
Services grid
Capabilities
Process timeline
Why Cortex
Industries
Client solution paths
About
Team
FAQ
Contact
Footer
```

## Tablet

- Reduce grid columns.
- Reduce visual density.
- Preserve project hierarchy.
- Keep CTA visibility.

## Mobile

```text
Compact Navigation
Hero
Capabilities
Work
Services
Capabilities
Process
Why Cortex
Industries
About
Team
FAQ
Contact
Footer
```

Mobile must:

- have no horizontal overflow
- keep buttons easy to tap
- preserve project images
- allow headings to wrap
- keep the contact CTA visible
- avoid excessive animation

---

# 26. SEO Structure

The initial page should include:

### Title

```text
Cortex Freelancing — Websites, AI, Software & Digital Solutions
```

### Meta description

```text
Cortex Freelancing builds business websites, web applications,
AI/ML solutions, software, automation systems and digital experiences
tailored to your requirements.
```

### Suggested Open Graph title

```text
Cortex Freelancing — Turning Ideas Into Digital Solutions.
```

### Open Graph image

Use a dedicated Cortex social preview asset.

### Semantic structure

Use:

```text
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Do not use headings purely for visual sizing.

---

# 27. Performance Requirements

The website should:

- optimize project images
- lazy-load below-the-fold media
- reserve image dimensions
- minimize layout shift
- avoid unnecessary JavaScript
- keep animations lightweight
- optimize fonts
- avoid huge background videos
- load the hero quickly

The initial viewport should prioritize speed.

---

# 28. Analytics

Analytics can be added later.

If analytics are implemented, track meaningful actions such as:

```text
Project CTA click
Contact form start
Contact form submission
Project link click
GitHub click
Service interaction
```

Do not add analytics until the required privacy/consent approach is
decided.

---

# 29. Implementation Component Tree

```text
App
│
├── Navigation
│
├── Main
│   │
│   ├── HeroSection
│   ├── CapabilityStrip
│   ├── WorkSection
│   │   ├── FeaturedProject
│   │   └── ProjectCard
│   │
│   ├── ServicesSection
│   │   └── ServiceCard
│   │
│   ├── BusinessWebsiteSection
│   │
│   ├── CapabilitiesSection
│   │
│   ├── ProcessSection
│   │   └── ProcessStep
│   │
│   ├── WhyCortexSection
│   │   └── ValueCard
│   │
│   ├── IndustriesSection
│   │
│   ├── ClientSolutionsSection
│   │
│   ├── AboutSection
│   │
│   ├── TeamSection
│   │   └── TeamCard
│   │
│   ├── FAQSection
│   │   └── FAQItem
│   │
│   └── ContactSection
│       └── ProjectInquiryForm
│
└── Footer
```

---

# 30. Shared UI Primitives

The implementation should create reusable primitives:

```text
Container
Section
SectionHeader
Button
Link
Card
Tag
Badge
IconButton
Input
Textarea
Select
Checkbox
Accordion
ProjectCard
TeamCard
ServiceCard
Skeleton
Toast
StatusMessage
```

All primitives must follow `design-system-cortex-skill.md`.

---

# 31. Content Hierarchy

The homepage should maintain this hierarchy:

```text
LEVEL 1
Cortex identity
What Cortex does

LEVEL 2
Selected work
Services
CTA

LEVEL 3
Process
Capabilities
Why Cortex
Industries

LEVEL 4
Team
FAQ
Detailed technical information
```

Do not allow technology lists to visually overpower the actual projects.

---

# 32. Conversion Strategy

The site should contain repeated but non-annoying CTAs.

Recommended CTA placements:

### Hero

`Start Your Project`

### After Work

`Have a similar project? Let's talk.`

### After Services

`Discuss Your Requirements`

### After Process

`Start a Project`

### Final CTA

`Start a Conversation`

The same CTA should not appear with five different labels unless the
context genuinely requires it.

---

# 33. Empty / Failure States

## No project

Show an intentional message rather than an empty grid.

## Project image failure

Show project title, category and fallback visual.

## Contact form failure

Preserve entered data and provide direct email contact.

## Missing team photo

Use initials fallback.

## Missing GitHub

Do not render an empty social icon.

## Missing project URL

Use a case-study/detail action instead of a broken link.

---

# 34. Content Integrity Rules

The implementation must use the exact confirmed:

```text
Brand: Cortex Freelancing
Parent: Cortex Intelligence and Technologies

Team:
Saud Rana
Ronak Solanki
Huzaifa Lokhandwala

Email:
hackathoncortex@gmail.com

Phone:
9428622853
9313198689
```

The implementation must not invent:

- client names
- testimonials
- revenue
- user numbers
- project results
- certifications
- experience years
- awards
- client logos
- pricing
- project features that have not been confirmed

---

# 35. Final Website Map

```text
/
│
├── HERO
│   ├── Cortex
│   ├── Turning Ideas Into Digital Solutions
│   ├── Start Your Project
│   └── View Our Work
│
├── CAPABILITY STRIP
│
├── WORK
│   ├── KrishiGrahan
│   ├── Cortex P2P
│   ├── Moodify
│   └── VivaAI
│
├── SERVICES
│   ├── Web Development
│   ├── AI / ML
│   ├── Software
│   ├── Automation
│   ├── Cybersecurity
│   ├── UI/UX
│   └── Data & Analytics
│
├── BUSINESS WEBSITE
│
├── CAPABILITIES
│
├── PROCESS
│   ├── Requirements
│   ├── Finalization
│   ├── Design
│   ├── Development
│   ├── Testing
│   ├── Deployment
│   ├── Handover
│   └── Support
│
├── TIMELINE
│   └── Approximately 3 Weeks
│
├── WHY CORTEX
│
├── INDUSTRIES
│
├── CLIENT SOLUTIONS
│
├── ABOUT
│
├── TEAM
│   ├── Saud
│   ├── Ronak
│   └── Huzaifa
│
├── FAQ
│
├── CONTACT
│   └── Project Inquiry Form
│
└── FOOTER
```

---

# 36. Implementation Priority

Build in this order:

### Phase 1 --- Foundation

1.  Global tokens
2.  Fonts
3.  Container
4.  Navigation
5.  Buttons
6.  Responsive grid

### Phase 2 --- Core conversion experience

7.  Hero
8.  Work
9.  Services
10. Business Website section
11. Contact CTA

### Phase 3 --- Trust

12. Process
13. Timeline
14. Why Cortex
15. Capabilities
16. Industries
17. Team

### Phase 4 --- Supporting content

18. About
19. Client solutions
20. FAQ
21. Footer

### Phase 5 --- Polish

22. Responsive refinement
23. Accessibility
24. Motion
25. Image optimization
26. SEO
27. Form validation
28. Performance testing

---

# 37. Final Implementation Rule

The Cortex website must feel like a **real technology studio that can
win freelance projects**, not a student resume website.

The implementation should prioritize:

**Work → Clarity → Trust → Conversion**

The design system controls the visual language.

The portfolio details control the business/content truth.

This structure controls the actual website experience.

All three must work together without inventing information.
