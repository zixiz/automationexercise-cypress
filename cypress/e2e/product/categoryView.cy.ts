import { HomePage } from '../../pageObjects/HomePage';
import { CategoryPage } from '../../pageObjects/CategoryPage';
import { ProductsPage } from '../../pageObjects/ProductsPage';

describe('Category Product Viewing', () => {
    const homePage = new HomePage();
    const categoryPage = new CategoryPage();
    const productsPage = new ProductsPage();

    beforeEach(() => {
        cy.visit('/');
        homePage.verifyHomePageVisible(); 
    });

    it('TC18: should view category products successfully', () => {
        cy.log('[TC18] Starting test case...');
        homePage.verifyCategoriesVisible();
        homePage.clickCategory('Women');
        homePage.clickSubCategory('Women', 'Dress');
        categoryPage.verifyCategoryPageVisible('/category_products/1', 'Women - Dress Products');
        homePage.clickSubCategory('Men', 'Tshirts');
        categoryPage.verifyCategoryPageVisible('/category_products/3', 'Men - Tshirts Products');

        cy.log('[TC18] Completed successfully.');
    });

    it('TC19: should view products by brand', () => {
      cy.log('[TC19] Starting test case...');

      homePage.navigateToProducts();
      productsPage.verifyAllProductsPageVisible();
      productsPage.verifyBrandsSidebarVisible();

      const firstBrand = 'Polo';
      productsPage.clickBrandLink(firstBrand);

      cy.url().should('include', `/brand_products/${firstBrand}`);
      productsPage.verifyBrandPageTitleVisible(firstBrand);
      productsPage.verifyProductListVisible(); 

      const secondBrand = 'Babyhug';
      productsPage.clickBrandLink(secondBrand); 

      cy.url().should('include', `/brand_products/${secondBrand}`);
      productsPage.verifyBrandPageTitleVisible(secondBrand); 
      productsPage.verifyProductListVisible(); 

      cy.log('[TC19] Completed successfully.');
    });
});