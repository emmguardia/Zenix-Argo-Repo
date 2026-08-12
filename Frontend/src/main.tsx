import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
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
import App from './App.tsx';
import './index.css';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
