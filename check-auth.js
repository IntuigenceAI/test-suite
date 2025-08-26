// check-auth.js
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

async function checkAuth() {
  const authFile = path.join(__dirname, 'storage-state.json');
  
  // Check if we have valid auth state
  if (fs.existsSync(authFile)) {
    try {
      const authState = JSON.parse(fs.readFileSync(authFile, 'utf8'));
      if (isTokenValid(authState)) {
        return;
      }
    } catch (error) {
      console.log('Error reading storage-state.json:', error.message);
    }
  }
  
  console.log('No valid token found. Launching manual login...');
  
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    // Navigate to base URL for manual login
    await page.goto(process.env.BASE_URL);
    
    // Wait for user to complete login
    console.log('Please complete login in the browser...');
    console.log('Waiting for you to complete authentication...');
    
    // Wait for successful login - look for the home page URL
    // This waits up to 5 minutes for login completion
    try {
      console.log('Waiting for login completion (will auto-close when you reach /intelligent-board)...');
      
      // Wait for the home page URL which indicates successful login
      await page.waitForURL('**/intelligent-board**', { timeout: 300000 });
      
      console.log('Login successful! Detected home page, saving authentication state...');
    } catch (error) {
      console.log('Timeout waiting for /intelligent-board URL. Checking current state...');
    }
    
    // Save auth state
    const storageState = await context.storageState();
    fs.writeFileSync(authFile, JSON.stringify(storageState, null, 2));
    console.log('Authentication successful! State saved to storage-state.json');
    
  } catch (error) {
    console.error('Authentication failed:', error.message);
    throw error;
  } finally {
    await browser.close();
  }
  
  console.log('Auth check completed');
}

function isTokenValid(authState) {
  // Check if we have cookies or localStorage with actual authentication tokens
  if (!authState.origins) return false;
  
  // Check for actual auth tokens in localStorage (not just session setup)
  for (const origin of authState.origins) {
    if (origin.localStorage) {
      const hasAuthToken = origin.localStorage.some(item => {
        const name = item.name.toLowerCase();
        // Look for specific auth tokens, exclude session setup tokens
        return (name.includes('access_token') || 
                name.includes('id_token') || 
                name.includes('jwt') ||
                (name.includes('token') && !name.includes('nonce') && !name.includes('request'))) &&
               item.value && item.value.length > 20; // Must have substantial value
      });
      if (hasAuthToken) return true;
    }
  }
  
  // Check for actual authentication cookies (not just session setup)
  if (authState.cookies) {
    const hasAuthCookie = authState.cookies.some(cookie => {
      const name = cookie.name.toLowerCase();
      // Look for specific auth cookies, exclude fingerprint/setup cookies
      return (name.includes('access_token') || 
              name.includes('id_token') ||
              name.includes('jwt') ||
              (name.includes('auth') && !name.includes('fingerprint') && !name.includes('nonce'))) &&
             cookie.value && cookie.value.length > 20; // Must have substantial value
    });
    if (hasAuthCookie) return true;
  }
  
  return false;
}

module.exports = checkAuth;