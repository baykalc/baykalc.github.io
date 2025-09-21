# Repository Guidelines

This portfolio site is a single-page static build. Use these guidelines to keep changes predictable.

## Project Structure & Module Organization
- `index.html` is the entry point; update copy, anchors, and metadata here.
- `css/` holds compiled styles (`custom.css`, `grayscale.css`) plus vendor Bootstrap bundles consumed directly by the page.
- `less/` contains the editable theme sources (`variables.less`, `mixins.less`, `grayscale.less`); recompile after any change.
- `js/` hosts vanilla scripts, Bootstrap, and jQuery. Extend `home.js` for new behavior instead of editing vendor files.
- Static assets live in `img/`, `fonts/`, `font-awesome/`, `publications/`, and `wafr-video/`; preserve filenames referenced externally.

## Build, Test, and Development Commands
- `python3 -m http.server 4000` — serve the site locally for quick visual QA.
- `npx lessc less/grayscale.less css/grayscale.css` — rebuild the main stylesheet from Less sources (install `lessc` globally if needed).
- `npx htmlhint index.html` — lint HTML before committing; add more paths as needed for bulk checks.

## Coding Style & Naming Conventions
- Match the existing four-space indentation in HTML and JS; wrap long attribute lists for readability.
- Use kebab-case CSS class names and rely on shared tokens defined in `variables.less` for colors, spacing, and typography.
- Keep JavaScript ES5-compatible (function declarations, `var` when required) to remain consistent with bundled vendor scripts.

## Testing Guidelines
- Always preview via the local server, watch the console for errors, and verify smooth scrolling between section anchors.
- Resize the browser or use device emulation to confirm hero imagery, typography, and publication cards respond correctly.
- After touching assets, clear caches or append cache-busting query strings to ensure fresh files load.
- Run `npx htmlhint` and spot-check JS syntax manually; no automated test suite exists yet.

## Commit & Pull Request Guidelines
- Follow the concise imperative style already in history (e.g., `Add robots.txt and sitemap.xml`).
- Squash trivial fix-ups before pushing, and add a brief body when the diff needs context.
- PRs should link related issues, summarize visual/content changes, and include before/after screenshots or GIFs for UI tweaks.
- List the manual checks you performed (local server, responsive review, lint) so reviewers can focus on risky areas.

## Asset & Content Updates
- When replacing PDFs (CV, publications), keep filenames stable unless you intend to change external links; update references together.
- Vendor libraries are committed to `css/` and `js/`; verify integrity and test locally before bumping versions.
