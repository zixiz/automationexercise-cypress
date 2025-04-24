interface AddressDetails {
  title: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  mobileNumber: string;
}

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
      this.billingAddressSection.should('be.visible');
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


  private verifyAddressLine(
      section: Cypress.Chainable<JQuery<HTMLElement>>,
      detailSelector: string, 
      expectedText: string | undefined | null, 
      logLabel: string
  ) {
      if (expectedText) {
           section.find(detailSelector).should('contain.text', expectedText);
           cy.log(`Verified ${logLabel}: ${expectedText}`);
       } else {
           cy.log(`Skipped verification for ${logLabel} (no expected data).`);
       }
  }


   private verifyOptionalAddressLine(
      section: Cypress.Chainable<JQuery<HTMLElement>>,
      selectorForPotentialLines: string,
      expectedText: string | undefined | null,
      logLabel: string
  ) {
      if (expectedText) {

          section.find(selectorForPotentialLines)
                 .contains(expectedText) 
                 .should('exist'); 
          cy.log(`Verified ${logLabel}: ${expectedText}`);
      } else {
          cy.log(`Skipped verification for ${logLabel} (no expected data).`);
      }
  }


  verifyDeliveryAddress(expectedDetails: AddressDetails) {
    cy.log('Verifying Delivery Address...');
    this.deliveryAddressSection.within(() => {
        const expectedName = `${expectedDetails.title}. ${expectedDetails.firstName} ${expectedDetails.lastName}`;
        const expectedCityStateZip = `${expectedDetails.city} ${expectedDetails.state} ${expectedDetails.zipcode}`;

        cy.get('li.address_firstname.address_lastname').should('contain.text', expectedName);
        cy.log(`Verified Name: ${expectedName}`);

        this.verifyOptionalAddressLine(cy.root(), 'li.address_address1', expectedDetails.company, 'Company');
        this.verifyOptionalAddressLine(cy.root(), 'li.address_address1', expectedDetails.address1, 'Address 1');
        this.verifyOptionalAddressLine(cy.root(), 'li.address_address1', expectedDetails.address2, 'Address 2');

        cy.get('li.address_city.address_state_name.address_postcode')
          .invoke('text') 
          .then(actualText => {
              const normalizedActualText = actualText.replace(/\s+/g, ' ').trim();
              expect(normalizedActualText).to.equal(expectedCityStateZip);
          });
        cy.log(`Verified City/State/Zip: ${expectedCityStateZip}`);

        cy.get('li.address_country_name').should('contain.text', expectedDetails.country);
        cy.log(`Verified Country: ${expectedDetails.country}`);
        cy.get('li.address_phone').should('contain.text', expectedDetails.mobileNumber);
        cy.log(`Verified Phone: ${expectedDetails.mobileNumber}`);

    });
    cy.log('Delivery Address verified successfully.');
  }


  verifyBillingAddress(expectedDetails: AddressDetails) {
    cy.log('Verifying Billing Address...');
    this.billingAddressSection.within(() => {
         const expectedName = `${expectedDetails.title}. ${expectedDetails.firstName} ${expectedDetails.lastName}`;
         const expectedCityStateZip = `${expectedDetails.city} ${expectedDetails.state} ${expectedDetails.zipcode}`;

         cy.get('li.address_firstname.address_lastname').should('contain.text', expectedName);
         cy.log(`Verified Name: ${expectedName}`);

         this.verifyOptionalAddressLine(cy.root(), 'li.address_address1', expectedDetails.company, 'Company');
         this.verifyOptionalAddressLine(cy.root(), 'li.address_address1', expectedDetails.address1, 'Address 1');
         this.verifyOptionalAddressLine(cy.root(), 'li.address_address1', expectedDetails.address2, 'Address 2');

         cy.get('li.address_city.address_state_name.address_postcode')
           .invoke('text')
           .then(actualText => {
               const normalizedActualText = actualText.replace(/\s+/g, ' ').trim();
               expect(normalizedActualText).to.equal(expectedCityStateZip);
           });
         cy.log(`Verified City/State/Zip: ${expectedCityStateZip}`);

         cy.get('li.address_country_name').should('contain.text', expectedDetails.country);
         cy.log(`Verified Country: ${expectedDetails.country}`);
         cy.get('li.address_phone').should('contain.text', expectedDetails.mobileNumber);
         cy.log(`Verified Phone: ${expectedDetails.mobileNumber}`);
    });
    cy.log('Billing Address verified successfully.');
  }
}
