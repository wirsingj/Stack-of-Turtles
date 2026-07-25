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
- `src/app.js` renders a scroll-aware canvas visualization and layer narrative.
- `src/styles.css` provides responsive dark UI styling.
- The app includes a truth mode toggle that reveals per-layer caveats in the active layer detail area.
- `context/stack-of-turtles.yaiml` stores project intent, audience, experience contract, science contract, narrative spine, data model, and roadmap.
- `context/physics-notes.md` stores science guardrails and anti-patterns.
- The app has been pushed to `wirsingj/Stack-of-Turtles` on `main`.

## Declared Direction

- Keep the first screen as the usable scale experience, not a landing page.
- Make the scroll direction feel outward.
- Keep visuals conceptual and honest rather than claiming exact simulation.
- Preserve the playful/philosophical identity of "Stack of Turtles" while keeping scientific claims careful.

## Agent Instructions

No existing agent instruction files were found during YAIML init. Checked for common repo-local instruction files including `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `CONTRIBUTING*`, and Markdown docs.

## Active Risks

- The visual metaphors can be mistaken for literal particle paths, orbital motion, or exact scale simulation if caveats are not visible enough.
- Higher layers such as life, organisms, and minds risk overclaiming unless copy stays careful.
- App layer data is separated from rendering, but it is still a global browser script rather than a validated schema or editor-backed data source.

## Recent Verified Checks

- `git status --short --branch`: passed before YAIML init; worktree was clean on `main...origin/main`.
- `rg --files`: passed; repository contained `README.md`, `index.html`, `src/app.js`, `src/styles.css`, and context docs.
- `node --check src/app.js`: passed after separating layer data.
- `node --check src/layers.js`: passed after adding layer data and caveats.
- `Select-String -Path index.html -Pattern "src/layers.js|truthMode|detailRule"`: passed; `index.html` references the layer data file and truth mode/detail elements.

## Evidence Inspected

- `README.md`
- `context/stack-of-turtles.yaiml`
- `context/physics-notes.md`
- `context/yaiml.md`
- `src/layers.js`
- Repository file listing
- Git status

## Known Uncertainty

- No package manager, test runner, formatter, or browser automation setup is committed yet.
- The project has no source citations yet; current science guardrails are project notes, not sourced educational copy.
- Visual QA has not yet been recorded with screenshots across desktop and mobile.

## Immediate Priorities

- Decide whether the layer data should remain in `src/layers.js` or become generated from YAIML/JSON.
- Improve visual QA with screenshot checks at desktop and mobile widths.
- Add a small browser smoke-check workflow once the app needs regression confidence.
- Decide whether the next milestone is static polish, WebGL/Three.js depth, or hosting.
