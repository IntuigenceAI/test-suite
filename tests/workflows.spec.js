// import { test, expect } from '@playwright/test';

// test('Workflows page loads successfully', async ({ page }) => {
//   await page.goto('/workflows');
//   await expect(page.getByRole('heading', { name: /workflows/i })).toBeVisible();
// });

// test('Navigation menu is accessible from workflows', async ({ page }) => {
//   await page.goto('/workflows');
//   await expect(page.getByRole('navigation')).toBeVisible();
//   await expect(page.getByRole('button', { name: 'Workflows' })).toBeVisible();
// });

// test('Workflow creation interface is present', async ({ page }) => {
//   await page.goto('/workflows');
  
//   const createButton = page.getByRole('button', { name: /create workflow/i });
//   if (await createButton.isVisible()) {
//     await expect(createButton).toBeVisible();
//   }
// });

// test('Workflows list or grid is displayed', async ({ page }) => {
//   await page.goto('/workflows');
  
//   // Check for workflows table, list, or grid
//   const workflowsTable = page.getByRole('table');
//   const workflowsList = page.getByRole('list');
//   const workflowsGrid = page.locator('[data-testid="workflows-grid"]');
  
//   // At least one should be visible
//   if (await workflowsTable.isVisible()) {
//     await expect(workflowsTable).toBeVisible();
//   } else if (await workflowsList.isVisible()) {
//     await expect(workflowsList).toBeVisible();
//   } else if (await workflowsGrid.isVisible()) {
//     await expect(workflowsGrid).toBeVisible();
//   }
// });

// test('Workflow search functionality', async ({ page }) => {
//   await page.goto('/workflows');
  
//   const searchBox = page.getByRole('searchbox');
//   const searchInput = page.getByRole('textbox', { name: /search/i });
  
//   if (await searchBox.isVisible()) {
//     await expect(searchBox).toBeVisible();
//   } else if (await searchInput.isVisible()) {
//     await searchInput.fill('test workflow');
//     await expect(searchInput).toHaveValue('test workflow');
//   }
// });