// Page Object Model for the Home page
export class HomePage {
  visit() {
    cy.visit('/'); // Uses baseUrl from cypress.config.ts
  }

  // --- Selectors ---
  get signupLoginButton() {
    return cy.get('a[href="/login"]');
  }

  get homePageSlider() {
    return cy.get('#slider');
  }

  get loggedInUsername() {
    return cy.contains('li a', 'Logged in as').find('b');
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
    return cy.get('a[href="/test_cases"]');
  }

  get productsButton() {
    return cy.get('a[href="/products"]');
  }

  get subscriptionEmailInput() {
    return cy.get('#susbscribe_email');
  }

  get subscriptionSubmitButton() {
    return cy.get('#subscribe');
  }

  get subscriptionSuccessMessage() {
    return cy.get('.alert-success.alert'); // Adjust based on actual element
  }

  get footer() {
    return cy.get('#footer');
  }

  get scrollUpArrow() {
    return cy.get('#scrollUp');
  }

  get fullFledgedPracticeText() {
    // Example selector for verifying scroll-up action worked
    return cy.contains('h2', 'Full-Fledged practice website');
  }

  // --- Actions ---
  navigateToSignupLogin() {
    this.signupLoginButton.click();
  }

  navigateToContactUs() {
    this.contactUsButton.click();
  }

  navigateToTestCases() {
    this.testCasesButton.click();
  }

  navigateToProducts() {
    this.productsButton.click();
  }

  verifyHomePageVisible() {
    cy.location('pathname', { timeout: 10000 }).should('eq', '/');
    this.homePageSlider.should('be.visible');
    cy.log('Home page is visible');
  }

  verifyLoggedInAs(username: string) {
    this.loggedInUsername.should('have.text', username).and('be.visible');
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

  enterSubscriptionEmail(email: string) {
    this.subscriptionEmailInput.type(email);
  }

  submitSubscription() {
    this.subscriptionSubmitButton.click();
  }

  verifySubscriptionSuccess() {
    this.subscriptionSuccessMessage
      .should('be.visible')
      .and('contain.text', 'You have been successfully subscribed!');
  }

  scrollToFooter() {
    this.footer.scrollIntoView();
  }

  clickScrollUpArrow() {
    this.scrollUpArrow.click();
  }

  verifyScrollUpArrowNotVisible() {
    this.scrollUpArrow.should('not.be.visible');
  }

  verifyTopOfThePageVisible() {
    this.fullFledgedPracticeText.should('be.visible');
    // Check window scroll position
    cy.window().its('scrollY').should('eq', 0);
  }
} 