module.exports = {
  rules: {
    "no-cross-boundary-imports": {
      create(context) {
        return {
          ImportDeclaration(node) {
            const importPath = node.source.value;

            // Split the import path into segments
            const pathSegments = importPath.split("/");

            // Flag to track if we've crossed a boundary (non-private folder)
            let crossedBoundary = false;
            let publicName, privateName;

            for (let i = 0; i < pathSegments.length; i++) {
              const segment = pathSegments[i];

              // If we encounter a non-private folder, mark that we've crossed a boundary
              if (
                segment !== "." &&
                segment !== ".." &&
                !segment.startsWith("_")
              ) {
                crossedBoundary = true;
                publicName = segment;
              }

              // If we've crossed a boundary and we encounter a private folder, report an error
              if (crossedBoundary && segment.startsWith("_")) {
                privateName = segment;
                context.report({
                  node,
                  message: `Invalid cross-boundary import: A private name (${privateName}) cannot follow a public name (${publicName}) in an import path.`,
                });
                break;
              }
            }
          },
        };
      },
    },
  },
};
