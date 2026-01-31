import { test, expect } from '@playwright/test';

test.describe('Editions Home Page', () => {
  test('should load home page with chapters', async ({ page }) => {
    await page.goto('/en');

    // Check for chapter navigation
    await expect(page.locator('nav[aria-label="Chapter navigation"]')).toBeVisible();

    // Check for first chapter
    await expect(page.locator('#chapter-movement')).toBeVisible();

    // Check for chapter title
    await expect(page.getByText('The Art of Movement')).toBeVisible();
  });

  test('should navigate to chapter on click', async ({ page }) => {
    await page.goto('/en');

    // Wait for nav to appear
    await page.waitForSelector('nav[aria-label="Chapter navigation"]');

    // Click on a chapter nav item
    const classesButton = page.getByRole('button', { name: /Our Classes/i });
    await classesButton.click();

    // Wait for scroll and check URL hash
    await page.waitForTimeout(1500);
    expect(page.url()).toContain('#chapter-classes');
  });

  test('should switch language and preserve content', async ({ page }) => {
    await page.goto('/en');

    // Click French language switcher
    await page.click('button:has-text("Français")');

    // Check URL changed to /fr
    await expect(page).toHaveURL(/\/fr/);

    // Check French content is visible
    await expect(page.getByText("L'Art du Mouvement")).toBeVisible();
  });
});

test.describe('Classes Page', () => {
  test('should display classes and filter', async ({ page }) => {
    await page.goto('/en/classes');

    // Check page title
    await expect(page.getByText('Our Classes')).toBeVisible();

    // Check at least one class is visible
    await expect(page.getByText('Reformer Foundations')).toBeVisible();

    // Click filter
    await page.click('button:has-text("Beginner")');

    // Verify filtered results
    await expect(page.getByText('Reformer Foundations')).toBeVisible();
  });
});
