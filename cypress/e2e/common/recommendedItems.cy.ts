import { HomePage } from '../../pageObjects/HomePage';
import { CartPage } from '../../pageObjects/CartPage';

describe('Recommended Items Functionality', () => {
    const homePage = new HomePage();
    const cartPage = new CartPage();

    let recommendedProductDetails: { id: string; name: string; price: string };

    beforeEach(() => {
        cy.visit('/');
        homePage.verifyHomePageVisible();
    });

    it('TC22: should add a product from recommended items to the cart', () => {
        cy.log('[TC22] Starting test...');

        homePage.scrollToFooter(); 

        homePage.verifyRecommendedItemsVisible();

        homePage.getRecommendedItemDetailsByIndex(0).then(details => {
            recommendedProductDetails = details;
            cy.log(`Captured details for recommended product ${details.id}: ${details.name}`);
             homePage.addRecommendedItemToCartAndViewCart(0);
        });


        cartPage.verifyCartPageVisible();

        cy.then(() => { 
            expect(recommendedProductDetails).to.not.be.undefined;
            cy.log(`Verifying recommended product ${recommendedProductDetails.id} in cart...`);

            cartPage.verifyProductInCartById(recommendedProductDetails.id);
            cartPage.verifyProductDetailsInCart(
                recommendedProductDetails.id,
                recommendedProductDetails.name,
                recommendedProductDetails.price,
                '1', 
                recommendedProductDetails.price
            );
        });

        cy.log('TC22 Completed: Successfully added recommended item to cart and verified.');
    });
});