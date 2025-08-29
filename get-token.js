const { ServiceClientTokenProvider } = require('@authress/sdk');
const fs = require('fs');
require('dotenv').config();

async function generateToken() {
  const tokenProvider = new ServiceClientTokenProvider(process.env.ACCESS_KEY, process.env.AUTHRESS_DOMAIN );

  const token = await tokenProvider.getToken();

  // Build storageState format for Playwright
  const storageState = {
    origins: [
      {
        origin: process.env.BASE_URL,
        localStorage: [
          { name: 'authress_token', value: token }
        ]
      }
    ]
  };

  fs.writeFileSync('./storage-state.json', JSON.stringify(storageState, null, 2));
  console.log(`Saved token to ${'./storage-state.json'}`);
}

generateToken().catch(console.error);
