# Project Notes — Freedom & Fairness for Northern Cyprus

---

## 0. CLIENT BRIEF — Paragon Strategy (AUTHORITATIVE SOURCE)

**Client:** Freedom and Fairness for Northern Cyprus
**Project:** Email Your MP — Campaign Page
**Prepared by:** Paragon Strategy

### Page Structure (exact spec)
Only three sections on the page: Hero, explanation text, and the MP finder tool. All SEND consultation content must be removed entirely.

**Hero headline:** "Support the campaign for freedom and fairness for Turkish Cypriots."
**Subheadline:** "Email your MP and urge them to meet with our campaign representatives and support our call to end the isolation."
**Explanation text:** "Use our 'Find Your MP' tool to find your local MP and email them, calling on them to meet with the campaign and support action to end the isolation of Turkish Cypriots. Your message will help show that people across the UK want fairness, equality, direct trade, direct travel and proper representation for Northern Cyprus."

### Pre-drafted Email (exact text, single template — no variants)
```
Dear [MP Name],

As a Guarantor Power, the UK has a key role in ensuring Turkish Cypriots are treated as equals on the world stage — just as their Greek Cypriot neighbours are.

Recognising Northern Cyprus as a sovereign state would bring an end to decades of unfair isolation, enabling direct trade, travel, and representation. This is not just a matter of diplomacy — it is a matter of basic fairness and equality.

For too long, Turkish Cypriots have faced embargoes and restrictions that no one should endure. It is time to restore their rightful place in the world.

I urge you to meet with the Freedom and Fairness for Northern Cyprus campaign and support our call to end the isolation.

Yours sincerely,
[FirstName Lastname]
Your Constituent in [Constituency]
[Address]
[Postcode]
```

**Email subject:** "Please support freedom and fairness for Turkish Cypriots." (TBC — client to confirm)

### Tool Copy Changes
- Label: 'Email Your MP' (not 'SEND Your Say')
- Instruction text: "Please complete your details. We have included some email text but you can amend this in your email client before sending."

### Data Collection (Google Sheets)
Fields to log on each submission: first name, last name, email address, postcode.
Data logged automatically to a Google Sheet shared with client.
Implementation: Google Apps Script web app (deployed endpoint), called on send-button click.
Requires: `VITE_SHEETS_ENDPOINT` env variable set to deployed Apps Script URL.

### Branding
- Visual identity from freedom-and-fairness.org (colour palette, typography, logo, layout)
- Visible link back to main Freedom and Fairness site
- Footer reflects FF site footer, not SENDYourSay footer

### What to REMOVE vs SENDYourSay
- Remove: ConsultationProcess, WhySupportUs, Quote, KeyFacts strip
- Remove: Multiple letter variants (parent, professional, general)
- Remove: Letter type selector radio buttons
- Keep: 3-step flow (postcode → MP → email), progress indicator, Gmail/Outlook/mailto buttons

---

## 1. SENDYourSay Project Summary

### Overview
SENDYourSay is a neutral 'Contact Your MP' campaign platform built in response to the UK Government's SEND (Special Educational Needs and Disabilities) system consultation (closes 18 May). It was originally scoped as a Witherslack-branded microsite but was deliberately made brand-neutral so multiple independent SEND schools and providers could link to it without requiring a rebuild.

### Strategic Positioning (March 2026)
- Neutral branding: 'Make Your Voice Heard' / 'SENDYourSay' framing
- No heavy client branding — safe for multiple stakeholder adoption
- Avoids risk of rebuilding if additional schools join the campaign
- Hosted on standalone domain: sendyoursay.co.uk

### Core User Journey
1. User enters their postcode
2. Parliament API matches them to their correct MP
3. User selects their letter type (parent/professional/general)
4. User completes their name, email and address
5. Pre-populated email draft opens in their chosen client (Gmail / Outlook / mailto)
6. Email sent from the user's own inbox (MPs reply directly to user)

### Letter Variants
- **General constituent** — neutral, for any member of the public
- **Parent (child currently at specialist school)** — personal, focuses on impact of disruption
- **Parent (seeking specialist placement)** — focuses on access barriers and tribunal system
- **Teaching professional** — addresses complex needs from a classroom perspective

### Key Campaign Messages
- Specialist provision is a necessity, not a luxury, for children with complex SEND
- Mainstream schools cannot safely meet the needs of all children
- Children without specialist support cost taxpayers far more in the long run (£180,000+ per year in youth offending institutions)
- 97% of SEND tribunals rule in favour of families — the system needs fixing, not dismantling
- Reforms must protect specialist placement access for those with the most complex needs

