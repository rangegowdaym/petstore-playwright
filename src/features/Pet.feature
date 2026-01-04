@epic:PetStore_API
@feature:Pet_Management
Feature: Pet Store - Pet Management
  As a pet store API user
  I want to manage pets
  So that I can perform CRUD operations on pets

  @smoke @pet @create
  Scenario: Create a new pet
    Given I have a pet with name "Buddy" and status "available"
    When I create the pet
    Then the response status code should be 200
    And the response should contain pet name "Buddy"
    And the pet status should be "available"
    And I save the pet id

  @regression @pet @read
  Scenario: Get pet by ID
    Given I have a pet with name "Max" and status "available"
    When I create the pet
    And I save the pet id
    When I get the pet by id
    Then the response status code should be 200
    And the response should contain pet name "Max"

  @regression @pet @update
  Scenario: Update pet status
    Given I have a pet with name "Charlie" and status "available"
    When I create the pet
    And I save the pet id
    When I update the pet status to "sold"
    Then the response status code should be 200
    And the pet status should be "sold"

  @regression @pet @search
  Scenario Outline: Search pets by status
    When I search for pets with status "<status>"
    Then the response status code should be 200
    And the response should contain a list of pets

    Examples:
      | status    |
      | available |
      | pending   |
      | sold      |

  @smoke @pet @delete
  Scenario: Delete a pet
    Given I have a pet with name "Rocky" and status "available"
    When I create the pet
    And I save the pet id
    When I delete the pet
    Then the response status code should be 200
