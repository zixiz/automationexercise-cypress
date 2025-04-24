import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { ProductDetailsPage } from '../../pageObjects/ProductDetailsPage';
import { CartPage } from '../../pageObjects/CartPage';
import { LoginPage } from '../../pageObjects/LoginPage';


describe('Product Cart Functionality', () => {
    const homePage = new HomePage();
    const productsPage = new ProductsPage();
    const productDetailsPage = new ProductDetailsPage(); 
    const cartPage = new CartPage();
    const loginPage = new LoginPage(); 

    let fixtureUser: any; 

    let firstProductDetails: { name: string; price: string };
    let secondProductDetails: { name: string; price: string };

    before(() => {
        cy.fixture('userData').then(data => {
            fixtureUser = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
        homePage.verifyHomePageVisible();
        cy.wrap(null).should(() => expect(fixtureUser).to.not.be.undefined);
    });

    it('TC12: should add multiple products to cart and verify details', () => {
        cy.log('[TC12] Starting test...');

        homePage.navigateToProducts();
        productsPage.verifyAllProductsPageVisible();
        productsPage.getProductDetailsByIndex(0).then(details => {
            firstProductDetails = details;
            cy.log(`First product details: ${JSON.stringify(firstProductDetails)}`);
            productsPage.addProductToCartByIndexAndContinue(0);
        });

         productsPage.getProductDetailsByIndex(1).then(details => {
            secondProductDetails = details;
            cy.log(`Second product details: ${JSON.stringify(secondProductDetails)}`);
             productsPage.addProductToCartByIndexAndViewCart(1);
        });

        cartPage.verifyCartPageVisible();
        cy.then(() => {
            expect(firstProductDetails).to.not.be.undefined;
            expect(secondProductDetails).to.not.be.undefined;

            cy.log('Verifying products in cart...');
            cartPage.verifyProductInCartById(1); 
            cartPage.verifyProductInCartById(2);
            cartPage.verifyNumberOfItemsInCart(2);

            cartPage.verifyProductDetailsInCart(
                1,
                firstProductDetails.name,
                firstProductDetails.price,
                '1',
                firstProductDetails.price 
            );
            cartPage.verifyProductDetailsInCart(
                2,
                secondProductDetails.name,
                secondProductDetails.price,
                '1', 
                secondProductDetails.price 
            );
        });

        cy.log('TC12 Completed: Added two products and verified cart details.');
    });

    it('TC13: should verify product quantity in cart after update', () => {
        const productIdToTest = 28;
        const desiredQuantity = 4;
        let productDetails: { name: string; price: string };

        cy.log(`[TC13] Starting test for product ID ${productIdToTest} with quantity ${desiredQuantity}...`);
        homePage.navigateToProductDetails(productIdToTest);
        productDetailsPage.verifyProductDetailsPageVisible();

        productDetailsPage.productName.invoke('text').then(name => {
            productDetailsPage.productPrice.invoke('text').then(price => {
                productDetails = { name: name.trim(), price: price.trim() };
                cy.log(`Details for Product ${productIdToTest}: ${JSON.stringify(productDetails)}`);
            });
        });

        productDetailsPage.setQuantity(desiredQuantity);
        productDetailsPage.clickAddToCart();
        productDetailsPage.clickViewCartInModal();
        cartPage.verifyCartPageVisible();

        cy.then(() => {
            expect(productDetails).to.not.be.undefined;
            const priceString = productDetails.price; 
            const numberMatch = priceString.match(/\d+/);
            let expectedTotalPriceString = 'Error: Calculation Failed'; 

            if (numberMatch) {
                const unitPrice = parseInt(numberMatch[0], 10); 
                 if (!isNaN(unitPrice)) {
                    const expectedTotalPriceValue = unitPrice * desiredQuantity; 
                    expectedTotalPriceString = `Rs. ${expectedTotalPriceValue}`; 
                 } else {
                     cy.log(`ERROR: Could not parse unit price "${numberMatch[0]}" as integer`);
                 }
            } else {
                cy.log(`ERROR: Could not find number in price string "${priceString}"`);
            }

            cy.log(`Original Price String: ${priceString}`);
            cy.log(`Extracted Number for Calc: ${numberMatch ? numberMatch[0] : 'N/A'}`);
            cy.log(`Desired Quantity: ${desiredQuantity}`);
            cy.log(`Calculated Expected Total String: ${expectedTotalPriceString}`);

            cartPage.verifyProductDetailsInCart(
                productIdToTest,
                productDetails.name,
                productDetails.price,
                desiredQuantity.toString(),
                expectedTotalPriceString 
            );
        });

        cy.log(`TC13 Completed: Verified product ${productIdToTest} added with quantity ${desiredQuantity}.`);
    });

    it('TC17: should remove a product from the cart', () => {
        const firstProductIndex = 0;
        const secondProductIndex = 1; 
        const firstProductId = 1;    
        const secondProductId = 2;  

        cy.log('[TC17] Starting test...');

        homePage.navigateToProducts();
        productsPage.verifyAllProductsPageVisible();
        productsPage.addProductToCartByIndexAndContinue(firstProductIndex);
        productsPage.addProductToCartByIndexAndContinue(secondProductIndex);

        homePage.navigateToCart();
        cartPage.verifyCartPageVisible();
        cartPage.verifyNumberOfItemsInCart(2);
        cartPage.verifyProductInCartById(firstProductId);
        cartPage.verifyProductInCartById(secondProductId);

        cartPage.removeProductFromCart(firstProductId);

        cy.wait(500); 
        cartPage.verifyProductNotInCart(firstProductId);
        cartPage.verifyProductInCartById(secondProductId);
        cartPage.verifyNumberOfItemsInCart(1); // Verify only one item remains

        cartPage.removeProductFromCart(secondProductId);
        cartPage.verifyNumberOfItemsInCart(0);
        cy.log(`TC17 Completed: Successfully removed product ${firstProductId} from cart.`);
    });

    it('TC20: should search products, add to cart, login, and verify cart persistence', () => {
        const searchTerm = 'white'; 
        let addedProducts: { id: string; name: string; price: string }[] = []; 

        cy.log(`[TC20] Starting test: Search '${searchTerm}', add, login, verify cart.`);

        homePage.navigateToProducts();
        productsPage.verifyAllProductsPageVisible();
        productsPage.allProductsHeading.should('be.visible');
        productsPage.searchForProduct(searchTerm);
        productsPage.verifySearchedProductsVisible();

        productsPage.verifyProductListVisible();
        productsPage.verifyProductsContainSearchTerm(searchTerm);

        productsPage.addAllDisplayedProductsToCart().then(details => {
            addedProducts = details;
            expect(addedProducts.length).to.be.greaterThan(0, 'Expected products to be found and added');
        });

        homePage.navigateToCart();
        cartPage.verifyCartPageVisible();

        cy.then(() => { 
            cartPage.verifyNumberOfItemsInCart(addedProducts.length);
            addedProducts.forEach(product => {
                cy.log(`Verifying Pre-Login: Product ID ${product.id} - ${product.name}`);
                cartPage.verifyProductDetailsInCart(product.id, product.name, product.price, '1', product.price);
            });
        });

        homePage.navigateToSignupLogin();
        loginPage.verifyLoginPageVisible();
        const userToLogin = fixtureUser.validUser;
        const registrationDetails = fixtureUser.registrationDetails;
        const userToEnsure = { ...userToLogin, ...registrationDetails };
        cy.ensureUserExists(userToEnsure); 
        cy.log(`Logging in as: ${userToLogin.email}`);
        loginPage.loginEmailInput.type(userToLogin.email);
        loginPage.loginPasswordInput.type(userToLogin.password);
        loginPage.loginButton.click();
        homePage.verifyLoggedInAs(userToLogin.name);

        homePage.navigateToCart();
        cartPage.verifyCartPageVisible();

        cy.log('Verifying POST-LOGIN cart contents...');
         cy.then(() => { 
             cartPage.verifyNumberOfItemsInCart(addedProducts.length);
             addedProducts.forEach(product => {
                 cy.log(`Verifying Post-Login: Product ID ${product.id} - ${product.name}`);
                 cartPage.verifyProductDetailsInCart(product.id, product.name, product.price, '1', product.price);
             });
         });

         cy.log('TC20 Completed: Verified cart persistence after login.');
         
         cy.log('[TC20 Cleanup] Emptying the cart...');
         cartPage.emptyCart(); 

         cy.log('TC20 Test Fully Completed including cleanup.');
    });
});