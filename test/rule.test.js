const rule = require("../index").rules["no-cross-boundary-imports"];
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2021, sourceType: "module" },
});

ruleTester.run("no-cross-boundary-imports", rule, {
  valid: [
    { code: `import something from 'ToolbarIcon'` },
    { code: `import something from 'package/ToolbarIcon'` },
    { code: `import something from './ToolbarIcon'` },
    { code: `import something from './_components/ToolbarIcon'` },
    { code: `import something from '../_components/ToolbarIcon'` },
    { code: `import something from '../../_components/ToolbarIcon'` },
    {
      code: `import something from '../../_components/_icons/ToolbarIcon'`,
    },
    {
      code: `import {ToolbarIcon} from '../../core'`,
    },
    {
      code: `import something from '../../_components/icons/ToolbarIcon'`,
    },
    {
      code: `import something from '../../_components/icons/other/ToolbarIcon'`,
    },
  ],
  invalid: [
    {
      code: `import something from './core/_components/ToolbarIcon'`,
      errors: [
        {
          message:
            "Invalid cross-boundary import: A private name (_components) cannot follow a public name (core) in an import path.",
        },
      ],
    },
    {
      code: `import something from './core/_components/ToolbarIcon'`,
      errors: [
        {
          message:
            "Invalid cross-boundary import: A private name (_components) cannot follow a public name (core) in an import path.",
        },
      ],
    },
    {
      code: `import something from '../core/_components/ToolbarIcon'`,
      errors: [
        {
          message:
            "Invalid cross-boundary import: A private name (_components) cannot follow a public name (core) in an import path.",
        },
      ],
    },
    {
      code: `import something from '../../core/_components/ToolbarIcon'`,
      errors: [
        {
          message:
            "Invalid cross-boundary import: A private name (_components) cannot follow a public name (core) in an import path.",
        },
      ],
    },
    {
      code: `import something from '../../core/_components/_icons/ToolbarIcon'`,
      errors: [
        {
          message:
            "Invalid cross-boundary import: A private name (_components) cannot follow a public name (core) in an import path.",
        },
      ],
    },
    {
      code: `import something from '../../core/_components/icons/ToolbarIcon'`,
      errors: [
        {
          message:
            "Invalid cross-boundary import: A private name (_components) cannot follow a public name (core) in an import path.",
        },
      ],
    },
    {
      code: `import something from '../../core/_components/icons/other/ToolbarIcon'`,
      errors: [
        {
          message:
            "Invalid cross-boundary import: A private name (_components) cannot follow a public name (core) in an import path.",
        },
      ],
    },
    {
      code: `import something from '../../_components/icons/_other/ToolbarIcon'`,
      errors: [
        {
          message:
            "Invalid cross-boundary import: A private name (_other) cannot follow a public name (icons) in an import path.",
        },
      ],
    },
  ],
});
