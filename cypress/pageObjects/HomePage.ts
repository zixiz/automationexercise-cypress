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
} 