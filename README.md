# Stack of Turtles

Scroll outward through the layers of reality: fields, particles, hadrons, nuclei, atoms, molecules, cells, organisms, and minds.

This is an HTML5 scrollytelling app for a bottom-up view of matter and emergence. It is not a physics simulation. It is a conceptual assembly map that keeps the scientific rules visible while letting the scale changes feel spatial.

## Run

Open `index.html` directly in a browser.

Optional local server:

```powershell
python -m http.server 5173
```

Then open `http://localhost:5173`.

## Project Shape

```text
index.html
src/
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

## Next Candidates

- Add a layer editor backed by the YAIML schema.
- Add optional "truth mode" annotations for caveats and scale disclaimers.
- Add richer particle and molecule scenes with WebGL or Three.js.
- Add hosting once the first narrative pass feels right.
