import { HomePage } from '../../pageObjects/HomePage';
import { ContactUsPage } from '../../pageObjects/ContactUsPage';
import { faker } from '@faker-js/faker';

describe('Contact Us Form', () => {
  const homePage = new HomePage();
  const contactUsPage = new ContactUsPage();

  const uploadFilePath = 'cypress/fixtures/testUpload.txt';

  beforeEach(() => {
    cy.visit('/');
    homePage.verifyHomePageVisible();
  });

  it('TC6: should submit the contact us form successfully', () => {
    const testData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      subject: faker.lorem.sentence(4),
      message: faker.lorem.paragraph(2)
    };
    cy.log(`Using contact data - Name: ${testData.name}, Email: ${testData.email}`);

    homePage.navigateToContactUs();
    contactUsPage.verifyContactUsPageVisible();

    contactUsPage.fillContactForm(
      testData.name,
      testData.email,
      testData.subject,
      testData.message
    );

    contactUsPage.uploadFile(uploadFilePath);

    cy.on('window:confirm', (text) => {
      expect(text).to.equal('Press OK to proceed!');
    });

    contactUsPage.submitForm();
    contactUsPage.verifySuccessMessageVisible();
    contactUsPage.clickHomeButtonAfterSuccess();
    homePage.verifyHomePageVisible();

    cy.log('TC6 completed successfully.');
  });
}); 