// global-setup.js
const checkAuth = require('./check-auth');
require('dotenv').config();

async function globalSetup(config) {
  
  // Run authentication check before tests
  await checkAuth();
  
  console.log('Global setup completed');
}

module.exports = globalSetup;