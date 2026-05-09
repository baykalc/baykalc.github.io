# Repository Guidelines

The site is a lean static build with `index.html` as the primary entry point plus a small standalone page under `wafr-video/`. Keep the footprint lean and avoid reintroducing unused vendor bundles.

## Project Structure & Module Organization
- `index.html` is the primary entry point for homepage markup, metadata, and section content.
- `wafr-video/index.html` is a standalone video page that reuses the shared fonts and `css/site.css`; keep page-specific styling or behavior there only when it does not belong in the shared assets.
- `css/site.css` contains design tokens, layout rules, and component styles; extend through variables and utility classes instead of adding extra stylesheets.
- `js/site.js` holds the navigation toggle, scroll-state logic, and footer utilities. Add new interactions here.
- `fonts/` stores self-hosted WOFF2 assets (Space Grotesk, Inter). Update the `@font-face` blocks in `css/site.css` when adding families or weights.
- `img/` contains optimized imagery. Keep responsive variants grouped by descriptive filenames (e.g., `cenk-baykal-480.*`).
- `inspection/` captures Playwright QA screenshots for each visual iteration. Choose the next unused `iteration-<n>` pair after checking both tracked and untracked files.
- `BaykalCV.pdf` is the published artifact only. The editable CV source lives in the sibling `../Baykal_CV` repo (`BaykalCV.tex` plus `resume/*.tex`).
- `redesign-log.md` is the design-history ledger. Append concise iteration notes there when visual direction, content tone, or QA evidence changes.
- `CLAUDE.md` is only a Claude Code bridge; keep repo workflow rules in this file.

## Build, Test, and Development Commands
- `python3 -m http.server 8000 --bind 127.0.0.1` — serve the site locally for manual QA.
- If port 8000 is unavailable, use the next free localhost port and keep that same URL for every screenshot, smoke check, and browser-open step in the pass.
- `npx playwright screenshot http://127.0.0.1:8000/index.html inspection/iteration-<n>-desktop.png --full-page --viewport-size=1440,900` — capture desktop regression snapshots using the repo's numbered iteration pattern.
- `npx playwright screenshot http://127.0.0.1:8000/index.html inspection/iteration-<n>-mobile.png --full-page --viewport-size=390,844` — capture mobile regression snapshots using the matching numbered `inspection/` pattern.
- `npx htmlhint index.html wafr-video/index.html` — lint both HTML entry points before committing.
- `xmllint --noout sitemap.xml` — validate sitemap syntax after URL or `lastmod` edits.

This static site has no `package.json`; do not add Node dependencies just to run validation unless asked. If `npx htmlhint` stalls on package resolution or prompts for install/network access, stop it and report the lint check as blocked instead of treating it as a pass.

## Coding Style & Naming Conventions
- Use two-space indentation in HTML; wrap long attribute lists onto new lines.
- Keep CSS organized around custom properties declared in `:root` and reuse existing component classes before adding new ones.
- Write modern JavaScript (ES2015+) in `js/site.js`; prefer `const`/`let`, arrow functions where appropriate, and guard early for feature detection.
- Reference fonts via the existing `@font-face` declarations to maintain consistent typography.

## Testing Guidelines
- Preview on the local server, watch the console for script warnings, and confirm smooth navigation and section highlighting.
- Resize the browser or use device emulation to ensure the hero, publication grid, and contact block respond correctly.
- For rendered UI checks, prefer the in-app Browser plugin when it is attached. If it is unavailable, record the fallback reason and use low-resource Playwright checks: desktop and mobile screenshots, no horizontal overflow, image load, console health, and at least one header navigation flow.
- When changing shared styles, fonts, or the video page itself, also load `/wafr-video/index.html` and verify the video controls, fullscreen button, paper link, download link, and footer year.
- After asset changes, hard refresh or clear caches to confirm new files load as expected.
- Update the Playwright screenshots in `inspection/` whenever you make visual adjustments, keeping the existing `iteration-<n>-{desktop,mobile}.png` naming pattern. Keep only the current final screenshot pair for a pass unless the user explicitly asks for before/after artifacts.

## Commit & Pull Request Guidelines
- Follow the concise imperative style already in history (e.g., `site: refresh contact copy`).
- Squash trivial follow-ups before pushing and include a short PR body summarizing visual/content changes.
- Attach before/after screenshots or reference the refreshed Playwright images so reviewers can diff layout changes quickly.
- List the manual checks you performed (local preview, responsive review, lint, Playwright) in the PR description.

## Asset & Content Updates
- When replacing images, regenerate the appropriate responsive variants (`*-480.*`, `*-960.*`) and update `srcset`/`sizes` attributes.
- Keep self-hosted fonts in WOFF2; add new files under `fonts/` and update preload hints plus `@font-face` blocks.
- Maintain stable filenames for externally linked assets (e.g., `BaykalCV.pdf`); when the CV changes, rebuild from `../Baykal_CV`, copy the PDF into this repo, update the shared cache-busting query string in both `BaykalCV.pdf` links in `index.html`, refresh the visible "Last updated ..." text in the CV card when the month changes, and refresh the PDF `lastmod` in `sitemap.xml`.
- Verify CV changes with `pdfinfo BaykalCV.pdf` for page count, `pdftotext -layout BaykalCV.pdf -` for the changed text, and rendered page images (`pdftoppm`) when layout matters. Keep the public CV to two pages unless the user explicitly asks otherwise.
- Do not run `../Baykal_CV/deploy_cv.sh` unless the user explicitly asks to commit and push; it stages, commits, and pushes the updated PDF.
- Replace `wafr-video/wafr-video.mp4` in place when possible; if the filename changes, update the `<source>`, fallback download link, and download button in `wafr-video/index.html` together so the standalone page stays functional.
- When updating homepage bio/title/role copy, keep the description, Open Graph/Twitter tags, and JSON-LD `Person` fields in `index.html` aligned; if the public homepage or `BaykalCV.pdf` changes, refresh the matching `lastmod` entries in `sitemap.xml` and regenerate the current `inspection/iteration-<n>-{desktop,mobile}.png` pair when visible homepage copy changes.
- Keep the homepage tone closer to a compact research profile than a marketing landing page: avoid duplicate hero navigation, oversized CTA stacks, or decorative portrait glow unless the user explicitly asks for a more promotional treatment.
