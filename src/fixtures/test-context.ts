import { test as base, APIRequestContext } from '@playwright/test';
import { PetClient } from '../api/clients/PetClient';
import { StoreClient } from '../api/clients/StoreClient';
import { UserClient } from '../api/clients/UserClient';
import { ApiConfig } from '../api/config/ApiConfig';

/**
 * Test context with API clients
 */
type TestContext = {
  apiContext: APIRequestContext;
  petClient: PetClient;
  storeClient: StoreClient;
  userClient: UserClient;
};

/**
 * Extended test with API clients as fixtures
 */
export const test = base.extend<TestContext>({
  // API request context fixture
  apiContext: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: ApiConfig.BASE_URL,
      extraHTTPHeaders: ApiConfig.HEADERS,
      timeout: ApiConfig.TIMEOUT
    });
    await use(context);
    await context.dispose();
  },

  // PetClient fixture
  petClient: async ({ apiContext }, use) => {
    await use(new PetClient(apiContext));
  },

  // StoreClient fixture
  storeClient: async ({ apiContext }, use) => {
    await use(new StoreClient(apiContext));
  },

  // UserClient fixture
  userClient: async ({ apiContext }, use) => {
    await use(new UserClient(apiContext));
  }
});

export { expect } from '@playwright/test';
