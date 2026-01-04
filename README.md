# Petstore API Test Automation Framework

A modern, enterprise-grade API test automation framework built with **Playwright**, **TypeScript**, and **Allure reporting**. This framework provides comprehensive API testing for the Petstore API with support for smoke and regression test suites.

## 🏗️ Project Structure

```
petstore-playwright/
├── src/
│   ├── api/
│   │   ├── clients/           # API client classes
│   │   │   ├── PetClient.ts
│   │   │   ├── StoreClient.ts
│   │   │   └── UserClient.ts
│   │   ├── models/            # TypeScript interfaces/types
│   │   │   ├── Pet.ts
│   │   │   ├── Order.ts
│   │   │   ├── User.ts
│   │   │   ├── Category.ts
│   │   │   └── Tag.ts
│   │   └── config/
│   │       └── ApiConfig.ts   # API configuration
│   ├── tests/                 # Test specifications
│   │   ├── pet.spec.ts
│   │   ├── store.spec.ts
│   │   └── user.spec.ts
│   ├── fixtures/
│   │   └── test-context.ts    # Playwright fixtures
│   └── utils/
│       └── helpers.ts         # Helper functions
├── playwright.config.ts       # Playwright configuration
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript configuration
├── .gitignore
├── .env.example
└── README.md
```

## 🚀 Key Features

- ✅ **Playwright + TypeScript** - Modern, type-safe API testing
- ✅ **Allure Reporting** - Rich test reports with request/response attachments
- ✅ **Modular Architecture** - Clean separation of concerns with clients and models
- ✅ **Test Fixtures** - Reusable Playwright fixtures for API clients
- ✅ **Tag-based Execution** - Run tests by tags (@smoke, @regression, @pet, @user, @store)
- ✅ **Parallel Execution** - Fast test execution with configurable workers
- ✅ **CI/CD Ready** - Easy integration with GitHub Actions and other CI systems
- ✅ **Comprehensive Coverage** - All CRUD operations for Pet, Store, and User APIs

## 📋 Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ or **yarn** 1.22+

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/rangegowdaym/petstore-playwright.git
cd petstore-playwright
```

### 2. Install dependencies
```bash
npm install
```

### 3. Install Playwright browsers (optional for API-only tests)
```bash
npx playwright install
```

### 4. Configure environment (optional)
```bash
cp .env.example .env
# Edit .env with your settings if needed
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run specific test suites
```bash
# Pet API tests
npm run test:pet

# Store API tests
npm run test:store

# User API tests
npm run test:user
```

### Run by tags
```bash
# Smoke tests only
npm run test:smoke

# Regression tests only
npm run test:regression
```

### Run with UI (headed mode)
```bash
npm run test:headed
```

### Debug tests
```bash
npm run test:debug
```

## 📊 Test Reporting

### Generate and view Allure reports

#### Option 1: Generate and open static report
```bash
# Generate report
npm run allure:generate

# Open report in browser
npm run allure:open
```

#### Option 2: Serve report with live reload
```bash
npm run allure:serve
```

Allure reports include:
- ✅ Test execution summary with pass/fail statistics
- ✅ Test suites organized by features (Pet, Store, User)
- ✅ Full request/response details for each API call
- ✅ Execution timeline and history trends
- ✅ Categorized failures for easy debugging

## 📝 Test Scenarios

### Pet API Tests (`@pet`)
- ✅ Create a new pet (`@smoke @create`)
- ✅ Get pet by ID (`@regression @read`)
- ✅ Update pet status (`@regression @update`)
- ✅ Search pets by status - available, pending, sold (`@regression @search`)
- ✅ Delete a pet (`@smoke @delete`)

### Store API Tests (`@store`)
- ✅ Place a new order (`@smoke @order`)
- ✅ Get order by ID (`@regression @read`)
- ✅ Delete an order (`@regression @delete`)
- ✅ Get store inventory (`@smoke @inventory`)

### User API Tests (`@user`)
- ✅ Create a new user (`@smoke @create`)
- ✅ Get user by username (`@regression @read`)
- ✅ Update user information (`@regression @update`)
- ✅ Delete a user (`@smoke @delete`)
- ✅ User login (`@regression @login`)
- ✅ User logout (`@regression @logout`)

## 🏷️ Tagging Strategy

Tests use Playwright's grep functionality for tag-based execution:

- `@smoke` - Critical path tests (run on every commit)
- `@regression` - Full regression suite (run before releases)
- `@pet` - Pet API tests
- `@store` - Store API tests
- `@user` - User API tests
- `@create` - Create operations
- `@read` - Read/Get operations
- `@update` - Update operations
- `@delete` - Delete operations

