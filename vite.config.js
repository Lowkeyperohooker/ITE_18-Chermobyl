import { defineConfig } from 'vite';
import path from 'path';

// Detect if the environment is CodeSandbox
const isCodeSandbox = 'SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env;

export default defineConfig({
  root: 'src/',
  publicDir: '../static/',
  base: './',
  server: {
    host: true,
    open: !isCodeSandbox, // Open browser if not in CodeSandbox
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      external: [], // Use this if you have additional dependencies to treat as external
    },
  },
  resolve: {
    alias: {
      // Ensure correct resolution of three/examples/jsm imports
      'three/examples/jsm': path.resolve(__dirname, 'node_modules/three/examples/jsm'),
    },
  },
  optimizeDeps: {
    // Ensure dependencies like `three` are pre-bundled correctly
    include: ['three'],
  },
});
