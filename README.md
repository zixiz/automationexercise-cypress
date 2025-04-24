# Automation Exercise - Cypress Test Suite

This project contains automated test cases for [Automation Exercise](https://automationexercise.com/) using Cypress with TypeScript. The test suite follows the Page Object Model (POM) design pattern for better maintainability and reusability.

## 🚀 Features

- TypeScript implementation
- Page Object Model (POM) design pattern
- Custom commands for common operations (User Registration/Login/Existence Check)
- Fixture-based test data management for users
- File Download verification using `cypress-downloadfile` plugin
- Comprehensive test cases covering:
  - User Registration & Login/Logout (TC1-TC5)
  - Contact Us Form & File Upload (TC6)
  - Basic Navigation (TC7)
  - Product Listing, Details, Search & Reviews (TC8, TC9, TC21)
  - Cart Management (Add, Verify Quantity, Remove, Persistence, Recommended Items) (TC12, TC13, TC17, TC20, TC22)
  - Footer Subscription (Homepage & Cart) (TC10, TC11)
  - Full E2E Checkout Flows (Register during/before, Login before) (TC14-TC16)
  - Checkout Address Verification (TC23)
  - Order Placement & Invoice Download (TC24)

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

## 🧪 Running Tests

1. Open Cypress Test Runner:

   ```bash
   npx cypress open
   ```

2. Run all tests headlessly:

   ```bash
   npx cypress run
   ```

3. Run All Tests Headlessly (Specific Browser):

   ```bash
   npx cypress run --browser chrome
   ```

4. Run All Tests Headlessly (Specific Browser):

   ```bash
   npx cypress run --spec "cypress/e2e/product/productView.cy.ts" --browser chrome
   ```

5. Run Tests in a Specific Folder Headlessly:
   ```bash
   npx cypress run --spec "cypress/e2e/auth/*" --browser chrome
   ```

## 📝 Implemented Test Cases

1.  **TC1: Register User**
    - Verifies the complete user registration flow using fixture data.
    - Includes account creation verification and deletion for cleanup.
2.  **TC2: Login User with correct email and password**
    - Ensures fixture user exists (registers if needed).
    - Logs in with valid fixture credentials. Verifies login and deletes account.
3.  **TC3: Login User with incorrect email and password**
    - Attempts login with invalid credentials from fixture. Verifies error message.
4.  **TC4: Logout User**
    - Ensures fixture user exists and logs them in. Verifies logout and redirection.
5.  **TC5: Register User with existing email**
    - Ensures fixture user exists. Attempts signup again with the same email address. Verifies error message.
6.  **TC6: Contact Us Form**
    - Fills and submits contact form with dynamic data and file upload. Verifies success.
7.  **TC7: Verify Test Cases Page**
    - Navigates to Test Cases page and verifies successful navigation.
8.  **TC8: Verify All Products and product detail page**
    - Navigates to Products page, verifies list, navigates to first product's detail page, verifies details visibility.
9.  **TC9: Search Product**
    - Navigates to Products page, searches for a term, verifies 'Searched Products' title and that results contain the term.
10. **TC10: Verify Subscription in home page**
    - Scrolls to footer on homepage, enters email, submits, verifies success message.
11. **TC11: Verify Subscription in Cart page**
    - Navigates to Cart page, scrolls to footer, enters email, submits, verifies success message.
12. **TC12: Add Products in Cart**
    - Adds first two products from Products page to cart. Navigates to cart and verifies both items are present with correct details (price, qty=1, total).
13. **TC13: Verify Product quantity in Cart**
    - Navigates to a specific product detail page, changes quantity, adds to cart. Verifies item is in cart with the specified quantity and correct total price.
14. **TC14: Place Order: Register while Checkout**
    - Adds items to cart, proceeds to checkout, registers a new user during checkout flow, verifies order details, places order, verifies success, deletes account.
15. **TC15: Place Order: Register before Checkout**
    - Registers a new user first, adds items to cart, proceeds to checkout, verifies order details, places order, verifies success, deletes account.
16. **TC16: Place Order: Login before Checkout**
    - Logs in with existing user, adds items to cart, proceeds to checkout, verifies order details, places order, verifies success, deletes account.
17. **TC17: Remove Products From Cart**
    - Adds products to cart, navigates to cart, removes an item using the 'X' button, verifies the item is removed.
18. **TC18: View Category Products**
    - Verifies product categories are visible, clicks category/sub-category links, verifies navigation and correct category page is displayed.
19. **TC19: View & Cart Brand Products**
    - Navigates to Products page, verifies brands sidebar, clicks a brand link, verifies brand page and products are displayed.
20. **TC20: Search Products and Verify Cart After Login**
    - Searches for products, adds all results to cart, verifies cart. Logs in. Navigates back to cart and verifies items persisted. Cleans up cart.
21. **TC21: Add review on product**
    - Navigates to product detail, fills and submits review form, verifies success message.
22. **TC22: Add to cart from Recommended items**
    - Scrolls to recommended items on homepage, adds first recommended item, verifies item in cart.
23. **TC23: Verify address details in checkout page**
    - Registers a new user, adds item to cart, proceeds to checkout. Verifies delivery and billing addresses match registration data. Deletes account.
24. **TC24: Download Invoice after purchase order**
    - Registers user, adds items, completes full checkout and payment process. Verifies order success, downloads invoice using plugin, verifies file download. Deletes account.
