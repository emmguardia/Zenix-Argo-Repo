/**
 * Pré-rendu des balises SEO, exécuté après `vite build`.
 *
 * POURQUOI
 * Le site est une SPA : les balises title / description / Open Graph et le
 * JSON-LD sont posés par le composant SEO, donc en JavaScript, après le
 * chargement. Google exécute le JS et finit par les voir, mais les robots des
 * réseaux sociaux (LinkedIn, Facebook, WhatsApp, Slack, Discord, X) ne
 * l'exécutent PAS : ils lisent le HTML brut et s'arrêtent là.
 *
 * Résultat avant ce script : partager n'importe quelle URL du site affichait
 * toujours le titre et la description génériques de index.html, jamais ceux de
 * la page partagée.
 *
 * CE QUE FAIT LE SCRIPT
 * Pour chaque route de src/config/routes.ts, il écrit dist/<route>/index.html,
 * copie de dist/index.html dont les balises sont remplacées par celles de la
 * route. nginx sert ensuite ces fichiers directement (try_files $uri/index.html).
 * React reprend la main normalement au chargement.
 *
 * Il régénère aussi sitemap.xml depuis la même source, ce qui évite qu'il
 * dérive des routes réelles comme c'était le cas.
 *
 * Les modules de config sont en TypeScript et importés tels quels : Node
 * retire les annotations de type nativement depuis la v22.18.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

// `import()` exige une URL file:// : un chemin Windows absolu (C:\...) serait
// interprété comme un protocole inconnu.
const load = (relativePath) => import(pathToFileURL(join(ROOT, relativePath)).href);

const { routes, indexableRoutes, buildBreadcrumb, SITE_URL } = await load('src/config/routes.ts');
const { breadcrumbSchema } = await load('src/utils/structuredData.ts');

const OG_IMAGE = `${SITE_URL}/images/og-cover.webp`;
const OG_IMAGE_WIDTH = '1200';
const OG_IMAGE_HEIGHT = '630';

/** Échappe ce qui ne doit pas casser un attribut HTML. */
const attr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/** Neutralise `</script>` à l'intérieur d'un bloc JSON-LD. */
const jsonLd = (data) => JSON.stringify(data).replace(/</g, '\\u003c');

function buildHead(route) {
  const { title, description, keywords } = route.seo;
  const canonical = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
  const robots = route.noindex ? 'noindex, nofollow' : 'index, follow';

  const crumb = buildBreadcrumb(route);
  const schemas = crumb.length > 0
    ? [...route.structuredData, breadcrumbSchema(crumb)]
    : route.structuredData;

  const tags = [
    `<title>${attr(title)}</title>`,
    `<meta name="description" content="${attr(description)}">`,
    `<meta name="keywords" content="${attr(keywords)}">`,
    `<meta name="author" content="Enzo Monnet-Mata">`,
    `<meta name="robots" content="${robots}">`,
    `<link rel="canonical" href="${attr(canonical)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="Zenix Web">`,
    `<meta property="og:locale" content="fr_FR">`,
    `<meta property="og:url" content="${attr(canonical)}">`,
    `<meta property="og:title" content="${attr(title)}">`,
    `<meta property="og:description" content="${attr(description)}">`,
    `<meta property="og:image" content="${OG_IMAGE}">`,
    `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}">`,
    `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}">`,
    `<meta property="og:image:alt" content="${attr('Zenix Web — ' + title.split('|')[0].trim())}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:url" content="${attr(canonical)}">`,
    `<meta name="twitter:title" content="${attr(title)}">`,
    `<meta name="twitter:description" content="${attr(description)}">`,
    `<meta name="twitter:image" content="${OG_IMAGE}">`
  ];

  for (const schema of schemas) {
    tags.push(`<script type="application/ld+json">${jsonLd(schema)}</script>`);
  }

  return tags.map((tag) => `    ${tag}`).join('\n');
}

/**
 * Remplace le bloc SEO du gabarit. index.html porte des marqueurs explicites
 * pour éviter toute réécriture approximative à coups d'expressions régulières
 * sur du HTML.
 */
const START = '<!--SEO:START-->';
const END = '<!--SEO:END-->';

function inject(template, route) {
  const start = template.indexOf(START);
  const end = template.indexOf(END);
  if (start === -1 || end === -1) {
    throw new Error(
      `Marqueurs ${START} / ${END} introuvables dans index.html : le pré-rendu SEO ne peut pas s'appliquer.`
    );
  }
  return (
    template.slice(0, start + START.length) +
    '\n' +
    buildHead(route) +
    '\n    ' +
    template.slice(end)
  );
}

function buildSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const urls = indexableRoutes
    .map((route) => {
      const loc = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${route.changefreq ?? 'monthly'}</changefreq>`,
        `    <priority>${route.priority ?? '0.5'}</priority>`,
        '  </url>'
      ].join('\n');
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

const template = await readFile(join(DIST, 'index.html'), 'utf8');

let count = 0;
for (const route of routes) {
  const html = inject(template, route);
  if (route.path === '/') {
    await writeFile(join(DIST, 'index.html'), html, 'utf8');
  } else {
    const dir = join(DIST, route.path.replace(/^\//, ''));
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, 'index.html'), html, 'utf8');
  }
  count++;
}

// Page 404 : servie par nginx avec le statut 404, donc en noindex.
const notFound = inject(template, {
  path: '/404',
  seo: {
    title: 'Page introuvable (404) | Zenix Web',
    description: "La page demandée n'existe pas ou a été déplacée.",
    keywords: 'page introuvable, 404, Zenix Web'
  },
  structuredData: [],
  breadcrumb: null,
  noindex: true
});
await writeFile(join(DIST, '404.html'), notFound, 'utf8');

await writeFile(join(DIST, 'sitemap.xml'), buildSitemap(), 'utf8');

console.log(
  `Pré-rendu SEO : ${count} pages + 404.html, sitemap.xml régénéré (${indexableRoutes.length} URLs indexables).`
);
