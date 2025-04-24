import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { CartPage } from '../../pageObjects/CartPage';
import { LoginPage } from '../../pageObjects/LoginPage';
import { SignupPage } from '../../pageObjects/SignupPage';
import { AccountCreatedPage } from '../../pageObjects/AccountCreatedPage';
import { CheckoutPage } from '../../pageObjects/CheckoutPage';
import { PaymentPage } from '../../pageObjects/PaymentPage';
import { AccountDeletedPage } from '../../pageObjects/AccountDeletedPage';
import { faker } from '@faker-js/faker';

describe('Checkout Process', () => {
    const homePage = new HomePage();
    const productsPage = new ProductsPage();
    const cartPage = new CartPage();
    const loginPage = new LoginPage();
    const signupPage = new SignupPage();
    const accountCreatedPage = new AccountCreatedPage();
    const checkoutPage = new CheckoutPage();
    const paymentPage = new PaymentPage();
    const accountDeletedPage = new AccountDeletedPage();
    let fixtureData: any;
    
    beforeEach(() => {
        cy.visit('/');
        homePage.verifyHomePageVisible();
        cy.fixture('userData').then(data => {
          fixtureData = data;
      });
    });

    it('TC14: Place Order - Register while Checkout', () => {
        const uniqueEmail = `checkout_reg_${Date.now()}@test.com`;
        const userData = {
            name: faker.person.firstName(),
            email: uniqueEmail,
            password: faker.internet.password({ length: 10 }),
            title: 'Mr' as 'Mr' | 'Mrs',
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
            zipcode: faker.location.zipCode(),
            mobileNumber: faker.phone.number()
        };
        cy.log(`[TC14 SETUP] User Data: ${JSON.stringify(userData.email)}`);

        cy.fixture('userData').then(fixture => {
            const paymentData = fixture.paymentDetails; 
            expect(paymentData).to.not.be.undefined; 

            homePage.navigateToProducts();
            productsPage.verifyAllProductsPageVisible();
            productsPage.addProductToCartByIndexAndContinue(0);
            homePage.navigateToCart();
            cartPage.verifyCartPageVisible();
            cartPage.clickProceedToCheckout();
            cartPage.checkoutModalRegisterLoginButton.should('be.visible').click();
            cy.log('[TC14] Starting registration during checkout...');
            loginPage.enterSignupName(userData.name);
            loginPage.enterSignupEmail(userData.email);
            loginPage.clickSignupButton();
            signupPage.verifyEnterAccountInfoVisible();
            signupPage.selectTitle(userData.title);
            signupPage.enterPassword(userData.password);
            signupPage.selectDateOfBirth(userData.day, userData.month, userData.year);
            signupPage.checkNewsletter();
            signupPage.checkSpecialOffers();
            signupPage.fillAddressDetails(userData);
            signupPage.clickCreateAccountButton();
            accountCreatedPage.verifyAccountCreatedVisible();
            accountCreatedPage.clickContinueButton();
            homePage.verifyLoggedInAs(userData.name);
            homePage.navigateToCart();
            cartPage.verifyCartPageVisible();
            cartPage.clickProceedToCheckout();
            checkoutPage.verifyCheckoutPageVisible();
            checkoutPage.reviewOrderSection.should('be.visible');
            const orderComment = `Test order comment - ${new Date().toISOString()}`;
            checkoutPage.enterOrderComment(orderComment);
            checkoutPage.clickPlaceOrder();

            paymentPage.verifyPaymentPageVisible();
            paymentPage.fillPaymentDetails(paymentData);
            paymentPage.clickPayAndConfirmOrder();
            paymentPage.verifyOrderSuccessMessageVisible();


            homePage.deleteAccountButton.should('be.visible', {timeout: 10000}).click();
            accountDeletedPage.verifyAccountDeletedVisible();
            accountDeletedPage.clickContinueButton();

            cy.log('[TC14] Completed successfully.');
        }); 
    });


    it('TC15: Place Order - Register before Checkout', () => {
      const uniqueEmail = `checkout_pre_reg_${Date.now()}@test.com`;
      const userData = {
        name: faker.person.firstName(),
        email: uniqueEmail,
        password: faker.internet.password({ length: 10 }),
        title: 'Mrs' as 'Mr' | 'Mrs', 
        day: faker.number.int({ min: 1, max: 28 }).toString(),
        month: faker.date.month(),
        year: faker.number.int({ min: 1970, max: 2000 }).toString(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        company: faker.company.name(),
        address1: faker.location.streetAddress(),
        address2: faker.location.secondaryAddress(),
        country: 'Canada', 
        state: faker.location.state(),
        city: faker.location.city(),
        zipcode: faker.location.zipCode(),
        mobileNumber: faker.phone.number()
      };
      cy.log(`[TC15 SETUP] User Data: ${JSON.stringify(userData.email)}`);

      const paymentData = fixtureData.paymentDetails;
      expect(paymentData).to.not.be.undefined;
      homePage.navigateToSignupLogin();
      cy.log('[TC15] Starting registration before checkout...');
      loginPage.enterSignupName(userData.name);
      loginPage.enterSignupEmail(userData.email);
      loginPage.clickSignupButton();
      signupPage.verifyEnterAccountInfoVisible();
      signupPage.selectTitle(userData.title);
      signupPage.enterPassword(userData.password);
      signupPage.selectDateOfBirth(userData.day, userData.month, userData.year);
      signupPage.checkNewsletter();
      signupPage.checkSpecialOffers();
      signupPage.fillAddressDetails(userData);
      signupPage.clickCreateAccountButton();
      accountCreatedPage.verifyAccountCreatedVisible();
      accountCreatedPage.clickContinueButton();
      homePage.verifyLoggedInAs(userData.name);
      homePage.navigateToProducts(); 
      productsPage.verifyAllProductsPageVisible();
      productsPage.addProductToCartByIndexAndContinue(1); 

      homePage.navigateToCart();
      cartPage.verifyCartPageVisible();

      cartPage.clickProceedToCheckout(); 

      checkoutPage.verifyCheckoutPageVisible();
      checkoutPage.reviewOrderSection.should('be.visible');

      const orderComment = `Test order comment PRE-REGISTER - ${new Date().toISOString()}`;
      checkoutPage.enterOrderComment(orderComment);
      checkoutPage.clickPlaceOrder();


      paymentPage.verifyPaymentPageVisible();
      paymentPage.fillPaymentDetails(paymentData);
      paymentPage.clickPayAndConfirmOrder();

      paymentPage.verifyOrderSuccessMessageVisible(
            'Order Placed!', 
            'Congratulations! Your order has been confirmed!'
      );


      homePage.deleteAccountButton.should('be.visible').click();
      accountDeletedPage.verifyAccountDeletedVisible();
      accountDeletedPage.clickContinueButton();

      cy.log('[TC15] Completed successfully.');
    });

    it('TC16: Place Order - Login before Checkout', () => {
        const userToLogin = fixtureData.validUser;
        const paymentDetails = fixtureData.paymentDetails;
        const productIndexToAdd = 2; 

        cy.log(`[TC16] Starting test. Logging in as: ${userToLogin.email}`);


        homePage.navigateToSignupLogin();
        cy.login(userToLogin.email, userToLogin.password);
        homePage.verifyLoggedInAs(userToLogin.name); 


        homePage.navigateToProducts();
        productsPage.verifyAllProductsPageVisible();
        productsPage.addProductToCartByIndexAndContinue(productIndexToAdd);


        homePage.navigateToCart();
        cartPage.verifyCartPageVisible();

        cartPage.clickProceedToCheckout();

        checkoutPage.verifyCheckoutPageVisible();
        checkoutPage.reviewOrderSection.should('be.visible');

        const orderComment = `Test order comment LOGGED IN USER - ${new Date().toISOString()}`;
        checkoutPage.enterOrderComment(orderComment);
        checkoutPage.clickPlaceOrder();


        paymentPage.verifyPaymentPageVisible();
        paymentPage.fillPaymentDetails(paymentDetails);
        paymentPage.clickPayAndConfirmOrder();
        paymentPage.verifyOrderSuccessMessageVisible();

        cy.log('[TC16] Completed successfully.');
    });

});