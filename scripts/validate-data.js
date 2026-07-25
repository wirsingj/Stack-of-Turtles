const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const context = { window: {} };
const issues = [];

vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, "src", "sources.js"), "utf8"), context);
vm.runInContext(fs.readFileSync(path.join(root, "src", "layers.js"), "utf8"), context);

const sources = context.window.STACK_SOURCES || {};
const layers = context.window.STACK_LAYERS || [];
const science = fs.readFileSync(path.join(root, "SCIENCE_RESEARCH.md"), "utf8");

if (!Array.isArray(layers) || !layers.length) issues.push("No layers loaded.");

const layerIds = new Set();
let previousExponent = Number.NEGATIVE_INFINITY;

for (const [index, layer] of layers.entries()) {
  const label = layer.id || `layer ${index + 1}`;

  if (!layer.id) issues.push(`${label}: missing id.`);
  if (layerIds.has(layer.id)) issues.push(`${label}: duplicate id.`);
  layerIds.add(layer.id);

  for (const field of ["nav", "title", "scale", "thesis", "rule", "caveat", "mode"]) {
    if (!layer[field]) issues.push(`${label}: missing ${field}.`);
  }

  if (!Array.isArray(layer.ingredients) || !layer.ingredients.length) {
    issues.push(`${label}: missing ingredients.`);
  }

  if (!layer.scaleAnchor || typeof layer.scaleAnchor.exponent !== "number") {
    issues.push(`${label}: missing numeric scaleAnchor.exponent.`);
  } else {
    if (layer.scaleAnchor.exponent < previousExponent) {
      issues.push(`${label}: scaleAnchor.exponent is out of outward order.`);
    }
    previousExponent = layer.scaleAnchor.exponent;
  }

  if (!layer.scaleAnchor?.label || !layer.scaleAnchor?.basis) {
    issues.push(`${label}: missing scaleAnchor label or basis.`);
  }

  if (!Array.isArray(layer.sourceIds) || !layer.sourceIds.length) {
    issues.push(`${label}: missing sourceIds.`);
  } else {
    for (const sourceId of layer.sourceIds) {
      if (!sources[sourceId]) issues.push(`${label}: source ${sourceId} missing from src/sources.js.`);
      if (!science.includes(`\`${sourceId}\``)) {
        issues.push(`${label}: source ${sourceId} missing from SCIENCE_RESEARCH.md.`);
      }
    }
  }
}

for (const [sourceId, source] of Object.entries(sources)) {
  for (const field of ["title", "kind", "url", "supports"]) {
    if (!source[field]) issues.push(`${sourceId}: source missing ${field}.`);
  }
}

if (issues.length) {
  console.error(issues.join("\n"));
  process.exit(1);
}

console.log(`Validated ${layers.length} layers and ${Object.keys(sources).length} sources.`);
