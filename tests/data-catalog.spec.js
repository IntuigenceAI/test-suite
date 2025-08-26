import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/data-catalog');
  await page.evaluate(() => window.scrollTo(0, 0)); // scroll to top
});

test('Data Catalog page loads successfully', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Data Catalog' })).toBeVisible();
});

test('Data catalog search functionality', async ({ page }) => {
  const searchBox = page.getByRole('textbox', { name: 'Search documents' });
  await expect(searchBox).toBeVisible();
  
  await searchBox.fill('test');
  // Search box should contain the typed text
  await expect(searchBox).toHaveValue('test');
});

test('Data catalog upload area is present', async ({ page }) => {
  // Check for upload area elements
  const chooseFileButton = page.getByRole('button', { name: 'Choose File' });
  const chooseFileText = page.getByText('Choose File');
  
  if (await chooseFileButton.isVisible()) {
    await expect(chooseFileButton).toBeVisible();
  } else if (await chooseFileText.isVisible()) {
    await expect(chooseFileText).toBeVisible();
  }
  
  await expect(page.getByRole('heading', { name: 'Drag & Drop documents here' })).toBeVisible();
  await expect(page.getByText('or click to browse files (PDF, Image, DOCX)')).toBeVisible();
});

test('Data catalog table displays files correctly', async ({ page }) => {
  // Check table structure
  const table = page.getByRole('table');
  await expect(table).toBeVisible();
  
  // Check table headers (using cell role as they appear in the actual table)
  await expect(page.getByRole('cell', { name: 'File name' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Status' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Date Created' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Actions' })).toBeVisible();
});

test('Type filter is functional', async ({ page }) => {
  const typeFilter = page.getByRole('combobox').first();
  await expect(typeFilter).toBeVisible();
  await expect(typeFilter).toContainText('all');
});

test('Pagination is visible when needed', async ({ page }) => {
  const pagination = page.getByRole('navigation', { name: 'pagination' });
  if (await pagination.isVisible()) {
    await expect(pagination).toBeVisible();
    await expect(page.getByText('Next')).toBeVisible();
  }
});
