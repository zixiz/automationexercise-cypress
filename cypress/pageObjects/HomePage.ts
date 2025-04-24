interface RecommendedProductInfo {
  id: string;
  name: string;
  price: string;
}


export class HomePage {
  visit() {
    cy.visit('/');
  }

  // --- Selectors ---
  get homePage() {
    return cy.get('#slider-carousel');
  }

  get signupLoginButton() {
    return cy.get('.shop-menu a[href="/login"]');
  }

  get loggedInAs() {
    return cy.get('a:contains("Logged in as")');
  }

  get deleteAccountButton() {
    return cy.get('a[href="/delete_account"]');
  }

  get logoutButton() {
    return cy.get('a[href="/logout"]');
  }

  get contactUsButton() {
    return cy.get('a[href="/contact_us"]');
  }

  get testCasesButton() {
    return cy.get('.shop-menu a[href="/test_cases"]');
  }

  get productsButton() {
    return cy.get('.shop-menu a[href="/products"]');
  }

  get cartButton() {
    return cy.get('.shop-menu a[href="/view_cart"]');
  }

  get categorySidebar() {
    return cy.get('.left-sidebar');
  }

  get categoryHeading() {
      return this.categorySidebar.contains('h2', 'Category');
  }

  get categoryPanelGroup() {
      return cy.get('#accordian'); 
  }

  get footer() {
    return cy.get('#footer');
  }

  get subscriptionHeading() {
    return this.footer.find('.single-widget h2').contains('Subscription');
  }

  get subscriptionEmailInput() {
    return this.footer.find('#susbscribe_email');
  }

  get subscriptionSubmitButton() {
    return this.footer.find('#subscribe');
  }

  get subscriptionSuccessMessage() {
    return cy.get('#success-subscribe .alert-success.alert');
  }

  get recommendedItemsSection() {
    return cy.get('.recommended_items');
  }

  get recommendedItemsTitle() {
    return this.recommendedItemsSection.find('h2.title.text-center').contains('recommended items', { matchCase: false });
  }

  get recommendedProductItems() {
    return this.recommendedItemsSection.find('.item.active .col-sm-4');
  }

  get addedToCartModal() {
    return cy.get('#cartModal');
  }
  getViewCartLinkInModal() {
      return this.addedToCartModal.find('a[href="/view_cart"]');
  }

  getRecommendedItemAddToCartButton(index: number) {
    return this.recommendedProductItems.eq(index).find('.productinfo a.add-to-cart');
  }

  getViewProductLink(productId: number | string) {
    return cy.get(`.features_items a[href="/product_details/${productId}"]`);
  }

  getAddToCartButtonForProduct(productId: number | string) {
    // Targets the 'Add to cart' button within a product's feature item wrapper on the homepage
    return cy.get(`.features_items div.product-image-wrapper:has(a[data-product-id="${productId}"])`).find('a.add-to-cart');
  }

  getCategoryLink(categoryName: 'Women' | 'Men' | 'Kids') {
    // Targets the <a> tag that contains the category name and has the data-toggle attribute
    return this.categoryPanelGroup.find(`.panel-title a[href="#${categoryName}"]`);
  }

  getSubCategoryLink(categoryName: 'Women' | 'Men' | 'Kids', subCategoryName: string) {
    // Finds the panel body for the category, then the link inside it
    return this.categoryPanelGroup.find(`#${categoryName}`).find('.panel-body a').contains(subCategoryName);
    // Using contains() is good here as the subCategoryName might have extra spaces (e.g., "Dress ")
  }

  // --- Actions ---
  verifyHomePageVisible() {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    this.homePage.should('be.visible');
    cy.log('Home page is visible');
  }

  navigateToSignupLogin() {
    this.signupLoginButton.click();
    cy.log('Clicked Signup/Login button');
  }

  verifyLoggedInAs(username: string) {
    this.loggedInAs.should('contain', username);
    cy.log(`Verified logged in as ${username}`);
  }

  clickDeleteAccount() {
    this.deleteAccountButton.click();
    cy.log('Clicked Delete Account button');
  }

  clickLogout() {
    this.logoutButton.click();
    cy.log('Clicked Logout button');
  }

