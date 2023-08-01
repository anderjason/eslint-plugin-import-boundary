# @anderjason/eslint-plugin-import-boundary

This ESLint plugin provides a rule to enforce import boundaries in a project. It disallows the use of private (underscore-prefixed) directory names following a public directory name in an import path.

## Rule: No Cross-Boundary Imports

In an import path, a private name (starting with an underscore) cannot follow a public name. You can have multiple public or private names in a row, and you can use the '..' syntax freely. Violation of these rules leads to an ESLint error.

## Installation

Assuming you already have ESLint installed, run:

```bash
npm install @anderjason/eslint-plugin-import-boundary --save-dev
```

## Usage

Add `@anderjason/import-boundary`` to the plugins section of your .eslintrc configuration file, and configure the rule under the rules section.

```javascript
module.exports = {
  plugins: ["@anderjason/import-boundary"],
  rules: {
    "@anderjason/import-boundary/no-cross-boundary-imports": "error",
  },
};
```

## Running Tests

```bash
npm test
```

## Contributing

If you're interested in contributing, please open a pull request with your changes. Ensure that your changes pass the tests and adhere to the existing coding style.
