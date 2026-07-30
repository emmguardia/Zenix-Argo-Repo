import { Suspense, lazy, useEffect, useMemo, type ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SEO from './components/SEO';
import Header from './components/Header';
import Breadcrumbs from './components/Breadcrumbs';
import { routes, buildBreadcrumb, type RouteDefinition } from './config/routes';
import { breadcrumbSchema } from './utils/structuredData';
import { trackEvent } from './utils/analytics';

const Hero = lazy(() => import('./components/Hero'));
const AboutMe = lazy(() => import('./components/AboutMe'));
const Portfolio = lazy(() => import('./components/Portfolio'));
const CompanyInfo = lazy(() => import('./components/CompanyInfo'));
const LandingExplanation = lazy(() => import('./components/LandingExplanation'));
const PreDevisQuestions = lazy(() => import('./components/PreDevisQuestions'));
const ContactPageComponent = lazy(() => import('./components/ContactPage'));
const Footer = lazy(() => import('./components/Footer'));
const Confirmation = lazy(() => import('./pages/confirmation'));
const LegalMentions = lazy(() => import('./components/LegalMentions'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/TermsOfService'));
const Hosting = lazy(() => import('./components/Hosting'));
const Partners = lazy(() => import('./components/Partners'));
const FAQ = lazy(() => import('./components/FAQ'));
const Vitrine = lazy(() => import('./components/Vitrine'));
const Ecommerce = lazy(() => import('./components/Ecommerce'));
const TypesDeSites = lazy(() => import('./components/TypesDeSites'));
const NotFound = lazy(() => import('./components/NotFound'));

/**
 * Contenu de chaque route, indexé par chemin.
 *
 * Les métadonnées (titre, description, JSON-LD, fil d'Ariane, sitemap) vivent
 * dans src/config/routes.ts, qui doit rester importable depuis Node au moment
 * du build : il ne peut donc pas référencer de composant React. C'est cette
 * table qui fait le lien entre les deux.
 */
const PAGE_CONTENT: Record<string, ReactNode> = {
  '/': (
    <>
      <Hero />
      <AboutMe />
      <Portfolio />
      <CompanyInfo />
    </>
  ),
  '/nos-services': <TypesDeSites />,
  '/site-vitrine': <Vitrine />,
  '/site-ecommerce': <Ecommerce />,
  '/landing': (
    <>
      <LandingExplanation />
      <PreDevisQuestions />
    </>
  ),
  '/hebergement': <Hosting />,
  '/faq': <FAQ />,
  '/contact': <ContactPageComponent />,
  '/partenaires': <Partners />,
  '/mentions-legales': <LegalMentions />,
  '/politique-confidentialite': <PrivacyPolicy />,
  '/conditions-vente': <TermsOfService />,
  '/confirmation': <Confirmation />
};

const PageViewTracker = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/contact') {
      trackEvent('page_view', { page: 'contact', intent: 'devis' });
    } else if (location.pathname === '/confirmation') {
      trackEvent('page_view', { page: 'confirmation', conversion: 'success' });
    }
  }, [location.pathname]);
  return null;
};

/** Gabarit commun : SEO, en-tête, fil d'Ariane, contenu, pied de page. */
const Page = ({ route }: { route: RouteDefinition }) => {
  const structuredData = useMemo(() => {
    const crumb = buildBreadcrumb(route);
    return crumb.length > 0
      ? [...route.structuredData, breadcrumbSchema(crumb)]
      : route.structuredData;
  }, [route]);

  const seo = (
    <SEO
      title={route.seo.title}
      description={route.seo.description}
      keywords={route.seo.keywords}
      url={route.seo.url}
      structuredData={structuredData}
      noindex={route.noindex}
    />
  );

  const content = PAGE_CONTENT[route.path];

  // Page nue (confirmation) : ni en-tête ni pied de page.
  if (route.bare) {
    return (
      <>
        {seo}
        {content}
      </>
    );
  }

  return (
    // `with-breadcrumbs` réduit le padding haut de la première section : le fil
    // d'Ariane dégage déjà l'en-tête fixe, sans quoi les deux se cumulent.
    <div className={route.breadcrumb ? 'with-breadcrumbs' : undefined}>
      {seo}
      <Header />
      {route.breadcrumb && <Breadcrumbs current={route.breadcrumb} />}
      <main>{content}</main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <PageViewTracker />
      <div className="min-h-screen bg-white">
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={<Page route={route} />} />
            ))}
            <Route path="/services" element={<Navigate to="/nos-services" replace />} />
            {/* Catch-all : toute URL inconnue rend une vraie page 404 en noindex,
                au lieu d'une page blanche renvoyée en 200 et indexable. */}
            <Route
              path="*"
              element={
                <>
                  <SEO
                    title="Page introuvable (404) | Zenix Web"
                    description="La page demandée n'existe pas ou a été déplacée."
                    url="https://zenixweb.fr/404"
                    noindex={true}
                  />
                  <Header />
                  <main>
                    <NotFound />
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
