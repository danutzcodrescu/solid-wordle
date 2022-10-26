module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'solid', 'prettier'],
  extends: [
    'plugin:solid/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
};
