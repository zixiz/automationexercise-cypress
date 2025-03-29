// Page Object Model for the Home page
export class HomePage {
  visit() {
    cy.visit('/');
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

  // --- Actions ---
  navigateToSignupLogin() {
    this.signupLoginButton.click();
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
} 