## ⚙️ Configuration

### Environment Variables (.env)
```bash
# API Configuration
API_BASE_URL=https://petstore.swagger.io/v2
API_TIMEOUT=30000

# Test Configuration
TEST_TIMEOUT=60000
RETRY_COUNT=1
WORKERS=4

# Allure Configuration
ALLURE_RESULTS_DIR=./allure-results
ALLURE_REPORT_DIR=./allure-report
```

### Playwright Configuration (playwright.config.ts)
Key settings:
- Base URL: `https://petstore.swagger.io/v2`
- Timeout: 60 seconds per test
- Retries: 1 (configurable)
- Workers: 4 (parallel execution)
- Reporters: HTML, Allure

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: API Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run smoke tests
        run: npm run test:smoke
        
      - name: Run regression tests
        run: npm run test:regression
        
      - name: Generate Allure report
        if: always()
        run: npm run allure:generate
        
      - name: Upload Allure results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: allure-results
          path: allure-results
          
      - name: Upload Allure report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: allure-report
          path: allure-report
```

## 🏗️ API Architecture

### API Clients
Each API domain has a dedicated client class:

**PetClient** - Manages pet-related operations
- `createPet(pet: Pet)`
- `updatePet(pet: Pet)`
- `getPetById(petId: number)`
- `getPetsByStatus(status: string)`
- `deletePet(petId: number)`

**StoreClient** - Manages store/order operations
- `getInventory()`
- `placeOrder(order: Order)`
- `getOrderById(orderId: number)`
- `deleteOrder(orderId: number)`

**UserClient** - Manages user operations
- `createUser(user: User)`
- `getUserByUsername(username: string)`
- `updateUser(username: string, user: User)`
- `deleteUser(username: string)`
- `loginUser(username: string, password: string)`
- `logoutUser()`

### Type Safety
All API models are strongly typed with TypeScript interfaces:
- `Pet` - Pet entity with category, tags, status
- `Order` - Store order with pet reference
- `User` - User entity with profile information
- `Category` - Pet category
- `Tag` - Pet tag

## 🛠️ Development

### Adding New Tests
1. Create test file in `src/tests/`
2. Import fixtures: `import { test, expect } from '../fixtures/test-context'`
3. Use API clients injected via fixtures
4. Add appropriate tags to test descriptions
5. Use Allure annotations for reporting

### Example Test Structure
```typescript
import { test, expect } from '../fixtures/test-context';
import { allure } from 'allure-playwright';

test.describe('Feature Name @tag', () => {
  test('Test scenario @smoke @create', async ({ petClient }) => {
    await allure.epic('Epic Name');
    await allure.feature('Feature Name');
    await allure.story('User Story');

    // Arrange
    const data = { /* test data */ };

    // Act
    const response = await petClient.createPet(data);

    // Assert
    expect(response.status()).toBe(200);
  });
});
```

## 🐛 Troubleshooting

### Issue: Tests fail with connection timeout
**Solution:** Check if the Petstore API is accessible:
```bash
curl https://petstore.swagger.io/v2/pet/findByStatus?status=available
```

### Issue: Allure report not generating
**Solution:** Ensure allure-commandline is installed:
```bash
npm install -D allure-commandline
```

### Issue: TypeScript compilation errors
**Solution:** Clean and reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Tests run sequentially instead of parallel
**Solution:** Check `workers` setting in `playwright.config.ts`

## 📚 API Documentation

**Petstore API Swagger**: https://petstore.swagger.io

**API Endpoints:**
- Pet: `POST /pet`, `PUT /pet`, `GET /pet/{petId}`, `GET /pet/findByStatus`, `DELETE /pet/{petId}`
- Store: `GET /store/inventory`, `POST /store/order`, `GET /store/order/{orderId}`, `DELETE /store/order/{orderId}`
- User: `POST /user`, `GET /user/{username}`, `PUT /user/{username}`, `DELETE /user/{username}`, `GET /user/login`, `GET /user/logout`

## 🤝 Contributing

1. Create a feature branch from `main`
2. Write tests following the existing patterns
3. Ensure all tests pass: `npm test`
4. Update documentation if needed
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🔗 Links

- **Playwright Documentation**: https://playwright.dev
- **Allure Framework**: https://docs.qameta.io/allure/
- **TypeScript**: https://www.typescriptlang.org/
- **Petstore API**: https://petstore.swagger.io