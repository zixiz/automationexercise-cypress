/// <reference types="cypress" />

// Custom command for login
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(password);
  cy.get('[data-qa="login-button"]').click();
});

// Custom command for registration
Cypress.Commands.add('register', (name: string, email: string, password: string) => {
  cy.visit('/signup');
  cy.get('[data-qa="signup-name"]').type(name);
  cy.get('[data-qa="signup-email"]').type(email);
  cy.get('[data-qa="signup-button"]').click();
  cy.get('[data-qa="password"]').type(password);
  cy.get('[data-qa="first_name"]').type('Test');
  cy.get('[data-qa="last_name"]').type('User');
  cy.get('[data-qa="address1"]').type('123 Test St');
  cy.get('[data-qa="state"]').type('Test State');
  cy.get('[data-qa="city"]').type('Test City');
  cy.get('[data-qa="zipcode"]').type('12345');
  cy.get('[data-qa="mobile_number"]').type('1234567890');
  cy.get('[data-qa="create-account"]').click();
});

// Custom command for adding product to cart
Cypress.Commands.add('addToCart', (productName: string) => {
  cy.get('.product-image-wrapper').contains(productName).click();
  cy.get('[data-qa="add-to-cart"]').click();
});

// Custom command for checkout
Cypress.Commands.add('checkout', () => {
  cy.get('[data-qa="cart"]').click();
  cy.get('[data-qa="checkout"]').click();
  cy.get('[data-qa="first_name"]').type('Test');
  cy.get('[data-qa="last_name"]').type('User');
  cy.get('[data-qa="address"]').type('123 Test St');
  cy.get('[data-qa="country"]').select('United States');
  cy.get('[data-qa="state"]').type('Test State');
  cy.get('[data-qa="city"]').type('Test City');
  cy.get('[data-qa="zipcode"]').type('12345');
  cy.get('[data-qa="mobile_number"]').type('1234567890');
  cy.get('[data-qa="place-order"]').click();
});

// Add TypeScript type definitions for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      register(name: string, email: string, password: string): Chainable<void>;
      addToCart(productName: string): Chainable<void>;
      checkout(): Chainable<void>;
    }
  }
} 