// Page Object Model for the Signup page
export class SignupPage {
  get accountInformationHeading() {
    return cy.contains('.login-form h2.title b', 'Enter Account Information');
  }

  get titleMrRadio() {
    return cy.get('#id_gender1');
  }

  get titleMrsRadio() {
    return cy.get('#id_gender2');
  }

  get nameInput() {
    return cy.getByDataQa('name');
  }

  get emailInput() {
    return cy.getByDataQa('email');
  }

  get passwordInput() {
    return cy.getByDataQa('password');
  }

  get dobDaySelect() {
    return cy.getByDataQa('days');
  }

  get dobMonthSelect() {
    return cy.getByDataQa('months');
  }

  get dobYearSelect() {
    return cy.getByDataQa('years');
  }

  get newsletterCheckbox() {
    return cy.get('#newsletter');
  }

  get specialOffersCheckbox() {
    return cy.get('#optin');
  }

  get firstNameInput() {
    return cy.getByDataQa('first_name');
  }

  get lastNameInput() {
    return cy.getByDataQa('last_name');
  }

  get companyInput() {
    return cy.getByDataQa('company');
  }

  get address1Input() {
    return cy.getByDataQa('address');
  }

  get address2Input() {
    return cy.getByDataQa('address2');
  }

  get countrySelect() {
    return cy.getByDataQa('country');
  }

  get stateInput() {
    return cy.getByDataQa('state');
  }

  get cityInput() {
    return cy.getByDataQa('city');
  }

  get zipcodeInput() {
    return cy.getByDataQa('zipcode');
  }

  get mobileNumberInput() {
    return cy.getByDataQa('mobile_number');
  }

  get createAccountButton() {
    return cy.getByDataQa('create-account');
  }

  verifyEnterAccountInfoVisible() {
    this.accountInformationHeading.should('be.visible');
    cy.log('Enter Account Information section is visible');
  }

  selectTitle(title: 'Mr' | 'Mrs') {
    if (title === 'Mr') {
      this.titleMrRadio.check();
    } else {
      this.titleMrsRadio.check();
    }
    cy.log(`Selected title: ${title}`);
  }

  enterPassword(password: string) {
    this.passwordInput.type(password);
    cy.log('Entered password');
  }

  selectDateOfBirth(day: string, month: string, year: string) {
    this.dobDaySelect.select(day);
    this.dobMonthSelect.select(month);
    this.dobYearSelect.select(year);
    cy.log(`Selected DOB: ${day}-${month}-${year}`);
  }

  checkNewsletter() {
    this.newsletterCheckbox.check();
    cy.log('Checked Newsletter checkbox');
  }

  checkSpecialOffers() {
    this.specialOffersCheckbox.check();
    cy.log('Checked Special Offers checkbox');
  }

  enterFirstName(firstName: string) {
    this.firstNameInput.type(firstName);
    cy.log(`Entered first name: ${firstName}`);
  }

  enterLastName(lastName: string) {
    this.lastNameInput.type(lastName);
    cy.log(`Entered last name: ${lastName}`);
  }

  enterCompany(company: string) {
    this.companyInput.type(company);
    cy.log(`Entered company: ${company}`);
  }

  enterAddress1(address: string) {
    this.address1Input.type(address);
    cy.log(`Entered address 1: ${address}`);
  }

  enterAddress2(address: string) {
    this.address2Input.type(address);
    cy.log(`Entered address 2: ${address}`);
  }

  selectCountry(country: string) {
    this.countrySelect.select(country);
    cy.log(`Selected country: ${country}`);
  }

  enterState(state: string) {
    this.stateInput.type(state);
    cy.log(`Entered state: ${state}`);
  }

  enterCity(city: string) {
    this.cityInput.type(city);
    cy.log(`Entered city: ${city}`);
  }

  enterZipcode(zipcode: string) {
    this.zipcodeInput.type(zipcode);
    cy.log(`Entered zipcode: ${zipcode}`);
  }

  enterMobileNumber(number: string) {
    this.mobileNumberInput.type(number);
    cy.log(`Entered mobile number: ${number}`);
  }

  clickCreateAccountButton() {
    this.createAccountButton.click();
    cy.log('Clicked Create Account button');
  }

  fillAddressDetails(details: {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobileNumber: string;
  }) {
    this.enterFirstName(details.firstName);
    this.enterLastName(details.lastName);
    this.enterCompany(details.company);
    this.enterAddress1(details.address1);
    this.enterAddress2(details.address2);
    this.selectCountry(details.country);
    this.enterState(details.state);
    this.enterCity(details.city);
    this.enterZipcode(details.zipcode);
    this.enterMobileNumber(details.mobileNumber);
  }
} 