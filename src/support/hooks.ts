import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { CustomWorld } from './world';

/**
 * Before hook - runs before each scenario
 */
Before(async function (this: CustomWorld, { pickle }) {
  console.log(`\n📋 Starting scenario: ${pickle.name}`);
  await this.initServices();
});

/**
 * After hook - runs after each scenario
 */
After(async function (this: CustomWorld, { result, pickle }) {
  // Log scenario result
  if (result?.status === Status.PASSED) {
    console.log(`✅ Scenario passed: ${pickle.name}`);
  } else if (result?.status === Status.FAILED) {
    console.log(`❌ Scenario failed: ${pickle.name}`);
    if (result.message) {
      console.log(`Error: ${result.message}`);
    }
  }

  // Attach response data if available
  if (this.response) {
    const status = this.response.status();
    const statusText = this.response.statusText();
    
    // Attach request info
    const requestInfo = {
      url: this.response.url(),
      status: status,
      statusText: statusText
    };
    
    this.attach(JSON.stringify(requestInfo, null, 2), 'application/json');

    // Attach response body if available
    if (this.responseBody) {
      this.attach(JSON.stringify(this.responseBody, null, 2), 'application/json');
    }
  }

  // Cleanup services
  await this.disposeServices();
});

/**
 * BeforeAll hook - runs once before all scenarios
 */
BeforeAll(async function () {
  console.log('🚀 Starting test execution...');
  console.log(`Base URL: https://petstore.swagger.io/v2`);
});

/**
 * AfterAll hook - runs once after all scenarios
 */
AfterAll(async function () {
  console.log('\n✨ Test execution completed');
});
