// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const fs = require('fs');
const { execSync } = require('child_process');
require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
if (!fs.existsSync('./storage-state.json')) {
  console.log('No storage-state.json found 2. Generating JWT...');
  execSync('node get-token.js', { stdio: 'inherit' });
}
module.exports = defineConfig({
 
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',
 
  use: {
    baseURL: process.env.BASE_URL,
    storageState: './storage-state.json',

    trace: 'on-first-retry',
    
    launchOptions: {
      args: ['--disable-features=DocumentPolicy']
    }
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ]
});