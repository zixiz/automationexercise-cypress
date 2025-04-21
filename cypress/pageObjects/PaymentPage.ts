// cypress/pageObjects/PaymentPage.ts
export class PaymentPage {

  // --- Selectors ---
  get paymentHeading() {
      return cy.contains('.heading', 'Payment');
  }
  get nameOnCardInput() {
      return cy.getByDataQa('name-on-card');
  }
  get cardNumberInput() {
      return cy.getByDataQa('card-number');
  }
  get cvcInput() {
      return cy.getByDataQa('cvc');
  }
  get expiryMonthInput() {
      return cy.getByDataQa('expiry-month');
  }
  get expiryYearInput() {
      return cy.getByDataQa('expiry-year');
  }
  get payAndConfirmButton() {
      return cy.getByDataQa('pay-button');
  }
  get orderSuccessMessage() {
      // Based on HTML: <div class="alert-success alert">Your order has been placed successfully!</div>
      // Selector might need refinement based on actual page structure after payment success
      // Let's assume it might be within the main section or near the form initially.
       return cy.contains('.col-sm-9.col-sm-offset-1', 'Your order has been placed successfully!', { timeout: 20000 }); // Increased timeout for payment processing
       // Fallback if the above is too specific:
       // return cy.get('#success_message > .alert-success', { timeout: 20000 });
  }

  get orderPlacedSuccessMessage() {
    // Based on common patterns, let's target the heading first
    // This selector looks for the specific "Order Placed!" text in a bold tag within an h2.title
    return cy.contains('h2.title b', 'Order Placed!', { timeout: 20000 });
    // We will verify the "Congratulations!" message separately if needed,
    // as it might be in a different element (e.g., a <p> tag).
  }

  get congratulationsMessage() {
      // Selector for the "Congratulations!" paragraph
      return cy.contains('p', 'Congratulations! Your order has been confirmed!');
  }

  // --- Actions ---
  verifyPaymentPageVisible() {
      cy.url().should('include', '/payment');
      this.paymentHeading.should('be.visible');
      cy.log('Verified navigation to Payment page.');
  }

  fillPaymentDetails(details: { nameOnCard: string; cardNumber: string; cvc: string; expiryMonth: string; expiryYear: string }) {
      this.nameOnCardInput.type(details.nameOnCard);
      this.cardNumberInput.type(details.cardNumber);
      this.cvcInput.type(details.cvc);
      this.expiryMonthInput.type(details.expiryMonth);
      this.expiryYearInput.type(details.expiryYear);
      cy.log('Filled payment details.');
  }

  clickPayAndConfirmOrder() {
      this.payAndConfirmButton.click();
      cy.log('Clicked Pay and Confirm Order button.');
  }

  verifyOrderSuccessMessageVisible(
    expectedHeading: string = 'Order Placed!',
    expectedCongratsMessage: string = 'Congratulations! Your order has been confirmed!'
    ) {
    this.orderPlacedSuccessMessage
        .should('be.visible')
        .and('have.text', expectedHeading);
    this.congratulationsMessage
        .should('be.visible')
        .and('contain.text', expectedCongratsMessage); // Use contain for the paragraph

    cy.log('Verified order success messages.');
  }
}