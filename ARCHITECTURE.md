---
yaiml: 0.2
role: architecture
title: Architecture
purpose: Durable system shape, boundaries, data flow, invariants, and danger zones.
belongs-here: current architecture, intended architecture, components, boundaries, data flow, invariants, known violations, danger zones, retired approaches.
not-here: volatile priorities, recent command output, complete changelog.
durability: durable; update when system shape or invariants change.
read-with: SOT; Maintainer Guide.
update-when: components, boundaries, data flow, commands, or architectural tradeoffs change.
agent-guidance: Preserve working simplicity. Mark inference. Do not add frameworks without a clear project need.
---

# Architecture

## Current Shape

Stack of Turtles is a dependency-free static web app.

```text
SCIENCE_RESEARCH.md
index.html
src/
  sources.js
  layers.js
  app.js
  styles.css
scripts/
  validate-data.js
  smoke-check.js
context/
  stack-of-turtles.yaiml
  physics-notes.md
  yaiml.md
```

## Components

`index.html` defines the document shell, sticky visualization stage, layer container, navigation targets, and script/style entry points.

`src/sources.js` owns browser-readable science source metadata as `window.STACK_SOURCES`. It is loaded as a classic script so direct file opening keeps working without a local server.

`src/layers.js` owns the editable layer content as `window.STACK_LAYERS`. It is loaded as a classic script so direct file opening keeps working without a local server.

`src/app.js` owns rendering behavior. It builds layer markup, validates layer/source data, tracks scroll position, updates active layer state, handles truth mode, handles the source drawer, handles climb/autoplay speed, and draws conceptual canvas scenes for each layer.

`src/styles.css` owns the responsive interface, sticky stage, layer copy placement, navigation, controls, and canvas overlays.

`context/stack-of-turtles.yaiml` is the app-context memory for product intent and science constraints.

`context/physics-notes.md` is the human-readable science guardrail document.

`SCIENCE_RESEARCH.md` is a required YAIML science-research document. Scale anchors and strengthened science claims in `src/layers.js` must be backed there.

`scripts/validate-data.js` validates the layer/source/science-doc contract without a browser.

`scripts/smoke-check.js` optionally uses Playwright when available to verify the static app opens, source anchors expand, truth mode reveals caveats, climb can run, and a mobile viewport still renders.

## Data Flow

Source metadata is loaded from `src/sources.js`. Layer data is loaded from `src/layers.js`. `src/app.js` validates both, renders layer markup and source details, then uses scroll state to update the heads-up display and canvas mode.

Scroll position selects the nearest layer section. Active layer state drives:

- title text
- thesis text
- scale label
- exponent-based scale progress bar
- nav current state
- stability rule and optional caveat
- scale anchor, source-anchor count, and expandable source details
- journey frame and universe-age reference
- canvas drawing mode

The climb control uses `requestAnimationFrame` to scroll the document at a speed derived from the slider. It does not replace manual scrolling.

## Invariants

- The app starts at the smallest described layer and scrolls outward.
- The first user-visible surface is the app experience, not a marketing page.
- Visuals are conceptual and should not imply exact physics simulation.
- Scientific caveats belong in project memory and should become visible UI when they materially prevent misunderstanding.
- Scientific scale and structure claims must be backed by `SCIENCE_RESEARCH.md` or explicitly marked as conceptual display anchors.
- Universe-age UI is a reference horizon, not a chronological interpretation of layer order.
- Static-file opening should continue to work unless the project intentionally adopts a build step.

## Known Violations Or Pressure Points

- Layer data is validated by script and at runtime, but not by a formal schema.
- `SCIENCE_RESEARCH.md` and `src/sources.js` duplicate source metadata.
- No screenshot-based visual regression exists.

## Intended Near-Term Architecture

Keep rendering in `src/app.js` until complexity justifies splitting canvas drawing into its own module. If content editing becomes a focus, decide whether YAIML remains memory-only or generates the browser layer data.

Avoid adding React, Godot, build tooling, or WebGL until the core scroll experience earns that complexity.

## Danger Zones

- Using `fetch()` for data can break direct file opening unless a local server becomes mandatory.
- Literal-looking atom or particle visuals need caveats.
- Large framework or bundler adoption can slow tonight-build iteration.
