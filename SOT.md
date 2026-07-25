---
yaiml: 0.2
role: sot
title: SOT
purpose: Current engineering state and direction for the project.
belongs-here: goals, current capabilities, declared direction, active risks, recent verified checks, priorities, divergence, uncertainty, useful recent lessons.
not-here: durable architecture, command reference, complete history.
durability: volatile; synthesize and prune aggressively.
read-with: Architecture; Maintainer Guide.
update-when: direction, verified reality, risks, priorities, or useful engineering lessons change.
agent-guidance: Verify implementation claims. Preserve human intent. Mark uncertainty. Surface conflicts. Prune stale detail.
---

# SOT

## Project Identity

Stack of Turtles is a static HTML5 scrollytelling app for moving outward through layers of reality: fields, particles, hadrons, nuclei, atoms, molecules, polymers, cells, organisms, and minds/culture.

The declared human framing is bottom-up, not top-down: start at the lowest descriptive layer and scroll outward as stable structures make larger structures possible.

## Current Capabilities

- `index.html` opens directly in a browser.
- `src/layers.js` stores editable layer content, including caveats for truth mode.
- `src/sources.js` stores browser-readable science source metadata.
- `src/app.js` renders a scroll-aware canvas visualization and layer narrative.
- `src/styles.css` provides responsive dark UI styling.
- The app validates layer/source data at runtime and shows a small source-check status.
- The active layer detail area can expand in-app source anchors.
- The app includes a truth mode toggle that reveals per-layer caveats in the active layer detail area.
- The app includes a climb/autoplay control with a speed slider for moving outward through the scale gradient.
- The app includes a cosmic-age reference in the UI: about 13.8 billion years, explicitly framed as a present universe-age horizon rather than a chronological mapping of the structural stack.
- Layer scale anchors and source IDs are stored in `src/layers.js`.
- `SCIENCE_RESEARCH.md` is a required YAIML science document for scale and structure claims.
- `SELF_AUDIT.md` records the current 60-item self-audit loop.
- `scripts/validate-data.js` validates layer/source/science-doc consistency.
- `scripts/smoke-check.js` runs an optional Playwright browser smoke check when Playwright is available.
- `context/stack-of-turtles.yaiml` stores project intent, audience, experience contract, science contract, narrative spine, data model, and roadmap.
- `context/physics-notes.md` stores science guardrails and anti-patterns.
- The app has been pushed to `wirsingj/Stack-of-Turtles` on `main`.

## Declared Direction

- Keep the first screen as the usable scale experience, not a landing page.
- Make the scroll direction feel outward.
- Keep visuals conceptual and honest rather than claiming exact simulation.
- Treat scientific scales as source-backed anchors or explicitly marked conceptual boundaries.
- Keep "age of universe" UI language as a reference frame unless a real timeline mode is separately sourced.
- Preserve the playful/philosophical identity of "Stack of Turtles" while keeping scientific claims careful.

## Agent Instructions

No existing agent instruction files were found during YAIML init. Checked for common repo-local instruction files including `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `CONTRIBUTING*`, and Markdown docs.

## Active Risks

- The visual metaphors can be mistaken for literal particle paths, orbital motion, or exact scale simulation if caveats and source anchors are not visible enough.
- Higher layers such as life, organisms, and minds risk overclaiming unless copy stays careful.
- App layer data is separated from rendering, but it is still a global browser script rather than a validated schema or editor-backed data source.

## Recent Verified Checks

- `node scripts/validate-data.js`: passed; validated 10 layers and 20 sources.
- `node scripts/smoke-check.js`: passed; loaded the app from `file://`, opened source anchors, verified source panel hidden on first load, verified scroll checkpoints do not visually compete with the HUD, exercised prev/next, enabled truth mode with mobile caveat visibility, exercised climb, checked multiple viewport widths, and checked 320px source-open overflow.
- `node --check src/app.js`, `src/layers.js`, `src/sources.js`, `scripts/validate-data.js`, and `scripts/smoke-check.js`: passed.
- Temporary Playwright screenshots inspected at desktop, tablet, and mobile widths. UX fixes removed duplicate layer content, fixed hidden source-panel state, simplified controls, moved desktop detail into a two-column cockpit, lifted truth caveats earlier on mobile, and added show/hide feedback to source anchors. Temporary images were removed.

## Evidence Inspected

- `README.md`
- `context/stack-of-turtles.yaiml`
- `context/physics-notes.md`
- `context/yaiml.md`
- `SCIENCE_RESEARCH.md`
- `SELF_AUDIT.md`
- `src/sources.js`
- `src/layers.js`
- `src/app.js`
- `index.html`
- `scripts/validate-data.js`
- `scripts/smoke-check.js`
- NIST/CODATA, CERN, DOE, PDG, IUPAC, and NCBI/NIH source pages listed in `SCIENCE_RESEARCH.md`
- Repository file listing
- Git status

## Known Uncertainty

- No package manager, test runner, formatter, or browser automation setup is committed yet.
- `SCIENCE_RESEARCH.md` and `src/sources.js` can still drift unless `node scripts/validate-data.js` is run after content changes.
- Browser smoke QA and temporary screenshot inspection exist, but no persistent screenshot artifact or visual regression baseline has been committed yet.
- Scroll checkpoint sections are intentionally invisible; the HUD is the visible experience surface.

## Immediate Priorities

- Decide whether the layer data should remain in `src/layers.js` or become generated from YAIML/JSON.
- Improve visual QA with screenshot checks at desktop and mobile widths.
- Consider generating `src/sources.js` from `SCIENCE_RESEARCH.md` if source duplication becomes painful.
- Decide whether the next milestone is static polish, WebGL/Three.js depth, or hosting.
