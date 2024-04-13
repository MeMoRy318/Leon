// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['import'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    // Additional rules
    'indent': ['error', 2], // enforce 2 space indentation
    'quotes': ['error', 'single'], // enforce single quotes
    'semi': ['error', 'always'], // require semicolons at the end of statements
    'no-console': 'warn', // disallow the use of console.log(), warn instead of error
    'no-unused-vars': 'error', // warn about unused variables instead of error
    'no-debugger': 'error', // disallow the use of debugger statements
    'no-alert': 'warn', // disallow the use of alert(), use console.log() instead
    'import/order': ['error', {
      'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      'alphabetize': { order: 'asc', caseInsensitive: false },
    }],
  },
};
  