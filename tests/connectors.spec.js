import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/connectors');
  await page.evaluate(() => window.scrollTo(0, 0)); // scroll to top
});

test('Connector page loads and displays main elements', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Connectors' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Create New Connector' })).toBeVisible();
});

test('Connector table displays correct headers', async ({ page }) => {
  await expect(page.getByRole('cell', { name: 'Name' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Type' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Description' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Status' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Actions' })).toBeVisible();
});

test('Create New Connector dialog opens', async ({ page }) => {
  await page.getByRole('button', { name: 'Create New Connector' }).click();
  await expect(page.getByRole('dialog', { name: 'Create New Connector' })).toBeVisible();
  await expect(page.getByText('Connector Name')).toBeVisible();
  await expect(page.getByRole('dialog').getByText('Description')).toBeVisible();
});

test('Create New Connector dialog functionality', async ({ page }) => {
  await page.getByRole('button', { name: 'Create New Connector' }).click();
  
  // Verify dialog elements
  await expect(page.getByRole('dialog', { name: 'Create New Connector' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Connector Name' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Description' })).toBeVisible();
  await expect(page.getByRole('combobox')).toBeVisible();
  await expect(page.getByRole('spinbutton', { name: 'Interval (seconds)' })).toBeVisible();
  
  // Fill out form
  await page.getByRole('textbox', { name: 'Connector Name' }).fill('Test Connector');
  await page.getByRole('textbox', { name: 'Description' }).fill('Test description');
  
  // Verify buttons
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Create' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Close' })).toBeVisible();
  
  // Close dialog
  await page.getByRole('button', { name: 'Close' }).click();
});
//needs modification
// test('Existing connectors are displayed correctly', async ({ page }) => {
//   await page.goto('/connectors');
  
//   // Check that connectors table shows real data
//   const table = page.getByRole('table');
//   await expect(table).toBeVisible();
  
//   // Look for existing connectors (based on what I saw in the actual page)
//   const connectorRows = page.getByRole('row');
//   const rowCount = await connectorRows.count();
  
//   if (rowCount > 1) { // More than just header row
//     await expect(page.getByText('My non-routable database')).toBeVisible();
//     await expect(page.getByRole('cell', { name: 'SQL' }).first()).toBeVisible();
//     await expect(page.getByText('Disconnected')).toBeVisible();
//   }
// });

test('Navigation menu is visible', async ({ page }) => {
  await expect(page.getByRole('navigation')).toBeVisible();
});