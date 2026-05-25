import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SEO from './components/SEO';
import { seoConfig } from './config/seoConfig';
import { trackEvent } from './utils/analytics';
import { organizationSchema, websiteSchema, serviceSchema, hostingServiceSchema, vitrineServiceSchema, ecommerceServiceSchema, partnersServiceSchema, faqPageSchema } from './utils/structuredData';
import Header from './components/Header';
const Hero = lazy(() => import('./components/Hero'));
const AboutMe = lazy(() => import('./components/AboutMe'));
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
const Vitrine = lazy(() => import('./components/Vitrine'));
const Ecommerce = lazy(() => import('./components/Ecommerce'));
const TypesDeSites = lazy(() => import('./components/TypesDeSites'));
const HomePage = () => (
  <>
    <SEO
      title={seoConfig.home.title}
      description={seoConfig.home.description}
      keywords={seoConfig.home.keywords}
      url={seoConfig.home.url}
      structuredData={[organizationSchema, websiteSchema]}
    />
    <Header />
    <main>
      <Hero />
      <AboutMe />
      <CompanyInfo />
    </main>
    <Footer />
  </>
);
const LandingPage = () => (
  <>
    <SEO
      title={seoConfig.landing.title}
      description={seoConfig.landing.description}
      keywords={seoConfig.landing.keywords}
      url={seoConfig.landing.url}
      structuredData={serviceSchema}
    />
    <Header />
    <main>
      <LandingExplanation />
      <PreDevisQuestions />
    </main>
    <Footer />
  </>
);
const ContactPage = () => (
  <>
    <SEO
      title={seoConfig.contact.title}
      description={seoConfig.contact.description}
      keywords={seoConfig.contact.keywords}
      url={seoConfig.contact.url}
    />
    <Header />
    <main>
      <ContactPageComponent />
    </main>
    <Footer />
  </>
);
function App() {
  return (
    <Router>
      <PageViewTracker />
      <div className="min-h-screen bg-white">
        <Suspense fallback={<div className="h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>}>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route path="/services" element={<Navigate to="/nos-services" replace />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/confirmation" element={
                <>
                  <Confirmation />
                </>
              } />
              <Route path="/mentions-legales" element={
                <>
                  <SEO
                    title={seoConfig.mentionsLegales.title}
                    description={seoConfig.mentionsLegales.description}
                    keywords={seoConfig.mentionsLegales.keywords}
                    url={seoConfig.mentionsLegales.url}
                  />
                  <Header />
                  <main>
                    <LegalMentions />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/politique-confidentialite" element={
                <>
                  <SEO
                    title={seoConfig.politiqueConfidentialite.title}
                    description={seoConfig.politiqueConfidentialite.description}
                    keywords={seoConfig.politiqueConfidentialite.keywords}
                    url={seoConfig.politiqueConfidentialite.url}
                  />
                  <Header />
                  <main>
                    <PrivacyPolicy />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/conditions-vente" element={
                <>
                  <SEO
                    title={seoConfig.conditionsVente.title}
                    description={seoConfig.conditionsVente.description}
                    keywords={seoConfig.conditionsVente.keywords}
                    url={seoConfig.conditionsVente.url}
                  />
                  <Header />
                  <main>
                    <TermsOfService />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/hebergement" element={
                <>
                  <SEO
                    title={seoConfig.hosting.title}
                    description={seoConfig.hosting.description}
                    keywords={seoConfig.hosting.keywords}
                    url={seoConfig.hosting.url}
                    structuredData={[hostingServiceSchema, organizationSchema]}
                  />
                  <Header />
                  <main>
                    <Hosting />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/site-vitrine" element={
                <>
                  <SEO
                    title={seoConfig.vitrine.title}
                    description={seoConfig.vitrine.description}
                    keywords={seoConfig.vitrine.keywords}
                    url={seoConfig.vitrine.url}
                    structuredData={[vitrineServiceSchema, organizationSchema]}
                  />
                  <Header />
                  <main>
                    <Vitrine />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/site-ecommerce" element={
                <>
                  <SEO
                    title={seoConfig.ecommerce.title}
                    description={seoConfig.ecommerce.description}
                    keywords={seoConfig.ecommerce.keywords}
                    url={seoConfig.ecommerce.url}
                    structuredData={[ecommerceServiceSchema, organizationSchema]}
                  />
                  <Header />
                  <main>
                    <Ecommerce />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/faq" element={
                <>
                  <SEO
                    title={seoConfig.faq.title}
                    description={seoConfig.faq.description}
                    keywords={seoConfig.faq.keywords}
                    url={seoConfig.faq.url}
                    structuredData={[faqPageSchema, organizationSchema]}
                  />
                  <Header />
                  <main>
                    <FAQ />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/partenaires" element={
                <>
                  <SEO
                    title={seoConfig.partners.title}
                    description={seoConfig.partners.description}
                    keywords={seoConfig.partners.keywords}
                    url={seoConfig.partners.url}
                    structuredData={[partnersServiceSchema, organizationSchema]}
                  />
                  <Header />
                  <main>
                    <Partners />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/nos-services" element={
                <>
                  <SEO
                    title={seoConfig.typesDeSites.title}
                    description={seoConfig.typesDeSites.description}
                    keywords={seoConfig.typesDeSites.keywords}
                    url={seoConfig.typesDeSites.url}
                    structuredData={[serviceSchema, organizationSchema]}
                  />
                  <Header />
                  <main>
                    <TypesDeSites />
                  </main>
                  <Footer />
                </>
              } />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
export default App;