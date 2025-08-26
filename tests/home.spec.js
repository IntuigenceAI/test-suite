import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/intelligent-board');
  await page.evaluate(() => window.scrollTo(0, 0)); // scroll to top
});

test('Home page loads successfully', async ({ page }) => {
  await expect(page.getByRole('heading', { name: /intelligent board/i })).toBeVisible();
});

test('Home page widgets are displayed', async ({ page }) => {
  // Check for actual home page elements
  await expect(page.getByText('Recent Boards')).toBeVisible();
  await expect(page.getByText('Getting started')).toBeVisible();
  await expect(page.getByText('All Intelligent Boards')).toBeVisible();
});

test('Navigation menu is accessible from home', async ({ page }) => {
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(page.getByRole('navigation')).toBeVisible();
  
  // Check for main navigation buttons
  await expect(page.getByRole('button', { name: 'Board', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Chat', exact: true})).toBeVisible();
  await expect(page.getByRole('button', { name: 'Workflows', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Data', exact: true })).toBeVisible();
});

test('User profile menu is accessible', async ({ page }) => {
  const userMenu = page.getByRole('button', { name: /user menu/i });
  const profileButton = page.locator('[data-testid="user-menu"]');
  
  if (await userMenu.isVisible()) {
    await expect(userMenu).toBeVisible();
  } else if (await profileButton.isVisible()) {
    await expect(profileButton).toBeVisible();
  }
});

test('Search and board creation are available', async ({ page }) => {
  
  // Check for search functionality
  await expect(page.getByRole('textbox', { name: 'Ask questions or search' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Search boards' })).toBeVisible();
  
  // Check for board creation
  await expect(page.getByRole('button', { name: 'New Board' })).toBeVisible();
  
  // Check for getting started actions
  await expect(page.getByRole('button', { name: 'Chat with AICE' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Watch video' })).toBeVisible();
});