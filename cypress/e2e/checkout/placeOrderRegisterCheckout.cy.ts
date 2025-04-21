// cypress/e2e/checkout/placeOrderRegisterCheckout.cy.ts
import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage'; // Import ProductsPage if needed later
import { CartPage } from '../../pageObjects/CartPage';
import { LoginPage } from '../../pageObjects/LoginPage';
import { SignupPage } from '../../pageObjects/SignupPage';
import { AccountCreatedPage } from '../../pageObjects/AccountCreatedPage';
import { faker } from '@faker-js/faker';

describe('Place Order: Register while Checkout', () => {
    const homePage = new HomePage();
    const productsPage = new ProductsPage(); // Instantiate ProductsPage (even if not used much in this part)
    const cartPage = new CartPage();
    const loginPage = new LoginPage();
    const signupPage = new SignupPage();
    const accountCreatedPage = new AccountCreatedPage();

    beforeEach(() => {
        // 1. Launch browser & 2. Navigate to url
        cy.visit('/');
        // 3. Verify that home page is visible successfully
        homePage.verifyHomePageVisible();
    });

    it('TC14: should place order by registering during checkout (Steps 1-10)', () => {
        const productNameToAdd = 'Stylish Dress'; // Product name to add, for clarity
        const productIdToAdd = 4; // Product ID for "Stylish Dress" based on HTML you provided

        cy.log(`[TC14] Starting test: Place order registering during checkout. Adding product: "${productNameToAdd}" (ID ${productIdToAdd})`);

        // 4. Add products to cart (using product ID 4 - "Stylish Dress" from homepage)
        homePage.addProductToCartFromHome(productIdToAdd);

        // 5. Click 'Cart' button
        homePage.navigateToCart();
        // 6. Verify that cart page is displayed
        cartPage.verifyCartPageVisible();

        // 7. Click Proceed To Checkout
        cartPage.clickProceedToCheckout();

        // 8. Click 'Register / Login' button (in modal)
        cartPage.clickRegisterLoginInCheckoutModal();

        // 9. Fill all details in Signup and create account (using Faker for dynamic data as email uniqueness is still important)
        // Generate unique user data
        const userData = {
            name: faker.person.firstName(),
            email: faker.internet.email({ firstName: 'checkout', lastName: Date.now().toString(), provider: 'test.com' }),
            password: faker.internet.password(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            company: faker.company.name(),
            address1: faker.location.streetAddress(),
            address2: faker.location.secondaryAddress(),
            country: 'United States',
            state: faker.location.state(),
            city: faker.location.city(),
            zipcode: faker.location.zipCode(),
            mobileNumber: faker.phone.number(),
            title: 'Mr' as 'Mr' | 'Mrs', // Needed for signupPage.fillAccountInfo - cast for type safety
            day: faker.number.int({ min: 1, max: 28 }).toString(),
            month: faker.date.month(),
            year: faker.number.int({ min: 1950, max: 2005 }).toString(),
        };

        loginPage.verifyNewUserSignupVisible(); // Verify signup section is there
        loginPage.enterSignupName(userData.name);
        loginPage.enterSignupEmail(userData.email);
        loginPage.clickSignupButton();

        signupPage.verifyEnterAccountInfoVisible(); // Verify account info form
        signupPage.fillAddressDetails(userData); // Fill address info too for registration

        signupPage.selectTitle(userData.title); // Fill title, password, DOB, checkboxes
        signupPage.enterPassword(userData.password);
        signupPage.selectDateOfBirth(userData.day, userData.month, userData.year);
        signupPage.checkNewsletter();
        signupPage.checkSpecialOffers();

        signupPage.clickCreateAccountButton(); // Submit account creation

        // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
        accountCreatedPage.verifyAccountCreatedVisible(); // Verify "Account Created!"
        accountCreatedPage.clickContinueButton();

        cy.log('TC14 - Steps 1-10 Completed: Registered user during checkout process.');
    });

    // --- Steps 11-20 for placing order and deleting account will be in the next part of TC14 ---

});