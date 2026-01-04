import { test, expect } from '../fixtures/test-context';
import { Pet } from '../api/models/Pet';
import { generateUniqueId, generateUniqueName, attachApiDetails } from '../utils/helpers';
import { allure } from 'allure-playwright';

test.describe('Pet API Tests @pet', () => {
  let createdPetId: number;

  test.afterEach(async ({ petClient }) => {
    // Cleanup: Delete created pet if exists
    if (createdPetId) {
      try {
        await petClient.deletePet(createdPetId);
      } catch (error) {
        // Pet might already be deleted
      }
    }
  });

  test('Create a new pet @smoke @create', async ({ petClient }) => {
    await allure.epic('Pet Management');
    await allure.feature('Pet Creation');
    await allure.story('Create a new pet with valid data');

    // Arrange
    const petId = generateUniqueId();
    const petName = generateUniqueName('Doggo');
    
    const newPet: Pet = {
      id: petId,
      name: petName,
      category: {
        id: 1,
        name: 'Dogs'
      },
      photoUrls: ['https://example.com/photo1.jpg'],
      tags: [
        {
          id: 1,
          name: 'friendly'
        }
      ],
      status: 'available'
    };

    // Act
    const response = await petClient.createPet(newPet);
    await attachApiDetails(response, 'Create Pet API Call');
    
    // Assert
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('id');
    expect(responseBody.name).toBe(petName);
    expect(responseBody.status).toBe('available');
    
    createdPetId = responseBody.id;
  });

  test('Get pet by ID @regression @read', async ({ petClient }) => {
    await allure.epic('Pet Management');
    await allure.feature('Pet Retrieval');
    await allure.story('Retrieve a pet by its ID');

    // Arrange - Create a pet first
    const petId = generateUniqueId();
    const petName = generateUniqueName('Kitty');
    
    const newPet: Pet = {
      id: petId,
      name: petName,
      photoUrls: ['https://example.com/cat.jpg'],
      status: 'available'
    };

    const createResponse = await petClient.createPet(newPet);
    expect(createResponse.status()).toBe(200);
    const createdPet = await createResponse.json();
    createdPetId = createdPet.id;

    // Act
    const response = await petClient.getPetById(createdPetId);
    await attachApiDetails(response, 'Get Pet by ID API Call');
    
    // Assert
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody.id).toBe(createdPetId);
    expect(responseBody.name).toBe(petName);
    expect(responseBody.status).toBe('available');
  });

  test('Update pet status @regression @update', async ({ petClient }) => {
    await allure.epic('Pet Management');
    await allure.feature('Pet Update');
    await allure.story('Update pet status from available to sold');

    // Arrange - Create a pet first
    const petId = generateUniqueId();
    const petName = generateUniqueName('Birdy');
    
    const newPet: Pet = {
      id: petId,
      name: petName,
      photoUrls: ['https://example.com/bird.jpg'],
      status: 'available'
    };

    const createResponse = await petClient.createPet(newPet);
    expect(createResponse.status()).toBe(200);
    const createdPet = await createResponse.json();
    createdPetId = createdPet.id;

    // Act - Update pet status
    const updatedPet: Pet = {
      ...createdPet,
      status: 'sold'
    };

    const updateResponse = await petClient.updatePet(updatedPet);
    await attachApiDetails(updateResponse, 'Update Pet API Call');
    
    // Assert
    expect(updateResponse.status()).toBe(200);
    
    const responseBody = await updateResponse.json();
    expect(responseBody.id).toBe(createdPetId);
    expect(responseBody.status).toBe('sold');
  });

  test('Search pets by status: available @regression @search', async ({ petClient }) => {
    await allure.epic('Pet Management');
    await allure.feature('Pet Search');
    await allure.story('Search pets by status: available');

    // Act
    const response = await petClient.getPetsByStatus('available');
    await attachApiDetails(response, 'Search Pets by Status API Call');
    
    // Assert
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    
    // Verify all returned pets have 'available' status
    if (responseBody.length > 0) {
      responseBody.forEach((pet: Pet) => {
        expect(pet.status).toBe('available');
      });
    }
  });

  test('Search pets by status: pending @regression @search', async ({ petClient }) => {
    await allure.epic('Pet Management');
    await allure.feature('Pet Search');
    await allure.story('Search pets by status: pending');

    // Act
    const response = await petClient.getPetsByStatus('pending');
    await attachApiDetails(response, 'Search Pets by Status API Call');
    
    // Assert
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    
    // Verify all returned pets have 'pending' status
    if (responseBody.length > 0) {
      responseBody.forEach((pet: Pet) => {
        expect(pet.status).toBe('pending');
      });
    }
  });

  test('Search pets by status: sold @regression @search', async ({ petClient }) => {
    await allure.epic('Pet Management');
    await allure.feature('Pet Search');
    await allure.story('Search pets by status: sold');

    // Act
    const response = await petClient.getPetsByStatus('sold');
    await attachApiDetails(response, 'Search Pets by Status API Call');
    
    // Assert
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    
    // Verify all returned pets have 'sold' status
    if (responseBody.length > 0) {
      responseBody.forEach((pet: Pet) => {
        expect(pet.status).toBe('sold');
      });
    }
  });

  test('Delete a pet @smoke @delete', async ({ petClient }) => {
    await allure.epic('Pet Management');
    await allure.feature('Pet Deletion');
    await allure.story('Delete an existing pet');

    // Arrange - Create a pet first
    const petId = generateUniqueId();
    const petName = generateUniqueName('TempPet');
    
    const newPet: Pet = {
      id: petId,
      name: petName,
      photoUrls: ['https://example.com/temp.jpg'],
      status: 'available'
    };

    const createResponse = await petClient.createPet(newPet);
    expect(createResponse.status()).toBe(200);
    const createdPet = await createResponse.json();
    const petIdToDelete = createdPet.id;

    // Act
    const deleteResponse = await petClient.deletePet(petIdToDelete);
    await attachApiDetails(deleteResponse, 'Delete Pet API Call');
    
    // Assert
    expect(deleteResponse.status()).toBe(200);

    // Verify pet is deleted
    const getResponse = await petClient.getPetById(petIdToDelete);
    expect(getResponse.status()).toBe(404);
    
    // Clear createdPetId since we already deleted it
    createdPetId = 0;
  });
});
