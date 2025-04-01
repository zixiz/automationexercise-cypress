import { HomePage } from '../../pageObjects/HomePage';
import { CartPage } from '../../pageObjects/CartPage';
import { faker } from '@faker-js/faker';

describe('Subscription Functionality', () => {
  const homePage = new HomePage();
  const cartPage = new CartPage();

  beforeEach(() => {
    cy.visit('/');
    homePage.verifyHomePageVisible();
  });

  it('TC10: should subscribe successfully from the homepage footer', () => {
    const subscriberEmail = faker.internet.email(); // Generate a random email
    cy.log(`[TC10] Testing subscription with email: ${subscriberEmail}`);

    homePage.scrollToFooter();
    homePage.verifySubscriptionHeadingVisible();

    homePage.enterSubscriptionEmail(subscriberEmail);
    homePage.submitSubscription();

    homePage.verifySubscriptionSuccess();

    cy.log('TC10 Completed: Homepage subscription successful.');
  });

  it('TC11: should subscribe successfully from the cart page footer', () => {
    const subscriberEmail = faker.internet.email(); // Generate a unique email
    cy.log(`[TC11] Testing subscription with email: ${subscriberEmail}`);

    homePage.navigateToCart();
    cartPage.verifyCartPageVisible();

    homePage.scrollToFooter();
    homePage.verifySubscriptionHeadingVisible();


    homePage.enterSubscriptionEmail(subscriberEmail);
    homePage.submitSubscription();

    homePage.verifySubscriptionSuccess();
    cy.log('TC11 Completed: Successfully subscribed via cart page footer.');
  });
}); 