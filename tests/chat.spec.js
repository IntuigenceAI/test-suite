import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/chat');
  await page.evaluate(() => window.scrollTo(0, 0)); // scroll to top
});

test('Chat page loads successfully', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'IntuAI Support Engineer' })).toBeVisible();
});

test('Chat interface elements are present', async ({ page }) => {
  await expect(page.getByRole('textbox', { name: 'Type your message...' })).toBeVisible();
  await expect(page.getByText('Welcome to IntuAI Assistant!')).toBeVisible();
  await expect(page.getByText('Ask me anything')).toBeVisible();
});

test('Board selector is functional', async ({ page }) => {
  const boardSelector = page.getByRole('combobox');
  await expect(boardSelector).toBeVisible();
  await expect(boardSelector).toContainText('Select A Board');
});

test('Can type in message input', async ({ page }) => {
  const messageInput = page.getByRole('textbox', { name: 'Type your message...' });
  
  await messageInput.fill('Hello, can you help me?');
  await expect(messageInput).toHaveValue('Hello, can you help me?');
});
