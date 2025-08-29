import { test, expect } from '@playwright/test';

test('check localStorage', async ({ page }) => {
  await page.goto('/');

  // Read the authress token from localStorage
const token = await page.evaluate(() => localStorage.getItem('authress_token'));
const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
console.log('JWT payload:', payload);

});