---
yaiml: 0.2
role: maintainer
title: Maintainer Guide
purpose: Operating knowledge for setup, checks, diagnostics, and safe maintenance.
belongs-here: setup, verified commands, environment-dependent commands, focused checks, important files, danger files, diagnostics, failure playbooks, unverified procedures.
not-here: volatile product direction, durable architecture rationale, complete history.
durability: semi-durable; update when commands, procedures, or operating risks change.
read-with: SOT; Architecture.
update-when: setup, commands, checks, files, or maintenance conventions change.
agent-guidance: Run focused checks when possible. Record exact verified commands in SOT. Do not commit machine-specific paths or secrets.
---

# Maintainer Guide

## Setup

No install step is currently required.

Open `index.html` directly in a browser, or serve the folder with a simple local server:

```powershell
python -m http.server 5173
```

Then open:

```text
http://localhost:5173
```

## Verified Commands

```powershell
git status --short --branch
```

Used to confirm worktree state before edits.

```powershell
rg --files
```

Used to inspect the repository file set when ripgrep is available.

```powershell
node --check src/app.js
```

Used to syntax-check the JavaScript app entry file.

```powershell
node --check src/layers.js
```

Used to syntax-check the layer content file.

## Important Files

- `yaiml.yml`: discovery file for the YAIML project-memory loop.
- `SOT.md`: current state, risks, priorities, verified checks, and uncertainty.
- `ARCHITECTURE.md`: durable structure and invariants.
- `MAINTAINER_GUIDE.md`: setup, commands, diagnostics, and maintenance conventions.
- `context/stack-of-turtles.yaiml`: app-specific intent and content contract.
- `context/physics-notes.md`: science guardrails.
- `index.html`: static app shell.
- `src/layers.js`: layer content, visual mode IDs, and truth-mode caveats.
- `src/app.js`: app behavior and canvas rendering.
- `src/styles.css`: app presentation.

## YAIML Maintenance Note

When a human says "update YAIML", "updated YAIML", "check new YAIML", or "run a YAIML update", compare the local YAIML setup against a human-provided or workspace-local YAIML reference, refresh compatible prompts/templates/guidance, and preserve project-specific memory.

Do not hardcode local YAIML reference paths, local drive names, private workspace URIs, secrets, private chat transcripts, or sensitive raw logs into versioned YAIML files.

After meaningful work, update only the affected YAIML documents. Prune stale state instead of appending forever.

## Diagnostics

If the app opens but the scene is blank:

- Check browser console errors.
- Run `node --check src/app.js`.
- Run `node --check src/layers.js`.
- Confirm `index.html` references the expected script files.

If direct file opening stops working:

- Check for new `fetch()` calls or module loading assumptions.
- Either remove the server dependency or update README and this guide to make local serving explicit.

## Unverified Procedures

- No automated browser smoke test is committed yet.
- No deployment or hosting procedure is committed yet.
- No formatting command is committed yet.