### Tech Stack
- **Frontend**: React 19, React Router v7 (HashRouter)
- **Styling**: Tailwind CSS v4 (CSS custom properties, no SCSS)
- **Build tool**: Vite 7
- **Fonts**: Merriweather (serif headings), Inter (sans body) via @fontsource
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **MP Lookup**: UK Parliament Members API (`https://members-api.parliament.uk`)
- **Analytics**: Google Analytics 4 (gtag events: postcode_lookup, email_open)
- **Hosting**: Vite build, base '/'

### Design System (SENDYourSay)
- Brand/primary: `#00245D` (navy)
- Accent: `#D4A66E` (gold/tan)
- Background: `#FFFFFF` / `#F4F4F4`
- Text primary: `#1e293b` (Slate 800)
- Text secondary: `#475569` (Slate 600)
- Border subtle: `#E2E8F0`
- Border strong: `#CBD5E1`
- Serif font: Merriweather
- Sans font: Inter
- Card style: white rounded-3xl with shadow and border
- CTA buttons: brand colour, rounded-xl, bold

### Project Structure
```
src/
  App.jsx                    — HashRouter, routes (/), /about, /privacy, /cookies
  main.jsx
  index.css                  — Tailwind @theme tokens
  components/
    Header.jsx               — Sticky, logo + About nav link
    Hero.jsx                 — Campaign headline, subheading, mobile form, quote/CTA
    CampaignSteps.jsx        — 3-step orchestrator (postcode → MP → email)
    ProgressIndicator.jsx    — Visual step tracker
    EmailGenerator.jsx       — Form, letter selector, preview, send buttons
    WhySupportUs.jsx         — Long-form campaign explanation
    ConsultationProcess.jsx  — Stages I/II/III with modal detail
    Footer.jsx               — Brand, policy links
    AboutPage.jsx            — Sticky split layout, animated steps
    Privacy.jsx / Cookies.jsx
    Quote.jsx                — Pull-quote component
    MobileNav.jsx            — Exists but not integrated (mobile hamburger)
  hooks/
    useParliamentApi.js      — Parliament API postcode → MP lookup + contact email
  letters/
    index.js
    letter-parent-general.js
    letter-parent-specialist-current.js
    letter-parent-specialist-seeking.js
    letter-professional.js
    letter-public.js
  utils/
    analytics.js             — GA4 event helpers
    cn.js                    — clsx/tailwind-merge utility
```

---

## 2. Northern Cyprus Campaign Brief

### Source
freedom-and-fairness.org/write-to-your-mp (Freedom and Fairness for Northern Cyprus campaign)

### Campaign Context
The Freedom and Fairness for Northern Cyprus campaign calls on the UK Government, through its role as a Guarantor Power, to end the isolation of Turkish Cypriots. Northern Cyprus has faced international embargoes and restrictions since 1974, preventing full engagement in trade, travel, and global representation.

### The Campaign Ask
Write to your MP and urge them to:
- Meet with Freedom and Fairness for Northern Cyprus campaign representatives
- Support the call to end the isolation of Turkish Cypriots
- Advocate for Northern Cyprus to be treated as a sovereign state with equal standing

### Core Campaign Statement (from site)
> "As a Guarantor Power, the UK has a key role in ensuring Turkish Cypriots are treated as equals on the world stage — just as their Greek Cypriot neighbours are. Recognising Northern Cyprus as a sovereign state would bring an end to decades of unfair isolation, enabling direct trade, travel, and representation. This is not just a matter of diplomacy — it is a matter of basic fairness and equality. For too long, Turkish Cypriots have faced embargoes and restrictions that no one should endure. It is time to restore their rightful place in the world."

### Key Campaign Messages
- UK is a Guarantor Power under the 1960 Treaty of Guarantee — the UK has both standing and responsibility
- 50+ years of isolation for Turkish Cypriots
- Greek Cypriots enjoy full EU membership; Turkish Cypriots face embargoes
- This is a matter of basic fairness and equality, not only diplomacy
- Many British Cypriots have family/community ties to Northern Cyprus
- Recognition would unlock direct trade, travel, and representation
- Campaign name: Freedom and Fairness for Northern Cyprus
- Twitter: @FFNCyprus
- Facebook: facebook.com/FFNCyprus
- Instagram: instagram.com/freedomfairnesstrnc

