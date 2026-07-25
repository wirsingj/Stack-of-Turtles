const layers = Array.isArray(window.STACK_LAYERS) ? window.STACK_LAYERS : [];
const sources = window.STACK_SOURCES || {};

const canvas = document.getElementById("scaleCanvas");
const ctx = canvas.getContext("2d");
const layerStack = document.getElementById("layers");
const jumpNav = document.getElementById("jumpNav");
const title = document.getElementById("layerTitle");
const thesis = document.getElementById("layerThesis");
const scaleLabel = document.getElementById("scaleLabel");
const progress = document.getElementById("scaleProgress");
const ordersValue = document.getElementById("ordersValue");
const prevButton = document.getElementById("prevLayer");
const nextButton = document.getElementById("nextLayer");
const focusButton = document.getElementById("focusLayer");
const playClimb = document.getElementById("playClimb");
const speedRange = document.getElementById("speedRange");
const speedValue = document.getElementById("speedValue");
const truthMode = document.getElementById("truthMode");
const auditStatus = document.getElementById("auditStatus");
const detailScale = document.getElementById("detailScale");
const detailSources = document.getElementById("detailSources");
const sourceToggle = document.getElementById("sourceToggle");
const sourcePanel = document.getElementById("sourcePanel");
const detailRule = document.getElementById("detailRule");
const detailCaveat = document.getElementById("detailCaveat");

let activeIndex = 0;
let canvasWidth = 0;
let canvasHeight = 0;
let particles = [];
let showCaveats = false;
let isClimbing = false;
let climbFrame = 0;
let lastClimbTime = 0;
let speedMultiplier = Number(speedRange.value);
let sourcePanelOpen = false;

const minExponent = layers.length ? Math.min(...layers.map((layer) => layer.scaleAnchor.exponent)) : 0;
const maxExponent = layers.length ? Math.max(...layers.map((layer) => layer.scaleAnchor.exponent)) : 1;
const projectIssues = validateProjectData();

function buildLayerMarkup() {
  if (!layers.length) {
    layerStack.innerHTML = `
      <article class="layer">
        <div class="layer-copy">
          <p class="eyebrow">data missing</p>
          <h2>Layer data did not load</h2>
          <p>Check that <code>src/sources.js</code> and <code>src/layers.js</code> load before <code>src/app.js</code>.</p>
        </div>
      </article>
    `;
    return;
  }

  layerStack.innerHTML = layers
    .map(
      (layer, index) => `
        <article class="layer" id="${layer.id}" data-index="${index}" style="--accent: ${layer.accent}">
          <div class="layer-copy">
            <p class="eyebrow">${layer.scale}</p>
            <h2>${layer.title}</h2>
            <p>${layer.thesis}</p>
            <div class="layer-meta" aria-label="Ingredients">
              ${layer.ingredients.map((item) => `<span class="pill">${item}</span>`).join("")}
              <span class="pill">${layer.scaleAnchor.label}</span>
              <span class="pill">${layer.sourceIds.length} sources</span>
            </div>
            <p class="rule">${layer.rule}</p>
          </div>
        </article>
      `,
    )
    .join("");

  jumpNav.innerHTML = layers
    .map((layer, index) => `<a href="#${layer.id}" data-index="${index}">${layer.nav}</a>`)
    .join("");
}

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvasWidth = Math.floor(rect.width);
  canvasHeight = Math.floor(rect.height);
  canvas.width = Math.floor(canvasWidth * ratio);
  canvas.height = Math.floor(canvasHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  seedParticles();
  draw();
}

function seedParticles() {
  particles = Array.from({ length: 96 }, (_, index) => {
    const angle = index * 2.399963;
    const radius = Math.sqrt(index / 96) * Math.min(canvasWidth, canvasHeight) * 0.45;
    return {
      x: canvasWidth * 0.62 + Math.cos(angle) * radius,
      y: canvasHeight * 0.5 + Math.sin(angle) * radius,
      r: 1.5 + ((index * 7) % 18) / 8,
      p: index / 96,
    };
  });
}

function getScrollProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / max));
}

function updateActiveLayer() {
  const sections = [...document.querySelectorAll(".layer")];
  const viewportAnchor = window.innerHeight * 0.56;
  let closest = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top + rect.height * 0.55 - viewportAnchor);
    if (distance < closestDistance) {
      closest = index;
      closestDistance = distance;
    }
  });

  setActiveLayer(closest);
}

