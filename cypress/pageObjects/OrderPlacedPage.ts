// cypress/pageObjects/OrderPlacedPage.ts
export class OrderPlacedPage {

  // --- Selectors ---
  get orderPlacedHeadingOrMessage() {
       // Example selector - adjust based on actual page content
       return cy.contains('[data-qa="order-placed"] b', 'Order Placed!');
       // Or target the specific success paragraph if needed:
       // return cy.contains('p', 'Congratulations! Your order has been confirmed!');
  }

  get downloadInvoiceButton() {
      return cy.contains('a', 'Download Invoice');
  }

   get continueButton() {
       // Find the continue button on this page if it exists
       return cy.contains('a', 'Continue');
   }

  // --- Actions ---
  verifyOrderPlacedPageVisible() {
       cy.url().should('include', '/order_placed'); // Adjust URL if needed
       this.orderPlacedHeadingOrMessage.should('be.visible');
       cy.log('Verified navigation to Order Placed page.');
  }

  clickDownloadInvoice() {
      this.downloadInvoiceButton.click();
      cy.log('Clicked Download Invoice button.');
  }

  clickContinue() {
      this.continueButton.click();
      cy.log('Clicked Continue button on Order Placed page.');
  }
}