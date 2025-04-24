export class PaymentDonePage {

  // --- Selectors ---
  get orderPlacedHeading() {
      return cy.getByDataQa('order-placed');
  }

  get successMessageParagraph() {
      return cy.contains('p', 'Congratulations! Your order has been confirmed!');
  }

  get downloadInvoiceButton() {
      return cy.contains('a.check_out', 'Download Invoice');
  }

  get continueButton() {
      return cy.getByDataQa('continue-button');
  }


  // --- Actions ---
  verifyOrderPlaced() {
      cy.url().should('include', '/payment_done/');
      this.orderPlacedHeading.should('be.visible');
      this.successMessageParagraph.should('be.visible');
      cy.log('Verified Order Placed! message is visible.');
  }

   /**
    * Clicks the download button and verifies the download using cypress-downloadfile.
    * @param filename The expected name of the downloaded file (e.g., 'invoice.txt').
    * @param timeout Optional timeout for the download verification.
    * @returns Chainable boolean indicating if the download was verified.
    */
   downloadInvoiceAndVerify(filename: string, timeout: number = 30000): Cypress.Chainable<boolean> {
    cy.log(`Attempting to download invoice as ${filename}...`);

    return this.downloadInvoiceButton.invoke('attr', 'href').then(relativeUrl => {
        if (!relativeUrl) {
            throw new Error("Could not get download URL from the button's href attribute.");
        }

        const baseUrl = Cypress.config('baseUrl');
        if (!baseUrl) {
            throw new Error("Cypress baseUrl is not configured. Cannot construct absolute URL for download.");
        }
        const absoluteUrl = new URL(relativeUrl, baseUrl).toString();


        cy.log(`Downloading from Absolute URL: ${absoluteUrl}`);

        // Use the plugin command with the absolute URL
        return cy.downloadFile(absoluteUrl, 'cypress/downloads', filename, timeout);
        });
    }

  clickContinue() {
      this.continueButton.click();
      cy.log('Clicked Continue button on Payment Done page.');
  }
}