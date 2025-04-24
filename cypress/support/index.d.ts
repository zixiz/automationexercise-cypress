// Define the structure of the user data object
interface UserData {
  name: string;
  email: string;
  password: string;
  title: 'Mr' | 'Mrs';
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to ensure a user with the specified details exists.
     * If the user doesn't exist, it registers them and logs them out.
     * If the user already exists (based on email check), it logs a message.
     * Returns the userData object.
     * @example cy.ensureUserExists(userData).then(user => { ... })
     */
    ensureUserExists(userData: UserData): Chainable<UserData>;

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

     /**
     * Downloads a file from the given URL.
     * Requires the 'cypress-downloadfile' plugin and task to be configured.
     * @param url The absolute URL of the file to download.
     * @param downloadsFolder The folder within the Cypress project to save the file (e.g., 'cypress/downloads').
     * @param fileName The name to save the downloaded file as.
     * @param timeout Optional timeout in milliseconds for the download (default usually around 30000).
     * @returns Chainable<boolean> indicating if the download task completed successfully.
     * @example cy.downloadFile('http://example.com/file.pdf', 'cypress/downloads', 'downloaded.pdf')
     */
     downloadFile(url: string, downloadsFolder: string, fileName: string, timeout?: number): Chainable<boolean>;
  }
} 