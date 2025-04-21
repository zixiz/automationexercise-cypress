// cypress/pageObjects/OrderPlacedPage.ts
export class OrderPlacedPage {

  // --- Selectors ---
  get orderPlacedHeadingOrMessage() {
      return cy.contains('[data-qa="order-placed"] b', 'Order Placed!');
  }

  get downloadInvoiceButton() {
      return cy.contains('a', 'Download Invoice');
  }

   get continueButton() {
       return cy.contains('a', 'Continue');
   }

  // --- Actions ---
  verifyOrderPlacedPageVisible() {
       cy.url().should('include', '/order_placed'); 
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