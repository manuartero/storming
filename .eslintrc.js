// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  ignorePatterns: ["*/build", "*/node_modules", "webpack.*"],
  plugins: ["@typescript-eslint", "prettier", "@html-eslint"],
  rules: {
    "prettier/prettier": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
  overrides: [
    {
      files: ["*.html"],
      parser: "@html-eslint/parser",
      extends: ["plugin:@html-eslint/recommended"],
      rules: {
        "@html-eslint/require-doctype": "off",
        "@html-eslint/indent": ["error", 2],
      },
    },
  ],
  globals: {},
};
