// Page Object Model for the Test Cases page
export class TestCasesPage {
  // --- Selectors ---
  get testCasesHeading() {
    return cy.contains('.title.text-center b', 'Test Cases');
  }

  // --- Actions ---
  verifyTestCasesPageVisible() {
    cy.url().should('include', '/test_cases');
    this.testCasesHeading.should('be.visible');
    cy.log('Verified navigation to Test Cases page and heading is visible.');
  }
} 