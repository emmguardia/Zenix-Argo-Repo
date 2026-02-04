import React, { useEffect, useRef } from 'react';
import { Check, Target, ShoppingCart, Globe, ArrowRight, Zap, Shield, Search, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TypesDeSites = () => {
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
            trackEvent('section_view', { id: 'types_de_sites' });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const siteTypes = [
    {
      name: 'Landing Page',
      icon: <Target className="w-8 h-8" />,
      color: 'blue',
      description: 'Une page unique conçue pour convertir vos visiteurs en clients',
      useCases: [
        'Lancer un nouveau produit ou service',
        'Promouvoir une offre spéciale ou une promotion',
        'Collecter des emails pour votre newsletter',
        'Promouvoir un événement ou un webinaire',
        'Télécharger un document (livre blanc, guide)',
        'Campagne publicitaire ciblée'
      ],
      features: [
        'Design optimisé pour la conversion',
        'Chargement ultra-rapide',
        'Formulaire de contact intégré',
        'Optimisé pour mobile',
        'Suivi des conversions'
      ],
      price: 'À partir de 100€',
      link: '/landing',
      bestFor: 'Promouvoir une offre spécifique ou collecter des leads'
    },
    {
      name: 'Site Vitrine',
      icon: <Globe className="w-8 h-8" />,
      color: 'violet',
      description: 'Un site complet pour présenter votre entreprise et vos services',
      useCases: [
        'Présenter votre entreprise et vos services',
        'Créer une présence professionnelle en ligne',
        'Afficher votre portfolio ou vos réalisations',
        'Partager vos coordonnées et localisation',
        'Publier un blog pour votre expertise',
        'Améliorer votre référencement Google'
      ],
      features: [
        'Plusieurs pages (Accueil, À propos, Services, Contact)',
        'Design professionnel et moderne',
        'Optimisation SEO complète',
        'Formulaire de contact sécurisé',
        'Intégration réseaux sociaux'
      ],
      price: 'Sur devis',
      link: '/site-vitrine',
      bestFor: 'Établir une présence en ligne professionnelle'
    },
    {
      name: 'Site E-commerce',
      icon: <ShoppingCart className="w-8 h-8" />,
      color: 'green',
      description: 'Une boutique en ligne complète pour vendre vos produits',
      useCases: [
        'Vendre des produits en ligne',
        'Gérer un catalogue de produits',
        'Accepter les paiements en ligne',
        'Gérer les commandes et livraisons',
        'Créer un compte client',
        'Gérer les stocks et inventaire'
      ],
      features: [
        'Catalogue produits illimité',
        'Panier d\'achat et paiement sécurisé',
        'Gestion des commandes',
        'Compte client avec historique',
        'Gestion des stocks',
        'Codes promo et réductions'
      ],
      price: 'Sur devis',
      link: '/site-ecommerce',
      bestFor: 'Vendre des produits ou services en ligne'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: { [key: string]: { bg: string; text: string; border: string; hover: string } } = {
      blue: {
        bg: 'bg-blue-600',
        text: 'text-blue-600',
        border: 'border-blue-600',
        hover: 'hover:bg-blue-700'
      },
      violet: {
        bg: 'bg-violet-600',
        text: 'text-violet-600',
        border: 'border-violet-600',
        hover: 'hover:bg-violet-700'
      },
      green: {
        bg: 'bg-green-600',
        text: 'text-green-600',
        border: 'border-green-600',
        hover: 'hover:bg-green-700'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <section className="py-20 bg-white pt-32" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Nos Services</h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Je crée 3 types de sites web. Chaque type a un objectif précis. Découvrez lequel correspond le mieux à vos besoins.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {siteTypes.map((site, index) => {
            const colors = getColorClasses(site.color);
            return (
              <div key={index} className="bg-white rounded-2xl shadow-xl border-2 border-slate-200 hover:border-slate-300 transition-all duration-300 overflow-hidden">
                <div className={`${colors.bg} text-white p-6 text-center`}>
                  <div className="inline-flex p-4 bg-white/20 rounded-full mb-4">
                    {site.icon}
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{site.name}</h2>
                  <p className="text-white/90">{site.description}</p>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                      <Zap className={`w-5 h-5 ${colors.text} mr-2`} />
                      Idéal pour :
                    </h3>
                    <ul className="space-y-2">
                      {site.useCases.slice(0, 3).map((useCase, idx) => (
                        <li key={idx} className="flex items-start text-slate-600 text-sm">
                          <Check className={`w-4 h-4 ${colors.text} mr-2 mt-0.5 flex-shrink-0`} />
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-semibold text-slate-800 mb-3 flex items-center">
                      <Shield className={`w-5 h-5 ${colors.text} mr-2`} />
                      Fonctionnalités :
                    </h3>
                    <ul className="space-y-2">
                      {site.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start text-slate-600 text-sm">
                          <Check className={`w-4 h-4 ${colors.text} mr-2 mt-0.5 flex-shrink-0`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-t border-slate-200 pt-4 mb-4">
                    <p className="text-sm text-slate-500 mb-2">Prix indicatif :</p>
                    <p className={`text-xl font-bold ${colors.text}`}>{site.price}</p>
                  </div>
                  <button
                    onClick={() => {
                      trackEvent('site_type_click', { type: site.name });
                      navigate(site.link);
                    }}
                    className={`w-full ${colors.bg} ${colors.hover} text-white font-semibold py-3 px-6 rounded-lg transition-all active:scale-95 inline-flex items-center justify-center`}
                  >
                    En savoir plus
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 md:p-12 mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Comment choisir ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {siteTypes.map((site, index) => {
              const colors = getColorClasses(site.color);
              return (
                <div key={index} className="bg-white rounded-xl p-6">
                  <div className={`${colors.bg} text-white p-3 rounded-lg inline-flex mb-4`}>
                    {site.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{site.name}</h3>
                  <p className="text-slate-600">{site.bestFor}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Tous mes sites incluent</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Sécurité Renforcée</h3>
                <p className="text-slate-600 text-sm">Protection contre les attaques, HTTPS, validation des formulaires</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-violet-100 p-3 rounded-lg">
                <Search className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">SEO Optimisé</h3>
                <p className="text-slate-600 text-sm">Référencement naturel, meta tags, structured data</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Performance Maximale</h3>
                <p className="text-slate-600 text-sm">Chargement rapide, optimisé pour mobile</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-2">Design Moderne</h3>
                <p className="text-slate-600 text-sm">Interface élégante et professionnelle</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Vous hésitez entre plusieurs types ?</h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Contactez-moi pour discuter de votre projet. Je vous aiderai à choisir la solution qui correspond le mieux à vos objectifs.
          </p>
          <button
            onClick={() => {
              trackEvent('cta_click', { id: 'types_sites_contact' });
              navigate('/contact');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95 inline-flex items-center"
          >
            Demander un devis gratuit
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TypesDeSites;
