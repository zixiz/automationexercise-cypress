// Page Object Model for the Product Details page
export class ProductDetailsPage {
  // --- Selectors ---
  get productDetailsContainer() {
    return cy.get('.product-details');
  }

  get productName() {
    return this.productDetailsContainer.find('.product-information h2');
  }

  get productCategory() {
    return this.productDetailsContainer.find('.product-information p').contains('Category:');
  }

  get productPrice() {
    return this.productDetailsContainer.find('.product-information > span > span');
  }

  get productAvailability() {
    return this.productDetailsContainer.find('.product-information p b').contains('Availability:').parent();
  }

  get productCondition() {
    return this.productDetailsContainer.find('.product-information p b').contains('Condition:').parent();
  }

  get productBrand() {
    return this.productDetailsContainer.find('.product-information p b').contains('Brand:').parent();
  }

  // --- Actions ---
  verifyProductDetailsPageVisible() {
    cy.url().should('include', '/product_details/');
    this.productDetailsContainer.should('be.visible');
    cy.log('Navigated to product details page.');
  }

  verifyProductDetailsAreVisible() {
    this.productName.should('be.visible');
    this.productCategory.should('be.visible');
    this.productPrice.should('be.visible');
    this.productAvailability.should('be.visible').and('contain.text', 'Availability:');
    this.productCondition.should('be.visible').and('contain.text', 'Condition:');
    this.productBrand.should('be.visible').and('contain.text', 'Brand:');
    cy.log('Verified product name, category, price, availability, condition, and brand are visible.');
  }
} 