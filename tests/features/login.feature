Feature: Login Authentication
  As a user I want to log in to AdminJS so that I can access the admin panel.

  Scenario: User can log in with valid credentials
    Given I navigate to login page
    When I fill email credential
    When I fill password credential
    When I click the login button
    Then I should be logged in successfully

  Scenario: User cannot log in with invalid credentials
    Given I navigate to login page
    When I fill email credential with invalid email credential
    When I fill password credential with invalid password credential
    When I click the login button
    Then I should see an error message for invalid email and password credential

  Scenario: User cannot log in with invalid email credential
    Given I navigate to login page
    When I fill email credential with invalid email credential
    When I fill password credential
    When I click the login button
    Then I should see an error message for invalid email credential

  Scenario: User cannot log in with invalid password credential
    Given I navigate to login page
    When I fill email credential
    When I fill password credential with invalid password credential
    When I click the login button
    Then I should see an error message for invalid password credential

  Scenario: User cannot log in with blank email credential
    Given I navigate to login page
    When I clear email credential
    When I fill password credential
    When I click the login button
    Then I should see an error message for blank email credential

  Scenario: User cannot log in with blank password credential
    Given I navigate to login page
    When I fill email credential
    When I clear password credential
    When I click the login button
    Then I should see an error message for blank password credential

  Scenario: User cannot log in with blank email and password credential
    Given I navigate to login page
    When I clear email credential
    When I clear password credential
    When I click the login button
    Then I should see an error message for blank email and password credential