/// <reference types="cypress" />

import { SignupPage } from '../pageObjects/SignupPage';
import { LoginPage } from '../pageObjects/LoginPage';
import { AccountCreatedPage } from '../pageObjects/AccountCreatedPage';
import { HomePage } from '../pageObjects/HomePage';

// Custom command for login
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.session([email, password], () => {
    cy.visit('/login');
    cy.get('input[data-qa="login-email"]').type(email, { log: false });
    cy.get('input[data-qa="login-password"]').type(password, { log: false });
    cy.get('button[data-qa="login-button"]').click();
    cy.url().should('not.include', '/login');
    cy.get('li a i.fa-user + b').should('be.visible');
  }, {
    cacheAcrossSpecs: true
  });
  cy.visit('/');
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

// Custom command to get element by data-qa attribute
Cypress.Commands.add('getByDataQa', (selector: string, ...args: any[]) => {
  return cy.get(`[data-qa="${selector}"]`, ...args);
});

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.window().should('have.property', 'document').its('readyState').should('eq', 'complete');
});

// Custom command to clear local storage and cookies
Cypress.Commands.add('clearSession', () => {
  cy.clearLocalStorage();
  cy.clearCookies();
});

// Custom command to check if element is in viewport
Cypress.Commands.add('isInViewport', { prevSubject: 'element' }, (subject) => {
  const bottom = Cypress.$(cy.state('window')).height();
  const rect = subject[0].getBoundingClientRect();
  expect(rect.top).not.to.be.greaterThan(bottom);
  expect(rect.bottom).not.to.be.lessThan(0);
  expect(rect.right).not.to.be.lessThan(0);
  expect(rect.left).not.to.be.greaterThan(Cypress.$(cy.state('window')).width());
  return subject;
});

// Add TypeScript type definitions for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      register(name: string, email: string, password: string): Chainable<void>;
      addToCart(productName: string): Chainable<void>;
      checkout(): Chainable<void>;
      getByDataQa(selector: string, ...args: any[]): Chainable<JQuery<HTMLElement>>;
      waitForPageLoad(): Chainable<void>;
      clearSession(): Chainable<void>;
      isInViewport(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('ensureUserExists', (userData: UserData) => {
    const loginPage = new LoginPage();
    const signupPage = new SignupPage();
    const accountCreatedPage = new AccountCreatedPage();
    const homePage = new HomePage();

    cy.log(`Attempting to ensure user exists: ${userData.email}`);

    cy.visit('/login');
    loginPage.verifyNewUserSignupVisible();

    loginPage.enterSignupName(userData.name);
    loginPage.enterSignupEmail(userData.email);
    loginPage.signupButton.click();

    cy.get('body').then($body => {
        if ($body.find('form[action="/signup"] p[style="color: red;"]').length > 0) {
            cy.log('User already exists, proceeding without registration.');
            cy.visit('/login');
            return cy.wrap(userData);
        } else {
            cy.log('User does not exist, registering...');
            signupPage.verifyEnterAccountInfoVisible();

            signupPage.selectTitle(userData.title);
            signupPage.enterPassword(userData.password);
            signupPage.selectDateOfBirth(userData.day, userData.month, userData.year);
            signupPage.checkNewsletter();
            signupPage.checkSpecialOffers();
            signupPage.fillAddressDetails({
                firstName: userData.firstName,
                lastName: userData.lastName,
                company: userData.company,
                address1: userData.address1,
                address2: userData.address2,
                country: userData.country,
                state: userData.state,
                city: userData.city,
                zipcode: userData.zipcode,
                mobileNumber: userData.mobileNumber,
            });

            signupPage.clickCreateAccountButton();

            accountCreatedPage.verifyAccountCreatedVisible();
            accountCreatedPage.clickContinueButton();

            homePage.verifyLoggedInAs(userData.name);
            homePage.clickLogout();
            loginPage.verifyLoginPageVisible();
            cy.log('User registered and logged out.');
            return cy.wrap(userData);
        }
    });
}); 