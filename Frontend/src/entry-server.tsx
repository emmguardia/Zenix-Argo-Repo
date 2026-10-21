import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import App from './App.tsx';

/**
 * Point d'entrée du pré-rendu, compilé par `vite build --ssr` et appelé par
 * scripts/prerender-seo.mjs pour chaque route.
 *
 * POURQUOI
 * Sans lui, le HTML servi ne contenait que `<div id="root"></div>` : tout le
 * texte de la page n'existait qu'après exécution du JavaScript. Google finit par
 * le voir (rendu différé), mais Bing et les autres moteurs le voient mal, et le
 * LCP mobile attendait le bundle JS (3,7 s mesurés). Le HTML contient
 * désormais la page complète ; main.tsx l'hydrate au chargement.
 *
 * `prerender` (et non `renderToString`) parce que les pages sont chargées en
 * `lazy()` : renderToString s'arrêterait au fallback du <Suspense> et
 * produirait le spinner, `prerender` attend que tous les composants soient
 * résolus.
 */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
    {
      // Désactive l'« externalisation » des gros blocs Suspense. Au-delà de
      // ce seuil (12 800 octets par défaut), React sert le fallback, place le
      // contenu dans un <div hidden> et ajoute un <script> inline qui fait
      // l'échange au chargement — utile en streaming, inutile ici puisque la
      // page est générée d'un bloc. Ce script est bloqué par notre CSP (pas
      // d'`unsafe-inline`) : la page restait masquée et l'hydratation
      // échouait (erreur React #419). Sans seuil, le HTML est linéaire et ne
      // contient aucun script.
      progressiveChunkSize: Number.POSITIVE_INFINITY
    }
  );

  const reader = prelude.getReader();
  const decoder = new TextDecoder();
  let html = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    html += decoder.decode(value, { stream: true });
  }
  return html + decoder.decode();
}
