// Page Object Model for the Cart page
export class CartPage {
  // --- Selectors ---
  get shoppingCartBreadcrumb() {
    return cy.get('.breadcrumb li.active').contains('Shopping Cart');
  }

  // --- Actions ---
  verifyCartPageVisible() {
    cy.url().should('include', '/view_cart');
    this.shoppingCartBreadcrumb.should('be.visible');
    cy.log('Verified navigation to Cart page.');
  }
} 