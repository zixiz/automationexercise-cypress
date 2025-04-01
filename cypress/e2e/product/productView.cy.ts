import { HomePage } from '../../pageObjects/HomePage';
import { ProductsPage } from '../../pageObjects/ProductsPage';
import { ProductDetailsPage } from '../../pageObjects/ProductDetailsPage';

describe('Product Viewing Functionality', () => {
  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const productDetailsPage = new ProductDetailsPage();

  beforeEach(() => {
    cy.visit('/');
    homePage.verifyHomePageVisible();
  });

  it('TC8: should navigate to products, view first product, and verify details', () => {
    cy.log('[TC8] Starting test case...');
    homePage.navigateToProducts();
    productsPage.verifyAllProductsPageVisible();
    productsPage.verifyProductListVisible();
    productsPage.clickFirstProductViewLink();
    productDetailsPage.verifyProductDetailsPageVisible();
    productDetailsPage.verifyProductDetailsAreVisible();
    cy.log('TC8 Completed: Verified product list and details of the first product.');
  });
}); 