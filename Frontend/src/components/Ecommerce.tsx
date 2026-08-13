import { useEffect, useRef } from 'react';
import { Check, ShoppingCart, Shield, CreditCard, Search, BarChart, Package, ArrowRight, Lock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

const Ecommerce = () => {

  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('section_view', { id: 'ecommerce' });
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
      icon: <ShoppingCart className="w-6 h-6" />,
      title: 'Gestion Produits Complète',
      description: 'Catalogue produits illimité avec catégories, variantes, stocks et gestion des prix. Interface d\'administration intuitive.'
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Paiement Sécurisé',
      description: 'Paiement par carte traité par Stripe, certifié PCI DSS niveau 1. Les données bancaires ne transitent jamais par votre site ni par mes serveurs.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Sécurité E-commerce',
      description: 'Protection renforcée contre les fraudes, validation des commandes, sécurisation des transactions et protection des données clients.'
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: 'SEO E-commerce',
      description: 'Optimisation pour les moteurs de recherche avec structured data produits, meta tags dynamiques et optimisation des images.'
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: 'Mesure d’audience',
      description: 'Mesure d’audience sans cookie ni bandeau de consentement : pages vues, provenance des visiteurs, produits consultés.'
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: 'Gestion Commandes',
      description: 'Suivi des commandes depuis l’administration, changements de statut et notifications automatiques aux clients.'
    }
  ];

  const services = [
    'Catalogue produits illimité avec gestion des stocks',
    'Panier d\'achat et processus de commande optimisé',
    'Intégration paiement sécurisé (Stripe, PayPal)',
    'Gestion des commandes depuis l’administration',
    'Compte client avec historique des commandes',
    'Gestion des codes promo et réductions',
    'Interface d\'administration complète',
    'Optimisation SEO produits et catégories',
    'Protection anti-fraude et sécurisation des paiements'
  ];

  const securityFeatures = [
    'Paiement délégué à Stripe, certifié PCI DSS niveau 1',
    'Chiffrement SSL/TLS pour toutes les transactions',
    'Protection CSRF et XSS renforcée',
    'Validation stricte des données de paiement',
    'Sauvegarde quotidienne des données clients',
    'Headers de sécurité renforcés',
    'Mises à jour de sécurité suivies'
  ];

  return (
    <section className="py-20 bg-ink-50 pt-32" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-ink-900 mb-4">Création de Site E-commerce Professionnel</h1>
          <div className="h-1 w-20 bg-brand-600 mx-auto mb-6"></div>
          <p className="text-lg text-ink-600 max-w-3xl mx-auto">
            Boutiques en ligne sécurisées et optimisées pour convertir. Vendez vos produits en ligne avec 
            une solution e-commerce complète, sécurisée et performante.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="bg-brand-600 text-white p-3 rounded-lg inline-flex mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-ink-900 mb-2">{feature.title}</h3>
              <p className="text-ink-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-brand-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-ink-900 mb-6">Fonctionnalités incluses</h2>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-brand-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-ink-700">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-ink-200">
            <h2 className="text-3xl font-bold text-ink-900 mb-6 flex items-center">
              <Lock className="w-8 h-8 text-brand-600 mr-3" />
              Sécurité E-commerce
            </h2>
            <p className="text-ink-600 mb-6">
              La sécurité est primordiale pour un site e-commerce. Toutes nos solutions intègrent les meilleures pratiques de sécurité.
            </p>
            <ul className="space-y-3">
              {securityFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Shield className="w-5 h-5 text-brand-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-ink-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-ink-900 mb-8 text-center">Optimisations SEO E-commerce</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-ink-900 mb-4 flex items-center">
                <Search className="w-6 h-6 text-brand-600 mr-2" />
                Référencement Produits
              </h3>
              <ul className="space-y-2 text-ink-600">
                <li>• URLs optimisées par produit</li>
                <li>• Meta descriptions dynamiques</li>
                <li>• Optimisation des images produits</li>
                <li>• Rich snippets pour les avis clients</li>
                <li>• Sitemap XML avec produits</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-ink-900 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 text-brand-600 mr-2" />
                Performance & Conversion
              </h3>
              <ul className="space-y-2 text-ink-600">
                <li>• Optimisation Core Web Vitals</li>
                <li>• Lazy loading des images</li>
                <li>• Code splitting pour performance</li>
                <li>• CDN Cloudflare intégré</li>
                <li>• A/B testing des pages produits</li>
                <li>• Analytics e-commerce avancé</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-brand-600 rounded-2xl p-8 md:p-12 text-white text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Lancez votre boutique en ligne</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Obtenez un devis personnalisé pour votre projet e-commerce. Solutions sécurisées et optimisées pour vos ventes en ligne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                trackEvent('contact_click', { source: 'ecommerce', cta: 'me_contacter' });
                navigate('/contact');
              }}
              className="bg-white text-brand-600 hover:bg-brand-50 font-semibold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-white/20 active:scale-95 inline-flex items-center justify-center"
            >
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button
              onClick={() => {
                trackEvent('nav_click', { destination: '/', source: 'ecommerce', cta: 'portfolio' });
                navigate('/#portfolio');
              }}
              className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 font-semibold py-3 px-8 rounded-full transition-all border border-white/20 active:scale-95"
            >
              Voir mes réalisations
            </button>
          </div>
        </div>

        <div className="bg-ink-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-ink-900 mb-8 text-center">Processus de création</h2>
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="bg-brand-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-ink-900 mb-2">Analyse</h3>
              <p className="text-ink-600 text-sm">Étude de vos produits et besoins</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-ink-900 mb-2">Design</h3>
              <p className="text-ink-600 text-sm">Maquettes et UX optimisée</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-ink-900 mb-2">Développement</h3>
              <p className="text-ink-600 text-sm">Création et sécurisation</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold text-ink-900 mb-2">Tests</h3>
              <p className="text-ink-600 text-sm">Validation et sécurité</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                5
              </div>
              <h3 className="font-semibold text-ink-900 mb-2">Lancement</h3>
              <p className="text-ink-600 text-sm">Mise en ligne et formation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecommerce;
