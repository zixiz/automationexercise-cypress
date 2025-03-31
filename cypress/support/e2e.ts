// Import commands.js using ES2015 syntax:
import './commands';

const app = window.top;
if (app) {
  app.console.log = () => {};
}

// Hide fetch requests from command log
const originalFetch = window.fetch;
window.fetch = function() {
  return originalFetch.apply(this, arguments);
};

// Hide fetch/XHR requests from command log
if (Cypress.config('hideXHRInCommandLog')) {
  const app = window.top;
  if (app && !app.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app.document.createElement('style');
    style.innerHTML =
      '.command-name-request, .command-name-xhr { display: none }';
    style.setAttribute('data-hide-command-log-request', '');
    app.document.head.appendChild(style);
  }
}

// Global before hook
before(() => {
  // Clear session data before all tests
  cy.clearSession();
});

// Global beforeEach hook
beforeEach(() => {
  // Wait for page load before each test
  cy.waitForPageLoad();
});

// Global after hook
after(() => {
  // Clean up after all tests
  cy.clearSession();
});
