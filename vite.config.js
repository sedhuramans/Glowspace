import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures assets load correctly on GitHub Pages and local subpaths
  server: {
    port: 3000,
    host: true
  }
});
