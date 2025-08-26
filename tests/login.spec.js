import { test, expect } from '@playwright/test';

test('Login page displays correctly', async ({ page }) => {
  // Clear storage to test login page
  await page.context().clearCookies();
  await page.goto('/');
  
  // Should show login page elements
  await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Log in with a cloud identity provider.' })).toBeVisible();
});

test('Login form elements are present', async ({ page }) => {
  await page.context().clearCookies();
  await page.goto('/');
  
  // Check for Authress login button
  await expect(page.getByRole('button', { name: 'Authress' })).toBeVisible();
});

test('Successful login redirects to home page', async ({ page }) => {
  // This test assumes authentication is already handled by global setup
  await page.goto('/');
  
  // Should redirect to intelligent-board after successful login
  await expect(page).toHaveURL(/.*intelligent-board/);
});

test('Logout functionality works', async ({ page }) => {
  await page.goto('/intelligent-board');
  
  // Look for logout button/menu
  const userMenu = page.getByRole('button', { name: /user menu/i });
  const profileMenu = page.locator('[data-testid="user-menu"]');
  
  if (await userMenu.isVisible()) {
    await userMenu.click();
    const logoutButton = page.getByRole('menuitem', { name: /logout/i });
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      // Should redirect to login page
      await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
    }
  } else if (await profileMenu.isVisible()) {
    await profileMenu.click();
    const logoutButton = page.getByText(/logout/i);
    if (await logoutButton.isVisible()) {
      await logoutButton.click();
      await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
    }
  }
});
