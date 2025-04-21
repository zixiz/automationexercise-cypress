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
    // Based on HTML: <a class="btn btn-default check_out">Proceed To Checkout</a>
    // Using contains for robustness as the class might be shared
    return cy.contains('a.check_out', 'Proceed To Checkout');
    }

    // Checkout Modal Selectors (when not logged in)
    get checkoutModal() {
        return cy.get('#checkoutModal');
    }

    get registerLoginButtonInModal() {
        // Based on HTML in modal: <p class="text-center"><a href="/login"><u>Register / Login</u></a></p>
        return this.checkoutModal.find('a[href="/login"]');
    }
    get checkoutModalRegisterLoginLink() {
        // Based on HTML: <p class="text-center"><a href="/login"><u>Register / Login</u></a></p>
       return this.checkoutModal.find('.modal-body a[href="/login"]');
   }

    get checkoutModalRegisterLoginButton() {
        // Based on HTML: <p class="text-center"><a href="/login"><u>Register / Login</u></a></p>
        return this.checkoutModal.find('.modal-body a[href="/login"]');
    }

  // Get a specific row in the cart table by product ID
  getCartRow(productId: number | string) {
      return this.cartTableBody.find(`tr#product-${productId}`);
  }

  // Get description cell within a specific row
  getProductDescription(productId: number | string) {
      return this.getCartRow(productId).find('.cart_description h4 a');
  }

  // Get price cell within a specific row
  getProductPrice(productId: number | string) {
      return this.getCartRow(productId).find('.cart_price p');
  }

  // Get quantity cell within a specific row
  getProductQuantity(productId: number | string) {
      // Based on HTML: <td class="cart_quantity"><button class="disabled">1</button></td>
      return this.getCartRow(productId).find('.cart_quantity button');
  }

  // Get total cell within a specific row
  getProductTotal(productId: number | string) {
      return this.getCartRow(productId).find('.cart_total p');
  }

  get allCartRows() {
      return this.cartTableBody.find('tr[id^="product-"]'); // Select rows whose ID starts with 'product-'
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