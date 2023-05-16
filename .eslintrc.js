module.exports = {
  extends: ['alloy', 'alloy/typescript'],
  env: {
    node: true,
    // mocha: true,
    // jest: true,
  },
  globals: {},
  rules: {
    '@typescript-eslint/explicit-member-accessibility': 'off',
  },
};
