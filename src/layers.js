window.STACK_LAYERS = [
  {
    id: "fields",
    nav: "Fields",
    title: "Quantum fields",
    scale: "10^-19 m",
    scaleAnchor: {
      exponent: -19,
      label: "<= 10^-19 m",
      basis: "Conceptual lower display boundary near current high-energy compositeness probes, not a measured field size.",
    },
    accent: "#73e0a9",
    thesis:
      "Start with fields, not tiny billiard balls. Particles are stable excitations in fields we can measure.",
    ingredients: ["electron field", "quark fields", "gauge fields"],
    rule: "The bottom layer is a description boundary, not a claim that reality is made of little dots.",
    caveat:
      "This starts at the app's useful description boundary, not at a proven final substrate of reality.",
    sourceIds: ["pdg-compositeness", "cern-standard-model"],
    mode: "waves",
  },
  {
    id: "particles",
    nav: "Particles",
    title: "Particles",
    scale: "10^-18 m",
    scaleAnchor: {
      exponent: -18,
      label: "~10^-18 m",
      basis: "Elementary particles are treated as pointlike in the Standard Model; this is a probe-scale anchor, not a particle radius.",
    },
    accent: "#7eb6ff",
    thesis:
      "Electrons can travel alone. Quarks show up through the bound states they make. Photons and gluons carry interactions.",
    ingredients: ["electron", "up quark", "down quark", "photon", "gluon"],
    rule: "Elementary means no smaller known parts in the Standard Model.",
    caveat:
      "Particle dots are visual handles. They are not little hard spheres moving through empty space.",
    sourceIds: ["cern-standard-model", "pdg-compositeness", "nist-electron-compton"],
    mode: "particles",
  },
  {
    id: "hadrons",
    nav: "Hadrons",
    title: "Hadrons",
    scale: "10^-15 m",
    scaleAnchor: {
      exponent: -15,
      label: "~10^-15 m",
      basis: "Nucleon-scale anchor using proton charge radius and QCD hadron structure.",
    },
    accent: "#f2c572",
    thesis:
      "Quarks and gluons lock into protons and neutrons. Most nucleon mass comes from field energy and motion, not bare quark mass.",
    ingredients: ["proton: uud", "neutron: udd", "gluon field energy"],
    rule: "Quarks are confined; the useful object at this scale is the bound pattern.",
    caveat:
      "The three labels are valence quarks. Real nucleons also involve gluons and transient quark-antiquark activity.",
    sourceIds: ["nist-proton-radius", "doe-quarks-gluons"],
    mode: "hadrons",
  },
  {
    id: "nuclei",
    nav: "Nuclei",
    title: "Nuclei",
    scale: "10^-14 m",
    scaleAnchor: {
      exponent: -14,
      label: "10^-15 to 10^-14 m",
      basis: "Atomic nuclei span femtometer scales; the proton radius anchors the lower end.",
    },
    accent: "#f38b6d",
    thesis:
      "Protons set the element. Neutrons tune stability. The strong force wins nearby while electric repulsion keeps score.",
    ingredients: ["proton count", "neutron count", "isotopes"],
    rule: "Change protons and the element changes; change neutrons and the isotope changes.",
    caveat:
      "The app simplifies nuclear forces. Stability depends on quantum structure, energy, and decay pathways.",
    sourceIds: ["nist-proton-radius", "iupac-atomic-number"],
    mode: "nuclei",
  },
  {
    id: "atoms",
    nav: "Atoms",
    title: "Atoms",
    scale: "10^-10 m",
    scaleAnchor: {
      exponent: -10,
      label: "~10^-10 m",
      basis: "Atomic size anchor from the Bohr radius and IUPAC atom definition.",
    },
    accent: "#c49cff",
    thesis:
      "A charged nucleus shapes the electron states around it. Chemistry begins when those states fill and overlap.",
    ingredients: ["nuclear charge", "electron configuration", "orbitals"],
    rule: "The periodic table is mostly a map of electron structure.",
    caveat:
      "Orbit-like marks are a conceptual shorthand for electron states, not literal planet-style paths.",
    sourceIds: ["nist-bohr-radius", "iupac-atom"],
    mode: "atoms",
  },
  {
    id: "molecules",
    nav: "Molecules",
    title: "Molecules",
    scale: "10^-9 m",
    scaleAnchor: {
      exponent: -9,
      label: "10^-10 to 10^-9 m",
      basis: "Molecular scale anchor from multi-atom entities and nanometer-scale biomolecular examples.",
    },
    accent: "#73e0a9",
    thesis:
      "Atoms share, borrow, and polarize electron density. Stable bonds turn element identity into shape and behavior.",
    ingredients: ["covalent bonds", "ions", "polarity", "geometry"],
    rule: "Molecules are not just atom piles; shape changes what they can do.",
    caveat:
      "Bond sticks are a map convention. Real bonding is electron density and energy, not rigid rods.",
    sourceIds: ["iupac-molecule", "ncbi-protein-shapes"],
    mode: "molecules",
  },
  {
    id: "polymers",
    nav: "Polymers",
    title: "Polymers",
    scale: "10^-7 m",
    scaleAnchor: {
      exponent: -7,
      label: "10^-9 to 10^-7 m",
      basis: "Macromolecule and membrane-scale anchor using IUPAC polymer terminology and cell-biology dimensions.",
    },
    accent: "#7eb6ff",
    thesis:
      "Repeating molecular units become scaffolds, membranes, proteins, and information-bearing chains.",
    ingredients: ["lipids", "proteins", "RNA/DNA", "sugars"],
    rule: "At this layer, sequence and folding start acting like machinery.",
    caveat:
      "This layer compresses many scales of biochemistry. Sequence, environment, and folding all matter.",
    sourceIds: ["iupac-macromolecule", "iupac-polymer", "ncbi-membrane-structure"],
    mode: "polymers",
  },
  {
    id: "cells",
    nav: "Cells",
    title: "Cells",
    scale: "10^-6 m",
    scaleAnchor: {
      exponent: -6,
      label: "10^-6 to 10^-4 m",
      basis: "Cell-scale anchor from bacterial and eukaryotic cell size ranges.",
    },
    accent: "#f2c572",
    thesis:
      "A cell is chemistry with a boundary, metabolism, repair, memory, and enough feedback to keep going.",
    ingredients: ["membrane", "metabolism", "genetic memory", "feedback"],
    rule: "Life is organization over time, not a single magic ingredient.",
    caveat:
      "This is not an origin-of-life claim. It names recurring features of living cellular systems.",
    sourceIds: ["ncbi-bacterial-cell-size", "ncbi-eukaryotic-cell-size", "ncbi-cell-composition"],
    mode: "cells",
  },
  {
    id: "organisms",
    nav: "Organisms",
    title: "Organisms",
    scale: "10^-2 to 10^0 m",
    scaleAnchor: {
      exponent: 0,
      label: "10^-2 to 10^0 m",
      basis: "Organism anchor for centimeter-to-meter multicellular bodies; the claim is coordination, not a universal body size.",
    },
    accent: "#f38b6d",
    thesis:
      "Cells specialize and coordinate. Tissues, organs, senses, motion, and behavior become one moving system.",
    ingredients: ["signaling", "tissues", "organs", "homeostasis"],
    rule: "The parts matter, but the coordination is the new thing.",
    caveat:
      "Organisms are not just bigger cells. Development, regulation, and environment shape the whole.",
    sourceIds: ["ncbi-eukaryotic-cell-size", "ncbi-histology-cell"],
    mode: "organisms",
  },
  {
    id: "minds",
    nav: "Minds",
    title: "Minds",
    scale: "10^0 m and outward",
    scaleAnchor: {
      exponent: 1,
      label: "10^0 m and outward",
      basis: "Human-scale and social-scale anchor; the science claim is physical continuity, not a solved theory of consciousness.",
    },
    accent: "#c49cff",
    thesis:
      "Matter starts modeling itself. Nervous systems, language, culture, and science become structures made of structures.",
    ingredients: ["brains", "symbols", "tools", "shared models"],
    rule: "The stack does not stop being physical when it becomes meaningful.",
    caveat:
      "This app does not solve consciousness. It only keeps mind and culture inside the physical stack.",
    sourceIds: ["ncbi-histology-cell", "science-contract"],
    mode: "minds",
  },
];
