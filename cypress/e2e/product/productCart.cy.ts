// cypress/e2e/product/productCart.cy.ts
import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { ProductDetailsPage } from '../../pageObjects/ProductDetailsPage';
import { CartPage } from '../../pageObjects/CartPage';

describe('Product Cart Functionality', () => {
    const homePage = new HomePage();
    const productsPage = new ProductsPage();
    const productDetailsPage = new ProductDetailsPage(); // Instantiate ProductDetailsPage
    const cartPage = new CartPage();

    // Store product details fetched from the products page
    let firstProductDetails: { name: string; price: string };
    let secondProductDetails: { name: string; price: string };

    beforeEach(() => {
        // 1. Launch browser & 2. Navigate to url
        cy.visit('/');
        // 3. Verify that home page is visible successfully
        homePage.verifyHomePageVisible();
    });

    it('TC12: should add multiple products to cart and verify details', () => {
        cy.log('[TC12] Starting test...');

        // 4. Click 'Products' button
        homePage.navigateToProducts();
        productsPage.verifyAllProductsPageVisible();

        // --- Add First Product ---
        // Get details *before* adding
        productsPage.getProductDetailsByIndex(0).then(details => {
            firstProductDetails = details;
            cy.log(`First product details: ${JSON.stringify(firstProductDetails)}`);

            // 5. Hover over first product and click 'Add to cart' (POM handles click)
            productsPage.addProductToCartByIndexAndContinue(0);
        });


        // --- Add Second Product ---
         // Get details *before* adding
         productsPage.getProductDetailsByIndex(1).then(details => {
            secondProductDetails = details;
            cy.log(`Second product details: ${JSON.stringify(secondProductDetails)}`);

             // 7. Hover over second product and click 'Add to cart'
             // 8. Click 'View Cart' button (POM method handles this)
             productsPage.addProductToCartByIndexAndViewCart(1);
        });


        // --- Verify Cart Page ---
        cartPage.verifyCartPageVisible();

        // Use cy.then to ensure product details are available before verification
        cy.then(() => {
            expect(firstProductDetails).to.not.be.undefined;
            expect(secondProductDetails).to.not.be.undefined;

            cy.log('Verifying products in cart...');
            // 9. Verify both products are added to Cart (by checking their rows exist)
            cartPage.verifyProductInCartById(1); // Assuming first product has ID 1
            cartPage.verifyProductInCartById(2); // Assuming second product has ID 2
            cartPage.verifyNumberOfItemsInCart(2); // Verify exactly 2 items

            // 10. Verify their prices, quantity and total price
            // Assuming quantity is 1 for both when added this way
            // Assuming total price equals unit price for quantity 1
            cartPage.verifyProductDetailsInCart(
                1, // Product ID
                firstProductDetails.name,
                firstProductDetails.price,
                '1', // Expected Quantity
                firstProductDetails.price // Expected Total
            );
            cartPage.verifyProductDetailsInCart(
                2, // Product ID
                secondProductDetails.name,
                secondProductDetails.price,
                '1', // Expected Quantity
                secondProductDetails.price // Expected Total
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

        // Store details from the page for later verification
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

        // --- Verify Cart Page ---
        cy.then(() => {
            expect(productDetails).to.not.be.undefined;

            // --- Refined Calculation & Logging ---
            const priceString = productDetails.price; // e.g., "Rs. 1299"
            // Extract only digits using regex
            const numberMatch = priceString.match(/\d+/);
            let expectedTotalPriceString = 'Error: Calculation Failed'; // Default/fallback

            if (numberMatch) {
                const unitPrice = parseInt(numberMatch[0], 10); // Use parseInt for whole numbers
                 if (!isNaN(unitPrice)) {
                    const expectedTotalPriceValue = unitPrice * desiredQuantity; // 1299 * 4 = 5196
                    expectedTotalPriceString = `Rs. ${expectedTotalPriceValue}`; // Format "Rs. 5196"
                 } else {
                     cy.log(`ERROR: Could not parse unit price "${numberMatch[0]}" as integer`);
                     // Optionally fail the test here if price parsing is critical
                     // throw new Error('Failed to parse unit price');
                 }
            } else {
                cy.log(`ERROR: Could not find number in price string "${priceString}"`);
                 // Optionally fail the test here
                 // throw new Error('Failed to extract price number');
            }

            cy.log(`Original Price String: ${priceString}`);
            cy.log(`Extracted Number for Calc: ${numberMatch ? numberMatch[0] : 'N/A'}`);
            cy.log(`Desired Quantity: ${desiredQuantity}`);
            cy.log(`Calculated Expected Total String: ${expectedTotalPriceString}`);
            // --- End Refined Calculation & Logging ---

            cartPage.verifyProductDetailsInCart(
                productIdToTest,
                productDetails.name,
                productDetails.price,
                desiredQuantity.toString(),
                expectedTotalPriceString // Pass the calculated total price string
            );
        });

        cy.log(`TC13 Completed: Verified product ${productIdToTest} added with quantity ${desiredQuantity}.`);
    });
});