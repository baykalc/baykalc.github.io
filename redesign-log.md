# Redesign Log

## Audit — September 22, 2025
- **Typography:** Global body text uses Lora (serif) with Montserrat for headings via Google Fonts; headings forced uppercase with 1px letter-spacing. Bootstrap 3 defaults remain for nav and button elements. Text alignment justified throughout (hurts readability on narrow screens).
- **Color palette:** Dominant colors are black navbar (#000000), body text #333333, and accent blue tones (#56A0D3 for nav links, #219AB3 for inline links, #11505D on hover). Background stays pure white; no tonal layering or neutral grays. Publication awards callout uses stark #BB0000.
- **Spacing & layout:** Legacy Bootstrap 3 grid with `col-lg-offset` wrappers produces narrow columns on desktop and cramped stacking on mobile. Sections rely on minimal 25px top padding, leading to dense vertical rhythm; justified paragraphs and 350px floated portrait cause awkward wrapping at tablet sizes.
- **Visual hierarchy:** All sections share similar heading weight/size; hero lacks introduction above the fold. Publications rendered as full-width ordered lists without spacing, reducing scannability. No clear differentiation between section backgrounds; limited use of whitespace.
- **Assets & dependencies:** Includes Bootstrap v3.3.1, jQuery, Font Awesome 4.7, and legacy custom theme script (`home.js`) for smooth scrolling and navbar collapse. Images include `pic.jpeg` portrait and unused background textures. No CSS variables or modular structure; `custom.css` duplicates `grayscale.css`.

## Redesign Strategy
- **Visual direction:** Shift to a bright minimal aesthetic with layered neutrals, generous white space, and focused blue accent. Introduce componentized layout with consistent card surfaces and clear section anchors.
- **Typography:**
  - Headings & navigation: `Space Grotesk`, weights 500–700, fallback `"Inter"`, `"Segoe UI"`, `sans-serif`.
  - Body & supporting text: `Inter`, weights 400–500, fallback system sans-serif.
  - Code references (if any): `"JetBrains Mono", monospace`.
  - Apply through new CSS variable tokens and update relevant `font-family` rules in `index.html` and global stylesheet.
- **Color palette:**
  - Primary accent `--color-accent`: `#2563EB` (blue).
  - Accent hover `--color-accent-strong`: `#1D4ED8`.
  - Background `--color-bg`: `#F8FAFC`.
  - Surface `--color-surface`: `#FFFFFF`.
  - Headline text `--color-text-strong`: `#0F172A`.
  - Body text `--color-text-body`: `#1E293B`.
  - Muted text `--color-text-muted`: `#64748B`.
  - Divider `--color-border`: `#E2E8F0`.
  - Accent highlight `--color-highlight`: `#F97316` for badges or CTA pills.
- **Spacing system:** Base unit 8px (`--space-1`), scale up to `--space-8` (64px). Constrain content with a max-width wrapper (`clamp(320px, 90vw, 1040px)`) and consistent vertical section padding (e.g., 88px desktop, 56px mobile).
- **Layout adjustments:**
  - Replace Bootstrap grid with custom flex/grid layout to reduce dependency on legacy framework.
  - Introduce hero split layout: portrait + intro copy + primary CTA buttons.
  - Convert publication lists into grouped cards with category headings, metadata, and iconography.
  - Add background banding to differentiate sections (alternating subtle neutral surfaces).
  - Update navigation to sticky, translucent bar with backdrop blur and active section indicator.
  - Rebuild contact section with prominent email CTA button and social icons.
- **Interaction & accessibility:**
  - Use CSS smooth scrolling (`scroll-behavior: smooth`) to drop jQuery easing.
  - Provide focus states with 3px outlines using accent colors.
  - Ensure color contrast >= WCAG AA.
  - Optimize for mobile with responsive typography (`clamp` functions) and stack order adjustments.
- **Technical cleanup:**
  - Remove unused `grayscale.css`, Bootstrap CSS/JS, Font Awesome if replaced with inline SVG icons.
  - Replace `home.js` with lightweight vanilla script for nav collapse (if needed) or rely on CSS.
  - Serve fonts via modern `preconnect` + CSS import; consider self-hosting if latency is a concern.
  - Optimize portrait image (convert to WebP) and organize assets under `img/`.

## Iteration Roadmap
1. **Foundation Refresh:**
   - Introduce new typography and color variables.
   - Rebuild global layout shell, navigation, and hero using modern semantic HTML and custom CSS (`css/site.css`).
   - Remove Bootstrap and jQuery dependencies; ensure baseline responsiveness.
2. **Content Modules:**
   - Redesign publications into responsive cards with improved spacing and metadata hierarchy.
   - Refresh CV and contact sections; add CTA buttons and supporting text.
   - Normalize spacing, list styling, and imagery; audit for accessibility issues.
3. **Polish & Performance:**
   - Add micro-interactions (hover states, subtle transitions), finalize responsive tweaks, and compress imagery.
   - Validate focus management, heading structure, and link states; document risks/dependencies.
   - Capture visual regression via headless Chrome screenshots and update this log with inspection notes.

## Dependencies & Risks
- Removing Bootstrap requires rebuilding responsive behavior manually; must test on mobile widths thoroughly.
- External font loading depends on Google Fonts availability; consider self-hosting if privacy/performance is critical.
- Publication content currently hand-authored; converting to cards may necessitate manual HTML updates for future entries—document structure for maintainability.
- Headless screenshot tooling (Chrome) must exist locally; otherwise, provide instructions for manual QA.

### Iteration 1 — Foundation Refresh (September 22, 2025)
- Replaced legacy Bootstrap layout with semantic HTML structure (`header`, `main`, `section`, `footer`) and custom components (`hero`, `publication-group`, `card`, `contact`).
- Introduced modern typography (`Space Grotesk`, `Inter`) and color system via CSS custom properties in `css/site.css`; implemented responsive spacing scale and button styles.
- Added sticky, translucent navigation with accessible mobile toggle and smooth scroll behavior via lightweight vanilla script `js/site.js`.
- Rebuilt hero section with split layout, CTA buttons, and portrait framing; re-themed CV and contact sections with card surfaces.
- Captured baseline visual QA using Playwright (`inspection/iteration-1-desktop.png`, `inspection/iteration-1-mobile.png`).

**Observations:** Layout renders cleanly on 1440×900 and iPhone 12 viewports; nav toggle animates but mobile drawer anchors to viewport rather than header shell. Publication cards are vertically stacked but feel dense; highlight badge needs clearer visual differentiation. Links inherit accent color correctly; focus outlines present.

**Next focus:** Revisit mobile nav positioning, introduce publication card spacing hierarchy, and balance background banding to avoid monotony between sections. Consider breaking long author strings with better typography (e.g., meta columns) and optimizing portrait asset.

### Iteration 2 — Content Modules (September 22, 2025)
- Added skip link, refined sticky navigation, and fixed mobile drawer anchoring by positioning the navigational shell relatively.
- Reworked publications into responsive cards with dedicated detail blocks, venue badges, and highlight styling; introduced alternating section band to separate research content from hero.
- Expanded custom stylesheet with grid-based layout tokens, updated button/link treatments, and responsive column logic for publication groups.
- Captured updated Playwright QA (`inspection/iteration-2-desktop.png`, `inspection/iteration-2-mobile.png`).

**Observations:** Mobile nav drawer now aligns under the header and collapses on selection. Publication cards read cleaner but desktop grid feels dense at five columns; consider capping to two columns for readability and balancing card padding. Hero portrait could benefit from subtle border or gradient halo for depth. Contact CTA button currently identical to hero primary button—explore secondary treatment.

**Next focus:** Provide deliberate max column count / gap adjustments, add micro-interactions (active nav highlighting, scroll progress), refine hero media treatment, and revisit CTA hierarchy before final polish.

### Iteration 3 — Polish & Performance (September 22, 2025)
- Added scroll progress indicator, active navigation states, and section-aware highlighting driven by lightweight vanilla JS.
- Enhanced hero portrait with gradient halo, introduced secondary button style, and diversified CTA hierarchy.
- Tuned publication grid to two-column layout, refined card hover states, and added visual accents without compromising readability.
- Captured final QA (`inspection/iteration-3-desktop.png`, `inspection/iteration-3-mobile.png`).

**Observations:** Navigation highlights track scroll accurately; progress bar renders smoothly. Publication grid breathes with two columns and balanced gutters. Contact CTA now contrasts primary hero button. Hero halo softens portrait edge without overpowering content. No layout shifts spotted during load in Playwright traces.

**Outstanding considerations:** Compress `pic.jpeg` and consider modern format (WebP/AVIF). Replace external Google Fonts with self-hosted files for performance/privacy if required. Investigate lazy-loading heavy assets if additional sections are added.

### Iteration 4 — Asset Cleanup & Tone Adjustments (September 22, 2025)
- Converted the portrait to WebP with JPEG fallback and reorganized imagery under `img/` for easier asset management.
- Self-hosted Space Grotesk and Inter variable fonts, preloading WOFF2 files and removing Google Fonts fetches.
- Deleted unused Bootstrap, jQuery, Font Awesome, and legacy theme files to slim the deploy bundle.
- Simplified hero, CV, contact, and footer copy to read more directly per tone feedback.
- Captured refreshed QA (`inspection/iteration-4-desktop.png`, `inspection/iteration-4-mobile.png`).

**Observations:** Layout renders without external font flashes; hero portrait loads faster with lazy loading. Asset weight dropped substantially after pruning unused libraries. Copy reads cleaner while preserving context. Next optimisation could include generating responsive image sizes if needed.

### Iteration 5 — Responsive Imagery & Docs (September 22, 2025)
- Added responsive WebP/JPEG variants for the hero portrait with `srcset`, `sizes`, and intrinsic dimensions to prevent layout shifts.
- Regenerated mobile and desktop visual checks (`inspection/iteration-5-desktop.png`, `inspection/iteration-5-mobile.png`).
- Rewrote `AGENTS.md` to reflect the streamlined stack (self-hosted fonts, single CSS/JS bundle) and provide up-to-date workflow guidance.

**Observations:** Hero image now serves lighter assets on small screens without impacting clarity. Documentation matches the current build process, reducing onboarding confusion.
