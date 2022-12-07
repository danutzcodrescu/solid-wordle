import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    solidPlugin(),
    checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"', // for example, lint .ts & .tsx
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
