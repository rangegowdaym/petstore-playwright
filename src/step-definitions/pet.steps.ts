import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { Pet } from '../models/Pet';

/**
 * Step definitions for Pet feature
 */

Given('I have a pet with name {string} and status {string}', async function (this: CustomWorld, name: string, status: string) {
  this.currentPet = {
    name: name,
    status: status as 'available' | 'pending' | 'sold',
    photoUrls: ['string']
  };
});

When('I create the pet', async function (this: CustomWorld) {
  if (!this.currentPet) {
    throw new Error('No pet data available');
  }
  this.response = await this.petService.createPet(this.currentPet);
  this.responseBody = await this.response.json();
});

When('I save the pet id', async function (this: CustomWorld) {
  if (!this.responseBody || !this.responseBody.id) {
    throw new Error('No pet ID in response');
  }
  this.petId = this.responseBody.id;
  console.log(`💾 Saved pet ID: ${this.petId}`);
});

When('I get the pet by id', async function (this: CustomWorld) {
  if (!this.petId) {
    throw new Error('No pet ID available');
  }
  this.response = await this.petService.getPetById(this.petId);
  this.responseBody = await this.response.json();
});

When('I update the pet status to {string}', async function (this: CustomWorld, status: string) {
  if (!this.petId) {
    throw new Error('No pet ID available');
  }
  
  // Get current pet first
  const getResponse = await this.petService.getPetById(this.petId);
  const currentPet = await getResponse.json();
  
  // Update status
  currentPet.status = status;
  this.response = await this.petService.updatePet(currentPet);
  this.responseBody = await this.response.json();
});

When('I search for pets with status {string}', async function (this: CustomWorld, status: string) {
  this.response = await this.petService.getPetsByStatus(status);
  this.responseBody = await this.response.json();
});

When('I delete the pet', async function (this: CustomWorld) {
  if (!this.petId) {
    throw new Error('No pet ID available');
  }
  this.response = await this.petService.deletePet(this.petId);
  // Delete response might not have a body
  try {
    this.responseBody = await this.response.json();
  } catch (e) {
    // Response may not have JSON body
    this.responseBody = null;
  }
});

Then('the response status code should be {int}', async function (this: CustomWorld, statusCode: number) {
  if (!this.response) {
    throw new Error('No response available');
  }
  const actualStatus = this.response.status();
  expect(actualStatus).toBe(statusCode);
  console.log(`✓ Status code: ${actualStatus}`);
});

Then('the response should contain pet name {string}', async function (this: CustomWorld, name: string) {
  if (!this.responseBody) {
    throw new Error('No response body available');
  }
  expect(this.responseBody.name).toBe(name);
  console.log(`✓ Pet name: ${this.responseBody.name}`);
});

Then('the pet status should be {string}', async function (this: CustomWorld, status: string) {
  if (!this.responseBody) {
    throw new Error('No response body available');
  }
  expect(this.responseBody.status).toBe(status);
  console.log(`✓ Pet status: ${this.responseBody.status}`);
});

Then('the response should contain a list of pets', async function (this: CustomWorld) {
  if (!this.responseBody) {
    throw new Error('No response body available');
  }
  expect(Array.isArray(this.responseBody)).toBe(true);
  expect(this.responseBody.length).toBeGreaterThan(0);
  console.log(`✓ Found ${this.responseBody.length} pets`);
});
