# Quick Start Guide

Get up and running with Petstore API tests in 5 minutes!

## 1. Prerequisites
- Node.js 18+ installed ([Download](https://nodejs.org/))
- Internet connection to petstore.swagger.io

## 2. Installation

```bash
# Clone the repository
git clone https://github.com/rangegowdaym/petstore-playwright.git
cd petstore-playwright

# Install dependencies
npm install
```

## 3. Run Your First Test

```bash
# Run all tests
npm test

# Or run smoke tests (faster, ~2 min)
npm run test:smoke
```

## 4. View Test Results

### Option A: Allure Report (Recommended)
```bash
npm run allure:serve
```
This opens a beautiful, interactive report in your browser.

### Option B: Playwright Report
```bash
npx playwright show-report
```

## Common Commands

```bash
# Run specific test suite
npm run test:pet         # Pet API tests only
npm run test:store       # Store API tests only
npm run test:user        # User API tests only

# Run by test type
npm run test:smoke       # Quick smoke tests
npm run test:regression  # Full regression suite

# Debug tests
npm run test:debug       # Opens Playwright Inspector
npm run test:headed      # See browser (for UI tests)

# Generate reports
npm run allure:generate  # Generate static report
npm run allure:open      # Open generated report
npm run allure:serve     # Generate and serve (one command)
```

## Project Structure

```
petstore-playwright/
├── src/
│   ├── api/
│   │   ├── clients/      → API client classes
│   │   ├── models/       → TypeScript types
│   │   └── config/       → API configuration
│   ├── tests/            → Test specifications
│   ├── fixtures/         → Test fixtures
│   └── utils/            → Helper functions
├── playwright.config.ts  → Playwright settings
├── package.json          → Dependencies & scripts
└── README.md            → Full documentation
```

## Test Tags

Use tags to run specific test categories:

- `@smoke` - Critical path tests (6 tests, ~2 min)
- `@regression` - Full test suite (18 tests, ~5 min)
- `@pet` - Pet API tests
- `@store` - Store API tests
- `@user` - User API tests
- `@create` - Create operations
- `@read` - Read operations
- `@update` - Update operations
- `@delete` - Delete operations

## Example: Run Specific Tags

```bash
# Run only create operations
npx playwright test --grep @create

# Run pet API smoke tests
npx playwright test --grep "@pet.*@smoke"

# Run everything except delete operations
npx playwright test --grep-invert @delete
```

## Troubleshooting

### Problem: "Cannot find module '@playwright/test'"
**Solution:**
```bash
npm install
```

### Problem: "getaddrinfo ENOTFOUND petstore.swagger.io"
**Solution:**
- Check your internet connection
- Verify you can access: https://petstore.swagger.io/v2/pet/findByStatus?status=available
- Check if you're behind a proxy/firewall

### Problem: "Command not found: allure"
**Solution:**
```bash
# Allure is already included, use npm scripts
npm run allure:serve
```

## What's Being Tested?

### Pet API
- ✅ Create, read, update, delete pets
- ✅ Search pets by status
- ✅ Manage pet categories and tags

### Store API
- ✅ Place orders
- ✅ View store inventory
- ✅ Manage orders

### User API
- ✅ Create, read, update, delete users
- ✅ User login/logout
- ✅ Manage user profiles

## Next Steps

1. **Explore tests**: Check out `src/tests/` to see test examples
2. **Read full docs**: See `README.md` for comprehensive documentation
3. **View test guide**: Check `TESTING.md` for detailed testing instructions
4. **Check conversion**: See `CONVERSION.md` for migration details

## Need Help?

- **Full Documentation**: [README.md](README.md)
- **Testing Guide**: [TESTING.md](TESTING.md)
- **Conversion Details**: [CONVERSION.md](CONVERSION.md)
- **Playwright Docs**: https://playwright.dev
- **Allure Docs**: https://docs.qameta.io/allure/

## Quick Test Example

Want to write your own test? Here's a simple example:

```typescript
import { test, expect } from '../fixtures/test-context';

test('My first API test @smoke', async ({ petClient }) => {
  const response = await petClient.getPetsByStatus('available');
  
  expect(response.status()).toBe(200);
  const pets = await response.json();
  expect(pets.length).toBeGreaterThan(0);
});
```

Happy Testing! 🚀
