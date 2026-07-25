# Stack of Turtles

Scroll outward through the layers of reality: fields, particles, hadrons, nuclei, atoms, molecules, cells, organisms, and minds.

This is an HTML5 scrollytelling app for a bottom-up view of matter and emergence. It is not a physics simulation. It is a conceptual assembly map that keeps the scientific rules visible while letting the scale changes feel spatial.

The current build includes a climb speed slider for moving outward through the stack, truth-mode caveats, and source-backed scale anchors.

## Run

Open `index.html` directly in a browser.

Optional local server:

```powershell
python -m http.server 5173
```

Then open `http://localhost:5173`.

## Project Shape

```text
SCIENCE_RESEARCH.md
index.html
src/
  layers.js
  app.js
  styles.css
context/
  stack-of-turtles.yaiml
  physics-notes.md
  yaiml.md
```

## First Build Goals

- Make the scroll direction conceptual: start small, scroll outward.
- Treat each layer as a stable structure that makes the next layer possible.
- Keep the science honest without burying the experience in caveats.
- Make the app usable as a static web page before adding frameworks or hosting.
- Keep layer content editable without digging through rendering code.
- Require science claims and scale anchors to be backed in `SCIENCE_RESEARCH.md`.

## Next Candidates

- Add a layer editor backed by the YAIML schema.
- Add stronger truth mode annotations for caveats and scale disclaimers.
- Add richer particle and molecule scenes with WebGL or Three.js.
- Add hosting once the first narrative pass feels right.
