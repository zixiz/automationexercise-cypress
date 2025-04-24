export class AccountCreatedPage {
  // --- Selectors ---
  get accountCreatedHeading() {
    return cy.getByDataQa('account-created');
  }

  get continueButton() {
    return cy.getByDataQa('continue-button');
  }

  // --- Actions ---
  verifyAccountCreatedVisible() {
    cy.url().should('include', '/account_created');
    this.accountCreatedHeading.should('be.visible').and('contain.text', 'Account Created!');
    cy.log('Account Created message is visible');
  }

  clickContinueButton() {
    this.continueButton.click();
    cy.log('Clicked Continue button on Account Created page');
  }
} 