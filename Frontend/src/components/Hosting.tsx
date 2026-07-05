import { useEffect, useRef } from 'react';
import { Check, Server, Shield, Zap, BarChart, ArrowRight, MapPin, Activity, Database, FileSearch, RotateCcw, GraduationCap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

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
        <div className="mb-2">
          <span className="text-4xl font-bold text-blue-600">{price}</span>
          <span className="text-slate-600 ml-2">HT / mois</span>
        </div>
        <p className="text-xs text-slate-500">Engagement mensuel sans durée minimale</p>
        <p className="text-xs font-semibold text-green-700 mt-1">
          Ou engagement 1 an : le 12ᵉ mois est offert — toujours prélevé mois par mois, rien à avancer
        </p>
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
          trackEvent('contact_click', { source: 'hosting', cta: 'choisir_plan', plan: name });
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

interface AddOnRowProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  price: string;
}

const AddOnRow = ({ icon, name, description, price }: AddOnRowProps) => (
  <div className="flex items-start justify-between gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
    <div className="flex items-start gap-4">
      <div className="bg-blue-50 p-2 rounded-lg flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-slate-800">{name}</h4>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
    <div className="text-right flex-shrink-0">
      <span className="font-bold text-blue-600">{price}</span>
    </div>
  </div>
);

