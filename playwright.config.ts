import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Petstore API testing
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './src/tests',
  
  /* Maximum time one test can run for */
  timeout: 60 * 1000,
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 2 : 4,
  
  /* Reporter to use */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: true,
      categories: [
        {
          name: 'Critical failures',
          matchedStatuses: ['failed'],
          messageRegex: '.*Critical.*'
        },
        {
          name: 'API failures',
          matchedStatuses: ['failed'],
          messageRegex: '.*(status|response).*'
        }
      ],
      environmentInfo: {
        framework: 'Playwright',
        language: 'TypeScript',
        api: 'Petstore API v2'
      }
    }]
  ],
  
  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: process.env.API_BASE_URL || 'https://petstore.swagger.io/v2',
    
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    
    /* API request defaults */
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    
    /* API timeout */
    actionTimeout: 30 * 1000
  },

  /* Configure projects for different test types */
  projects: [
    {
      name: 'api-tests',
      testMatch: '**/*.spec.ts',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'smoke',
      testMatch: '**/*.spec.ts',
      grep: /@smoke/,
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'regression',
      testMatch: '**/*.spec.ts',
      grep: /@regression/,
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
