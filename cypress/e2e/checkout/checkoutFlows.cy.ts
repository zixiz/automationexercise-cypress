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

    // No need for 'let paymentData' here anymore

    it('TC14: Place Order - Register while Checkout', () => {
        // --- Setup: Generate unique user data ---
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

        // Load fixture data *inside* the test or use cy.then() before use
        cy.fixture('userData').then(fixture => {
            const paymentData = fixture.paymentDetails; // Get payment data here
            expect(paymentData).to.not.be.undefined; // Verify it loaded

            // --- Test Steps ---
            // 1. Launch browser (Implicit)
            // 2. Navigate to url
            cy.visit('/');
            // 3. Verify home page
            homePage.verifyHomePageVisible();
            // 4. Add products
            homePage.navigateToProducts();
            productsPage.verifyAllProductsPageVisible();
            productsPage.addProductToCartByIndexAndContinue(0);
            // 5. Click Cart
            homePage.navigateToCart();
            // 6. Verify Cart page
            cartPage.verifyCartPageVisible();
            // 7. Proceed To Checkout
            cartPage.clickProceedToCheckout();
            // 8. Click Register / Login on modal
            cartPage.checkoutModalRegisterLoginButton.should('be.visible').click();
            // 9. Fill registration
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
            // 10. Verify Account Created
            accountCreatedPage.verifyAccountCreatedVisible();
            accountCreatedPage.clickContinueButton();
            // 11. Verify Logged In
            homePage.verifyLoggedInAs(userData.name);
            // 12. Click Cart
            homePage.navigateToCart();
            cartPage.verifyCartPageVisible();
            // 13. Proceed To Checkout
            cartPage.clickProceedToCheckout();
            // 14. Verify Checkout Page
            checkoutPage.verifyCheckoutPageVisible();
            checkoutPage.reviewOrderSection.should('be.visible');
            // 15. Enter comment & Place Order
            const orderComment = `Test order comment - ${new Date().toISOString()}`;
            checkoutPage.enterOrderComment(orderComment);
            checkoutPage.clickPlaceOrder();

            // --- Payment Page ---
            paymentPage.verifyPaymentPageVisible();
            // 16. Enter payment details (paymentData is now guaranteed to be defined within this .then block)
            paymentPage.fillPaymentDetails(paymentData);
            // 17. Click Pay and Confirm Order
            paymentPage.clickPayAndConfirmOrder();
            // 18. Verify success message
            paymentPage.verifyOrderSuccessMessageVisible();

            // --- Cleanup ---
            // 19. Click Delete Account
            // Ensure header is visible before trying to click delete
             homePage.deleteAccountButton.should('be.visible', {timeout: 10000}).click();
            // 20. Verify Account Deleted
            accountDeletedPage.verifyAccountDeletedVisible();
            accountDeletedPage.clickContinueButton();

            cy.log('[TC14] Completed successfully.');
        }); // End of cy.fixture().then()
    });

    // Add TC15, TC16 etc. here later
});