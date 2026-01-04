@epic:PetStore_API
@feature:User_Management
Feature: Pet Store - User Management
  As a pet store API user
  I want to manage users
  So that I can create and maintain user accounts

  @smoke @user @create
  Scenario: Create a new user
    Given I have a user with username "testuser1" and email "test1@example.com"
    When I create the user
    Then the response status code should be 200

  @regression @user @read
  Scenario: Get user by username
    Given I have a user with username "testuser2" and email "test2@example.com"
    When I create the user
    When I get the user by username
    Then the response status code should be 200
    And the response should contain username "testuser2"
    And the response should contain email "test2@example.com"

  @regression @user @update
  Scenario: Update user information
    Given I have a user with username "testuser3" and email "test3@example.com"
    When I create the user
    When I update the user email to "newemail@example.com"
    Then the response status code should be 200

  @smoke @user @delete
  Scenario: Delete a user
    Given I have a user with username "testuser4" and email "test4@example.com"
    When I create the user
    When I delete the user
    Then the response status code should be 200

  @regression @user @login
  Scenario: User login
    When I login with username "testuser" and password "password123"
    Then the response status code should be 200

  @regression @user @logout
  Scenario: User logout
    When I logout
    Then the response status code should be 200