  navigateToContactUs() {
    this.contactUsButton.click();
    cy.log('Navigated to Contact Us page');
  }

  navigateToTestCases() {
    this.testCasesButton.click();
    cy.log('Clicked Test Cases button');
  }

  navigateToProducts() {
    this.productsButton.click();
    cy.log('Clicked Products button');
  }

  navigateToCart() {
    this.cartButton.click();
    cy.log('Clicked Cart button');
  }

  // --- Footer Subscription Actions ---
  scrollToFooter() {
    this.footer.scrollIntoView();
    cy.log('Scrolled down to the footer.');
  }

  verifySubscriptionHeadingVisible() {
    this.subscriptionHeading.should('be.visible');
    cy.log('Verified "SUBSCRIPTION" heading is visible in the footer.');
  }

  enterSubscriptionEmail(email: string) {
    this.subscriptionEmailInput.type(email);
    cy.log(`Entered subscription email: ${email}`);
  }

  submitSubscription() {
    this.subscriptionSubmitButton.click();
    cy.log('Clicked subscription submit button.');
  }

  verifySubscriptionSuccess() {
    this.subscriptionSuccessMessage
      .should('be.visible', { timeout: 10000 })
      .and('contain.text', 'You have been successfully subscribed!');
    cy.log('Verified subscription success message.');
  }

  navigateToProductDetails(productId: number | string) {
    this.getViewProductLink(productId).click();
    cy.log(`Navigated to product details page for product ID ${productId}`);
  }

  addProductToCartFromHome(productId: number | string) {
    this.getAddToCartButtonForProduct(productId).click({ force: true });
    cy.log(`Added product ID ${productId} to cart from homepage (quick add).`);
  }

  verifyCategoriesVisible() {
    this.categorySidebar.should('be.visible');
    this.categoryHeading.should('be.visible');
    // Check for at least one category panel
    this.categoryPanelGroup.find('.panel').should('have.length.greaterThan', 0);
    cy.log('Categories sidebar is visible.');
  }

  clickCategory(categoryName: 'Women' | 'Men' | 'Kids') {
      this.getCategoryLink(categoryName).click();
      cy.log(`Clicked category: ${categoryName}`);
  }

  clickSubCategory(categoryName: 'Women' | 'Men' | 'Kids', subCategoryName: string) {
      // Ensure the main category is expanded first (important if not already open)
      this.clickCategory(categoryName); // Click the main category to ensure panel is open
      this.getSubCategoryLink(categoryName, subCategoryName).click();
      cy.log(`Clicked sub-category: ${subCategoryName} under ${categoryName}`);
  }

  verifyRecommendedItemsVisible() {
    this.recommendedItemsSection.should('be.visible');
    this.recommendedItemsTitle.should('be.visible');
    // Check if there are actually items displayed
    this.recommendedProductItems.should('have.length.greaterThan', 0);
    cy.log('Verified "RECOMMENDED ITEMS" section is visible and contains items.');
  }

  getRecommendedItemDetailsByIndex(index: number): Cypress.Chainable<RecommendedProductInfo> {
    const details: RecommendedProductInfo = { id: '', name: '', price: '' };
    cy.log(`Getting details for recommended item at index ${index}`);
      return this.recommendedProductItems.eq(index).within(() => {
             cy.get('.productinfo a.add-to-cart').invoke('attr', 'data-product-id').then(id => {
                 details.id = id ?? `unknown-recommended-${index}`; 
             });
             cy.get('.productinfo p').invoke('text').then(name => {
                 details.name = name.trim();
             });
             cy.get('.productinfo h2').invoke('text').then(price => {
                 details.price = price.trim();
             });
         }).then(() => cy.wrap(details)); 
     }

  addRecommendedItemToCartAndViewCart(index: number) {
    cy.log(`Adding recommended item at index ${index} to cart and viewing cart...`);
    this.getRecommendedItemAddToCartButton(index)
        .should('be.visible') // Ensure interactable
        .click();

    this.addedToCartModal.should('be.visible', { timeout: 10000 });
    this.getViewCartLinkInModal().should('be.visible').click();
    cy.log('Clicked View Cart link in modal.');
  }
} 