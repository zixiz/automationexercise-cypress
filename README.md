# Cypress Test Automation Framework for AutomationExercise.com

This project contains automated tests for http://automationexercise.com using Cypress, TypeScript, and the Page Object Model design pattern.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Project Structure

```
cypress/
├── e2e/                    # Test specs
├── fixtures/               # Test data
├── pages/                  # Page Object Models
├── support/                # Support files and custom commands
└── utils/                  # Utility functions
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Open Cypress Test Runner:
   ```bash
   npx cypress open
   ```
4. Run tests in headless mode:
   ```bash
   npx cypress run
   ```

## Features

- TypeScript support
- Page Object Model implementation
- Custom commands
- Environment variables
- Screenshot and video capture on failure
- API testing support

## Best Practices

- Use Page Objects for better maintainability
- Implement custom commands for reusable actions
- Use TypeScript for type safety
- Follow Cypress best practices for flaky tests prevention

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request

## License

ISC
