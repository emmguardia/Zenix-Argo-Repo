// Extensions .ts explicites, contrairement au reste du code : ce module est
// importé tel quel par Node au moment du build (scripts/prerender-seo.mjs), et
// la résolution ESM de Node n'ajoute pas d'extension. Vite les accepte, et
// tsconfig active allowImportingTsExtensions.
import { seoConfig } from './seoConfig.ts';
import {
  SITE_URL,
  organizationSchema,
  websiteSchema,
  personSchema,
  serviceSchema,
  consultationSchema,
  hostingServiceSchema,
  vitrineServiceSchema,
  ecommerceServiceSchema,
  partnersServiceSchema,
  faqPageSchema
} from '../utils/structuredData.ts';

/**
 * Source unique de vérité des routes du site.
 *
 * Ce fichier ne contient QUE des données — aucun composant React — pour rester
 * importable depuis Node au moment du build. En dérivent :
 *   - le routage de App.tsx ;
 *   - le pré-rendu des balises SEO dans le HTML (scripts/prerender-seo.mjs) ;
 *   - le sitemap.xml ;
 *   - le fil d'Ariane et son BreadcrumbList.
 *
 * Ajouter une page ici suffit : elle est routée, pré-rendue et présente dans le
 * sitemap. C'est aussi ce qui empêche les listes de routes de diverger, comme
 * c'était le cas entre App.tsx, le sitemap et la config nginx.
 */
export interface RouteDefinition {
  /** Chemin exact, tel que déclaré dans React Router. */
  path: string;
  /** Bloc SEO correspondant dans seoConfig. */
  seo: { title: string; description: string; keywords: string; url: string };
  /** Données structurées JSON-LD propres à la page. */
  structuredData: object[];
  /** Libellé du fil d'Ariane. `null` = page racine, pas de fil d'Ariane. */
  breadcrumb: string | null;
  /** Exclue de l'indexation et du sitemap. */
  noindex?: boolean;
  /** Priorité déclarée dans le sitemap. */
  priority?: string;
  /** Fréquence de mise à jour déclarée dans le sitemap. */
  changefreq?: string;
  /** Rend la page sans en-tête ni pied de page. */
  bare?: boolean;
}

export const routes: RouteDefinition[] = [
  {
    path: '/',
    seo: seoConfig.home,
    structuredData: [organizationSchema, websiteSchema, personSchema],
    breadcrumb: null,
    priority: '1.0',
    changefreq: 'weekly'
  },
  {
    path: '/nos-services',
    seo: seoConfig.typesDeSites,
    structuredData: [serviceSchema, organizationSchema],
    breadcrumb: 'Nos Services',
    priority: '0.9',
    changefreq: 'monthly'
  },
  {
    path: '/site-vitrine',
    seo: seoConfig.vitrine,
    structuredData: [vitrineServiceSchema, organizationSchema],
    breadcrumb: 'Site Vitrine',
    priority: '0.9',
    changefreq: 'monthly'
  },
  {
    path: '/site-ecommerce',
    seo: seoConfig.ecommerce,
    structuredData: [ecommerceServiceSchema, organizationSchema],
    breadcrumb: 'Site E-commerce',
    priority: '0.9',
    changefreq: 'monthly'
  },
  {
    path: '/landing',
    seo: seoConfig.landing,
    structuredData: [serviceSchema, organizationSchema],
    breadcrumb: 'Landing Page',
    priority: '0.9',
    changefreq: 'monthly'
  },
  {
    path: '/hebergement',
    seo: seoConfig.hosting,
    structuredData: [hostingServiceSchema, organizationSchema],
    breadcrumb: 'Hébergement',
    priority: '0.9',
    changefreq: 'monthly'
  },
  {
    path: '/faq',
    seo: seoConfig.faq,
    structuredData: [faqPageSchema, organizationSchema],
    breadcrumb: 'FAQ',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    path: '/contact',
    seo: seoConfig.contact,
    structuredData: [consultationSchema, organizationSchema, personSchema],
    breadcrumb: 'Contact',
    priority: '0.8',
    changefreq: 'monthly'
  },
  {
    path: '/partenaires',
    seo: seoConfig.partners,
    structuredData: [partnersServiceSchema, organizationSchema],
    breadcrumb: 'Partenaires',
    priority: '0.6',
    changefreq: 'monthly'
  },
  {
    path: '/mentions-legales',
    seo: seoConfig.mentionsLegales,
    structuredData: [organizationSchema],
    breadcrumb: 'Mentions Légales',
    priority: '0.3',
    changefreq: 'yearly'
  },
  {
    path: '/politique-confidentialite',
    seo: seoConfig.politiqueConfidentialite,
    structuredData: [organizationSchema],
    breadcrumb: 'Politique de Confidentialité',
    priority: '0.3',
    changefreq: 'yearly'
  },
  {
    path: '/conditions-vente',
    seo: seoConfig.conditionsVente,
    structuredData: [organizationSchema],
    breadcrumb: 'Conditions de Vente',
    priority: '0.3',
    changefreq: 'yearly'
  },
  {
    path: '/confirmation',
    seo: seoConfig.confirmation,
    structuredData: [],
    breadcrumb: null,
    noindex: true,
    bare: true
  }
];

/** Routes réellement indexables : alimente le sitemap et le pré-rendu. */
export const indexableRoutes = routes.filter((r) => !r.noindex);

export function getRoute(path: string): RouteDefinition | undefined {
  return routes.find((r) => r.path === path);
}

/**
 * Construit le fil d'Ariane d'une page : Accueil > Page.
 * Le site est volontairement plat (un seul niveau), donc deux entrées suffisent.
 */
export function buildBreadcrumb(route: RouteDefinition): Array<{ name: string; url: string }> {
  if (!route.breadcrumb) return [];
  return [
    { name: 'Accueil', url: `${SITE_URL}/` },
    { name: route.breadcrumb, url: `${SITE_URL}${route.path}` }
  ];
}

export { SITE_URL };
