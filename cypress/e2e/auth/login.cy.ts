import { HomePage } from '../../pageObjects/HomePage';
import { LoginPage } from '../../pageObjects/LoginPage';
import { AccountDeletedPage } from '../../pageObjects/AccountDeletedPage';

describe('User Login and Logout', () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  const accountDeletedPage = new AccountDeletedPage();

  let fixtureUser: any;

  before(() => {
    cy.fixture('userData').then((data) => {
      fixtureUser = data;
    });
  });

  beforeEach(() => {
    cy.visit('/');
    cy.wrap(null).should(() => expect(fixtureUser).to.not.be.undefined);
  });

  it('TC2: should login user with correct email and password', () => {
    const userToLogin = fixtureUser.validUser;
    const registrationDetails = fixtureUser.registrationDetails;
    const userToEnsure = { ...userToLogin, ...registrationDetails };

    cy.log(`[SETUP TC2] Ensuring user exists: ${userToLogin.email}`);
    cy.ensureUserExists(userToEnsure);

    cy.log(`[TC2] Attempting to login user: ${userToLogin.email}`);
    homePage.navigateToSignupLogin();
    loginPage.verifyLoginPageVisible();
    loginPage.loginEmailInput.type(userToLogin.email);
    loginPage.loginPasswordInput.type(userToLogin.password);
    loginPage.loginButton.click();
    homePage.verifyHomePageVisible();
    homePage.verifyLoggedInAs(userToLogin.name);
    homePage.clickDeleteAccount();
    accountDeletedPage.verifyAccountDeletedVisible();
    accountDeletedPage.clickContinueButton();
    cy.log('TC2 Completed: Login successful and account deleted.');
  });

  it('TC3: should show error on login with incorrect credentials', () => {
    const invalidCredentials = fixtureUser.invalidUser;
    cy.log(`[TC3] Attempting to login with invalid credentials: ${invalidCredentials.email}`);
    homePage.navigateToSignupLogin();
    loginPage.verifyLoginPageVisible();
    loginPage.loginEmailInput.type(invalidCredentials.email);
    loginPage.loginPasswordInput.type(invalidCredentials.password);
    loginPage.loginButton.click();
    loginPage.verifyLoginErrorVisible();
    cy.log('TC3 Completed: Verified error message for incorrect login.');
  });

  it('TC4: should logout user successfully', () => {
    const userToLogin = fixtureUser.validUser;
    const registrationDetails = fixtureUser.registrationDetails;
    const userToEnsure = { ...userToLogin, ...registrationDetails };

    cy.log(`[SETUP TC4] Ensuring user exists: ${userToLogin.email}`);
    cy.ensureUserExists(userToEnsure);

    cy.log(`[SETUP TC4] Logging in user: ${userToLogin.email}`);
    cy.login(userToLogin.email, userToLogin.password);

    cy.log('[TC4] Starting logout test steps...');
    homePage.verifyLoggedInAs(userToLogin.name);
    homePage.clickLogout();
    loginPage.verifyLoginPageVisible();
    homePage.signupLoginButton.should('be.visible');

    cy.log('TC4 Completed: Logout successful.');
  });
}); 