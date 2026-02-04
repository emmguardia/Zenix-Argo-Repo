/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  publicDir: 'Public',
  test: {
    environment: 'jsdom',
    globals: true,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
});
