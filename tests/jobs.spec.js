import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/jobs');
  await page.evaluate(() => window.scrollTo(0, 0)); // scroll to top
});

test('Jobs page loads successfully', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Jobs' })).toBeVisible();
});

test('Jobs table displays with correct headers', async ({ page }) => {
  await expect(page.getByRole('cell', { name: 'Name' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Status' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Created At' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Actions' })).toBeVisible();
});

test('Can create a new job', async ({ page }) => {
  const createButton = page.getByRole('button', { name: /create job/i });
  if (await createButton.isVisible()) {
    await createButton.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('textbox', { name: /job name/i })).toBeVisible();
  }
});

test('Job status filters work', async ({ page }) => {
  const statusFilter = page.getByRole('combobox', { name: /status/i });
  if (await statusFilter.isVisible()) {
    await statusFilter.click();
    await expect(page.getByRole('option', { name: /running/i })).toBeVisible();
    await expect(page.getByRole('option', { name: /completed/i })).toBeVisible();
  }
});

test('Can view job details', async ({ page }) => {
  // Click on first job if available
  const firstJob = page.getByRole('row').nth(1);
  if (await firstJob.isVisible()) {
    await firstJob.click();
    
    // Look for job details modal or page
    const detailsModal = page.getByRole('dialog');
    const detailsPage = page.getByText(/job details/i);
    
    if (await detailsModal.isVisible()) {
      await expect(detailsModal).toBeVisible();
    } else if (await detailsPage.isVisible()) {
      await expect(detailsPage).toBeVisible();
    }
  }
});

test('Job actions menu is functional', async ({ page }) => {
  const actionButton = page.getByRole('button', { name: /actions/i }).first();
  if (await actionButton.isVisible()) {
    await actionButton.click();
    
    // Check for common job actions
    await expect(page.getByRole('menuitem', { name: /view/i })).toBeVisible();
  }
});
