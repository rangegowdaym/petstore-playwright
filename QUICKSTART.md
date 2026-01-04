# Quick Start Guide

Get started with the Petstore API Test Automation Framework in minutes!

## 🚀 Installation

### Prerequisites
- Node.js 18+ installed
- npm 9+ installed

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/rangegowdaym/petstore-playwright.git
   cd petstore-playwright
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify setup**
   ```bash
   npx tsc --noEmit          # Check TypeScript compilation
   npx cucumber-js --dry-run # Verify Cucumber configuration
   ```

## 🧪 Running Your First Test

### Run a single smoke test
```bash
npx cucumber-js src/features/Pet.feature --tags '@smoke and @create'
```

### Run all smoke tests
```bash
npm run test:smoke
```

### Run all tests
```bash
npm test
```

## 📊 View Test Results

### Generate Allure Report
```bash
npm run allure:serve
```

This will:
1. Generate the Allure report from test results
2. Start a local web server
3. Open the report in your default browser

## 🎯 Common Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:smoke` | Run smoke tests only |
| `npm run test:regression` | Run regression tests only |
| `npm run test:pet` | Run Pet API tests |
| `npm run test:user` | Run User API tests |
| `npm run test:store` | Run Store API tests |
| `npm run allure:serve` | Generate and open Allure report |
| `npm run clean` | Clean all generated files |

## 📝 Project Structure at a Glance

```
petstore-playwright/
├── src/
│   ├── features/           # ← Gherkin feature files (BDD scenarios)
│   ├── step-definitions/   # ← Step implementations
│   ├── services/           # ← API service layer
│   ├── models/             # ← TypeScript interfaces
│   ├── support/            # ← Cucumber World & Hooks
│   └── config/             # ← Configuration
├── allure-results/         # ← Test results (auto-generated)
└── allure-report/          # ← HTML report (auto-generated)
```

## 🎓 Writing Your First Test

### 1. Add a scenario to a feature file

Edit `src/features/Pet.feature`:

```gherkin
@smoke @pet @custom
Scenario: My first test
  Given I have a pet with name "TestPet" and status "available"
  When I create the pet
  Then the response status code should be 200
```

### 2. Run your test

```bash
npx cucumber-js --tags '@custom'
```

That's it! The step definitions already exist for these steps.

## 🔍 Understanding the Flow

1. **Feature File** → Describes WHAT to test (Gherkin)
2. **Step Definition** → Implements HOW to test (TypeScript)
3. **Service** → Makes API calls (Playwright)
4. **Model** → Defines data structure (TypeScript Interface)
5. **World** → Shares context between steps

## 🐛 Troubleshooting

### Issue: Cannot find module errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors
```bash
npx tsc --noEmit
```

### Issue: Tests not found
Check that `cucumber.js` has the correct paths configuration.

## 📚 Next Steps

1. ✅ Read the full [README.md](README.md) for detailed documentation
2. ✅ Review [VERIFICATION.md](VERIFICATION.md) for setup validation
3. ✅ Explore the feature files in `src/features/`
4. ✅ Check out step definitions in `src/step-definitions/`
5. ✅ Customize the framework for your needs

## 💡 Tips

- Use `--tags` to filter tests: `npx cucumber-js --tags '@smoke and @pet'`
- Use `--dry-run` to validate without executing: `npx cucumber-js --dry-run`
- Check results in `allure-results/` directory after test runs
- All test data is isolated per scenario (no test interference)

## 🎉 You're Ready!

You now have a fully functional BDD test automation framework. Happy testing! 🚀
