import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  root: __dirname,
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@web': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, './dist'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 600,
  },
  server: {
    port: 5174,
    strictPort: true,
    host: 'localhost',
  },
  ssgOptions: {
    entry: 'src/main.tsx',
    dirStyle: 'nested',
    script: 'async',
    formatting: 'none',
  },
  clearScreen: false,
});
