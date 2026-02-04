import React, { useEffect, useRef } from 'react';
import { Check, Globe, Search, Shield, Zap, ArrowRight, Code, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Vitrine = () => {
  const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
    try {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, params || {});
      }
    } catch { /* gtag not available */ }
  };

  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('section_view', { id: 'vitrine' });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Design Moderne & Responsive',
      description: 'Sites web élégants et adaptés à tous les écrans (mobile, tablette, desktop) pour une expérience utilisateur optimale.'
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: 'SEO Optimisé',
      description: 'Référencement naturel optimisé avec meta tags, structured data (JSON-LD), sitemap et optimisation des performances.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Sécurité Renforcée',
      description: 'Protection contre les attaques, HTTPS obligatoire, headers de sécurité, validation des formulaires et protection CSRF.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Performance Maximale',
      description: 'Chargement rapide grâce à l\'optimisation des images, lazy loading, code splitting et CDN Cloudflare.'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Technologies Modernes',
      description: 'Développement avec React, TypeScript, Tailwind CSS pour un code maintenable et évolutif.'
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: 'Design Personnalisé',
      description: 'Charte graphique sur mesure adaptée à votre identité de marque et à vos objectifs commerciaux.'
    }
  ];

  const services = [
    'Pages multiples (Accueil, À propos, Services, Portfolio, Contact)',
    'Formulaire de contact sécurisé avec reCAPTCHA',
    'Intégration Google Analytics avec consentement RGPD',
    'Optimisation des images et médias',
    'Intégration réseaux sociaux',
    'Mentions légales et politique de confidentialité',
    'Sitemap XML et robots.txt configurés'
  ];

  return (
    <section className="py-20 bg-white pt-32" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Création de Site Vitrine Professionnel</h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Sites vitrine modernes, sécurisés et optimisés pour le SEO. Présentez votre entreprise en ligne 
            avec un site professionnel qui convertit vos visiteurs en clients.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-slate-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
              <div className="bg-blue-600 text-white p-3 rounded-lg inline-flex mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Ce qui est inclus</h2>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Optimisations SEO & Sécurité</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3 flex items-center">
                  <Search className="w-5 h-5 text-blue-600 mr-2" />
                  SEO Technique
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• Meta tags optimisés (title, description, keywords)</li>
                  <li>• Structured data JSON-LD (Organization, Website, Service)</li>
                  <li>• Sitemap XML et robots.txt</li>
                  <li>• URLs propres et optimisées</li>
                  <li>• Optimisation Core Web Vitals</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3 flex items-center">
                  <Shield className="w-5 h-5 text-green-600 mr-2" />
                  Sécurité
                </h3>
                <ul className="space-y-2 text-slate-600">
                  <li>• HTTPS avec certificat SSL/TLS</li>
                  <li>• Headers de sécurité (CSP, X-Frame-Options, etc.)</li>
                  <li>• Protection CSRF et XSS</li>
                  <li>• Validation et sanitization des formulaires</li>
                  <li>• Protection contre les injections</li>
                  <li>• Sauvegardes automatiques quotidiennes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-8 md:p-12 text-white text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Prêt à lancer votre site vitrine ?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Obtenez un devis personnalisé pour votre projet. Réponse sous 24h garantie.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                trackEvent('cta_click', { id: 'vitrine_contact' });
                navigate('/contact');
              }}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-white/20 active:scale-95 inline-flex items-center justify-center"
            >
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button
              onClick={() => {
                trackEvent('cta_click', { id: 'vitrine_portfolio' });
                navigate('/#portfolio');
              }}
              className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold py-3 px-8 rounded-full transition-all border border-white/20 active:scale-95"
            >
              Voir mes réalisations
            </button>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Processus de création</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Consultation</h3>
              <p className="text-slate-600 text-sm">Analyse de vos besoins et objectifs</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Design</h3>
              <p className="text-slate-600 text-sm">Maquettes et validation du design</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Développement</h3>
              <p className="text-slate-600 text-sm">Création et optimisation du site</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Lancement</h3>
              <p className="text-slate-600 text-sm">Mise en ligne et formation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vitrine;
