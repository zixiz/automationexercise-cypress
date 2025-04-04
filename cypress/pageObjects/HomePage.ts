// Page Object Model for the Home page
export class HomePage {
  visit() {
    cy.visit('/');
  }

  // --- Selectors ---
  get homePage() {
    return cy.get('#slider-carousel');
  }

  get signupLoginButton() {
    return cy.get('a[href="/login"]');
  }

  get loggedInAs() {
    return cy.get('a:contains("Logged in as")');
  }

  get deleteAccountButton() {
    return cy.get('a[href="/delete_account"]');
  }

  get logoutButton() {
    return cy.get('a[href="/logout"]');
  }

  get contactUsButton() {
    return cy.get('a[href="/contact_us"]');
  }

  get testCasesButton() {
    return cy.get('.shop-menu a[href="/test_cases"]');
  }

  get productsButton() {
    return cy.get('.shop-menu a[href="/products"]');
  }

  get cartButton() {
    return cy.get('.shop-menu a[href="/view_cart"]');
  }

  // --- Footer Subscription Selectors ---
  get footer() {
    return cy.get('#footer');
  }

  get subscriptionHeading() {
    return this.footer.find('.single-widget h2').contains('Subscription');
  }

  get subscriptionEmailInput() {
    return this.footer.find('#susbscribe_email');
  }

  get subscriptionSubmitButton() {
    return this.footer.find('#subscribe');
  }

  get subscriptionSuccessMessage() {
    return cy.get('#success-subscribe .alert-success.alert');
  }

  // --- Actions ---
  verifyHomePageVisible() {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    this.homePage.should('be.visible');
    cy.log('Home page is visible');
  }

  navigateToSignupLogin() {
    this.signupLoginButton.click();
    cy.log('Clicked Signup/Login button');
  }

  verifyLoggedInAs(username: string) {
    this.loggedInAs.should('contain', username);
    cy.log(`Verified logged in as ${username}`);
  }

  clickDeleteAccount() {
    this.deleteAccountButton.click();
    cy.log('Clicked Delete Account button');
  }

  clickLogout() {
    this.logoutButton.click();
    cy.log('Clicked Logout button');
  }

  navigateToContactUs() {
    this.contactUsButton.click();
    cy.log('Navigated to Contact Us page');
  }

  navigateToTestCases() {
    this.testCasesButton.click();
    cy.log('Clicked Test Cases button');
  }

  navigateToProducts() {
    this.productsButton.click();
    cy.log('Clicked Products button');
  }

  navigateToCart() {
    this.cartButton.click();
    cy.log('Clicked Cart button');
  }

  // --- Footer Subscription Actions ---
  scrollToFooter() {
    this.footer.scrollIntoView();
    cy.log('Scrolled down to the footer.');
  }

  verifySubscriptionHeadingVisible() {
    this.subscriptionHeading.should('be.visible');
    cy.log('Verified "SUBSCRIPTION" heading is visible in the footer.');
  }

  enterSubscriptionEmail(email: string) {
    this.subscriptionEmailInput.type(email);
    cy.log(`Entered subscription email: ${email}`);
  }

  submitSubscription() {
    this.subscriptionSubmitButton.click();
    cy.log('Clicked subscription submit button.');
  }

  verifySubscriptionSuccess() {
    this.subscriptionSuccessMessage
      .should('be.visible', { timeout: 10000 })
      .and('contain.text', 'You have been successfully subscribed!');
    cy.log('Verified subscription success message.');
  }
} 