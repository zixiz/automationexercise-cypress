// Page Object Model for the Account Deleted page
export class AccountDeletedPage {
  get accountDeletedHeading() {
    return cy.getByDataQa('account-deleted');
  }

  get continueButton() {
    return cy.getByDataQa('continue-button');
  }

  verifyAccountDeletedVisible() {
    cy.url().should('include', '/delete_account');
    this.accountDeletedHeading.should('be.visible').and('contain.text', 'Account Deleted!');
    cy.log('Account Deleted message is visible');
  }

  clickContinueButton() {
    this.continueButton.click();
    cy.log('Clicked Continue button on Account Deleted page');
  }
} 