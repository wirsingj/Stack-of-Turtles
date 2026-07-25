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

  await page.getByLabel("Current layer detail").getByRole("button", { name: /source anchors/ }).click();
  await page.getByText("CERN: The Standard Model").waitFor();

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
