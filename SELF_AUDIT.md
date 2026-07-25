---
yaiml: 0.2
role: self_audit
title: Self Audit
purpose: Running analyze/change/audit ledger for sustained improvement passes.
belongs-here: counted audit iterations, decisions, batch outcomes, verification notes, residual risks.
not-here: raw private transcripts, machine-specific paths, full command output, stale exhaustive history.
durability: volatile; summarize after major milestones.
read-with: SOT; Architecture; Maintainer Guide; Science Research.
update-when: performing a long self-audit loop or closing a batch of findings.
agent-guidance: Keep the count honest. Prefer small verified improvements. Mark deferred items explicitly.
---

# Self Audit

## Batch 2026-07-25

Requested loop: 50+ iterations of analyze, code change, audit, with YAIML read/write as work progresses.

Status legend: `done`, `deferred`, `watch`, `pending-final`.

| # | Analyze | Change | Audit |
| ---: | --- | --- | --- |
| 1 | YAIML discovery should be read first. | Read `yaiml.yml`. | done |
| 2 | Current state should be read before edits. | Read `SOT.md`. | done |
| 3 | Durable architecture should guide scope. | Read `ARCHITECTURE.md`. | done |
| 4 | Operating commands should be preserved. | Read `MAINTAINER_GUIDE.md`. | done |
| 5 | Scientific claims require source rules. | Read `SCIENCE_RESEARCH.md`. | done |
| 6 | Product intent must remain bottom-up. | Read `context/stack-of-turtles.yaiml`. | done |
| 7 | Physics caveats must remain visible. | Read `context/physics-notes.md`. | done |
| 8 | Existing YAIML format notes should not be contradicted. | Read `context/yaiml.md`. | done |
| 9 | README should match app shape. | Read `README.md`. | done |
| 10 | Worktree must be clean before edits. | Checked `git status --short --branch`. | done |
| 11 | Layer data needs source validation. | Add runtime validation. | done |
| 12 | Source IDs are only in Markdown today. | Add browser source registry. | done |
| 13 | Source counts are not inspectable in-app. | Add source drawer/list. | done |
| 14 | Source UI should keep direct-file compatibility. | Use classic script data, no `fetch()`. | done |
| 15 | Source links should be safe external links. | Add `target="_blank"` and `rel`. | done |
| 16 | InnerHTML should not trust arbitrary strings. | Add HTML escaping helper for source rendering. | done |
| 17 | Autoplay should stop on manual wheel/touch. | Add manual-interaction stop hooks. | done |
| 18 | Space key can be a natural play/pause. | Add guarded keyboard shortcut. | done |
| 19 | End-of-page climb should be recoverable. | Restart climb from top when already at end. | done |
| 20 | Play button state should start explicit. | Initialize `aria-pressed=false`. | done |
| 21 | Disabled arrow buttons need visual state. | Add disabled styles. | done |
| 22 | Scale progress should explain orders of magnitude. | Add orders-outward readout. | done |
| 23 | Speed slider label is terse. | Clarify as climb speed. | done |
| 24 | Source panel should close on layer changes only if invalid. | Keep panel state while rerendering. | done |
| 25 | Validation errors should be visible to maintainers. | Add console and small UI status. | done |
| 26 | App should fail gracefully if data files load out of order. | Add early data guards. | done |
| 27 | Layer schema requires `mode` but YAIML says `visual_mode`. | Correct YAIML data model to `mode`. | done |
| 28 | Science doc should know browser source registry exists. | Update `SCIENCE_RESEARCH.md`. | done |
| 29 | Architecture should record source registry flow. | Update `ARCHITECTURE.md`. | done |
| 30 | Maintainer guide should include source consistency command. | Update `MAINTAINER_GUIDE.md`. | done |
| 31 | SOT recent checks should be replaced with current checks. | Update `SOT.md`. | done |
| 32 | `yaiml.yml` should discover this audit doc. | Add supporting document entry. | done |
| 33 | README should mention in-app sources. | Update README. | done |
| 34 | No browser QA recorded yet. | Add optional Playwright smoke check. | done |
| 35 | No package manager exists. | Avoid adding one unless necessary. | watch |
| 36 | Direct file opening is an invariant. | Avoid module scripts/fetch. | done |
| 37 | Truth mode caveats should still work after source drawer. | Verify in browser smoke check. | done |
| 38 | Current layer source count should match source panel count. | Add data validation script. | done |
| 39 | Scale anchors should remain numeric. | Run Node consistency check. | done |
| 40 | Every source ID in layers must be registered. | Run Node consistency check. | done |
| 41 | Every registered source should have title and URL/path. | Extend consistency check. | done |
| 42 | Science registry Markdown and JS registry can diverge. | Record as residual risk. | watch |
| 43 | Layer copy should not claim exact simulation. | Review copy. | done |
| 44 | Universe-age reference should not imply timeline. | Review copy. | done |
| 45 | Mobile layout may crowd controls. | Verify in smoke check and temporary mobile screenshot. | done |
| 46 | Focus states should include new controls. | Add focus-visible selectors. | done |
| 47 | Source panel should not become nested card UI. | Use unframed detail expansion. | done |
| 48 | Reduced motion users may not want autoplay surprises. | Require explicit Climb click; keep no autoplay on load. | done |
| 49 | Canvas animation depends on scroll, not infinite loop. | Preserve current draw-on-scroll model. | done |
| 50 | Validation should not block casual viewing. | Warn and show status, do not throw. | done |
| 51 | Commit should be scoped. | One batch commit after checks. | done |
| 52 | Git push should happen after successful commit. | Push after verification. | done |
| 53 | Final response should summarize key files/checks. | Report concise outcome. | pending-final |
| 54 | Goal should close only when done. | Mark complete after push. | pending-final |
| 55 | Do not hardcode machine-specific paths in YAIML. | Keep docs portable. | done |
| 56 | Avoid broad framework churn. | Stay dependency-free. | done |
| 57 | Preserve existing human wording where useful. | Edit docs lightly. | done |
| 58 | Run JS syntax checks. | `node --check`. | done |
| 59 | Run diff whitespace check. | `git diff --check`. | done |
| 60 | Re-check clean worktree after push. | `git status --short --branch`. | done |