function setActiveLayer(index) {
  if (!layers.length) return;

  activeIndex = Math.min(layers.length - 1, Math.max(0, index));
  const layer = layers[activeIndex];

  title.textContent = layer.title;
  thesis.textContent = layer.thesis;
  scaleLabel.textContent = layer.scale;
  detailScale.textContent = `${layer.scaleAnchor.label}: ${layer.scaleAnchor.basis}`;
  renderSourcePanel(layer);
  detailRule.textContent = layer.rule;
  detailCaveat.textContent = layer.caveat;
  detailCaveat.hidden = !showCaveats;
  progress.style.width = `${getExponentProgress(layer)}%`;
  ordersValue.textContent = `${Math.max(0, layer.scaleAnchor.exponent - minExponent)} orders outward`;
  document.documentElement.style.setProperty("--focus", layer.accent);

  [...jumpNav.querySelectorAll("a")].forEach((link, index) => {
    link.setAttribute("aria-current", index === activeIndex ? "true" : "false");
  });

  prevButton.disabled = activeIndex === 0;
  nextButton.disabled = activeIndex === layers.length - 1;
  draw();
}

function scrollToLayer(index) {
  stopClimb();
  if (!layers.length) return;
  const layer = layers[Math.min(layers.length - 1, Math.max(0, index))];
  document.getElementById(layer.id)?.scrollIntoView({ block: "start", behavior: "smooth" });
}

function getExponentProgress(layer) {
  const exponent = layer.scaleAnchor.exponent;
  return ((exponent - minExponent) / (maxExponent - minExponent)) * 100;
}

function updateSpeedLabel() {
  speedMultiplier = Number(speedRange.value);
  speedValue.textContent = `${formatSpeed(speedMultiplier)}x`;
}

function startClimb() {
  if (isClimbing) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (window.scrollY >= maxScroll - 2) window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  isClimbing = true;
  lastClimbTime = 0;
  playClimb.textContent = "Pause";
  playClimb.setAttribute("aria-pressed", "true");
  climbFrame = window.requestAnimationFrame(climbStep);
}

function toggleClimb() {
  if (isClimbing) stopClimb();
  else startClimb();
}

function stopClimb() {
  if (!isClimbing) return;
  isClimbing = false;
  lastClimbTime = 0;
  playClimb.textContent = "Climb";
  playClimb.setAttribute("aria-pressed", "false");
  window.cancelAnimationFrame(climbFrame);
}

function climbStep(timestamp) {
  if (!isClimbing) return;
  if (!lastClimbTime) lastClimbTime = timestamp;

  const elapsed = Math.min(64, timestamp - lastClimbTime) / 1000;
  lastClimbTime = timestamp;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const pixelsPerSecond = 260 * speedMultiplier;

  window.scrollBy({ top: pixelsPerSecond * elapsed, left: 0, behavior: "auto" });

  if (window.scrollY >= maxScroll - 2) {
    stopClimb();
    return;
  }

  climbFrame = window.requestAnimationFrame(climbStep);
}

function formatSpeed(value) {
  return value.toFixed(2).replace(/0$/, "").replace(/\.0$/, ".0");
}

function renderSourcePanel(layer) {
  const sourceIds = layer.sourceIds || [];
  sourceToggle.textContent = `${sourceIds.length} source anchor${sourceIds.length === 1 ? "" : "s"}`;
  sourceToggle.setAttribute("aria-expanded", String(sourcePanelOpen));
  sourcePanel.hidden = !sourcePanelOpen;

  const renderedSources = sourceIds.map((sourceId) => ({
    id: sourceId,
    source: sources[sourceId],
  }));

  sourcePanel.innerHTML = renderedSources
    .map(({ id, source }) => {
      if (!source) {
        return `
          <article class="source-item source-item-missing">
            <strong>${escapeHtml(id)}</strong>
            <span>Missing from source registry.</span>
          </article>
        `;
      }

      const url = escapeHtml(source.url);
      const isExternal = /^https?:\/\//.test(source.url);
      const target = isExternal ? ' target="_blank" rel="noreferrer"' : "";

      return `
        <article class="source-item">
          <div>
            <strong>${escapeHtml(source.title)}</strong>
            <span>${escapeHtml(source.kind)}</span>
          </div>
          <p>${escapeHtml(source.supports)}</p>
          <a href="${url}"${target}>Open source</a>
        </article>
      `;
    })
    .join("");
}

