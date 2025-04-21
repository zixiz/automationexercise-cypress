// cypress/pageObjects/CartPage.ts
export class CartPage {

  // --- Selectors ---
  get shoppingCartBreadcrumb() {
      return cy.get('.breadcrumb li.active').contains('Shopping Cart');
  }

  get cartTableBody() {
      return cy.get('#cart_info_table tbody');
  }

  get proceedToCheckoutButton() {
        return cy.contains('a.check_out', 'Proceed To Checkout');
    }

    get checkoutModal() {
        return cy.get('#checkoutModal');
    }

    get registerLoginButtonInModal() {
        return this.checkoutModal.find('a[href="/login"]');
    }
    get checkoutModalRegisterLoginLink() {
       return this.checkoutModal.find('.modal-body a[href="/login"]');
   }

    get checkoutModalRegisterLoginButton() {
        return this.checkoutModal.find('.modal-body a[href="/login"]');
    }

  getCartRow(productId: number | string) {
      return this.cartTableBody.find(`tr#product-${productId}`);
  }

  getProductDescription(productId: number | string) {
      return this.getCartRow(productId).find('.cart_description h4 a');
  }

  getProductPrice(productId: number | string) {
      return this.getCartRow(productId).find('.cart_price p');
  }

  getProductQuantity(productId: number | string) {
      return this.getCartRow(productId).find('.cart_quantity button');
  }

  getProductTotal(productId: number | string) {
      return this.getCartRow(productId).find('.cart_total p');
  }

  get allCartRows() {
      return this.cartTableBody.find('tr[id^="product-"]'); 
  }

  // --- Actions ---
  verifyCartPageVisible() {
      cy.url().should('include', '/view_cart');
      this.shoppingCartBreadcrumb.should('be.visible');
      cy.log('Verified navigation to Cart page.');
  }

  /**
   * Verifies if a specific product exists in the cart.
   * @param productId The ID of the product (e.g., 1, 2)
   */
  verifyProductInCartById(productId: number | string) {
      this.getCartRow(productId).should('exist');
      cy.log(`Verified product with ID ${productId} exists in the cart.`);
  }

    /**
     * Verifies the details of a specific product in the cart.
     * @param productId The ID of the product (e.g., 1, 2, 28)
     * @param expectedName Expected product name
     * @param expectedPrice Expected price (e.g., "Rs. 500")
     * @param expectedQuantity Expected quantity as a string (e.g., '4')
     * @param expectedTotal Expected total price (e.g., "Rs. 2000")
     */
    verifyProductDetailsInCart(
        productId: number | string,
        expectedName: string,
        expectedPrice: string,
        expectedQuantity: string, // Changed default
        expectedTotal: string
    ) {
        cy.log(`Verifying details for product ID ${productId} (Qty: ${expectedQuantity})...`);
        this.getCartRow(productId).within(() => {
            cy.get('.cart_description h4 a').should('have.text', expectedName);
            cy.get('.cart_price p').should('have.text', expectedPrice);
            cy.get('.cart_quantity button').should('have.text', expectedQuantity);
            cy.get('.cart_total p').should('have.text', expectedTotal); // Verify total price
        });
        cy.log(`Verified details for product ID ${productId} are correct.`);
    }

    verifyNumberOfItemsInCart(expectedCount: number) {
        this.allCartRows.should('have.length', expectedCount);
        cy.log(`Verified number of items in cart is ${expectedCount}.`);
    }
    clickProceedToCheckout() {
        this.proceedToCheckoutButton.click();
        cy.log('Clicked Proceed To Checkout button.');
    }

    clickRegisterLoginInCheckoutModal() {
        this.checkoutModal.should('be.visible');
        this.registerLoginButtonInModal.should('be.visible').click();
        cy.log('Clicked "Register / Login" button in checkout modal.');
    }  
}