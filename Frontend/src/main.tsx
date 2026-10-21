import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// Inter auto-hébergée. L'import se fait ICI et non via un `@import` dans
// index.css : le plugin PostCSS de Tailwind v4 inline les `@import` avant que
// Vite ne réécrive les URLs, si bien que les `url(./files/*.woff2)` du paquet
// restaient relatives à un dossier inexistant et qu'AUCUN fichier de police
// n'était émis dans dist/. Le résultat se voyait mal : le CSS contenait bien
// les @font-face, mais chaque woff2 partait en 404 et la page retombait
// silencieusement sur la pile système. Importée depuis un module JS, la
// feuille est traitée par Vite avec sa propre base, les URLs sont réécrites
// et les woff2 sont émis et empreintés.
import '@fontsource-variable/inter';
// Space Grotesk : uniquement les titres et les sur-titres. Ses formes plus
// larges et ses terminaisons droites tranchent nettement avec Inter à la
// lecture, ce qui donne une hiérarchie visible sans avoir à empiler les tailles
// et les graisses.
import '@fontsource-variable/space-grotesk';
import App from './App.tsx';
import './index.css';
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// En production, #root contient déjà le HTML de la page, pré-rendu au build
// par scripts/prerender-seo.mjs : React s'y raccroche (hydratation) au lieu de
// tout reconstruire. En `pnpm dev`, il n'y a pas de pré-rendu et #root est
// vide : rendu client classique.
const container = document.getElementById('root')!;
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
