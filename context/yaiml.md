# YAIML Context Format

YAIML in this repo is a lightweight YAML-shaped context file for future agents, collaborators, and content editors. It is not a separate parser requirement yet. The goal is to keep product intent, science constraints, layer data, and roadmap decisions in one structured place.

## File

Primary context lives at:

```text
context/stack-of-turtles.yaiml
```

## Sections

`project` names the app, repo, tagline, medium, and first principle.

`audience` defines who the app is for and what tone it should carry.

`experience_contract` describes interaction rules and design boundaries.

`science_contract` lists claims the app can safely make, claims it should avoid, and recurring caveats.

`narrative_spine` defines the bottom-up layer sequence.

`data_model` defines the expected shape of a future layer object.

`roadmap` separates the first-night build from future upgrades.

## Editing Rules

Keep claims short and testable.

Prefer adding caveats in `science_contract` before adding them as visible app copy.

When changing the layer sequence, update the app data and `narrative_spine` together.

When a visual becomes more literal, add a note about what is still simplified.
