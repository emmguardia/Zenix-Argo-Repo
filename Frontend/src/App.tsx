import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SEO from './components/SEO';
import { seoConfig } from './config/seoConfig';
import { organizationSchema, websiteSchema, serviceSchema, hostingServiceSchema, vitrineServiceSchema, ecommerceServiceSchema } from './utils/structuredData';
import Header from './components/Header';
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
      <Portfolio />
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