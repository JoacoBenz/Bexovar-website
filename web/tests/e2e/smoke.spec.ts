import { test, expect } from "@playwright/test";

test("homepage renders hero + proof + services + closing CTA", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Bexovar", exact: true }).first()).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/busywork/i);
  await expect(page.getByText("42%")).toBeVisible();
  await expect(page.getByRole("link", { name: /book a call/i }).first()).toBeVisible();
  await expect(page.getByText(/© \d{4} Bexovar/)).toBeVisible();
});

test("skip link works", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: /skip to content/i })).toBeFocused();
});

test("/services lists all four services", async ({ page }) => {
  await page.goto("/services");
  for (const label of ["Custom Software", "RPA & Agents", "Systems Integration", "Process Consulting"]) {
    await expect(page.getByRole("link", { name: new RegExp(label, "i") }).first()).toBeVisible();
  }
});

test("/services/custom-software renders", async ({ page }) => {
  await page.goto("/services/custom-software");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Custom Software|internal tools/i);
});

test("/about renders mission and values", async ({ page }) => {
  await page.goto("/about");
  await expect(page.getByRole("heading", { name: /Our mission/i })).toBeVisible();
  await expect(page.getByText(/Outcomes over artifacts/i)).toBeVisible();
});

test("/how-we-work renders phases and FAQ", async ({ page }) => {
  await page.goto("/how-we-work");
  await expect(page.getByText(/Discover/i).first()).toBeVisible();
  await expect(page.getByText(/How do you price engagements/i)).toBeVisible();
});

test("unknown URL renders the 404 page", async ({ page }) => {
  const res = await page.goto("/this-route-does-not-exist");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /page not found/i })).toBeVisible();
});
