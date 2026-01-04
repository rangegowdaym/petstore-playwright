import { test, expect } from '../fixtures/test-context';
import { User } from '../api/models/User';
import { generateUniqueName, generateRandomEmail, generateRandomPhone, attachApiDetails } from '../utils/helpers';
import { allure } from 'allure-playwright';

test.describe('User API Tests @user', () => {
  let createdUsername: string;

  test.afterEach(async ({ userClient }) => {
    // Cleanup: Delete created user if exists
    if (createdUsername) {
      try {
        await userClient.deleteUser(createdUsername);
      } catch (error) {
        // User might already be deleted
      }
    }
  });

  test('Create a new user @smoke @create', async ({ userClient }) => {
    await allure.epic('User Management');
    await allure.feature('User Creation');
    await allure.story('Create a new user with valid data');

    // Arrange
    const username = generateUniqueName('user');
    
    const newUser: User = {
      username: username,
      firstName: 'John',
      lastName: 'Doe',
      email: generateRandomEmail('john'),
      password: 'password123',
      phone: generateRandomPhone(),
      userStatus: 1
    };

    // Act
    const response = await userClient.createUser(newUser);
    await attachApiDetails(response, 'Create User API Call');
    
    // Assert
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('message');
    
    createdUsername = username;
  });

  test('Get user by username @regression @read', async ({ userClient }) => {
    await allure.epic('User Management');
    await allure.feature('User Retrieval');
    await allure.story('Retrieve a user by username');

    // Arrange - Create a user first
    const username = generateUniqueName('user');
    
    const newUser: User = {
      username: username,
      firstName: 'Jane',
      lastName: 'Smith',
      email: generateRandomEmail('jane'),
      password: 'password456',
      phone: generateRandomPhone(),
      userStatus: 1
    };

    const createResponse = await userClient.createUser(newUser);
    expect(createResponse.status()).toBe(200);
    createdUsername = username;

    // Act
    const response = await userClient.getUserByUsername(username);
    await attachApiDetails(response, 'Get User by Username API Call');
    
    // Assert
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    expect(responseBody.username).toBe(username);
    expect(responseBody.firstName).toBe('Jane');
    expect(responseBody.lastName).toBe('Smith');
    expect(responseBody.email).toBe(newUser.email);
  });

  test('Update user information @regression @update', async ({ userClient }) => {
    await allure.epic('User Management');
    await allure.feature('User Update');
    await allure.story('Update user information');

    // Arrange - Create a user first
    const username = generateUniqueName('user');
    
    const newUser: User = {
      username: username,
      firstName: 'Bob',
      lastName: 'Johnson',
      email: generateRandomEmail('bob'),
      password: 'password789',
      phone: generateRandomPhone(),
      userStatus: 1
    };

    const createResponse = await userClient.createUser(newUser);
    expect(createResponse.status()).toBe(200);
    createdUsername = username;

    // Act - Update user
    const updatedUser: User = {
      username: username,
      firstName: 'Robert',
      lastName: 'Johnson Jr',
      email: generateRandomEmail('robert'),
      password: 'newpassword123',
      phone: generateRandomPhone(),
      userStatus: 2
    };

    const updateResponse = await userClient.updateUser(username, updatedUser);
    await attachApiDetails(updateResponse, 'Update User API Call');
    
    // Assert
    expect(updateResponse.status()).toBe(200);
    
    // Verify update
    const getResponse = await userClient.getUserByUsername(username);
    expect(getResponse.status()).toBe(200);
    
    const responseBody = await getResponse.json();
    expect(responseBody.firstName).toBe('Robert');
    expect(responseBody.lastName).toBe('Johnson Jr');
  });

  test('Delete a user @smoke @delete', async ({ userClient }) => {
    await allure.epic('User Management');
    await allure.feature('User Deletion');
    await allure.story('Delete an existing user');

    // Arrange - Create a user first
    const username = generateUniqueName('tempuser');
    
    const newUser: User = {
      username: username,
      firstName: 'Temp',
      lastName: 'User',
      email: generateRandomEmail('temp'),
      password: 'password123',
      phone: generateRandomPhone(),
      userStatus: 1
    };

    const createResponse = await userClient.createUser(newUser);
    expect(createResponse.status()).toBe(200);

    // Act
    const deleteResponse = await userClient.deleteUser(username);
    await attachApiDetails(deleteResponse, 'Delete User API Call');
    
    // Assert
    expect(deleteResponse.status()).toBe(200);

    // Verify user is deleted
    const getResponse = await userClient.getUserByUsername(username);
    expect(getResponse.status()).toBe(404);
    
    // Clear createdUsername since we already deleted it
    createdUsername = '';
  });

  test('User login @regression @login', async ({ userClient }) => {
    await allure.epic('User Management');
    await allure.feature('User Authentication');
    await allure.story('User login with valid credentials');

    // Arrange - Create a user first
    const username = generateUniqueName('loginuser');
    const password = 'loginpassword123';
    
    const newUser: User = {
      username: username,
      firstName: 'Login',
      lastName: 'Test',
      email: generateRandomEmail('login'),
      password: password,
      phone: generateRandomPhone(),
      userStatus: 1
    };

    const createResponse = await userClient.createUser(newUser);
    expect(createResponse.status()).toBe(200);
    createdUsername = username;

    // Act
    const loginResponse = await userClient.loginUser(username, password);
    await attachApiDetails(loginResponse, 'User Login API Call');
    
    // Assert
    expect(loginResponse.status()).toBe(200);
    
    const responseBody = await loginResponse.json();
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toContain('logged in user session');
  });

  test('User logout @regression @logout', async ({ userClient }) => {
    await allure.epic('User Management');
    await allure.feature('User Authentication');
    await allure.story('User logout');

    // Act
    const logoutResponse = await userClient.logoutUser();
    await attachApiDetails(logoutResponse, 'User Logout API Call');
    
    // Assert
    expect(logoutResponse.status()).toBe(200);
    
    const responseBody = await logoutResponse.json();
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('ok');
  });
});
