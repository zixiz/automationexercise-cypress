interface ProductInfo {
  id: string;
  name: string;
  price: string;
}


export class ProductsPage {
  // --- Selectors ---

  get productsPageTitle() {
    return cy.get('.features_items h2.title.text-center');
  }

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

  get brandsSidebarSection() {
    return cy.get('.brands_products');
  }

  get brandsHeading() {
    return this.brandsSidebarSection.contains('h2', 'Brands');
  }

  get allBrandLinks() {
    return this.brandsSidebarSection.find('.brands-name a');
  }

  get searchInput() {
    return cy.get('#search_product');
  }

  get searchButton() {
    return cy.get('#submit_search');
  }

  get searchedProductsHeading() {
    return cy.contains('.features_items h2.title', 'Searched Products');
  }

  get addedToCartModal() {
    return cy.get('#cartModal');
  }

  get continueShoppingButton() {
    return this.addedToCartModal.find('button.close-modal');
  }

  getViewCartLinkInModal() {
    return this.addedToCartModal.find('a[href="/view_cart"]');
  }

  getBrandLinkByName(brandName: string) {
    return this.brandsSidebarSection.find('.brands-name a').contains(brandName);
  }
  
  getAddToCartButtonFromProductItem() {
    return '.productinfo a.add-to-cart';
  }

  getAddedToCartModal() {
    return cy.get('#cartModal');
  }

  getContinueShoppingButton() {
    return this.getAddedToCartModal().find('button.close-modal');
  }

  getSearchedProductsHeading() {
    return cy.contains('.features_items h2.title', 'Searched Products');
  }

  // --- Actions ---
  verifyAllProductsPageVisible() {
    cy.url().should('include', '/products');
    // Verify the specific "All Products" title on the initial load
    this.productsPageTitle.should('be.visible').and('contain.text', 'All Products');
    cy.log('Verified navigation to All Products page.');
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

    verifyBrandsSidebarVisible() {
      this.brandsSidebarSection.should('be.visible');
      this.brandsHeading.should('be.visible');
      this.allBrandLinks.should('have.length.greaterThan', 0);
      cy.log('Brands sidebar section is visible.');
    }

    clickBrandLink(brandName: string) {
        this.getBrandLinkByName(brandName).click();
        cy.log(`Clicked brand link: ${brandName}`);
    }

    verifyBrandPageTitleVisible(brandName: string) {
      // Assumes the title format is "BRAND - <Name> PRODUCTS"
      const expectedTitle = `Brand - ${brandName} Products`;
      // Use the generic page title selector
      this.productsPageTitle
          .should('be.visible')
          .and('contain.text', expectedTitle); // Check for the specific brand title
      cy.log(`Verified Brand page title: ${expectedTitle}`);
    }

    addAllDisplayedProductsToCart(): Cypress.Chainable<ProductInfo[]> {
      const addedProducts: ProductInfo[] = [];
      cy.log('Adding all displayed products to cart...');

      return this.allProductItems.then($items => {
          if ($items.length === 0) {
              cy.log('No products found to add.');
              return cy.wrap([]);
          }

          return cy.wrap($items).each(($el, index) => {
              let currentProduct: ProductInfo = { id: '', name: '', price: '' };

              cy.wrap($el).within(() => {
                  cy.get('.productinfo a.add-to-cart').invoke('attr', 'data-product-id').then(id => {
                      currentProduct.id = id ?? `unknown-${index}`;
                  });
                  cy.get('.productinfo p').invoke('text').then(name => {
                      currentProduct.name = name.trim();
                  });
                  cy.get('.productinfo h2').invoke('text').then(price => {
                      currentProduct.price = price.trim();
                      addedProducts.push(currentProduct);
                      cy.log(`Details captured for product ${currentProduct.id}: ${currentProduct.name}`);
                  });

                  cy.log(`Clicking add to cart for product ${currentProduct.id || `index ${index}`}`);
                  cy.get('.productinfo a.add-to-cart')
                    .should('be.visible') 
                    .click(); 
              });


              this.getAddedToCartModal()
                  .should('be.visible', { timeout: 10000 }); 
              this.getContinueShoppingButton()
                  .should('be.visible') 
                  .click();
              this.getAddedToCartModal()
                  .should('not.be.visible', { timeout: 5000 }); 
               cy.wait(200); 

          }).then(() => {
              cy.log(`Finished adding ${addedProducts.length} products.`);
              return cy.wrap(addedProducts);
          });
      });
  }

} 