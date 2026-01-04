@epic:PetStore_API
@feature:Store_Operations
Feature: Pet Store - Store Operations
  As a pet store API user
  I want to manage store orders
  So that I can place and track orders

  @smoke @store @order
  Scenario: Place a new order
    Given I have an order for pet id 1 with quantity 2
    When I place the order
    Then the response status code should be 200
    And I save the order id
    And the order status should be "placed"
    And the order pet id should be 1

  @regression @store @read
  Scenario: Get order by ID
    Given I have an order for pet id 2 with quantity 1
    When I place the order
    And I save the order id
    When I get the order by id
    Then the response status code should be 200
    And the order status should be "placed"

  @regression @store @delete
  Scenario: Delete an order
    Given I have an order for pet id 3 with quantity 1
    When I place the order
    And I save the order id
    When I delete the order
    Then the response status code should be 200

  @smoke @store @inventory
  Scenario: Get store inventory
    When I get the store inventory
    Then the response status code should be 200
    And the response should contain inventory data
