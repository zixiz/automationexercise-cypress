import { defineConfig } from 'cypress';
import { downloadFile } from 'cypress-downloadfile/lib/addPlugin'; 
import fs from 'fs'; 
import path from 'path'; 


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
      on('task', {
          // Existing tasks:
          downloadFile,
          log(message) {
              console.log(message);
              return null;
          },

          readFileMaybe(filename: string): string | null {
             const resolvedPath = path.resolve(filename);
             console.log(`[Task] Checking for file: ${resolvedPath}`);
             if (fs.existsSync(resolvedPath)) {
                 console.log(`[Task] File found: ${resolvedPath}. Reading content.`);
                  try {
                     return fs.readFileSync(resolvedPath, 'utf8');
                  } catch (err) {
                      console.error(`[Task] Error reading file ${resolvedPath}:`, err);
                      return null; 
                  }
              }
              console.log(`[Task] File NOT found: ${resolvedPath}`);
              return null;
          },

      });
     return config;
    }, 
  },
  env: {

  },

}); 