function validate(importPath) {
  // Split the import path into segments
  const pathSegments = importPath.split("/");

  // Flag to track if we've crossed a boundary (non-private folder)
  let crossedBoundary = false;
  let publicName;

  for (let i = 0; i < pathSegments.length; i++) {
    const segment = pathSegments[i];

    // If we encounter a non-private folder, mark that we've crossed a boundary
    if (segment !== "." && segment !== ".." && !segment.startsWith("_")) {
      crossedBoundary = true;
      publicName = segment;
    }

    // If we've crossed a boundary and we encounter a private folder, report an error
    if (crossedBoundary && segment.startsWith("_")) {
      return [publicName, segment];
    }
  }

  return undefined;
}

module.exports = {
  rules: {
    "no-cross-boundary-imports": {
      create(context) {
        return {
          ImportDeclaration(node) {
            const importPath = node.source.value;

            const result = validate(importPath);
            if (result) {
              const [publicName, privateName] = result;

              context.report({
                node,
                message: `Invalid cross-boundary import: A private name (${privateName}) cannot follow a public name (${publicName}) in an import path.`,
              });
            }
          },
          ExportNamedDeclaration(node) {
            const exportPath = node.source.value;

            const result = validate(exportPath);
            if (result) {
              const [publicName, privateName] = result;

              context.report({
                node,
                message: `Invalid cross-boundary export: A private name (${privateName}) cannot follow a public name (${publicName}) in an export path.`,
              });
            }
          },
          ExportAllDeclaration(node) {
            const exportPath = node.source.value;

            const result = validate(exportPath);
            if (result) {
              const [publicName, privateName] = result;

              context.report({
                node,
                message: `Invalid cross-boundary export: A private name (${privateName}) cannot follow a public name (${publicName}) in an export path.`,
              });
            }
          },
        };
      },
    },
  },
};
