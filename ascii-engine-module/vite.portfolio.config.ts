import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: resolve(__dirname, '../assets/js/vendor'),
    emptyOutDir: true,
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, 'src/browser-global.ts'),
      name: 'ASCIIRealmsBundle',
      formats: ['iife'],
      fileName: () => 'ascii-realms-bundle.js',
    },
  },
});
