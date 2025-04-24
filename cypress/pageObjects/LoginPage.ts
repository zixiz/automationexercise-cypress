export class LoginPage {
  // --- Selectors ---
  get newUserSignupHeading() {
    return cy.get('.signup-form h2');
  }

  get signupNameInput() {
    return cy.getByDataQa('signup-name');
  }

  get signupEmailInput() {
    return cy.getByDataQa('signup-email');
  }

  get signupButton() {
    return cy.getByDataQa('signup-button');
  }

  get loginHeading() {
    return cy.get('.login-form h2');
  }

  get loginEmailInput() {
    return cy.getByDataQa('login-email');
  }

  get loginPasswordInput() {
    return cy.getByDataQa('login-password');
  }

  get loginButton() {
    return cy.getByDataQa('login-button');
  }

  get loginError() {
    return cy.get('.login-form form p[style="color: red;"]');
  }

  get emailExistsError() {
    return cy.get('.signup-form form p[style="color: red;"]');
  }

  // --- Actions ---
  verifyNewUserSignupVisible() {
    this.newUserSignupHeading.should('be.visible').and('contain.text', 'New User Signup!');
    cy.log('New User Signup section is visible');
  }

  enterSignupName(name: string) {
    this.signupNameInput.type(name);
    cy.log(`Entered signup name: ${name}`);
  }

  enterSignupEmail(email: string) {
    this.signupEmailInput.type(email);
    cy.log(`Entered signup email: ${email}`);
  }

  clickSignupButton() {
    this.signupButton.click();
    cy.log('Clicked Signup button');
  }

  verifyLoginPageVisible() {
    cy.url().should('include', '/login');
    this.loginHeading.should('be.visible').and('contain.text', 'Login to your account');
    cy.log('Login page is visible');
  }

  verifyLoginErrorVisible() {
    this.loginError
      .should('be.visible')
      .and('have.text', 'Your email or password is incorrect!');
    cy.log('Login error message is visible and correct.');
  }

  verifyEmailExistsErrorVisible() {
    this.emailExistsError
      .should('be.visible')
      .and('have.text', 'Email Address already exist!');
    cy.log('Email already exists error message is visible and correct.');
  }
} 