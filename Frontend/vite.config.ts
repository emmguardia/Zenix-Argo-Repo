/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** Plugin pour charger le CSS en async et éviter le blocage du rendu (LCP) */
function cssAsyncPlugin() {
  return {
    name: 'css-async',
    transformIndexHtml: {
      order: 'post', // Après l'injection des assets par Vite
      handler(html: string) {
        return html.replace(
          /<link rel="stylesheet"([^>]*)href="(\/assets\/[^"]+\.css)"([^>]*)>/g,
          (_, before, href, after) =>
            `<link rel="stylesheet"${before}href="${href}"${after} media="print" onload="this.media='all'">` +
            `<noscript><link rel="stylesheet" href="${href}"></noscript>`
        );
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), cssAsyncPlugin()],
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
