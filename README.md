# Playwright Test Suite

Automated end-to-end testing suite for web application using Playwright with automatic authentication management.

## Features

- **Automatic Authentication**: Tests automatically check and refresh authentication before running
- **Cross-Browser Testing**: Supports Chrome and Edge browsers

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set environment variables (optional):
```bash
# Set BASE_URL = staging url
export BASE_URL=https://your-app-url.com
```

## Running Tests

```bash
# Run all tests
npm test

# Run with browser visible
npm run test:headed

# Run in debug mode
npm run test:debug

# Run with Playwright UI
npm run test:ui

# Or use Playwright directly
npx playwright test
```

## Authentication

The test suite automatically manages authentication:

- **First run**: Opens browser for manual login, saves session
- **Subsequent runs**: Reuses saved session if valid
- **Expired session**: Automatically prompts for re-login

No manual auth setup required - just run tests and login when prompted.

## Dependencies

- **@playwright/test**: End-to-end testing framework
- **@authress/login**: Authress authentication library
- **dotenv**: Environment variable management

## Configuration

- `playwright.config.js`: Main Playwright configuration
- `global-setup.js`: Automatic authentication handling
- `authress/`: Authentication state storage

## Test Reports

Results are generated in:
- `test-results/`: Detailed test execution data
- `playwright-report/`: HTML test reports