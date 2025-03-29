declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to log in a user using email and password.
     * Uses cy.session for efficiency.
     * @example cy.login('test@example.com', 'password123')
     */
    login(email: string, password: string): Chainable<void>;

    /**
     * Custom command to select DOM element by data-qa attribute.
     * @example cy.getByDataQa('login-button')
     */
    getByDataQa(qaSelector: string, options?: Partial<Loggable & Timeoutable & Withinable & Shadow>): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to wait for page to be fully loaded.
     * @example cy.waitForPageLoad()
     */
    waitForPageLoad(): Chainable<void>;

    /**
     * Custom command to clear browser session data.
     * @example cy.clearSession()
     */
    clearSession(): Chainable<void>;

    /**
     * Custom command to check if element is in viewport.
     * @example cy.get('.element').isInViewport()
     */
    isInViewport(): Chainable<Subject>;
  }
} 