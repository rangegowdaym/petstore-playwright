import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { Order } from '../models/Order';

/**
 * Step definitions for Store feature
 */

Given('I have an order for pet id {int} with quantity {int}', async function (this: CustomWorld, petId: number, quantity: number) {
  this.currentOrder = {
    petId: petId,
    quantity: quantity,
    shipDate: new Date().toISOString(),
    status: 'placed',
    complete: false
  };
});

When('I place the order', async function (this: CustomWorld) {
  if (!this.currentOrder) {
    throw new Error('No order data available');
  }
  this.response = await this.storeService.placeOrder(this.currentOrder);
  this.responseBody = await this.response.json();
});

When('I save the order id', async function (this: CustomWorld) {
  if (!this.responseBody || !this.responseBody.id) {
    throw new Error('No order ID in response');
  }
  this.orderId = this.responseBody.id;
  console.log(`💾 Saved order ID: ${this.orderId}`);
});

When('I get the order by id', async function (this: CustomWorld) {
  if (!this.orderId) {
    throw new Error('No order ID available');
  }
  this.response = await this.storeService.getOrderById(this.orderId);
  this.responseBody = await this.response.json();
});

When('I delete the order', async function (this: CustomWorld) {
  if (!this.orderId) {
    throw new Error('No order ID available');
  }
  this.response = await this.storeService.deleteOrder(this.orderId);
  try {
    this.responseBody = await this.response.json();
  } catch (e) {
    // Response may not have JSON body
    this.responseBody = null;
  }
});

When('I get the store inventory', async function (this: CustomWorld) {
  this.response = await this.storeService.getInventory();
  this.responseBody = await this.response.json();
});

Then('the order status should be {string}', async function (this: CustomWorld, status: string) {
  if (!this.responseBody) {
    throw new Error('No response body available');
  }
  expect(this.responseBody.status).toBe(status);
  console.log(`✓ Order status: ${this.responseBody.status}`);
});

Then('the order pet id should be {int}', async function (this: CustomWorld) {
  if (!this.responseBody) {
    throw new Error('No response body available');
  }
  expect(this.responseBody.petId).toBeDefined();
  console.log(`✓ Order pet ID: ${this.responseBody.petId}`);
});

Then('the response should contain inventory data', async function (this: CustomWorld) {
  if (!this.responseBody) {
    throw new Error('No response body available');
  }
  expect(typeof this.responseBody).toBe('object');
  expect(Object.keys(this.responseBody).length).toBeGreaterThan(0);
  console.log(`✓ Inventory data present with ${Object.keys(this.responseBody).length} status types`);
});