function validateProjectData() {
  const issues = [];
  const ids = new Set();

  if (!layers.length) issues.push("No layers loaded.");

  layers.forEach((layer, index) => {
    if (!layer.id) issues.push(`Layer ${index + 1} is missing id.`);
    if (ids.has(layer.id)) issues.push(`Duplicate layer id: ${layer.id}.`);
    ids.add(layer.id);

    if (!layer.title) issues.push(`${layer.id}: missing title.`);
    if (!layer.scaleAnchor || typeof layer.scaleAnchor.exponent !== "number") {
      issues.push(`${layer.id}: missing numeric scaleAnchor.exponent.`);
    }
    if (!Array.isArray(layer.sourceIds) || !layer.sourceIds.length) {
      issues.push(`${layer.id}: missing sourceIds.`);
    } else {
      layer.sourceIds.forEach((sourceId) => {
        if (!sources[sourceId]) issues.push(`${layer.id}: unknown source ${sourceId}.`);
      });
    }
    if (!layer.mode) issues.push(`${layer.id}: missing visual mode.`);
  });

  Object.entries(sources).forEach(([sourceId, source]) => {
    if (!source.title) issues.push(`${sourceId}: source missing title.`);
    if (!source.url) issues.push(`${sourceId}: source missing url.`);
    if (!source.supports) issues.push(`${sourceId}: source missing supports.`);
  });

  return issues;
}

function updateAuditStatus() {
  const count = Object.keys(sources).length;
  if (!projectIssues.length) {
    auditStatus.textContent = `${count} sources checked`;
    auditStatus.classList.remove("audit-status-warning");
    return;
  }

  auditStatus.textContent = `${projectIssues.length} source issues`;
  auditStatus.classList.add("audit-status-warning");
  console.warn("Stack of Turtles data validation issues:", projectIssues);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function draw() {
  if (!ctx || !canvasWidth || !canvasHeight) return;

  const layer = layers[activeIndex];
  const t = getScrollProgress();
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawBackground(t);

  const centerX = canvasWidth * (canvasWidth > 720 ? 0.66 : 0.56);
  const centerY = canvasHeight * 0.5;
  const size = Math.min(canvasWidth, canvasHeight);

  if (layer.mode === "waves") drawWaves(centerX, centerY, size, layer.accent);
  if (layer.mode === "particles") drawParticles(centerX, centerY, size, layer.accent);
  if (layer.mode === "hadrons") drawHadrons(centerX, centerY, size, layer.accent);
  if (layer.mode === "nuclei") drawNucleus(centerX, centerY, size, layer.accent);
  if (layer.mode === "atoms") drawAtom(centerX, centerY, size, layer.accent);
  if (layer.mode === "molecules") drawMolecule(centerX, centerY, size, layer.accent);
  if (layer.mode === "polymers") drawPolymer(centerX, centerY, size, layer.accent);
  if (layer.mode === "cells") drawCell(centerX, centerY, size, layer.accent);
  if (layer.mode === "organisms") drawOrganism(centerX, centerY, size, layer.accent);
  if (layer.mode === "minds") drawMind(centerX, centerY, size, layer.accent);
}

function drawBackground(t) {
  const gradient = ctx.createLinearGradient(0, 0, canvasWidth, canvasHeight);
  gradient.addColorStop(0, "#10110f");
  gradient.addColorStop(0.5, "#17130f");
  gradient.addColorStop(1, "#10151a");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = "#f4f0e7";
  ctx.lineWidth = 1;
  const gap = 34 + t * 48;
  for (let x = ((-window.scrollY * 0.04) % gap) - gap; x < canvasWidth + gap; x += gap) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + canvasHeight * 0.28, canvasHeight);
    ctx.stroke();
  }
  ctx.restore();
}

function drawWaves(cx, cy, size, accent) {
  ctx.save();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 9; i += 1) {
    ctx.globalAlpha = 0.14 + i * 0.035;
    ctx.beginPath();
    for (let x = -size * 0.45; x <= size * 0.45; x += 12) {
      const y = Math.sin((x + i * 44 + window.scrollY * 0.04) / 34) * (18 + i * 4);
      if (x === -size * 0.45) ctx.moveTo(cx + x, cy + y + (i - 4) * 21);
      else ctx.lineTo(cx + x, cy + y + (i - 4) * 21);
    }
    ctx.stroke();
  }
  ctx.restore();
}

