---
yaiml: 0.2
role: science_research
title: Science Research
purpose: Required evidence and rules for scientific scale, structure, and emergence claims in Stack of Turtles.
belongs-here: source registry, scale anchors, claim rules, citation requirements, known uncertainty, rejected overclaims.
not-here: private notes, raw chat transcripts, unsourced speculation, machine-specific research paths.
durability: durable; update when scientific claims, sources, or scale anchors change.
read-with: SOT; Architecture; Maintainer Guide; context/physics-notes.md.
update-when: adding a layer, changing a scale, changing a caveat, or making a stronger science claim.
agent-guidance: Treat this as required. Do not add or strengthen app science claims unless the claim is backed here or clearly marked conceptual/uncertain.
---

# Science Research

## Required Rule

Every visible scientific scale or structure claim in the app must be backed by a source ID in this document, or explicitly labeled as a conceptual display anchor.

If a layer uses an approximate order of magnitude, record the reason for the approximation. Do not turn a conceptual boundary into a measured object size.

## Source Registry

`cern-standard-model`: CERN Standard Model overview. Supports elementary particles, quarks/leptons, force carriers, and the Standard Model framing.  
https://home.cern/science/physics/standard-model/

`pdg-compositeness`: Particle Data Group quark/lepton compositeness listings. Supports the idea that elementary-particle substructure is constrained by high-energy searches rather than measured as ordinary size.  
https://pdg.lbl.gov/2025/listings/rpp2025-list-quark-lepton-compositeness.pdf

`doe-quarks-gluons`: Department of Energy explainer on quarks, gluons, hadrons, confinement, and QCD. Supports quarks/gluons as proton/neutron constituents and the bound-state caveat.  
https://www.energy.gov/science/doe-explainsquarks-and-gluons

`nist-electron-compton`: NIST/CODATA reduced electron Compton wavelength, 3.8615926744e-13 m. This is not an electron radius; use only as a quantum length reference and caveat.  
https://physics.nist.gov/cgi-bin/cuu/Value?ecomwlbar=

`nist-proton-radius`: NIST/CODATA proton rms charge radius, 8.4075e-16 m. Supports femtometer-scale nucleon anchors.  
https://physics.nist.gov/cgi-bin/cuu/Value?rp=

`nist-bohr-radius`: NIST/CODATA Bohr radius, 5.29177210544e-11 m. Supports atomic-length scale anchors.  
https://physics.nist.gov/cgi-bin/cuu/Value?bohrrada0=

`iupac-atom`: IUPAC Gold Book atom definition. Supports atom as the smallest particle still characterizing a chemical element and containing a positive nucleus.  
https://goldbook.iupac.org/terms/view/A00493

`iupac-atomic-number`: IUPAC Gold Book atomic number definition. Supports proton count as atomic number.  
https://goldbook.iupac.org/terms/view/A00499/plain

`iupac-molecule`: IUPAC Gold Book molecule definition. Supports molecules as electrically neutral entities with more than one atom.  
https://goldbook.iupac.org/terms/view/M04002

`iupac-macromolecule`: IUPAC Gold Book macromolecule definition. Supports high-relative-molecular-mass molecules with repeated units.  
https://goldbook.iupac.org/terms/view/M03667

`iupac-polymer`: IUPAC Gold Book polymer definition. Supports polymers as substances composed of macromolecules.  
https://goldbook.iupac.org/terms/view/P04735

`ncbi-protein-shapes`: NCBI Bookshelf, Molecular Biology of the Cell, protein structures. Supports nanometer-scale biomolecular examples.  
https://www.ncbi.nlm.nih.gov/books/NBK26830/

`ncbi-membrane-structure`: NCBI Bookshelf, Molecular Biology of the Cell, membrane structure. Supports lipid bilayer thickness around 5 nm.  
https://www.ncbi.nlm.nih.gov/books/NBK21055/

`ncbi-cell-composition`: NCBI Bookshelf, The Cell, molecular composition of cells. Supports cells as organized molecular systems.  
https://www.ncbi.nlm.nih.gov/books/NBK9879/

`ncbi-bacterial-cell-size`: NCBI Bookshelf, The Cell, origin/evolution of cells. Supports bacterial diameters around 1 to 10 micrometers in that text.  
https://www.ncbi.nlm.nih.gov/books/NBK9841/

