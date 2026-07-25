const path = require("path");

async function main() {
  let chromium;
  try {
    ({ chromium } = require("playwright"));
  } catch (error) {
    console.log("Playwright is not available in this environment; skipping browser smoke check.");
    return;
  }

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  const fileUrl = `file://${path.resolve(__dirname, "..", "index.html").replace(/\\/g, "/")}`;
  await page.goto(fileUrl);

  await page.getByLabel("Scroll outward visualization").getByRole("heading", { name: "Quantum fields" }).waitFor();
  await page.getByLabel("Current layer detail").getByRole("button", { name: /source anchors/ }).waitFor();
  await page.getByLabel("Current layer detail").getByText("Structural scale").waitFor();
  if (await page.locator("#sourcePanel").isVisible()) {
    throw new Error("Source panel should be hidden on first load.");
  }
  if (await page.locator(".layer-copy").first().isVisible()) {
    throw new Error("Scroll checkpoint layer copy should not compete with the HUD.");
  }

  await page.getByLabel("Current layer detail").getByRole("button", { name: /source anchors/ }).click();
  await page.getByText("CERN: The Standard Model").waitFor();

  await page.getByRole("button", { name: "Next layer" }).click();
  await page.getByLabel("Scroll outward visualization").getByRole("heading", { name: "Particles" }).waitFor();
  await page.getByRole("button", { name: "Previous layer" }).click();
  await page.getByLabel("Scroll outward visualization").getByRole("heading", { name: "Quantum fields" }).waitFor();

  await page.locator("#truthMode").check();
  await page.locator("#detailCaveat").waitFor({ state: "visible" });

  await page.getByRole("button", { name: "Climb" }).click();
  await page.waitForTimeout(350);
  await page.getByRole("button", { name: "Pause" }).click();

  await page.setViewportSize({ width: 390, height: 780 });
  await page
    .getByLabel("Scroll outward visualization")
    .getByRole("heading", { name: /Quantum fields|Particles|Hadrons|Nuclei|Atoms|Molecules|Polymers|Cells|Organisms|Minds/ })
    .waitFor();
  if (await page.locator("#sourcePanel").isVisible()) {
    await page.locator("#sourceToggle").click();
  }
  const caveatBox = await page.locator("#detailCaveat").boundingBox();
  if (!caveatBox || caveatBox.y > 780) {
    throw new Error("Truth-mode caveat should be visible in the mobile viewport.");
  }

  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 1024, height: 768 },
    { width: 768, height: 900 },
    { width: 390, height: 780 },
    { width: 320, height: 700 },
  ]) {
    await page.setViewportSize(viewport);
    const result = await page.evaluate(() => ({
      hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      sourcePanelVisible: !!document.querySelector("#sourcePanel") && !document.querySelector("#sourcePanel").hidden,
      duplicateLayerVisible:
        !!document.querySelector(".layer-copy") &&
        getComputedStyle(document.querySelector(".layer-copy")).display !== "none",
    }));

    if (result.hasHorizontalOverflow) throw new Error(`Horizontal overflow at ${viewport.width}x${viewport.height}.`);
    if (result.sourcePanelVisible) throw new Error(`Source panel unexpectedly visible at ${viewport.width}x${viewport.height}.`);
    if (result.duplicateLayerVisible) throw new Error(`Layer copy visible at ${viewport.width}x${viewport.height}.`);
  }

  await page.setViewportSize({ width: 320, height: 780 });
  await page.locator("#sourceToggle").click();
  const narrowSourceOpen = await page.evaluate(() => ({
    hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    sourcePanelVisible: !!document.querySelector("#sourcePanel") && !document.querySelector("#sourcePanel").hidden,
  }));
  if (narrowSourceOpen.hasHorizontalOverflow) throw new Error("Horizontal overflow with narrow source drawer open.");
  if (!narrowSourceOpen.sourcePanelVisible) throw new Error("Source drawer should open at narrow width.");

  await browser.close();

  if (consoleErrors.length) {
    console.error(consoleErrors.join("\n"));
    process.exit(1);
  }

  console.log("Browser smoke check passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
