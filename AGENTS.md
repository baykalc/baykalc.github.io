# Repository Guidelines

The site is a single-page static build served directly from `index.html`. Keep the footprint lean and avoid reintroducing unused vendor bundles.

## Project Structure & Module Organization
- `index.html` is the entry point for markup, metadata, and section content.
- `css/site.css` contains design tokens, layout rules, and component styles; extend through variables and utility classes instead of adding extra stylesheets.
- `js/site.js` holds the navigation toggle, scroll-state logic, and footer utilities. Add new interactions here.
- `fonts/` stores self-hosted WOFF2 assets (Space Grotesk, Inter). Update the `@font-face` blocks in `css/site.css` when adding families or weights.
- `img/` contains optimized imagery. Keep responsive variants grouped by descriptive filenames (e.g., `cenk-baykal-480.*`).
- `inspection/` captures Playwright QA screenshots for each iteration; regenerate when visual changes are made.

## Build, Test, and Development Commands
- `python3 -m http.server 8000 --bind 127.0.0.1` — serve the site locally for manual QA.
- `npx playwright screenshot http://127.0.0.1:8000/index.html inspection/<label>-desktop.png --full-page --viewport-size=1440,900` — capture desktop regression snapshots (use the matching mobile command for handheld views).
- `npx htmlhint index.html` — lint HTML before committing.

## Coding Style & Naming Conventions
- Use two-space indentation in HTML; wrap long attribute lists onto new lines.
- Keep CSS organized around custom properties declared in `:root` and reuse existing component classes before adding new ones.
- Write modern JavaScript (ES2015+) in `js/site.js`; prefer `const`/`let`, arrow functions where appropriate, and guard early for feature detection.
- Reference fonts via the existing `@font-face` declarations to maintain consistent typography.

## Testing Guidelines
- Preview on the local server, watch the console for script warnings, and confirm smooth navigation and section highlighting.
- Resize the browser or use device emulation to ensure the hero, publication grid, and contact block respond correctly.
- After asset changes, hard refresh or clear caches to confirm new files load as expected.
- Update the Playwright screenshots in `inspection/` whenever you make visual adjustments.

## Commit & Pull Request Guidelines
- Follow the concise imperative style already in history (e.g., `site: refresh contact copy`).
- Squash trivial follow-ups before pushing and include a short PR body summarizing visual/content changes.
- Attach before/after screenshots or reference the refreshed Playwright images so reviewers can diff layout changes quickly.
- List the manual checks you performed (local preview, responsive review, lint, Playwright) in the PR description.

## Asset & Content Updates
- When replacing images, regenerate the appropriate responsive variants (`*-480.*`, `*-960.*`) and update `srcset`/`sizes` attributes.
- Keep self-hosted fonts in WOFF2; add new files under `fonts/` and update preload hints plus `@font-face` blocks.
- Maintain stable filenames for externally linked assets (e.g., CV PDFs). Update references in `index.html` and documentation together when changes are required.
