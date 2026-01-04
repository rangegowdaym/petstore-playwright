# Testing Guide

## Network Requirements

The Petstore API tests require access to `https://petstore.swagger.io/v2`. Ensure your environment has:

1. **Internet connectivity** to external APIs
2. **DNS resolution** for petstore.swagger.io
3. **No firewall/proxy restrictions** blocking the API

## Running Tests Locally

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Internet connection to petstore.swagger.io

### Setup
```bash
# Clone the repository
git clone https://github.com/rangegowdaym/petstore-playwright.git
cd petstore-playwright

# Install dependencies
npm install

# Optional: Configure environment
cp .env.example .env
```

### Execute Tests

#### All Tests
```bash
npm test
```

#### Smoke Tests (Quick validation)
```bash
npm run test:smoke
```

#### Regression Tests (Full suite)
```bash
npm run test:regression
```

#### Specific Test Suites
```bash
# Pet API tests only
npm run test:pet

# Store API tests only
npm run test:store

# User API tests only
npm run test:user
```

#### Debug Mode
```bash
# Run with Playwright Inspector
npm run test:debug

# Run in headed mode (see browser)
npm run test:headed
```

#### With Specific Tags
```bash
# Run only create operations
npx playwright test --grep @create

# Run only pet and create tests
npx playwright test --grep "@pet.*@create"

# Exclude certain tests
npx playwright test --grep-invert @skip
```

## Test Results

### View Test Results

After running tests, you can view results in multiple formats:

#### 1. Console Output
Real-time test execution status in the terminal

#### 2. HTML Report (Playwright)
```bash
# Open Playwright HTML report
npx playwright show-report
```

#### 3. Allure Report (Recommended)
```bash
# Generate and open Allure report
npm run allure:generate
npm run allure:open

# Or serve dynamically
npm run allure:serve
```

## Test Validation Checklist

### Smoke Tests (@smoke)
These tests validate critical functionality and should pass quickly (~2-3 minutes):

- ✅ Create a new pet
- ✅ Delete a pet
- ✅ Place a new order
- ✅ Get store inventory
- ✅ Create a new user
- ✅ Delete a user

### Regression Tests (@regression)
Full test suite covering all API operations (~5-10 minutes):

**Pet API:**
- ✅ Get pet by ID
- ✅ Update pet status
- ✅ Search pets by status (available, pending, sold)

**Store API:**
- ✅ Get order by ID
- ✅ Delete an order

**User API:**
- ✅ Get user by username
- ✅ Update user information
- ✅ User login
- ✅ User logout

## Expected Test Results

All tests should pass with:
- ✅ 200 status codes for successful operations
- ✅ Proper response bodies with expected fields
- ✅ Correct data persistence and retrieval
- ✅ Successful cleanup (delete operations)

## Troubleshooting

### Issue: DNS Resolution Failure
```
Error: getaddrinfo ENOTFOUND petstore.swagger.io
```

**Causes:**
- No internet connection
- DNS server issues
- Firewall/proxy blocking the domain
- VPN/network restrictions

**Solutions:**
1. Check internet connectivity:
   ```bash
   ping google.com
   ```

2. Test API accessibility:
   ```bash
   curl https://petstore.swagger.io/v2/pet/findByStatus?status=available
   ```

3. Verify DNS resolution:
   ```bash
   nslookup petstore.swagger.io
   # or
   dig petstore.swagger.io
   ```

4. If behind a corporate proxy, configure proxy settings:
   ```bash
   export HTTP_PROXY=http://proxy.company.com:8080
   export HTTPS_PROXY=http://proxy.company.com:8080
   ```

### Issue: Tests Timeout
```
Error: Test timeout of 60000ms exceeded
```

**Solutions:**
1. Increase timeout in `playwright.config.ts`:
   ```typescript
   timeout: 120 * 1000, // 2 minutes
   ```

2. Check API response times:
   ```bash
   time curl https://petstore.swagger.io/v2/pet/findByStatus?status=available
   ```

### Issue: Random Test Failures
```
Error: 404 Not Found when getting pet/user/order
```

**Causes:**
- Data cleanup from previous test runs
- Petstore API state inconsistencies
- Concurrent test execution conflicts

**Solutions:**
1. Run tests sequentially:
   ```typescript
   // In playwright.config.ts
   fullyParallel: false,
   workers: 1,
   ```

2. Add delays between operations:
   ```typescript
   await wait(1000); // Wait 1 second
   ```

3. Use unique IDs:
   ```typescript
   const uniqueId = generateUniqueId(); // Already implemented
   ```

### Issue: Allure Report Not Generating
```
Command not found: allure
```

**Solution:**
Allure commandline is installed as a dev dependency. Use npm scripts:
```bash
npm run allure:generate
npm run allure:open
```

## CI/CD Considerations

### GitHub Actions
The included workflow (`.github/workflows/api-tests.yml`) runs tests on:
- Every push to main/develop branches
- Pull requests to main/develop
- Manual workflow dispatch

### Environment Requirements
Ensure CI environment has:
- ✅ Node.js 18+ installed
- ✅ Network access to petstore.swagger.io
- ✅ No rate limiting on API calls

### Artifacts
Tests automatically upload:
- Allure results (raw data)
- Allure report (HTML)
- Playwright report (HTML)
- Test results (traces, screenshots)

## Performance Benchmarks

### Expected Execution Times
- **Smoke tests**: 1-3 minutes (6 tests)
- **Regression tests**: 5-10 minutes (18 tests)
- **All tests**: 5-10 minutes (18 unique scenarios)

### Parallel Execution
- Default: 4 workers (configured in playwright.config.ts)
- CI: 2 workers (faster but resource-limited)
- Sequential: 1 worker (for debugging)

## Test Data Management

### Unique Identifiers
Tests use timestamp-based IDs to avoid conflicts:
```typescript
generateUniqueId()       // Returns: 1704357600000
generateUniqueName('pet') // Returns: pet_1704357600000
```

### Cleanup Strategy
Each test includes cleanup in `afterEach` hook:
- Automatically deletes created resources
- Handles cleanup failures gracefully
- Ensures test independence

## Best Practices

1. **Always run smoke tests** before pushing code
2. **Run full regression suite** before releases
3. **Check Allure reports** for detailed failure analysis
4. **Use tags** to run specific test subsets
5. **Monitor test execution time** for performance regressions
6. **Keep tests independent** - no dependencies between tests
7. **Use meaningful test data** - descriptive names and values

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Allure Report](https://docs.qameta.io/allure/)
- [Petstore API Docs](https://petstore.swagger.io)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
