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
  - Products Page (TC8)

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
cypress/
├── e2e/                    # Test files
│   ├── auth/              # Authentication tests
│   │   ├── login.cy.ts    # Login/Logout tests
│   │   └── registration.cy.ts  # Registration tests
│   └── common/            # Common feature tests
│       ├── contactUs.cy.ts    # Contact form tests
│       └── navigation.cy.ts   # Navigation tests
├── fixtures/              # Test data
│   ├── testUpload.txt    # Upload test file
│   └── userData.json     # User test data
├── pageObjects/          # Page Object Models
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── SignupPage.ts
│   ├── ContactUsPage.ts
│   └── TestCasesPage.ts
└── support/              # Support files
    ├── commands.ts       # Custom commands
    └── e2e.ts           # Configuration
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

8. **TC8: Verify All Products and product detail page**
   - Navigates to products page
   - Verifies product listing
   - Checks product details
   - Validates product information

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Automation Exercise](https://automationexercise.com/) for providing the test website
- [Cypress Documentation](https://docs.cypress.io/) for excellent testing framework
- [TypeScript Documentation](https://www.typescriptlang.org/) for type support
