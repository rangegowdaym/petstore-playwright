import { test, expect } from '../fixtures/test-context';
import { Order } from '../api/models/Order';
import { generateUniqueId, getCurrentISODate, attachApiDetails } from '../utils/helpers';
import { allure } from 'allure-playwright';

test.describe('Store API Tests @store', () => {
  let createdOrderId: number;

  test.afterEach(async ({ storeClient }) => {
    // Cleanup: Delete created order if exists
    if (createdOrderId && createdOrderId <= 10) {
      try {
        await storeClient.deleteOrder(createdOrderId);
      } catch (error) {
        // Order might already be deleted or not deletable
      }
    }
  });

  test('Place a new order @smoke @order', async ({ storeClient }) => {
    await allure.epic('Store Management');
    await allure.feature('Order Creation');
    await allure.story('Place a new order for a pet');

    // Arrange
    const orderId = Math.floor(Math.random() * 10) + 1; // API accepts 1-10
    const petId = generateUniqueId();
    
    const newOrder: Order = {
      id: orderId,
      petId: petId,
      quantity: 1,
      shipDate: getCurrentISODate(),
      status: 'placed',
      complete: false
    };

    // Act
    const response = await storeClient.placeOrder(newOrder);
    await attachApiDetails(response, 'Place Order API Call');
    
    // Assert
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.petId).toBe(petId);
    expect(responseBody.status).toBe('placed');
    expect(responseBody.complete).toBe(false);
    
    createdOrderId = responseBody.id;
  });

  test('Get order by ID @regression @read', async ({ storeClient }) => {
    await allure.epic('Store Management');
    await allure.feature('Order Retrieval');
    await allure.story('Retrieve an order by its ID');

    // Arrange - Create an order first
    const orderId = Math.floor(Math.random() * 10) + 1;
    const petId = generateUniqueId();
    
    const newOrder: Order = {
      id: orderId,
      petId: petId,
      quantity: 2,
      shipDate: getCurrentISODate(),
      status: 'placed',
      complete: false
    };

    const createResponse = await storeClient.placeOrder(newOrder);
    expect(createResponse.status()).toBe(200);
    const createdOrder = await createResponse.json();
    createdOrderId = createdOrder.id;

    // Act
    const response = await storeClient.getOrderById(createdOrderId);
    await attachApiDetails(response, 'Get Order by ID API Call');
    
    // Assert
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody.id).toBe(createdOrderId);
    expect(responseBody.petId).toBe(petId);
    expect(responseBody.status).toBe('placed');
  });

  test('Delete an order @regression @delete', async ({ storeClient }) => {
    await allure.epic('Store Management');
    await allure.feature('Order Deletion');
    await allure.story('Delete an existing order');

    // Arrange - Create an order first
    const orderId = Math.floor(Math.random() * 10) + 1;
    const petId = generateUniqueId();
    
    const newOrder: Order = {
      id: orderId,
      petId: petId,
      quantity: 1,
      shipDate: getCurrentISODate(),
      status: 'placed',
      complete: false
    };

    const createResponse = await storeClient.placeOrder(newOrder);
    expect(createResponse.status()).toBe(200);
    const createdOrder = await createResponse.json();
    const orderIdToDelete = createdOrder.id;

    // Act
    const deleteResponse = await storeClient.deleteOrder(orderIdToDelete);
    await attachApiDetails(deleteResponse, 'Delete Order API Call');
    
    // Assert
    expect(deleteResponse.status()).toBe(200);

    // Verify order is deleted
    const getResponse = await storeClient.getOrderById(orderIdToDelete);
    expect(getResponse.status()).toBe(404);
    
    // Clear createdOrderId since we already deleted it
    createdOrderId = 0;
  });

  test('Get store inventory @smoke @inventory', async ({ storeClient }) => {
    await allure.epic('Store Management');
    await allure.feature('Inventory Management');
    await allure.story('Retrieve store inventory');

    // Act
    const response = await storeClient.getInventory();
    await attachApiDetails(response, 'Get Store Inventory API Call');
    
    // Assert
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(typeof responseBody).toBe('object');
    
    // Verify inventory has status counts
    // The API returns an object with status as keys and counts as values
    // Example: { "available": 10, "pending": 5, "sold": 3 }
  });
});
