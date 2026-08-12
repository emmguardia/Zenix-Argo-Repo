/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/*
 * Le plugin `css-async` qui vivait ici a été retiré.
 *
 * Il réécrivait chaque <link rel="stylesheet"> en `media="print"` avec un
 * `onload="this.media='all'"`, technique classique pour rendre une feuille de
 * style non bloquante. Trois raisons de l'abandonner :
 *
 *   1. Elle ne gagnait rien. Le site est une SPA : tant que le bundle JS n'est
 *      pas exécuté, il n'y a rien à peindre. Le rendu était donc bloqué par le
 *      JavaScript de toute façon, jamais par le CSS.
 *   2. Elle coûtait. Le basculement de `print` à `all` provoquait un flash de
 *      contenu non stylé et du Cumulative Layout Shift — une métrique Core Web
 *      Vitals, donc un critère de classement.
 *   3. L'attribut `onload=` est un gestionnaire d'événement inline. Il obligeait
 *      la CSP à conserver `script-src 'unsafe-inline'`, ce qui vidait la
 *      protection anti-XSS de sa substance. Sa suppression, avec celle du script
 *      inline d'index.html, permet enfin de retirer cette directive.
 *
 * Le vrai levier LCP sur ce site reste le pré-rendu du corps de page, pas le
 * chargement du CSS.
 */

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
