// Page Object Model for the Products page
export class ProductsPage {
  // --- Selectors ---
  get allProductsHeading() {
    return cy.contains('.features_items h2.title', 'All Products');
  }

  get productListContainer() {
    return cy.get('.features_items');
  }

  get allProductItems() {
    return this.productListContainer.find('.col-sm-4 .product-image-wrapper');
  }

  get viewProductButtonOfFirstProduct() {
    return this.allProductItems.first().find('.choose a[href^="/product_details/"]');
  }

  // --- Search Selectors ---
  get searchInput() {
    return cy.get('#search_product');
  }

  get searchButton() {
    return cy.get('#submit_search');
  }

  get searchedProductsHeading() {
    return cy.contains('.features_items h2.title', 'Searched Products');
  }

    // Selectors for the "Added!" Modal
    get addedToCartModal() {
        return cy.get('#cartModal');
    }
    get continueShoppingButton() {
        return this.addedToCartModal.find('button.close-modal');
        // Based on HTML: <button class="btn btn-success close-modal btn-block" data-dismiss="modal">Continue Shopping</button>
    }
    getViewCartLinkInModal() {
        // Based on HTML: <p class="text-center"><a href="/view_cart"><u>View Cart</u></a></p>
        return this.addedToCartModal.find('a[href="/view_cart"]');
    }
  

  // --- Actions ---
  verifyAllProductsPageVisible() {
    cy.url().should('include', '/products');
    cy.get('.features_items h2.title').should('be.visible');
    cy.log('Verified navigation to a Products page (All or Searched).');
  }

  verifyProductListVisible() {
    this.productListContainer.should('be.visible');
    this.allProductItems.should('have.length.greaterThan', 0);
    cy.log('Verified product list is visible and contains products.');
  }

  clickFirstProductViewLink() {
    this.viewProductButtonOfFirstProduct.should('be.visible').click();
    cy.log('Clicked View Product button of the first product.');
  }

  // --- Search Actions ---
  searchForProduct(productName: string) {
    this.searchInput.type(productName);
    this.searchButton.click();
    cy.log(`Searched for product: ${productName}`);
  }

  verifySearchedProductsVisible() {
    this.searchedProductsHeading.should('be.visible');
    cy.log('Verified "Searched Products" heading is visible.');
  }

  verifyProductsContainSearchTerm(searchTerm: string) {
    this.allProductItems.should('have.length.greaterThan', 0);
    this.allProductItems.each(($el) => {
      cy.wrap($el).find('.productinfo p').invoke('text').then((productName) => {
        expect(productName.toLowerCase()).to.include(searchTerm.toLowerCase());
      });
    });
    cy.log(`Verified all displayed products contain "${searchTerm}"`);
  }

  getAddToCartButton(productId: number | string) {
    // Targets <a data-product-id="X" ...> within .productinfo
    return cy.get(`.productinfo a.add-to-cart[data-product-id="${productId}"]`);
  }

  // Selector targeting a specific product item container by its index (0-based)
  getProductItemByIndex(index: number) {
      return this.allProductItems.eq(index);
  }

  // Get product name from a specific product item
  getProductNameByIndex(index: number) {
      return this.getProductItemByIndex(index).find('.productinfo p');
  }

  // Get product price from a specific product item
  getProductPriceByIndex(index: number) {
      return this.getProductItemByIndex(index).find('.productinfo h2');
  }

  /**
    * Adds a product to the cart by its index (0-based) on the page.
    * Waits for and interacts with the 'Added!' modal.
    * Clicks the 'Continue Shopping' button in the modal.
    * @param index The zero-based index of the product to add.
    * @returns Chainable Cypress object for further chaining.
    */
    addProductToCartByIndexAndContinue(index: number) {
      cy.log(`Adding product at index ${index} to cart...`);
      // Find the specific product item
      this.getProductItemByIndex(index).within(() => {
      // Find the add-to-cart button within this product and click it
      cy.get('a.add-to-cart').first().click(); // Using first() just in case overlay exists but info one is primary
    });

        // Wait for the modal and click Continue Shopping
        this.addedToCartModal.should('be.visible');
        this.continueShoppingButton.should('be.visible').click();
        // Optionally wait for modal to hide
        this.addedToCartModal.should('not.be.visible');
        cy.log(`Product at index ${index} added and continued shopping.`);
    }

     /**
     * Adds a product to the cart by its index (0-based) on the page.
     * Waits for and interacts with the 'Added!' modal.
     * Clicks the 'View Cart' link in the modal.
     * @param index The zero-based index of the product to add.
     * @returns Chainable Cypress object for further chaining.
     */
    addProductToCartByIndexAndViewCart(index: number) {
         cy.log(`Adding product at index ${index} and viewing cart...`);
         this.getProductItemByIndex(index).within(() => {
            cy.get('a.add-to-cart').first().click();
        });
         this.addedToCartModal.should('be.visible');
         this.getViewCartLinkInModal().should('be.visible').click();
         cy.log(`Product at index ${index} added and clicked View Cart.`);
    }

     /**
     * Retrieves the name and price of a product by its index.
     * @param index The zero-based index of the product.
     * @returns Cypress Chainable yielding an object { name: string, price: string }
     */
    getProductDetailsByIndex(index: number): Cypress.Chainable<{ name: string; price: string }> {
        const details = { name: '', price: '' };
        return this.getProductNameByIndex(index).invoke('text').then(name => {
            details.name = name.trim();
            return this.getProductPriceByIndex(index).invoke('text').then(price => {
                details.price = price.trim();
                return cy.wrap(details);
            });
        });
    }
} 