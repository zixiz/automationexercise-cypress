import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';

describe('Product Search Functionality', () => {
  const homePage = new HomePage();
  const productsPage = new ProductsPage();

  beforeEach(() => {
    cy.visit('/');
    homePage.verifyHomePageVisible();
  });

  it('TC9: should search for a product and verify results', () => {
    const searchTerm = 'Sleeveless';
    cy.log(`[TC9] Starting search test for term: "${searchTerm}"`);

    homePage.navigateToProducts();

    productsPage.verifyAllProductsPageVisible();
    productsPage.allProductsHeading.should('be.visible');

    productsPage.searchForProduct(searchTerm);

    cy.url().should('include', `?search=${searchTerm}`);

    productsPage.verifySearchedProductsVisible();

    productsPage.verifyProductListVisible();
    productsPage.verifyProductsContainSearchTerm(searchTerm);

    cy.log(`TC9 Completed: Successfully searched for "${searchTerm}" and verified results.`);
  });
}); 