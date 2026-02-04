import React, { useEffect, useRef } from 'react';
import { Check, Server, Shield, Zap, BarChart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
  delayValue: string;
}

const PricingCard = ({ name, price, description, features, highlight = false, delayValue }: PricingCardProps) => {
  const navigate = useNavigate();
  const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
    try {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, params || {});
      }
    } catch { /* gtag not available */ }
  };

  return (
    <div 
      className={`bg-white rounded-2xl shadow-xl p-8 transition-all hover:shadow-2xl duration-300 flex flex-col ${
        highlight ? 'ring-4 ring-blue-600 scale-105' : ''
      }`}
      data-animate="false"
      data-delay={delayValue}
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{name}</h3>
        <p className="text-slate-600 mb-4">{description}</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-blue-600">{price}</span>
          <span className="text-slate-600 ml-2">/ mois</span>
        </div>
      </div>
      <ul className="space-y-4 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-slate-700">{feature}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          trackEvent('hosting_plan_click', { plan: name });
          navigate('/contact');
        }}
        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all mt-auto ${
          highlight
            ? 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
            : 'bg-slate-100 text-slate-800 hover:bg-slate-200 active:scale-95'
        }`}
      >
        Choisir {name}
        <ArrowRight className="w-5 h-5 inline-block ml-2" />
      </button>
    </div>
  );
};

const Hosting = () => {
  const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
    try {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, params || {});
      }
    } catch { /* gtag not available */ }
  };

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll('[data-animate="false"]');
            animatedElements.forEach((animEl) => {
              animEl.setAttribute('data-animate', 'true');
            });
            trackEvent('section_view', { id: 'hosting' });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const plans = [
    {
      name: 'Zenix Start',
      price: '25€',
      description: 'La base solide pour votre présence en ligne.',
      features: [
        'Votre site est hébergé sur une infrastructure professionnelle qui s\'adapte automatiquement au trafic (plus de visiteurs = plus de puissance) et se répare tout seul en cas de problème technique',
        'Protection complète contre les attaques et sauvegarde automatique de votre site tous les jours sur un serveur séparé (même en cas de panne, vos données sont sauvegardées)',
        'Petites modifications : Changer un texte, remplacer une image ou modifier un prix = 5€ par modification',
        'Grosses modifications : Ajouter une nouvelle page ou une fonctionnalité = Sur devis selon vos besoins'
      ],
      highlight: false,
      delayValue: '200'
    },
    {
      name: 'Zenix Relax',
      price: '40€',
      description: 'Le confort pour faire vivre votre site sans compter.',
      features: [
        'Tout ce qui est inclus dans Zenix Start (infrastructure professionnelle, sécurité et sauvegardes)',
        'Jusqu\'à 5 petites modifications par mois incluses dans le prix (changer un texte, une image, un prix, etc.)',
        'Tous les 3 mois, vous recevez un rapport simple qui vous montre si votre site fonctionne bien et combien de personnes l\'ont visité',
        'Pour les grosses modifications (nouvelle page, nouvelle fonctionnalité), vous bénéficiez d\'un tarif préférentiel'
      ],
      highlight: true,
      delayValue: '400'
    },
    {
      name: 'Zenix Pro',
      price: '80€',
      description: 'Le pilotage complet de votre visibilité.',
      features: [
        'Tout ce qui est inclus dans Zenix Start (infrastructure professionnelle, sécurité et sauvegardes)',
        'Modifications illimitées de votre site (dans la limite de 2 heures de travail par mois)',
        'Chaque mois, vous recevez un rapport détaillé avec vos statistiques de visiteurs et votre position sur Google',
        'Optimisation continue : J\'améliore régulièrement votre site pour qu\'il soit mieux positionné sur Google et attire plus de visiteurs'
      ],
      highlight: false,
      delayValue: '600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 pt-32" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Offres d'Hébergement & Maintenance</h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Des solutions d'hébergement haute performance avec sécurité renforcée et maintenance incluse. 
            Choisissez l'offre qui correspond à vos besoins.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              price={plan.price}
              description={plan.description}
              features={plan.features}
              highlight={plan.highlight}
              delayValue={plan.delayValue}
            />
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Pourquoi choisir nos offres d'hébergement ?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Server className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Infrastructure Professionnelle</h3>
                <p className="text-slate-600">
                  Votre site est hébergé sur une infrastructure moderne qui s'adapte automatiquement : si vous avez beaucoup de visiteurs, le site devient plus puissant. Si un problème survient, le système se répare tout seul. Votre site reste accessible 24/7.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-violet-100 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Sécurité Maximale</h3>
                <p className="text-slate-600">
                  Protection complète contre les attaques informatiques, les virus et les tentatives de piratage. Votre site est aussi plus rapide grâce à un système qui met en cache vos pages dans le monde entier.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Sauvegarde Quotidienne</h3>
                <p className="text-slate-600">
                  Chaque jour, une copie complète de votre site est automatiquement sauvegardée sur un serveur séparé. En cas de problème (panne, erreur, piratage), je peux restaurer votre site en quelques minutes. Vos données sont toujours protégées.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-lg">
                <BarChart className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Suivi & Rapports</h3>
                <p className="text-slate-600">
                  Vous savez toujours comment va votre site : combien de visiteurs, d'où ils viennent, si le site fonctionne bien. Des rapports réguliers vous permettent de suivre l'évolution de votre présence en ligne.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Questions fréquentes</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">C'est quoi une "petite modification" ?</h3>
              <p className="text-slate-600">
                Une petite modification, c'est changer un texte, remplacer une image, modifier un prix ou une adresse, ajouter une photo dans une galerie. C'est une modification simple qui prend moins de 15 minutes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">C'est quoi une "grosse modification" ?</h3>
              <p className="text-slate-600">
                Une grosse modification, c'est ajouter une nouvelle page complète, créer une nouvelle fonctionnalité (comme un formulaire de contact, un système de réservation), ou faire des changements importants dans le design. Cela nécessite plus de temps et de réflexion.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Que se passe-t-il si mon site a un problème ?</h3>
              <p className="text-slate-600">
                Avec notre infrastructure, votre site se répare automatiquement en cas de problème technique. Si c'est plus grave, je suis alerté et j'interviens rapidement. Grâce aux sauvegardes quotidiennes, je peux restaurer votre site en quelques minutes si nécessaire.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Puis-je changer d'offre plus tard ?</h3>
              <p className="text-slate-600">
                Oui, absolument ! Vous pouvez passer d'une offre à l'autre à tout moment selon vos besoins. Si vous commencez avec Zenix Start et que vous avez besoin de plus de modifications, vous pouvez passer à Zenix Relax ou Zenix Pro.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => {
              trackEvent('cta_click', { id: 'hosting_contact' });
              window.location.href = '/contact';
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
          >
            Demander un devis personnalisé
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hosting;
