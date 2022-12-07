module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'solid', 'prettier', 'tailwindcss'],
  extends: [
    'plugin:solid/recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
  ],
  rules: {
    'tailwindcss/no-custom-classname': 0,
  },
};
