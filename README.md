# Petstore API Test Automation Framework

A modern, BDD-focused API test automation framework built with **Playwright**, **Cucumber**, **TypeScript**, and **Allure reporting**. This framework provides comprehensive API testing for the Petstore API using Gherkin feature files with support for smoke and regression test suites.

## 🏗️ Project Structure

```
petstore-playwright/
├── src/
│   ├── features/              # Gherkin feature files
│   │   ├── Pet.feature
│   │   ├── User.feature
│   │   └── Store.feature
│   ├── step-definitions/      # Step definition implementations
│   │   ├── pet.steps.ts
│   │   ├── user.steps.ts
│   │   └── store.steps.ts
│   ├── services/              # API service classes
│   │   ├── petService.ts
│   │   ├── userService.ts
│   │   └── storeService.ts
│   ├── models/                # TypeScript interfaces/types
│   │   ├── Pet.ts
│   │   ├── Order.ts
│   │   ├── User.ts
│   │   ├── Category.ts
│   │   └── Tag.ts
│   ├── support/               # Cucumber support files
│   │   ├── world.ts           # Custom World class
│   │   └── hooks.ts           # Before/After hooks
│   └── config/
│       └── config.ts          # API configuration
├── cucumber.js                # Cucumber configuration
├── package.json               # Dependencies & scripts
├── tsconfig.json              # TypeScript configuration
├── .gitignore
└── README.md
```

## 🚀 Key Features

- ✅ **Cucumber BDD** - Write tests in Gherkin syntax for better readability
- ✅ **Playwright + TypeScript** - Modern, type-safe API testing
- ✅ **Allure Reporting** - Rich test reports with request/response attachments
- ✅ **Modular Architecture** - Clean separation of concerns with services and models
- ✅ **Custom World Context** - Share data between steps using Cucumber World
- ✅ **Tag-based Execution** - Run tests by tags (@smoke, @regression, @pet, @user, @store)
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

### 3. Verify installation
```bash
# Check Cucumber version
npx cucumber-js --version
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

### Run specific feature file
```bash
npx cucumber-js src/features/Pet.feature
```

### Run with specific tags combination
```bash
# Run pet smoke tests
npx cucumber-js --tags '@pet and @smoke'

# Run all except smoke tests
npx cucumber-js --tags 'not @smoke'
```

## 📊 Test Reporting

### Generate and view Allure reports

After running tests, Allure results are automatically generated in the `allure-results` directory.

#### Generate and open report
```bash
# Generate report from results
npm run allure:generate

# Serve report with live server
npm run allure:serve
```

Allure reports include:
- ✅ Test execution summary with pass/fail statistics
- ✅ Test suites organized by features (Pet, Store, User)
- ✅ Full request/response details for each API call
- ✅ Execution timeline and history trends
- ✅ Categorized failures for easy debugging
- ✅ Tag-based filtering and grouping

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

Tests use Cucumber's tag system for flexible test execution:

- `@smoke` - Critical path tests (run on every commit)
- `@regression` - Full regression suite (run before releases)
- `@pet` - Pet API tests
- `@store` - Store API tests
- `@user` - User API tests
- `@create` - Create operations
- `@read` - Read/Get operations
- `@update` - Update operations
- `@delete` - Delete operations
- `@epic:PetStore_API` - Epic level tag
- `@feature:Pet_Management` - Feature level tags

Tags can be combined using logical operators:
```bash
# Run smoke tests for pet API only
npx cucumber-js --tags '@smoke and @pet'

# Run all regression tests except user tests
npx cucumber-js --tags '@regression and not @user'

# Run create or delete operations
npx cucumber-js --tags '@create or @delete'
```

## ⚙️ Configuration

### Cucumber Configuration (cucumber.js)
```javascript
module.exports = {
  default: {
    require: ['src/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html',
      'allure-cucumberjs/reporter'
    ],
    formatOptions: {
      resultsDir: 'allure-results'
    }
  }
};
```

### API Configuration (src/config/config.ts)
Key settings:
- Base URL: `https://petstore.swagger.io/v2`
- Timeout: 30 seconds per request
- Endpoints: Pre-configured API endpoints for Pet, Store, and User operations

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

