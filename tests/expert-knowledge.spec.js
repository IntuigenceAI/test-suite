import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/expert-knowledge');
  await page.evaluate(() => window.scrollTo(0, 0)); // scroll to top
});

test('Expert Knowledge page loads successfully', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Expert Knowledge' })).toBeVisible();
});

test('Knowledge search functionality works', async ({ page }) => {
  const searchInput = page.getByRole('textbox', { name: 'Search topics...' });
  await expect(searchInput).toBeVisible();
  
  await searchInput.fill('pump');
  await expect(searchInput).toHaveValue('pump');
});

test('New topic button is available', async ({ page }) => {
  await expect(page.getByRole('button', { name: 'New topic' })).toBeVisible();
});

test('Knowledge topics table displays correctly', async ({ page }) => {
  // Check table structure
  const table = page.getByRole('table');
  await expect(table).toBeVisible();
  
  // Check table headers
  await expect(page.getByRole('cell', { name: 'Topic' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Description' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Operator', exact : true})).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Created on' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Status' })).toBeVisible();
});

test('Existing knowledge topics are displayed', async ({ page }) => {
  // Look for existing topics 
  const topicRows = page.getByRole('row');
  const rowCount = await topicRows.count();
  
  if (rowCount > 1) { // More than just header row
    await expect(page.getByText('RCA Pump Inquiry')).toBeVisible();
    await expect(page.getByText('AICE Operator')).toBeVisible();
    await expect(page.getByText('Unpublished')).toBeVisible();
  }
});

test('Can click on knowledge topic for details', async ({ page }) => {
  // Click on first topic if available
  const firstTopic = page.getByText('RCA Pump Inquiry');
  if (await firstTopic.isVisible()) {
    await firstTopic.click();
    
    // The row should be clickable
    const topicRow = page.getByRole('row').filter({ hasText: 'RCA Pump Inquiry' });
    await expect(topicRow).toBeVisible();
  }
});