function drawParticles(cx, cy, size, accent) {
  ctx.save();
  particles.slice(0, 34).forEach((dot, index) => {
    const angle = dot.p * Math.PI * 2 + window.scrollY * 0.0006;
    const radius = size * (0.12 + (index % 5) * 0.055);
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle * 1.3) * radius * 0.72;
    ctx.fillStyle = index % 4 === 0 ? "#f2c572" : index % 3 === 0 ? "#f38b6d" : accent;
    ctx.globalAlpha = 0.86;
    circle(x, y, dot.r + 2);
  });
  ctx.restore();
}

function drawHadrons(cx, cy, size, accent) {
  drawBoundCluster(cx - size * 0.12, cy, size * 0.12, ["u", "u", "d"], accent);
  drawBoundCluster(cx + size * 0.16, cy, size * 0.12, ["u", "d", "d"], "#f38b6d");
}

function drawBoundCluster(cx, cy, radius, labels, accent) {
  ctx.save();
  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.7;
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i += 1) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, radius * (1 + i * 0.08), radius * (0.6 + i * 0.06), i * 0.72, 0, Math.PI * 2);
    ctx.stroke();
  }
  labels.forEach((label, index) => {
    const angle = index * ((Math.PI * 2) / 3) - Math.PI / 2;
    const x = cx + Math.cos(angle) * radius * 0.58;
    const y = cy + Math.sin(angle) * radius * 0.58;
    ctx.fillStyle = label === "u" ? "#7eb6ff" : "#f2c572";
    circle(x, y, radius * 0.26);
    ctx.fillStyle = "#10110f";
    ctx.font = "600 16px system-ui";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(label, x, y);
  });
  ctx.restore();
}

function drawNucleus(cx, cy, size, accent) {
  ctx.save();
  for (let i = 0; i < 18; i += 1) {
    const angle = i * 2.399963;
    const radius = Math.sqrt(i / 18) * size * 0.16;
    ctx.fillStyle = i % 2 === 0 ? accent : "#7eb6ff";
    ctx.globalAlpha = 0.92;
    circle(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius, size * 0.035);
  }
  ctx.restore();
}

function drawAtom(cx, cy, size, accent) {
  drawNucleus(cx, cy, size * 0.58, "#f38b6d");
  ctx.save();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 1.7;
  ctx.globalAlpha = 0.72;
  for (let i = 0; i < 4; i += 1) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, size * 0.23, size * 0.1, i * 0.78, 0, Math.PI * 2);
    ctx.stroke();
  }
  for (let i = 0; i < 7; i += 1) {
    const angle = i * 0.92 + window.scrollY * 0.001;
    circle(cx + Math.cos(angle) * size * 0.23, cy + Math.sin(angle) * size * 0.1, 4);
  }
  ctx.restore();
}

function drawMolecule(cx, cy, size, accent) {
  const points = [
    [cx - size * 0.2, cy + size * 0.06, "#f38b6d", 18],
    [cx, cy - size * 0.04, accent, 28],
    [cx + size * 0.2, cy + size * 0.07, "#7eb6ff", 18],
    [cx + size * 0.05, cy + size * 0.22, "#f2c572", 14],
  ];
  ctx.save();
  ctx.strokeStyle = "rgba(244, 240, 231, 0.52)";
  ctx.lineWidth = 5;
  [[0, 1], [1, 2], [1, 3]].forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(points[a][0], points[a][1]);
    ctx.lineTo(points[b][0], points[b][1]);
    ctx.stroke();
  });
  points.forEach(([x, y, color, radius]) => {
    ctx.fillStyle = color;
    circle(x, y, radius);
  });
  ctx.restore();
}