`ncbi-eukaryotic-cell-size`: NCBI/PMC review on eukaryotic cell size regulation. Supports wide eukaryotic cell-size variation.  
https://pmc.ncbi.nlm.nih.gov/articles/PMC11495193/

`ncbi-histology-cell`: NCBI Bookshelf, Histology, Cell. Supports human cell-size examples, cell-count estimates, and brain-cell framing.  
https://www.ncbi.nlm.nih.gov/books/NBK554382/

`science-contract`: Internal Stack of Turtles science contract. Supports careful wording when primary science does not settle a philosophical or explanatory claim.  
context/physics-notes.md

`nasa-cosmic-history`: NASA Science universe overview. Supports an approximate 13.8-billion-year cosmic-history frame and the uncertainty around what came before inflation.
URL: https://science.nasa.gov/universe/overview/

`esa-planck-age`: ESA Planck mission result. Supports Planck-derived universe age values around 13.8 billion years.
URL: https://www.esa.int/Science_Exploration/Space_Science/Planck/Planck_reveals_an_almost_perfect_Universe

## Scale Anchors

| Layer | App anchor | Status | Required source IDs |
| --- | ---: | --- | --- |
| Quantum fields | <= 10^-19 m | Conceptual display boundary; not a measured field size | `pdg-compositeness`, `cern-standard-model` |
| Particles | ~10^-18 m | Probe-scale anchor; not an electron/quark radius | `cern-standard-model`, `pdg-compositeness`, `nist-electron-compton` |
| Hadrons | ~10^-15 m | Measured nucleon-scale anchor | `nist-proton-radius`, `doe-quarks-gluons` |
| Nuclei | 10^-15 to 10^-14 m | Order-of-magnitude nuclear anchor | `nist-proton-radius`, `iupac-atomic-number` |
| Atoms | ~10^-10 m | Atomic-length anchor | `nist-bohr-radius`, `iupac-atom` |
| Molecules | 10^-10 to 10^-9 m | Molecular and biomolecular order-of-magnitude anchor | `iupac-molecule`, `ncbi-protein-shapes` |
| Polymers | 10^-9 to 10^-7 m | Macromolecule/membrane-scale anchor | `iupac-macromolecule`, `iupac-polymer`, `ncbi-membrane-structure` |
| Cells | 10^-6 to 10^-4 m | Cell-size range anchor | `ncbi-bacterial-cell-size`, `ncbi-eukaryotic-cell-size`, `ncbi-cell-composition` |
| Organisms | 10^-2 to 10^0 m | Human-scale app anchor; not universal organism size | `ncbi-eukaryotic-cell-size`, `ncbi-histology-cell` |
| Minds | 10^0 m and outward | Physical-continuity/social-scale anchor; not a consciousness solution | `ncbi-histology-cell`, `science-contract` |

## Cosmic Age Frame

The app may use "about 13.8 billion years" as a current accepted universe-age reference backed by `nasa-cosmic-history` and `esa-planck-age`.

Do not imply that the structural layer stack is itself a chronological cosmic timeline. If the app later adds a true timeline mode, it needs separate sourced events such as nucleosynthesis, recombination, first stars, Earth formation, earliest life, multicellular life, and humans.

## Claim Rules

- Use "anchor", "order of magnitude", or "range" for scale labels unless the value is a named measured constant.
- Do not call the electron, quark, or field visual a literal size.
- Do not show electron orbit lines without the orbit caveat.
- Do not say protons/neutrons are only three quarks; say valence quarks plus gluon/QCD dynamics when truth mode or caveats are visible.
- Do not imply cells, organisms, or minds are explained away by lower levels.
- Do not claim the app proves an origin-of-life mechanism or theory of consciousness.
- Do not convert the scale stack into a timeline unless each chronological event has its own source-backed anchor.

## Update Procedure

When adding or changing a layer in `src/layers.js`:

1. Add or reuse source IDs here.
2. Add a scale anchor and mark whether it is measured, order-of-magnitude, or conceptual.
3. Add at least one caveat if a normal viewer could read the visual literally.
4. Run `node --check src/layers.js` and `node --check src/app.js`.
5. Update `SOT.md` Recent Verified Checks if the check result matters for handoff.
