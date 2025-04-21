// cypress/pageObjects/CheckoutPage.ts
export class CheckoutPage {

  // --- Selectors ---
  get deliveryAddressSection() {
      // Container for delivery address details
      return cy.get('#address_delivery');
  }

  get billingAddressSection() {
       // Container for billing address details
      return cy.get('#address_invoice');
  }

  get reviewOrderSection() {
      // Table containing the order items for review
      return cy.get('#cart_info'); // Reuses cart table structure
  }

  get commentTextArea() {
      // Based on HTML: <textarea class="form-control" ... name="message" ...></textarea>
      return cy.get('#ordermsg textarea[name="message"]');
  }

  get placeOrderButton() {
      // Based on HTML: <a href="/payment" class="btn btn-default check_out">Place Order</a>
      return cy.contains('a.check_out', 'Place Order');
  }

  // --- Actions ---
  verifyCheckoutPageVisible() {
      cy.url().should('include', '/checkout');
      // Verify a key element like the address section
      this.deliveryAddressSection.should('be.visible');
      cy.log('Verified navigation to Checkout page.');
  }

  // (Add methods for verifying address details later for TC23)
  // verifyDeliveryAddress(expectedDetails) { ... }
  // verifyBillingAddress(expectedDetails) { ... }

  enterOrderComment(comment: string) {
      this.commentTextArea.type(comment);
      cy.log(`Entered order comment: ${comment}`);
  }

  clickPlaceOrder() {
      this.placeOrderButton.click();
      cy.log('Clicked Place Order button.');
  }
}