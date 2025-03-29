import { HomePage } from '../../pageObjects/HomePage';
import { LoginPage } from '../../pageObjects/LoginPage';
import { SignupPage } from '../../pageObjects/SignupPage';
import { AccountCreatedPage } from '../../pageObjects/AccountCreatedPage';
import { AccountDeletedPage } from '../../pageObjects/AccountDeletedPage';
import { faker } from '@faker-js/faker';

// Test suite for user registration functionality
describe('User Registration', () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  const signupPage = new SignupPage();
  const accountCreatedPage = new AccountCreatedPage();
  const accountDeletedPage = new AccountDeletedPage();

  const uniqueEmail = `test_${Date.now()}@faker.com`;
  const registrationData = {
    name: faker.person.firstName(),
    email: uniqueEmail,
    password: faker.internet.password({ length: 10 }),
    title: 'Mr' as 'Mr' | 'Mrs',
    day: faker.number.int({ min: 1, max: 28 }).toString(),
    month: faker.date.month(),
    year: faker.number.int({ min: 1950, max: 2005 }).toString(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'United States',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobileNumber: faker.phone.number()
  };

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    homePage.visit();
  });

  it('TC1: should register a new user successfully', () => {
    cy.log(`Registering user: ${registrationData.name} (${registrationData.email})`);

    homePage.verifyHomePageVisible();
    homePage.navigateToSignupLogin();
    loginPage.verifyNewUserSignupVisible();
    loginPage.enterSignupName(registrationData.name);
    loginPage.enterSignupEmail(registrationData.email);
    loginPage.clickSignupButton();
    signupPage.verifyEnterAccountInfoVisible();
    signupPage.selectTitle(registrationData.title);
    signupPage.nameInput.should('have.value', registrationData.name);
    signupPage.emailInput.should('have.value', registrationData.email).and('be.disabled');
    signupPage.enterPassword(registrationData.password);
    signupPage.selectDateOfBirth(registrationData.day, registrationData.month, registrationData.year);
    signupPage.checkNewsletter();
    signupPage.checkSpecialOffers();
    signupPage.fillAddressDetails({
      firstName: registrationData.firstName,
      lastName: registrationData.lastName,
      company: registrationData.company,
      address1: registrationData.address1,
      address2: registrationData.address2,
      country: registrationData.country,
      state: registrationData.state,
      city: registrationData.city,
      zipcode: registrationData.zipcode,
      mobileNumber: registrationData.mobileNumber
    });
    signupPage.clickCreateAccountButton();
    accountCreatedPage.verifyAccountCreatedVisible();
    accountCreatedPage.clickContinueButton();

    cy.get('body').then($body => {
      if ($body.find('#ad_position_box').length > 0) {
        cy.get('#ad_position_box').find('.btn.btn-secondary.btn-lg.show[aria-label="Close"]').click({ force: true });
        cy.log('Dismissed ad overlay');
      }
    });

    homePage.loggedInUsername.should('be.visible');
    homePage.verifyLoggedInAs(registrationData.name);
    homePage.clickDeleteAccount();
    accountDeletedPage.verifyAccountDeletedVisible();
    accountDeletedPage.clickContinueButton();

    homePage.verifyHomePageVisible();
    homePage.signupLoginButton.should('be.visible');

    cy.log('User registration, login verification, and deletion completed successfully.');

    cy.clearCookies();
    cy.clearLocalStorage();
    cy.reload();
    homePage.verifyHomePageVisible();
    homePage.signupLoginButton.should('be.visible');
    cy.log('Test case completed successfully with proper cleanup.');
  });
}); 