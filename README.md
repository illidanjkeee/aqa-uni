# AQA University Project

This repository contains a collection of automated testing labs using various testing frameworks and approaches including Jest, Playwright, TestCafe, and Cucumber.

## Project Structure

```
├── lab1/          - Introduction to testing (basic test.js)
├── lab3/          - Jest testing basics
├── lab4/          - Advanced Jest testing
├── lab5/          - Playwright practice with Angular app
├── lab6/          - Playwright testing
├── lab7/          - Playwright advanced testing
├── lab8/          - TestCafe testing
├── lab9/          - BDD with Cucumber
├── lab10/         - Playwright comprehensive testing
├── lab11/         - Playwright with Angular app practice
└── lab12/         - Cucumber with Playwright (API, UI, E2E tests)
```

## Lab Descriptions

### Lab3: Jest Testing Basics
Contains basic unit tests using Jest.

### Lab4: Advanced Jest Testing
More complex Jest tests with configuration.

### Lab5 & Lab11: Playwright with Angular Application
Practice UI automation testing with Playwright against an Angular application (ngx-admin).

### Lab6 & Lab7: Playwright Testing
Progressive learning of Playwright test automation.

### Lab8: TestCafe
Testing with TestCafe framework.

### Lab9: BDD with Cucumber
Introduction to Behavior-Driven Development using Cucumber.

### Lab10: Comprehensive Playwright Testing
Advanced Playwright test implementation.

### Lab12: Cucumber with Playwright
Integration of Cucumber and Playwright for API, UI and E2E testing.

## Setup & Running Tests

### Jest Tests (lab3, lab4)
```bash
cd lab3
npm install
npm test
```

### Playwright Tests (lab5-7, lab10-11)
```bash
cd lab6
npm install
npx playwright test
```

### TestCafe Tests (lab8)
```bash
cd lab8
npm install
npx testcafe chrome tests/
```

### Cucumber Tests (lab9, lab12)
```bash
cd lab12
npm install
npm test           # Run all tests
npm run test:api   # Run API tests only
npm run test:ui    # Run UI tests only
npm run test:e2e   # Run E2E tests only
```

## Requirements

- Node.js (latest LTS recommended)
- NPM
- Web browsers (Chrome, Firefox, etc.)

## Notes

Each lab directory contains its own package.json with specific dependencies and configurations for the testing frameworks used in that lab.