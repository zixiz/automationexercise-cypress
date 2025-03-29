import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // Implement node event listeners here
      // Example: Task for logging messages to the terminal during tests
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        // Add other tasks if needed (e.g., database seeding/teardown)
      });

      // You can modify the config object here before returning it
      // config.env = { ...config.env, myEnvVar: 'value' } // Example: Setting env vars

      return config;
    },
  },
  env: {
    // Define environment variables accessible via Cypress.env()
    // Example: Load credentials securely in CI, not hardcoded here
    // login_email: process.env.CYPRESS_LOGIN_EMAIL || 'test@example.com',
    // login_password: process.env.CYPRESS_LOGIN_PASSWORD || 'yourpassword'
  },
  // Component testing configuration (if used) goes here
  // component: {
  //   devServer: {
  //     framework: 'react', // or 'vue', 'angular'
  //     bundler: 'webpack', // or 'vite'
  //   },
  // },
}); 