### Existing FF NC Approach
The existing freedom-and-fairness.org 'Write to Your MP' page uses a form that collects user details and has the campaign send a postcard to the MP on the user's behalf. The new build will adopt the more powerful direct email model from SENDYourSay — users send the email directly from their own inbox, making it more immediate and personal.

---

## 3. Reference Website Typography and Design — freedom-and-fairness.org

### Source
https://freedom-and-fairness.org/write-to-your-mp/

### Platform
WordPress with Elementor 4.1.0 page builder. Theme: Astra. Google Fonts enabled (`css_print_method-external, google_font-enabled, font_display-auto`).

### Typography (inferred from HTML structure and Elementor/Astra defaults)
- **Heading font**: Google Font — likely a clean, bold sans-serif (Roboto, Montserrat, or Astra default)
- **Body font**: Google Font — clean sans-serif, readable at small sizes
- **H1 style**: Uppercase, bold, large — e.g., "WRITE TO YOUR MP." (all caps treatment)
- **H2/H3 style**: Mixed case, bold — e.g., "Your details", "Follow us", "More information"
- **Body text**: Regular weight, standard line height, dark on white background
- **CTA text**: Bold, contained in button/prominent element
- **font-display**: auto (performance optimised)

### Colour Palette (inferred from campaign materials and Northern Cyprus context)
- **Primary**: Red / crimson — Northern Cyprus flag colours (red and white bands), Turkish Cypriot identity. Approximate: `#C8102E`
- **Background**: White `#FFFFFF` — clean and open
- **Text**: Dark near-black — likely `#1A1A1A` or `#111827`
- **Secondary/accent**: Possibly navy or dark blue for contrast
- **Links**: Likely primary red or underlined dark

### Layout Observations
- Full-width header with logo (landscape orientation: FF-Logo-Landscape.png)
- Navigation: horizontal links, uppercase — About, History, Media, Press releases, Write to Your MP, Join Us, Share, Register of Property
- Page content centred with clear white background
- Large bold headline block at top of main content
- Bold supporting statement below headline
- Screenshot/image of form preview (mobile screenshot at 540x1024px ratio)
- Form section: clean, labelled inputs — First name, Last name, Address, Email, Phone
- "Write to your mp" CTA button
- Short paragraph with privacy/consent text before submit
- Follow us section: Twitter, Facebook, Instagram links
- More information section: links to community meeting summaries and campaign letters
- Newsletter signup footer: First name, Last name, Email + Sign up button
- Content uses `###` (H3) for section subheadings within the page

### Typography Sizes (estimated from context)
- H1 / page title: ~48–64px, uppercase, bold weight (800)
- H2 section title: ~24–32px, bold weight (700)
- Body text: ~16px, regular weight (400), line-height ~1.6–1.7
- Small/label text: ~13–14px
- Button text: ~15–16px, bold weight (700)
- Form labels: ~14px, possibly medium weight

### Key Design Principles Observed
- Bold, declarative headline style (campaign/political site norms)
- Minimal decoration — content-first
- Clear form UX with named labels
- Strong CTA placement immediately below the form
- Social proof via follow links
- Privacy consent wording included with form
- The page integrates an image (screenshot of the postcard/form) as social proof

---

## 4. Build Decisions for New Northern Cyprus Site

### Brand Colours
- `--color-brand`: `#B81C2E` (campaign red — NC flag inspired, slightly deeper than raw red for screen contrast)
- `--color-brand-hover`: `#941626`
- `--color-accent`: `#1B3A8C` (deep Mediterranean blue — diplomacy, trust)
- `--color-accent-hover`: `#142d6e`
- Background subtle: `#F8F7F6`
- Text primary: `#1A1A2E`
- Text secondary: `#4A5568`

### Fonts
- Headings: Merriweather (serif) — authority, tradition, gravitas (already installed)
- Body: Inter (sans-serif) — clean, modern, accessible (already installed)

### Letter Variants
1. **General constituent** — any UK resident who cares about fairness
2. **British Cypriot community member** — personal connection to Northern Cyprus
3. **Business/Trade advocate** — economic/trade angle

### Architecture
- Keep HashRouter, React 19, Tailwind v4, Vite 7
- Keep useParliamentApi.js (same Parliament API — same UK MP lookup)
- Keep CampaignSteps.jsx and ProgressIndicator.jsx (same 3-step flow)
- Replace all content, colours, and branding
- Implement MobileNav with jQuery for hamburger toggle
- Add data-component attribute to every component root element
- Add jQuery via CDN in index.html for: mobile nav toggle, smooth scroll to form
