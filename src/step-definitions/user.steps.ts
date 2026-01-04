import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { User } from '../models/User';

/**
 * Step definitions for User feature
 */

Given('I have a user with username {string} and email {string}', async function (this: CustomWorld, username: string, email: string) {
  this.currentUser = {
    username: username,
    email: email,
    firstName: 'Test',
    lastName: 'User',
    password: 'password123',
    phone: '1234567890',
    userStatus: 1
  };
  this.username = username;
});

When('I create the user', async function (this: CustomWorld) {
  if (!this.currentUser) {
    throw new Error('No user data available');
  }
  this.response = await this.userService.createUser(this.currentUser);
  try {
    this.responseBody = await this.response.json();
  } catch (e) {
    // Response may not have JSON body for user creation
    this.responseBody = null;
  }
});

When('I get the user by username', async function (this: CustomWorld) {
  if (!this.username) {
    throw new Error('No username available');
  }
  this.response = await this.userService.getUserByUsername(this.username);
  this.responseBody = await this.response.json();
});

When('I update the user email to {string}', async function (this: CustomWorld, email: string) {
  if (!this.username || !this.currentUser) {
    throw new Error('No username or user data available');
  }
  
  this.currentUser.email = email;
  this.response = await this.userService.updateUser(this.username, this.currentUser);
  try {
    this.responseBody = await this.response.json();
  } catch (e) {
    // Response may not have JSON body
    this.responseBody = null;
  }
});

When('I delete the user', async function (this: CustomWorld) {
  if (!this.username) {
    throw new Error('No username available');
  }
  this.response = await this.userService.deleteUser(this.username);
  try {
    this.responseBody = await this.response.json();
  } catch (e) {
    // Response may not have JSON body
    this.responseBody = null;
  }
});

When('I login with username {string} and password {string}', async function (this: CustomWorld, username: string, password: string) {
  this.response = await this.userService.loginUser(username, password);
  this.responseBody = await this.response.json();
});

When('I logout', async function (this: CustomWorld) {
  this.response = await this.userService.logoutUser();
  this.responseBody = await this.response.json();
});

Then('the response should contain username {string}', async function (this: CustomWorld, username: string) {
  if (!this.responseBody) {
    throw new Error('No response body available');
  }
  expect(this.responseBody.username).toBe(username);
  console.log(`✓ Username: ${this.responseBody.username}`);
});

Then('the response should contain email {string}', async function (this: CustomWorld, email: string) {
  if (!this.responseBody) {
    throw new Error('No response body available');
  }
  expect(this.responseBody.email).toBe(email);
  console.log(`✓ Email: ${this.responseBody.email}`);
});
