import { HomePage } from '../../pageObjects/HomePage';
import { LoginPage } from '../../pageObjects/LoginPage';
import { SignupPage } from '../../pageObjects/SignupPage';
import { AccountCreatedPage } from '../../pageObjects/AccountCreatedPage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { CartPage } from '../../pageObjects/CartPage';
import { CheckoutPage } from '../../pageObjects/CheckoutPage'; // Import CheckoutPage
import { AccountDeletedPage } from '../../pageObjects/AccountDeletedPage';
import { faker } from '@faker-js/faker';

describe('Checkout Address Verification', () => {
    const homePage = new HomePage();
    const loginPage = new LoginPage();
    const signupPage = new SignupPage();
    const accountCreatedPage = new AccountCreatedPage();
    const productsPage = new ProductsPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage(); // Instantiate CheckoutPage
    const accountDeletedPage = new AccountDeletedPage();

    let registrationData: any;

    beforeEach(() => {
        cy.visit('/');
        homePage.verifyHomePageVisible();

        registrationData = {
            email: `checkout_test_${Date.now()}@faker.com`,
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
        registrationData.fullNameForDisplay = `${registrationData.title}. ${registrationData.firstName} ${registrationData.lastName}`;

    });

    it('TC23: should verify address details match registration during checkout', () => {
        cy.log('[TC23] Starting test: Register, add item, checkout, verify address, delete.');

        homePage.navigateToSignupLogin();

        cy.log(`Registering user: ${registrationData.email}`);
        loginPage.enterSignupName(registrationData.name); 
        loginPage.enterSignupEmail(registrationData.email);
        loginPage.clickSignupButton();

        signupPage.verifyEnterAccountInfoVisible();
        signupPage.selectTitle(registrationData.title);
        signupPage.nameInput.should('have.value', registrationData.name);
        signupPage.emailInput.should('have.value', registrationData.email);
        signupPage.enterPassword(registrationData.password);
        signupPage.selectDateOfBirth(registrationData.day, registrationData.month, registrationData.year);
        signupPage.checkNewsletter();
        signupPage.checkSpecialOffers();
        signupPage.fillAddressDetails({ 
            firstName: registrationData.firstName,
            lastName: registrationData.lastName,
            company: registrationData.company,
            address1: registrationData.address1,
            address2: registrationData.address2,
            country: registrationData.country,
            state: registrationData.state,
            city: registrationData.city,
            zipcode: registrationData.zipcode,
            mobileNumber: registrationData.mobileNumber
        });
        signupPage.clickCreateAccountButton();

        accountCreatedPage.verifyAccountCreatedVisible();
        accountCreatedPage.clickContinueButton();

        homePage.verifyLoggedInAs(registrationData.name); 

        homePage.navigateToProducts();
        productsPage.verifyAllProductsPageVisible();
        productsPage.addProductToCartByIndexAndContinue(0);

        homePage.navigateToCart();

        cartPage.verifyCartPageVisible();

        cartPage.clickProceedToCheckout();

        checkoutPage.verifyCheckoutPageVisible();

        checkoutPage.verifyDeliveryAddress(registrationData);

        checkoutPage.verifyBillingAddress(registrationData);

        homePage.clickDeleteAccount();

        accountDeletedPage.verifyAccountDeletedVisible();
        accountDeletedPage.clickContinueButton();
        homePage.verifyHomePageVisible();
        homePage.signupLoginButton.should('be.visible');

        cy.log('TC23 Completed: Address verification successful, account deleted.');
    });
});