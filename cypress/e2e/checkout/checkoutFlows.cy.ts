// cypress/e2e/checkout/checkoutFlows.cy.ts
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

            cy.visit('/');
            homePage.verifyHomePageVisible();
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

            // --- Payment Page ---
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


});