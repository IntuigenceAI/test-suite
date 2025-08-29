# Playwright Test Suite

Automated UI testing suite using Playwright with automatic authentication management.

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
export BASE_URL=https://azs-dev-eng-1.intuigence.ai/
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

The test suite automatically generates a jwt token using authress sdk.

No manual auth setup required - just run tests and login when prompted.

## Dependencies

- **@playwright/test**: End-to-end testing framework
- **dotenv**: Environment variable management

## Configuration

- `playwright.config.js`: Main Playwright configuration
- `get-token.js`: Automatic authentication handling

## Test Reports

Results are generated in:
- `test-results/`: Detailed test execution data
- `playwright-report/`: HTML test reports
