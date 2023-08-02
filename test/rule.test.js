const rule = require("../index").rules["no-cross-boundary-imports"];
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2021, sourceType: "module" },
});

ruleTester.run("no-cross-boundary-imports", rule, {
  valid: [
    { code: `import * as something from 'ToolbarIcon'` },
    { code: `import something from 'package/ToolbarIcon'` },
    { code: `import something from './ToolbarIcon'` },
    { code: `import * as something from './_components/ToolbarIcon'` },
    { code: `import something from '../_components/ToolbarIcon'` },
    { code: `import something from '../../_components/ToolbarIcon'` },
    { code: `import something from '../../_components/_icons/ToolbarIcon'` },
    { code: `import { something } from '../../core'` },
    { code: `import something from '../../_components/icons/ToolbarIcon'` },
    {
      code: `import something from '../../_components/icons/other/ToolbarIcon'`,
    },
    { code: `export { Something } from 'ToolbarIcon'` },
    { code: `export * from 'package/ToolbarIcon'` },
    { code: `export * from './ToolbarIcon'` },
    { code: `export * from './_components/ToolbarIcon'` },
    { code: `export * from '../_components/ToolbarIcon'` },
    { code: `export * from '../../_components/ToolbarIcon'` },
    { code: `export * from '../../_components/_icons/ToolbarIcon'` },
    { code: `export * from '../../core'` },
    { code: `export * from '../../_components/icons/ToolbarIcon'` },
    { code: `export * from '../../_components/icons/other/ToolbarIcon'` },
    { code: `export const x = 5` },
    { code: `export default function() {}` },
  ],
  invalid: [
    {
      code: `import * as something from './core/_components/ToolbarIcon'`,
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
      code: `import * as something from '../core/_components/ToolbarIcon'`,
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

    {
      code: `export * from './core/_components/ToolbarIcon'`,
      errors: [
        {
          message:
            "Invalid cross-boundary export: A private name (_components) cannot follow a public name (core) in an export path.",
        },
      ],
    },
    {
      code: `export * from './core/_components/ToolbarIcon'`,
      errors: [
        {
          message:
            "Invalid cross-boundary export: A private name (_components) cannot follow a public name (core) in an export path.",
        },
      ],
    },
    {
      code: `export * from '../core/_components/ToolbarIcon'`,
      errors: [
        {
          message:
            "Invalid cross-boundary export: A private name (_components) cannot follow a public name (core) in an export path.",
        },
      ],
    },
    {
      code: `export * from '../../core/_components/ToolbarIcon'`,
      errors: [
        {
          message:
            "Invalid cross-boundary export: A private name (_components) cannot follow a public name (core) in an export path.",
        },
      ],
    },
    {
      code: `export * from '../../core/_components/_icons/ToolbarIcon'`,
      errors: [
        {
          message:
            "Invalid cross-boundary export: A private name (_components) cannot follow a public name (core) in an export path.",
        },
      ],
    },
    {
      code: `export * from '../../core/_components/icons/ToolbarIcon'`,
      errors: [
        {
          message:
            "Invalid cross-boundary export: A private name (_components) cannot follow a public name (core) in an export path.",
        },
      ],
    },
    {
      code: `export * from '../../core/_components/icons/other/ToolbarIcon'`,
      errors: [
        {
          message:
            "Invalid cross-boundary export: A private name (_components) cannot follow a public name (core) in an export path.",
        },
      ],
    },
    {
      code: `export * from '../../_components/icons/_other/ToolbarIcon'`,
      errors: [
        {
          message:
            "Invalid cross-boundary export: A private name (_other) cannot follow a public name (icons) in an export path.",
        },
      ],
    },
  ],
});