function drawPolymer(cx, cy, size, accent) {
  ctx.save();
  ctx.strokeStyle = "rgba(244, 240, 231, 0.46)";
  ctx.lineWidth = 4;
  ctx.beginPath();
  for (let i = 0; i < 12; i += 1) {
    const x = cx - size * 0.34 + i * size * 0.062;
    const y = cy + Math.sin(i * 0.95 + window.scrollY * 0.002) * size * 0.08;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  for (let i = 0; i < 12; i += 1) {
    const x = cx - size * 0.34 + i * size * 0.062;
    const y = cy + Math.sin(i * 0.95 + window.scrollY * 0.002) * size * 0.08;
    ctx.fillStyle = i % 3 === 0 ? accent : i % 3 === 1 ? "#f2c572" : "#f38b6d";
    circle(x, y, size * 0.022);
  }
  ctx.restore();
}

function drawCell(cx, cy, size, accent) {
  ctx.save();
  ctx.strokeStyle = accent;
  ctx.fillStyle = "rgba(115, 224, 169, 0.08)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(cx, cy, size * 0.25, size * 0.19, 0.1, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#f38b6d";
  circle(cx - size * 0.04, cy, size * 0.058);
  ctx.fillStyle = "#7eb6ff";
  for (let i = 0; i < 10; i += 1) {
    const angle = i * 2.399963;
    circle(cx + Math.cos(angle) * size * 0.15, cy + Math.sin(angle) * size * 0.1, size * 0.012);
  }
  ctx.restore();
}

function drawOrganism(cx, cy, size, accent) {
  ctx.save();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(cx, cy - size * 0.22);
  ctx.quadraticCurveTo(cx - size * 0.09, cy, cx - size * 0.04, cy + size * 0.22);
  ctx.stroke();
  ctx.lineWidth = 4;
  [
    [0, -0.08, -0.15, -0.15],
    [0, -0.05, 0.16, -0.13],
    [-0.03, 0.07, -0.16, 0.16],
    [-0.02, 0.12, 0.13, 0.22],
  ].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(cx + x1 * size, cy + y1 * size);
    ctx.lineTo(cx + x2 * size, cy + y2 * size);
    ctx.stroke();
  });
  ctx.fillStyle = "#f2c572";
  circle(cx, cy - size * 0.29, size * 0.055);
  ctx.restore();
}

function drawMind(cx, cy, size, accent) {
  ctx.save();
  const nodes = particles.slice(0, 28).map((dot, index) => {
    const angle = index * 2.399963 + window.scrollY * 0.0003;
    const radius = Math.sqrt(index / 28) * size * 0.26;
    return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius * 0.78];
  });
  ctx.strokeStyle = "rgba(244, 240, 231, 0.25)";
  ctx.lineWidth = 1;
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      if ((i + j) % 7 === 0) {
        ctx.beginPath();
        ctx.moveTo(nodes[i][0], nodes[i][1]);
        ctx.lineTo(nodes[j][0], nodes[j][1]);
        ctx.stroke();
      }
    }
  }
  nodes.forEach(([x, y], index) => {
    ctx.fillStyle = index % 3 === 0 ? accent : index % 3 === 1 ? "#73e0a9" : "#f2c572";
    circle(x, y, 5);
  });
  ctx.restore();
}

function circle(x, y, radius) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

buildLayerMarkup();
resizeCanvas();
updateSpeedLabel();
updateAuditStatus();
updateActiveLayer();

window.addEventListener("resize", resizeCanvas);
window.addEventListener("scroll", () => {
  updateActiveLayer();
  draw();
});

prevButton.addEventListener("click", () => scrollToLayer(activeIndex - 1));
nextButton.addEventListener("click", () => scrollToLayer(activeIndex + 1));
focusButton.addEventListener("click", () => scrollToLayer(activeIndex));
playClimb.addEventListener("click", toggleClimb);
speedRange.addEventListener("input", updateSpeedLabel);
sourceToggle.addEventListener("click", () => {
  sourcePanelOpen = !sourcePanelOpen;
  setActiveLayer(activeIndex);
});
truthMode.addEventListener("change", () => {
  showCaveats = truthMode.checked;
  setActiveLayer(activeIndex);
});

window.addEventListener("wheel", stopClimb, { passive: true });
window.addEventListener("touchstart", stopClimb, { passive: true });

window.addEventListener("keydown", (event) => {
  const target = event.target;
  if (["INPUT", "BUTTON", "A"].includes(target.tagName)) return;
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === " ") {
    event.preventDefault();
    toggleClimb();
  }
  if (event.key === "ArrowLeft") scrollToLayer(activeIndex - 1);
  if (event.key === "ArrowRight") scrollToLayer(activeIndex + 1);
});