## 🏗️ BDD Architecture

### Gherkin Feature Files
Feature files define test scenarios in human-readable Gherkin syntax:
- **Pet.feature** - Pet management scenarios (create, read, update, delete, search)
- **User.feature** - User management scenarios (create, read, update, delete, login, logout)
- **Store.feature** - Store operations scenarios (place order, get order, delete order, inventory)

### Step Definitions
Step definitions connect Gherkin steps to TypeScript code:
- **pet.steps.ts** - Implements Given/When/Then steps for Pet scenarios
- **user.steps.ts** - Implements Given/When/Then steps for User scenarios
- **store.steps.ts** - Implements Given/When/Then steps for Store scenarios

### Services Layer
Service classes handle API communication using Playwright's request API:

**PetService** - Manages pet-related operations
- `createPet(pet: Pet)`
- `updatePet(pet: Pet)`
- `getPetById(petId: number)`
- `getPetsByStatus(status: string)`
- `deletePet(petId: number)`

**StoreService** - Manages store/order operations
- `getInventory()`
- `placeOrder(order: Order)`
- `getOrderById(orderId: number)`
- `deleteOrder(orderId: number)`

**UserService** - Manages user operations
- `createUser(user: User)`
- `getUserByUsername(username: string)`
- `updateUser(username: string, user: User)`
- `deleteUser(username: string)`
- `loginUser(username: string, password: string)`
- `logoutUser()`

### Custom World
The CustomWorld class maintains context between steps:
- Service instances (PetService, UserService, StoreService)
- API response and response body
- Context data (petId, orderId, username)
- Current entities (currentPet, currentUser, currentOrder)

### Hooks
Cucumber hooks provide setup and teardown functionality:
- **Before**: Initialize services before each scenario
- **After**: Cleanup services and attach response data to reports
- **BeforeAll**: Log test execution start
- **AfterAll**: Log test execution completion

### Type Safety
All API models are strongly typed with TypeScript interfaces:
- `Pet` - Pet entity with category, tags, status
- `Order` - Store order with pet reference
- `User` - User entity with profile information
- `Category` - Pet category
- `Tag` - Pet tag

## 🛠️ Development

### Adding New Test Scenarios
1. Add Gherkin scenarios to feature files in `src/features/`
2. Run tests to generate undefined step snippets
3. Implement step definitions in `src/step-definitions/`
4. Use the CustomWorld context to share data between steps
5. Add appropriate tags for test organization

### Example Feature Scenario
```gherkin
@smoke @pet @create
Scenario: Create a new pet
  Given I have a pet with name "Buddy" and status "available"
  When I create the pet
  Then the response status code should be 200
  And the response should contain pet name "Buddy"
```

### Example Step Definition
```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('I have a pet with name {string} and status {string}', 
  async function (this: CustomWorld, name: string, status: string) {
    this.currentPet = {
      name: name,
      status: status as 'available' | 'pending' | 'sold',
      photoUrls: ['string']
    };
});

When('I create the pet', async function (this: CustomWorld) {
  this.response = await this.petService.createPet(this.currentPet!);
  this.responseBody = await this.response.json();
});

Then('the response status code should be {int}', 
  async function (this: CustomWorld, statusCode: number) {
    expect(this.response!.status()).toBe(statusCode);
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
npm run clean
npm install
```

### Issue: Step definitions not found
**Solution:** Ensure ts-node is properly configured and step files are in correct location:
```bash
# Check cucumber configuration
cat cucumber.js

# Verify step definition files exist
ls -la src/step-definitions/
```

### Issue: "Cannot find module" errors
**Solution:** Check TypeScript configuration and rebuild:
```bash
npx tsc --noEmit  # Check for TypeScript errors
```

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