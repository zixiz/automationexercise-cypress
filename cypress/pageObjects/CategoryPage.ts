export class CategoryPage {

  // --- Selectors ---
  get categoryPageTitle() {
      return cy.get('.features_items h2.title.text-center');
  }

  get productsList() {
      return cy.get('.features_items');
  }

  // --- Actions ---
  verifyCategoryPageVisible(expectedUrlPart: string, expectedTitle: string) {
      cy.url().should('include', expectedUrlPart); 
      this.categoryPageTitle.should('be.visible').and('contain.text', expectedTitle);
      this.productsList.should('be.visible'); 
      cy.log(`Verified navigation to category page: ${expectedTitle}`);
  }
}