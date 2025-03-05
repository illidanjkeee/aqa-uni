Feature: Sauce Demo Authentication and Shopping Cart
  As a user of Sauce Demo
  I want to be able to log in with valid credentials
  And manage items in my shopping cart

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter "standard_user" as username
    And I enter "secret_sauce" as password
    And I click the login button
    Then I should be logged in successfully

  Scenario: Adding item to cart
    Given I am logged in as "standard_user"
    When I add "Sauce Labs Backpack" to cart
    Then I should see "1" item(s) in the cart badge

  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I enter "invalid_user" as username
    And I enter "invalid_password" as password
    And I click the login button
    Then I should see an error message "Epic sadface: Username and password do not match any user in this service"