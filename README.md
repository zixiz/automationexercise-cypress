# Automation Exercise - Cypress Test Suite

This project contains automated test cases for [Automation Exercise](https://automationexercise.com/) using Cypress with TypeScript. The test suite follows the Page Object Model (POM) design pattern for better maintainability and reusability.

## 🚀 Features

- TypeScript implementation
- Page Object Model (POM) design pattern
- Custom commands for common operations
- Fixture-based test data management
- Comprehensive test cases for:
  - User Registration (TC1, TC5)
  - Login/Logout (TC2, TC3, TC4)
  - Contact Us Form (TC6)
  - Test Cases Page Navigation (TC7)
  - Product Listing & Details (TC8)
  - Product Search (TC9)
  - Footer Subscription (Homepage - TC10, Cart Page - TC11)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## 🛠️ Setup

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd automationexercise-cypress
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## 📁 Project Structure

```
automationexercise-cypress/
├── cypress/
│   ├── e2e/                 # Test spec files (.cy.ts)
│   │   ├── auth/            # Authentication tests
│   │   │   ├── login.cy.ts    # Login/Logout tests (TC2, TC3, TC4)
│   │   │   └── registration.cy.ts  # Registration tests (TC1, TC5)
│   │   ├── common/          # Tests for common functionalities
│   │   │   ├── contactUs.cy.ts    # Contact form tests (TC6)
│   │   │   ├── navigation.cy.ts   # Navigation tests (TC7)
│   │   │   └── subscription.cy.ts # Subscription tests (TC10, TC11)
│   │   └── product/         # Product related tests
│   │       └── productView.cy.ts # Product view/search tests (TC8, TC9)
│   ├── fixtures/            # Test data files
│   │   ├── testUpload.txt    # Sample file for upload tests
│   │   └── userData.json     # User test data (valid, invalid, registration details)
│   ├── pageObjects/         # Page Object Model classes
│   │   ├── AccountCreatedPage.ts
│   │   ├── AccountDeletedPage.ts
│   │   ├── CartPage.ts          # (Basic structure for Cart page verification)
│   │   ├── ContactUsPage.ts
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── ProductDetailsPage.ts # Product Details page elements
│   │   ├── ProductsPage.ts       # All Products / Searched Products page elements
│   │   ├── SignupPage.ts
│   │   └── TestCasesPage.ts
│   ├── support/             # Reusable code, custom commands, plugins
│   │   ├── commands.ts      # Custom Cypress commands (ensureUserExists, login, getByDataQa)
│   │   ├── e2e.ts           # Runs before every spec file (imports commands)
│   │   └── index.d.ts       # TypeScript definitions for custom commands
│   ├── downloads/           # Downloaded files (add to .gitignore)
│   ├── screenshots/         # Screenshots on failure (add to .gitignore)
│   └── videos/              # Videos of test runs (add to .gitignore)
├── node_modules/            # Project dependencies (add to .gitignore)
├── .gitignore               # Specifies intentionally untracked files
├── cypress.config.ts        # Cypress configuration file
├── package.json             # Project metadata and dependencies
├── package-lock.json        # Or yarn.lock
├── README.md                # This file
└── tsconfig.json            # TypeScript compiler options
```

## 🧪 Running Tests

1. Open Cypress Test Runner:

   ```bash
   npx cypress open
   ```

2. Run all tests headlessly:

   ```bash
   npx cypress run
   ```

3. Run specific test file:
   ```bash
   npx cypress run --spec "cypress/e2e/auth/login.cy.ts"
   ```

## 📝 Test Cases

1. **TC1: Register User**

   - New user registration with valid information
   - Verifies account creation and deletion

2. **TC2: Login User with correct email and password**

   - Login with valid credentials
   - Verifies successful login

3. **TC3: Login User with incorrect email and password**

   - Login with invalid credentials
   - Verifies error message

4. **TC4: Logout User**

   - Verifies logout functionality
   - Confirms redirection to login page

5. **TC5: Register User with existing email**

   - Attempts registration with existing email
   - Verifies error message

6. **TC6: Contact Us Form**

   - Fills and submits contact form
   - Handles file upload
   - Verifies success message

7. **TC7: Verify Test Cases Page**

   - Navigates to test cases page
   - Verifies successful navigation

8. **TC8: Product Search**
   - Verifies the product search functionality.
