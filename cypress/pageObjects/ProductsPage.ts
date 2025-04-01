// Page Object Model for the Products page
export class ProductsPage {
  // --- Selectors ---
  get allProductsHeading() {
    return cy.contains('.features_items h2.title', 'All Products');
  }

  get productListContainer() {
    return cy.get('.features_items');
  }

  get allProductItems() {
    return this.productListContainer.find('.col-sm-4 .product-image-wrapper');
  }

  get viewProductButtonOfFirstProduct() {
    return this.allProductItems.first().find('.choose a[href^="/product_details/"]');
  }

  // --- Search Selectors ---
  get searchInput() {
    return cy.get('#search_product');
  }

  get searchButton() {
    return cy.get('#submit_search');
  }

  get searchedProductsHeading() {
    return cy.contains('.features_items h2.title', 'Searched Products');
  }

  // --- Actions ---
  verifyAllProductsPageVisible() {
    cy.url().should('include', '/products');
    cy.get('.features_items h2.title').should('be.visible');
    cy.log('Verified navigation to a Products page (All or Searched).');
  }

  verifyProductListVisible() {
    this.productListContainer.should('be.visible');
    this.allProductItems.should('have.length.greaterThan', 0);
    cy.log('Verified product list is visible and contains products.');
  }

  clickFirstProductViewLink() {
    this.viewProductButtonOfFirstProduct.should('be.visible').click();
    cy.log('Clicked View Product button of the first product.');
  }

  // --- Search Actions ---
  searchForProduct(productName: string) {
    this.searchInput.type(productName);
    this.searchButton.click();
    cy.log(`Searched for product: ${productName}`);
  }

  verifySearchedProductsVisible() {
    this.searchedProductsHeading.should('be.visible');
    cy.log('Verified "Searched Products" heading is visible.');
  }

  verifyProductsContainSearchTerm(searchTerm: string) {
    this.allProductItems.should('have.length.greaterThan', 0);
    this.allProductItems.each(($el) => {
      cy.wrap($el).find('.productinfo p').invoke('text').then((productName) => {
        expect(productName.toLowerCase()).to.include(searchTerm.toLowerCase());
      });
    });
    cy.log(`Verified all displayed products contain "${searchTerm}"`);
  }
} 