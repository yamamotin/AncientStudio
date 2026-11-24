import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: resolve(__dirname, '../assets/js'),
    emptyOutDir: false,
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, 'integration-entry.ts'),
      name: 'ASCIIRealms',
      formats: ['iife'],
      fileName: () => 'ascii-engine.bundle.js',
    },
  },
});
