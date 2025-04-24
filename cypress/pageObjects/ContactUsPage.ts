export class ContactUsPage {
  // --- Selectors ---
  get getInTouchHeading() {
    return cy.contains('.contact-form h2.title', 'Get In Touch');
  }

  get nameInput() {
    return cy.getByDataQa('name');
  }

  get emailInput() {
    return cy.getByDataQa('email');
  }

  get subjectInput() {
    return cy.getByDataQa('subject');
  }

  get messageTextarea() {
    return cy.getByDataQa('message');
  }

  get uploadFileInput() {
    return cy.get('input[name="upload_file"]');
  }

  get submitButton() {
    return cy.getByDataQa('submit-button');
  }

  get successMessage() {
    return cy.get('.contact-form .status.alert.alert-success');
  }

  get homeButtonAfterSuccess() {
    return cy.get('#form-section > a.btn.btn-success');
  }

  // --- Actions ---
  verifyContactUsPageVisible() {
    cy.url().should('include', '/contact_us');
    this.getInTouchHeading.should('be.visible');
    cy.log('Contact Us page is visible with "Get In Touch" heading.');
  }

  fillContactForm(name: string, email: string, subject: string, message: string) {
    this.nameInput.type(name);
    this.emailInput.type(email);
    this.subjectInput.type(subject);
    this.messageTextarea.type(message);
    cy.log('Filled contact form details.');
  }

  uploadFile(filePath: string) {
    this.uploadFileInput.selectFile(filePath);
    cy.log(`Selected file for upload: ${filePath}`);
  }

  submitForm() {
    this.submitButton.click();
    cy.log('Clicked Submit button.');
  }

  verifySuccessMessageVisible(expectedMessage: string = 'Success! Your details have been submitted successfully.') {
    this.successMessage
      .should('be.visible')
      .and('have.text', expectedMessage);
    cy.log('Verified success message is visible and correct.');
  }

  clickHomeButtonAfterSuccess() {
    this.homeButtonAfterSuccess.should('be.visible').click();
    cy.log('Clicked the Home button displayed after successful submission.');
  }
} 