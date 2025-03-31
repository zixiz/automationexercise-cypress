import { HomePage } from '../../pageObjects/HomePage';
import { TestCasesPage } from '../../pageObjects/TestCasesPage';

describe('Page Navigation Verification', () => {
  const homePage = new HomePage();
  const testCasesPage = new TestCasesPage();

  beforeEach(() => {
    cy.visit('/');
    homePage.verifyHomePageVisible();
  });

  it('TC7: should navigate to the Test Cases page successfully', () => {
    cy.log('[TC7] Starting Test Case 7 verification...');

    // 4. Click on 'Test Cases' button
    homePage.navigateToTestCases();

    // 5. Verify user is navigated to test cases page successfully
    testCasesPage.verifyTestCasesPageVisible();

    cy.log('TC7 Completed: Successfully navigated to and verified the Test Cases page.');
  });
}); 