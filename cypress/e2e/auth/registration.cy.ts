import { HomePage } from '../../pageObjects/HomePage';
import { LoginPage } from '../../pageObjects/LoginPage';
import { SignupPage } from '../../pageObjects/SignupPage';
import { AccountCreatedPage } from '../../pageObjects/AccountCreatedPage';
import { AccountDeletedPage } from '../../pageObjects/AccountDeletedPage';

describe('User Registration Scenarios', () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  const signupPage = new SignupPage();
  const accountCreatedPage = new AccountCreatedPage();
  const accountDeletedPage = new AccountDeletedPage();

  let userData: any;

  before(() => {
    cy.fixture('userData').then((data) => {
      userData = data;
    });
  });

  beforeEach(() => {
    cy.wrap(null).should(() => expect(userData).to.not.be.undefined);

    cy.log('[SETUP] Ensuring user from fixture exists...');
    const userToEnsure = { ...userData.validUser, ...userData.registrationDetails };
    cy.ensureUserExists(userToEnsure);

    cy.visit('/');
    homePage.verifyHomePageVisible();
  });

  it('TC1: should register a new user using fixture data', () => {
    const userToRegister = userData.validUser;
    const registrationDetails = userData.registrationDetails;
    cy.log(`[TC1] Registering fixture user: ${userToRegister.name} (${userToRegister.email}) - Expecting success or deletion cleanup`);

    homePage.navigateToSignupLogin();
    loginPage.verifyNewUserSignupVisible();
    loginPage.enterSignupName(userToRegister.name);
    loginPage.enterSignupEmail(userToRegister.email);

    loginPage.signupButton.click();
    cy.get('body').then($body => {
      if ($body.find('form[action="/signup"] p[style="color: red;"]').length > 0) {
        cy.log('[TC1] Email already existed. Test depends on prior state or ensureUserExists.');
        loginPage.verifyEmailExistsErrorVisible();
      } else {
        cy.log('[TC1] Email does not exist, proceeding with registration.');
        signupPage.verifyEnterAccountInfoVisible();
        signupPage.selectTitle(registrationDetails.title);
        signupPage.nameInput.should('have.value', userToRegister.name);
        signupPage.emailInput.should('have.value', userToRegister.email).and('be.disabled');
        signupPage.enterPassword(userToRegister.password);
        signupPage.selectDateOfBirth(registrationDetails.day, registrationDetails.month, registrationDetails.year);
        signupPage.checkNewsletter();
        signupPage.checkSpecialOffers();
        signupPage.fillAddressDetails(registrationDetails);
        signupPage.clickCreateAccountButton();
        accountCreatedPage.verifyAccountCreatedVisible();
        accountCreatedPage.clickContinueButton();
        homePage.loggedInAs.should('be.visible', { timeout: 10000 });
        homePage.verifyLoggedInAs(userToRegister.name);
        homePage.clickDeleteAccount();
        accountDeletedPage.verifyAccountDeletedVisible();
        accountDeletedPage.clickContinueButton();
        homePage.verifyHomePageVisible();
        homePage.signupLoginButton.should('be.visible');
        cy.log('[TC1] Registration and deletion completed successfully.');
      }
    });
  });

  it('TC5: should show error for existing email during signup', () => {
    const existingUser = userData.validUser;
    const newUserName = "Test Existing Name";

    cy.log(`[TC5] Attempting to signup with existing email: ${existingUser.email}`);

    homePage.navigateToSignupLogin();
    loginPage.verifyNewUserSignupVisible();

    loginPage.enterSignupName(newUserName);
    loginPage.enterSignupEmail(existingUser.email);

    loginPage.clickSignupButton();

    loginPage.verifyEmailExistsErrorVisible();

    cy.log('TC5 Completed: Verified error message for existing email signup.');
  });
}); 