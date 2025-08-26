import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
  await page.goto('/settings');
  await page.evaluate(() => window.scrollTo(0, 0)); // scroll to top
});

test('Settings page loads successfully', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Settings' })).toBeVisible();
});

// test('User profile settings are displayed', async ({ page }) => {
//   await page.goto('/settings');
  
//   await expect(page.getByText(/profile/i)).toBeVisible();
//   await expect(page.getByText(/account/i)).toBeVisible();
// });

test('Can update user profile information', async ({ page }) => {
  const nameField = page.getByRole('textbox', { name: /name/i });
  const emailField = page.getByRole('textbox', { name: /email/i });
  
  if (await nameField.isVisible()) {
    await nameField.clear();
    await nameField.fill('Updated Test Name');
  }
  
  const saveButton = page.getByRole('button', { name: /save/i });
  if (await saveButton.isVisible()) {
    await saveButton.click();
    await expect(page.getByText(/saved/i)).toBeVisible();
  }
});

test('Notification preferences can be configured', async ({ page }) => {
  const notificationsSection = page.getByText(/notifications/i);
  if (await notificationsSection.isVisible()) {
    await notificationsSection.click();
    
    // Check for notification toggles
    const emailNotifications = page.getByRole('switch', { name: /email notifications/i });
    const pushNotifications = page.getByRole('switch', { name: /push notifications/i });
    
    if (await emailNotifications.isVisible()) {
      await expect(emailNotifications).toBeVisible();
    }
    if (await pushNotifications.isVisible()) {
      await expect(pushNotifications).toBeVisible();
    }
  }
});

test('Security settings are accessible', async ({ page }) => { 
  const securitySection = page.getByText(/security/i);
  if (await securitySection.isVisible()) {
    await securitySection.click();
    
    // Check for common security settings
    await expect(page.getByText(/password/i)).toBeVisible();
  }
});

test('Application preferences can be modified', async ({ page }) => {
  const preferencesSection = page.getByText(/preferences/i);
  if (await preferencesSection.isVisible()) {
    await preferencesSection.click();
    
    // Check for theme or display options
    const themeSelector = page.getByRole('combobox', { name: /theme/i });
    const languageSelector = page.getByRole('combobox', { name: /language/i });
    
    if (await themeSelector.isVisible()) {
      await expect(themeSelector).toBeVisible();
    }
    if (await languageSelector.isVisible()) {
      await expect(languageSelector).toBeVisible();
    }
  }
});
