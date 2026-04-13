import { test, expect } from "@playwright/test";

test("homepage renders nav, hero, cards, footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Bexovar", exact: true }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /foundation/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /book a call/i }).first()).toBeVisible();
  await expect(page.getByText(/© \d{4} Bexovar/)).toBeVisible();
});

test("skip link works", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: /skip to content/i });
  await expect(skip).toBeFocused();
});
