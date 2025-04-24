export class ProductDetailsPage {
  // --- Selectors ---
  get productDetailsContainer() {
    return cy.get('.product-details');
  }

  get productName() {
    return this.productDetailsContainer.find('.product-information h2');
  }

  get productCategory() {
    return this.productDetailsContainer.find('.product-information p').contains('Category:');
  }

  get productPrice() {
    return this.productDetailsContainer.find('.product-information > span > span');
  }

  get productAvailability() {
    return this.productDetailsContainer.find('.product-information p b').contains('Availability:').parent();
  }

  get productCondition() {
    return this.productDetailsContainer.find('.product-information p b').contains('Condition:').parent();
  }

  get productBrand() {
    return this.productDetailsContainer.find('.product-information p b').contains('Brand:').parent();
  }

  get quantityInput() {
    return this.productDetailsContainer.find('#quantity');
  }

  get addToCartButton() {
    return this.productDetailsContainer.find('.product-information span button.cart');
  }


  get addedToCartModal() {
      return cy.get('#cartModal');
  }

  get writeYourReviewHeading() {
    return cy.get('#reviews'); 
  }

  get reviewNameInput() {
      return cy.get('#reviews #name'); 
  }

  get reviewEmailInput() {
      return cy.get('#reviews #email');
  }

  get reviewTextArea() {
      return cy.get('#reviews #review');
  }

  get reviewSubmitButton() {
      return cy.get('#reviews #button-review');
  }

  get reviewSuccessMessage() {
      return cy.get('#review-section .alert-success span');
  }


  getViewCartLinkInModal() {
      return this.addedToCartModal.find('a[href="/view_cart"]');
  }

  // --- Actions ---
  verifyProductDetailsPageVisible() {
    cy.url().should('include', '/product_details/');
    this.productDetailsContainer.should('be.visible');
    cy.log('Navigated to product details page.');
  }

  verifyProductDetailsAreVisible() {
    this.productName.should('be.visible');
    this.productCategory.should('be.visible');
    this.productPrice.should('be.visible');
    this.productAvailability.should('be.visible').and('contain.text', 'Availability:');
    this.productCondition.should('be.visible').and('contain.text', 'Condition:');
    this.productBrand.should('be.visible').and('contain.text', 'Brand:');
    cy.log('Verified product name, category, price, availability, condition, and brand are visible.');
  }

  setQuantity(quantity: number) {
    this.quantityInput.clear().type(quantity.toString());
    cy.log(`Set quantity to ${quantity}`);
  }

  clickAddToCart() {
      this.addToCartButton.click();
      cy.log('Clicked Add to cart button on product details page.');
  }

  clickViewCartInModal() {
      this.addedToCartModal.should('be.visible');
      this.getViewCartLinkInModal().should('be.visible').click();
      cy.log('Clicked View Cart link in modal.');
  }

  verifyReviewSectionVisible() {
    this.writeYourReviewHeading.should('be.visible'); 
    this.reviewNameInput.should('be.visible');
    this.reviewEmailInput.should('be.visible');
    this.reviewTextArea.should('be.visible');
    this.reviewSubmitButton.should('be.visible');
    cy.log('Verified "Write Your Review" section elements are visible.');
  }

  fillReviewDetails(name: string, email: string, review: string) {
      this.reviewNameInput.type(name);
      this.reviewEmailInput.type(email);
      this.reviewTextArea.type(review);
      cy.log(`Filled review details for ${name} (${email})`);
  }

  submitReview() {
      this.reviewSubmitButton.click();
      cy.log('Clicked review Submit button.');
  }

  verifyReviewSuccessMessageVisible() {
      this.reviewSuccessMessage
          .should('be.visible', { timeout: 10000 }) // Give time for message to appear
          .and('contain.text', 'Thank you for your review.'); // Use contain.text for flexibility
      cy.log('Verified review success message.');
  }
} 