const Hosting = () => {
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
      price: '39€',
      description: 'La base solide pour votre présence en ligne.',
      features: [
        'Infrastructure professionnelle hébergée en France, qui s\'adapte automatiquement au trafic et se répare seule en cas de problème technique',
        'Protection complète contre les attaques et sauvegarde automatique de votre site tous les jours sur un serveur séparé',
        '2 petites modifications par mois incluses (texte, image, prix, horaires, etc.)',
        'Petites modifications supplémentaires : 15€ chacune. Grosses modifications (nouvelle page, fonctionnalité) : sur devis'
      ],
      highlight: false,
      delayValue: '200'
    },
    {
      name: 'Zenix Relax',
      price: '69€',
      description: 'Le confort pour faire vivre votre site sans compter.',
      features: [
        'Tout ce qui est inclus dans Zenix Start (infrastructure, sécurité, sauvegardes)',
        'Jusqu\'à 6 petites modifications par mois incluses dans le prix',
        'Tous les 3 mois, vous recevez un rapport simple qui vous montre comment votre site fonctionne et combien de personnes l\'ont visité',
        'Pour les grosses modifications (nouvelle page, fonctionnalité), tarif préférentiel'
      ],
      highlight: true,
      delayValue: '400'
    },
    {
      name: 'Zenix Pro',
      price: '149€',
      description: 'Le pilotage complet de votre site.',
      features: [
        'Tout ce qui est inclus dans Zenix Relax (infrastructure, sécurité, sauvegardes, rapport)',
        'Modifications illimitées de votre site (dans la limite de 2 heures de travail par mois)',
        'Chaque mois, vous recevez un rapport détaillé avec vos statistiques de visiteurs et la santé technique de votre site',
        'Optimisations techniques SEO continues : performance, balises, Core Web Vitals, données structurées'
      ],
      highlight: false,
      delayValue: '600'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 pt-32" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Offres d'Hébergement & Maintenance</h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Des solutions d'hébergement haute performance avec sécurité renforcée et maintenance incluse.
            Choisissez l'offre qui correspond à vos besoins.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
            <MapPin className="w-4 h-4 text-blue-600" aria-hidden="true" />
            <span className="text-sm font-medium text-slate-700">Hébergé en France &mdash; données souveraines RGPD</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
            <Activity className="w-4 h-4 text-green-600" aria-hidden="true" />
            <span className="text-sm font-medium text-slate-700">99,9% de disponibilité visée</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
            <Shield className="w-4 h-4 text-violet-600" aria-hidden="true" />
            <span className="text-sm font-medium text-slate-700">Sauvegardes quotidiennes chiffrées</span>
          </div>
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
          <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">Options à la carte</h2>
          <p className="text-slate-600 text-center mb-8">À ajouter à n'importe quelle formule selon vos besoins.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <AddOnRow
              icon={<RotateCcw className="w-5 h-5 text-blue-600" aria-hidden="true" />}
              name="Migration de site existant"
              description="Vous avez déjà un site chez OVH, Wix, Squarespace, WordPress.com ou autre ? Je rapatrie l'ensemble (fichiers, base de données, configuration) vers Zenix, puis je bascule le nom de domaine sans interruption visible pour vos visiteurs."
              price="99€ une fois"
            />
            <AddOnRow
              icon={<Database className="w-5 h-5 text-blue-600" aria-hidden="true" />}
              name="Sauvegardes géo-redondantes"
              description="En plus des sauvegardes quotidiennes incluses, une copie supplémentaire est stockée dans un second datacenter géographiquement séparé. Vous restez protégé même en cas d'incident majeur sur le site principal."
              price="+10€/mois"
            />
            <AddOnRow
              icon={<Activity className="w-5 h-5 text-blue-600" aria-hidden="true" />}
              name="Monitoring & alertes"
              description="Surveillance continue 24/7 avec notifications dès qu'une page met plus de quelques secondes à répondre ou tombe."
              price="+10€/mois"
            />
            <AddOnRow
              icon={<FileSearch className="w-5 h-5 text-blue-600" aria-hidden="true" />}
              name="Audit performance"
              description="Analyse Lighthouse complète + plan d'optimisation, livré en PDF. Vous repartez avec des actions concrètes priorisées."
              price="79€ une fois"
            />
            <AddOnRow
              icon={<GraduationCap className="w-5 h-5 text-blue-600" aria-hidden="true" />}
              name="Scan sécurité mensuel"
              description="Audit réalisé par un étudiant en cybersécurité à Guardia (école spécialisée). Détection de vulnérabilités, audit des en-têtes HTTP, scan des dépendances, tests d'intrusion ciblés. Rapport clair avec actions correctives."
              price="+20€/mois"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-5xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Pourquoi choisir nos offres d'hébergement ?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Server className="w-6 h-6 text-blue-600" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Infrastructure Professionnelle</h3>
                <p className="text-slate-600">
                  Votre site est hébergé sur une infrastructure moderne qui s'adapte automatiquement : plus de visiteurs, plus de puissance. Si un problème survient, le système se répare seul. Disponibilité 24/7.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-violet-100 p-3 rounded-lg">
                <Shield className="w-6 h-6 text-violet-600" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Sécurité Maximale</h3>
                <p className="text-slate-600">
                  Protection contre les attaques, les bots et les tentatives de piratage. Votre site est aussi plus rapide grâce à un système qui met en cache vos pages partout dans le monde.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Zap className="w-6 h-6 text-green-600" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Sauvegarde Quotidienne</h3>
                <p className="text-slate-600">
                  Chaque jour, une copie complète de votre site est sauvegardée automatiquement sur un serveur séparé. En cas de problème, je peux restaurer votre site en quelques minutes.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-amber-100 p-3 rounded-lg">
                <BarChart className="w-6 h-6 text-amber-600" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Suivi & Rapports</h3>
                <p className="text-slate-600">
                  Vous savez toujours comment va votre site : visiteurs, performances, incidents. Des rapports clairs vous permettent de suivre l'évolution de votre présence en ligne.
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
                Changer un texte, remplacer une image, modifier un prix, une adresse, des horaires, ajouter une photo dans une galerie. Une modification simple qui prend moins de 15 minutes.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">C'est quoi une "grosse modification" ?</h3>
              <p className="text-slate-600">
                Ajouter une nouvelle page complète, créer une nouvelle fonctionnalité (formulaire avancé, système de réservation), ou refondre une section du design. Cela nécessite plus de temps et de réflexion, donc un devis.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Vous reprenez mon site déjà existant ?</h3>
              <p className="text-slate-600">
                Oui. La migration depuis Wix, Squarespace, WordPress ou tout autre hébergeur est proposée en option à 99€ une fois, sans interruption visible pour vos visiteurs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Puis-je changer d'offre plus tard ?</h3>
              <p className="text-slate-600">
                Oui, vous pouvez passer d'une offre à l'autre à tout moment, sans frais. La nouvelle formule s'applique dès le mois suivant.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              to="/faq"
              onClick={() => trackEvent('faq_click', { source: 'hosting' })}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              Voir toutes les questions fréquentes
              <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => {
              trackEvent('contact_click', { source: 'hosting', cta: 'me_contacter' });
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
