// cypress/pageObjects/CheckoutPage.ts
export class CheckoutPage {

  // --- Selectors ---
  get deliveryAddressSection() {
      return cy.get('#address_delivery');
  }

  get billingAddressSection() {
      return cy.get('#address_invoice');
  }

  get reviewOrderSection() {
      return cy.get('#cart_info'); 
  }

  get commentTextArea() {
      return cy.get('#ordermsg textarea[name="message"]');
  }

  get placeOrderButton() {
      return cy.contains('a.check_out', 'Place Order');
  }

  // --- Actions ---
  verifyCheckoutPageVisible() {
      cy.url().should('include', '/checkout');
      this.deliveryAddressSection.should('be.visible');
      cy.log('Verified navigation to Checkout page.');
  }

  enterOrderComment(comment: string) {
      this.commentTextArea.type(comment);
      cy.log(`Entered order comment: ${comment}`);
  }

  clickPlaceOrder() {
      this.placeOrderButton.click();
      cy.log('Clicked Place Order button.');
  }
}