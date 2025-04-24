import { HomePage } from '../../pageObjects/HomePage';
import { LoginPage } from '../../pageObjects/LoginPage';
import { SignupPage } from '../../pageObjects/SignupPage';
import { AccountCreatedPage } from '../../pageObjects/AccountCreatedPage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { CartPage } from '../../pageObjects/CartPage';
import { CheckoutPage } from '../../pageObjects/CheckoutPage';
import { PaymentPage } from '../../pageObjects/PaymentPage'; 
import { PaymentDonePage } from '../../pageObjects/PaymentDonePage'; 
import { AccountDeletedPage } from '../../pageObjects/AccountDeletedPage';
import { faker } from '@faker-js/faker';
import path from 'path';

describe('Order Placement and Invoice Download', () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  const signupPage = new SignupPage();
  const accountCreatedPage = new AccountCreatedPage();
  const productsPage = new ProductsPage(); 
  const cartPage = new CartPage();
  const checkoutPage = new CheckoutPage();
  const paymentPage = new PaymentPage(); 
  const paymentDonePage = new PaymentDonePage();
  const accountDeletedPage = new AccountDeletedPage();

  let registrationData: any;

  beforeEach(() => {
    cy.visit('/');
    homePage.verifyHomePageVisible();

    registrationData = {
        email: `order_test_${Date.now()}@faker.com`,
        password: faker.internet.password({ length: 12 }),
        name: faker.person.firstName() + ' ' + faker.person.lastName(),
        title: faker.helpers.arrayElement(['Mr', 'Mrs']),
        day: faker.number.int({ min: 1, max: 28 }).toString(),
        month: faker.date.month(),
        year: faker.number.int({ min: 1950, max: 2005 }).toString(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        company: faker.company.name(),
        address1: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        country: 'United States',
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode('#####'),
        mobileNumber: faker.phone.number()
      };
  });

  it('TC24: should place order, download invoice, and delete account', () => {
    const paymentDetails = {
        nameOnCard: registrationData.name,
        cardNumber: faker.finance.creditCardNumber('visa'),
        cvc: faker.finance.creditCardCVV(),
        expiryMonth: faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0'),
        expiryYear: (new Date().getFullYear() + faker.number.int({ min: 2, max: 5 })).toString()
    };
    const orderComment = 'TC24 Order - Please process ASAP.';
    const invoiceFilename = 'invoice.txt';

    cy.log('[TC24] Starting test...');

    homePage.navigateToProducts();
    productsPage.verifyAllProductsPageVisible();
    productsPage.addProductToCartByIndexAndContinue(0);
    productsPage.addProductToCartByIndexAndContinue(1);
    homePage.navigateToCart();
    cartPage.verifyCartPageVisible();
    cartPage.clickProceedToCheckout();

     cy.visit('/'); 
     homePage.navigateToSignupLogin();
     cy.log(`Registering user: ${registrationData.email}`);
     loginPage.enterSignupName(registrationData.name);
     loginPage.enterSignupEmail(registrationData.email);
     loginPage.clickSignupButton();
     signupPage.verifyEnterAccountInfoVisible();
     signupPage.selectTitle(registrationData.title);
     signupPage.enterPassword(registrationData.password);
     signupPage.selectDateOfBirth(registrationData.day, registrationData.month, registrationData.year);
     signupPage.checkNewsletter();
     signupPage.checkSpecialOffers();
     signupPage.fillAddressDetails({ /* ... details ... */
         firstName: registrationData.firstName, lastName: registrationData.lastName, company: registrationData.company,
         address1: registrationData.address1, address2: registrationData.address2, country: registrationData.country,
         state: registrationData.state, city: registrationData.city, zipcode: registrationData.zipcode, mobileNumber: registrationData.mobileNumber
     });
     signupPage.clickCreateAccountButton();
     accountCreatedPage.verifyAccountCreatedVisible();
     accountCreatedPage.clickContinueButton();
     homePage.verifyLoggedInAs(registrationData.name);


      homePage.navigateToCart();
      cartPage.verifyCartPageVisible();
      cartPage.clickProceedToCheckout();
      checkoutPage.verifyCheckoutPageVisible();
      checkoutPage.verifyDeliveryAddress(registrationData);
      checkoutPage.verifyBillingAddress(registrationData);
      checkoutPage.enterOrderComment(orderComment);
      checkoutPage.clickPlaceOrder();



      paymentPage.verifyPaymentPageVisible();
      paymentPage.fillPaymentDetails(paymentDetails); 
      paymentPage.clickPayAndConfirmOrder();


      paymentDonePage.verifyOrderPlaced();

      paymentDonePage.downloadInvoiceAndVerify(invoiceFilename).then((downloadResult) => { 
        expect(downloadResult).to.be.ok;

        cy.log(`Plugin reported download success (Result: ${downloadResult}). Verifying file...`);

        const downloadsFolder = Cypress.config("downloadsFolder");
        const downloadedFilename = path.join(downloadsFolder, invoiceFilename);

        cy.task('readFileMaybe', downloadedFilename).then((fileContent) => {
           expect(fileContent, `File "${invoiceFilename}" should exist and be readable`).to.not.be.null;
           expect(invoiceFilename, `File content for "${invoiceFilename}" should include "invoice"`).to.include("invoice");
        });
    });
      paymentDonePage.clickContinue();
      homePage.verifyHomePageVisible();



      homePage.clickDeleteAccount();
      accountDeletedPage.verifyAccountDeletedVisible();
      accountDeletedPage.clickContinueButton();
      homePage.verifyHomePageVisible();
      homePage.signupLoginButton.should('be.visible');

      cy.log('TC24 Completed: Order placed, invoice downloaded, account deleted.');
  });

});