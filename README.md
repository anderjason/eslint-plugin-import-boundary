# @anderjason/eslint-plugin-import-boundary

This ESLint plugin provides a rule to enforce import boundaries in a project. It disallows the use of private (underscore-prefixed) directory names following a public directory name in an import path.

## Rule: No Cross-Boundary Imports

In an import path, a private name (starting with an underscore) cannot follow a public name. You can have multiple public or private names in a row, and you can use the '..' syntax freely. Violation of these rules leads to an ESLint error.

### Examples

Assuming our project structure is as follows:

```
src
│
└─── toolbar
│   │   index.ts (Exports specific components meant to be used across boundaries)
│   │
│   └─── _components
│   │   └─── Toolbar.tsx
│   │   └─── SomePrivateToolbarButton.tsx
│   │   └─── SomePrivateToolbarIcon.tsx
│       └─── ...
│   │
│   └─── __helpers
│       └─── toolbarHelpers.ts
│       └─── somePrivateHelpers.ts
│       └─── ...
│
└─── core
    │   index.ts (Exports specific utilities meant to be used across boundaries)
│   │
│   └─── _components
│   │   └─── Button.tsx
│   │   └─── SomePrivateComponent.tsx
│       └─── ...
│   │
│   └─── _hooks
│       └─── useKeyboardShortcut.ts
│       └─── useSomePrivateHook.ts
│       └─── ...

```

```javascript
// In src/toolbar/index.ts, we export the Toolbar component to make it public
export { Toolbar } from "./_components/Toolbar";

// Then, we can import the Toolbar component from anywhere
✅ import { Toolbar } from "../../toolbar";

// However, we cannot import a private component from the toolbar area
❌ import { SomePrivateToolbarButton } from "../toolbar/_components/SomePrivateToolbarButton";

// Similarly, in src/core/index.ts:

export { Button } from "./_components/Button";
export { useKeyboardShortcut } from "./_utils/someUtil";

// Then, we can import the Button component from anywhere
✅ import { Button } from "./core";

// We can also import the useKeyboardShortcut hook from anywhere
✅ import { useKeyboardShortcut } from "../../../core";

// However, any file outside of the core area cannot import a private utility from inside the core area
❌ import { useSomePrivateHook } from "../core/_utils/useSomePrivateHook";
```

Private folders can appear at any level in the folder tree, and they can be nested. Private folders can have any name that starts with an underscore.

```javascript
src
│
└─── core
│   │   index.ts
│   │
│   └─── _components
│   │   │
│   │   └─── Modal
│   │   │   │   index.ts
│   │   │   │
│   │   │   └─── _private
│   │   │   │   └─── Modal.tsx
│   │   │   │   └─── Overlay.tsx
│   │   │   │   └─── modalHelpers.ts
│   │   │   │   └─── ...

// In this example, we want the Modal component
// to be public, but not Overlay or modalHelpers.

// in src/core/_components/Modal/index.ts,
// we make Modal available to other components in the core area
export { Modal } from "./_private/Modal"

// Then, in src/core/index.ts, we make the Modal component available outside the core area
export { Modal } from "./_components/Modal";

// Then we can import the Modal component from anywhere
✅ import { Modal } from "../../../core";

// We cannot import the Overlay component from outside the Modal folder
❌ import { Overlay } from "../core/_components/Modal/_private/Overlay";
```

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
