import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ArrowRight, Server, Globe, Wrench, Shield, CreditCard, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

interface QAItem {
  q: string;
  a: string;
}

interface FaqCategoryProps {
  icon: React.ReactNode;
  title: string;
  items: QAItem[];
  id: string;
}

const FaqCategory = ({ icon, title, items, id }: FaqCategoryProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8" aria-labelledby={`faq-${id}`}>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-2.5 rounded-lg">{icon}</div>
        <h2 id={`faq-${id}`} className="text-2xl font-bold text-slate-800">{title}</h2>
      </div>
      <div className="space-y-2">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border-b border-slate-100 last:border-0">
              <button
                onClick={() => {
                  setOpenIndex(isOpen ? null : index);
                  if (!isOpen) {
                    trackEvent('faq_question_open', { category: id, question: item.q });
                  }
                }}
                className="w-full flex items-start justify-between gap-4 py-4 text-left hover:text-blue-600 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-base font-semibold text-slate-800 group-hover:text-blue-600">
                  {item.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 flex-shrink-0 mt-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {isOpen && (
                <div className="pb-4 text-slate-600 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('section_view', { id: 'faq' });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  // Ces réponses sont reprises mot pour mot dans `faqPageSchema`
  // (src/utils/structuredData.ts). Google exige que le contenu d'un FAQPage
  // soit visible à l'identique sur la page : toute modification ici doit être
  // reportée là-bas, et inversement.
  const general: QAItem[] = [
    {
      q: "Qui se cache derrière Zenix ?",
      a: "Zenix est portée par Enzo Monnet Mata, développeur web indépendant établi en Beaujolais, étudiant en cybersécurité à Guardia. Vous traitez directement avec moi, pas un commercial intermédiaire.",
    },
    {
      q: "Où êtes-vous basé ?",
      a: "À Saint-Georges-de-Reneins, en Beaujolais, entre Villefranche-sur-Saône et Lyon. J'interviens dans tout le Rhône et, à distance, partout en France. Les serveurs sont eux aussi situés en France.",
    },
    {
      q: "Travaillez-vous avec des clients en dehors du Beaujolais ?",
      a: "Oui, partout en France et en Europe francophone. Les échanges se font par visioconférence, téléphone et email. Pas besoin de se déplacer.",
    },
    {
      q: "Combien de temps pour mettre en ligne un site ?",
      a: "Une landing page simple : 5 à 10 jours. Un site vitrine : 2 à 4 semaines. Un e-commerce : 4 à 8 semaines. Le délai dépend de la rapidité avec laquelle vous fournissez les contenus (textes, photos, logo).",
    },
  ];

  const sites: QAItem[] = [
    {
      q: "Quels types de sites créez-vous ?",
      a: "Trois grandes catégories : landing pages (page unique pour convertir), sites vitrine (présenter une entreprise), et sites e-commerce (vendre en ligne). Les détails sont sur la page Nos Services.",
    },
    {
      q: "Quelle technologie utilisez-vous ?",
      a: "React, TypeScript, Tailwind CSS et Vite pour les sites modernes. Pour les sites avec administration côté client, WordPress reste une option valide. Le choix dépend de vos besoins, pas d'une religion technique.",
    },
    {
      q: "Mon site sera-t-il responsive (mobile / tablette) ?",
      a: "Oui, sans exception. Tous les sites livrés sont testés sur mobile, tablette et desktop. Plus de 65% du trafic vient désormais du mobile, le design est pensé mobile-first.",
    },
    {
      q: "Vais-je pouvoir modifier mon site moi-même ?",
      a: "Cela dépend du type de site. Sur un site vitrine sur mesure, les modifications passent par moi via une offre d'hébergement. Sur un WordPress, vous pouvez modifier vous-même. On en discute ensemble selon vos besoins.",
    },
    {
      q: "Le SEO est-il inclus à la création ?",
      a: "Oui : balises meta, données structurées JSON-LD, sitemap, robots.txt, optimisation des images, Core Web Vitals. Le référencement long terme demande un travail continu, proposé dans Zenix Pro.",
    },
    {
      q: "Vous reprenez un site existant pour le refaire ?",
      a: "Oui. Audit gratuit pour évaluer l'état actuel, puis devis selon l'ampleur de la refonte ou de la migration.",
    },
  ];

  const hebergement: QAItem[] = [
    {
      q: "Pourquoi héberger chez Zenix plutôt que chez un gros hébergeur ?",
      a: "Vous avez un interlocuteur unique, technicien, qui connaît votre site. Pas de hotline, pas de ticket niveau 1. Infrastructure K3s redondante, données en France, sauvegardes off-site, et chaque incident est géré personnellement.",
    },
    {
      q: "C'est quoi K3s, concrètement ?",
      a: "C'est un cluster Kubernetes léger. Concrètement : votre site tourne sur plusieurs serveurs en même temps. Si l'un tombe, les autres prennent le relais sans coupure visible. Cela offre une disponibilité bien supérieure à un hébergement mutualisé classique.",
    },
    {
      q: "C'est quoi une 'petite modification' ?",
      a: "Changer un texte, remplacer une image, modifier un prix, une adresse, des horaires, ajouter une photo dans une galerie. Tout ce qui prend moins de 15 minutes.",
    },
    {
      q: "C'est quoi une 'grosse modification' ?",
      a: "Ajouter une nouvelle page complète, créer une fonctionnalité (formulaire avancé, espace membre, système de réservation), ou refondre une section du design. Cela nécessite un devis.",
    },
    {
      q: "Combien de temps pour appliquer une modification ?",
      a: "Petites modifications : sous 24 à 48 heures ouvrées. Grosses modifications : selon devis et complexité, généralement sous une à deux semaines.",
    },
    {
      q: "Mon site est hébergé ailleurs, vous le migrez ?",
      a: "Oui. La migration depuis Wix, Squarespace, OVH, o2switch, WordPress ou autre est proposée en option à 69€ une fois. Aucune interruption visible pour vos visiteurs : le nouveau site est testé, puis le DNS est basculé.",
    },
    {
      q: "Vous gérez le nom de domaine ?",
      a: "Vous gardez la main sur votre nom de domaine chez le registrar de votre choix (OVH, Gandi, etc.). Je vous fournis les enregistrements DNS exacts à appliquer pour pointer vers Zenix, et je suis dispo si vous avez besoin d'aide pour les appliquer.",
    },
    {
      q: "Que se passe-t-il si mon site a un problème ?",
      a: "L'infrastructure se répare automatiquement pour la majorité des incidents. Si l'incident est plus grave, je suis alerté en temps réel et j'interviens. En dernier recours, restauration depuis sauvegarde quotidienne sous quelques minutes.",
    },
    {
      q: "Puis-je changer d'offre plus tard ?",
      a: "Oui, à tout moment, sans frais. La nouvelle formule s'applique dès le mois suivant.",
    },
  ];

  const securite: QAItem[] = [
    {
      q: "Comment mon site est-il protégé contre les attaques ?",
      a: "WAF Cloudflare, protection anti-DDoS, headers de sécurité stricts (CSP, HSTS, X-Frame-Options), HTTPS obligatoire, validation et nettoyage des entrées, isolation par conteneurs. Aucun panneau d'admin n'est exposé publiquement sans authentification forte.",
    },
    {
      q: "Mes sauvegardes sont-elles à jour ?",
      a: "Oui. Sauvegarde complète quotidienne, conservée 30 jours et répliquée sur mes serveurs dans deux lieux différents. Vérification automatique de l'intégrité. En option, une copie supplémentaire peut être stockée en dehors de mon infrastructure, chez un hébergeur tiers.",
    },
    {
      q: "Si mon site est piraté, vous le restaurez ?",
      a: "Oui. Restauration depuis la dernière sauvegarde saine en quelques minutes. Puis analyse de la cause, correction et durcissement.",
    },
    {
      q: "Mes données sont-elles bien en Europe ?",
      a: "Vos données et celles de vos visiteurs sont hébergées sur nos serveurs en France, et les sauvegardes restent dans l'Union européenne. Une seule exception, que nous préférons annoncer : le trafic transite par Cloudflare, société américaine, qui assure la protection anti-DDoS et le pare-feu. Le détail figure dans notre politique de confidentialité.",
    },
    {
      q: "Vos analytics sont-elles RGPD ?",
      a: "Oui. Umami self-hosted, sans cookie, sans tracking individuel. Pas de bandeau de consentement requis pour les statistiques de visite anonymes.",
    },
  ];

  const tarifs: QAItem[] = [
    {
      q: "Les prix affichés sont-ils HT ou TTC ?",
      a: "Ni l'un ni l'autre : le prix affiché est le prix que vous payez. Zenix est une micro-entreprise en franchise de TVA (article 293 B du CGI), donc aucune TVA n'est facturée ni ajoutée. Corollaire pour les entreprises assujetties : il n'y a pas de TVA à récupérer sur mes factures.",
    },
    {
      q: "Y a-t-il un engagement de durée ?",
      a: "Par défaut non : les offres d'hébergement sont mensuelles, sans durée minimale, résiliables avec un préavis d'un mois. Il existe aussi une option volontaire d'engagement sur 12 mois qui vous offre le 12ᵉ mois, toujours prélevée mois par mois. Vous choisissez, l'engagement n'est jamais imposé.",
    },
    {
      q: "Quels moyens de paiement acceptez-vous ?",
      a: "Virement SEPA, prélèvement automatique, carte bancaire via Stripe. Le prélèvement reste mensuel dans tous les cas : si vous optez pour l'engagement 12 mois, vous n'avancez rien, le 12ᵉ mois est simplement offert.",
    },
    {
      q: "Que se passe-t-il si je résilie ?",
      a: "Vous récupérez vos données complètes : code source, base de données, contenus, sauvegardes. Aucune rétention. Je peux aussi vous aider à migrer vers un autre hébergeur.",
    },
    {
      q: "Faites-vous des réductions ?",
      a: "Pas de promo agressive. En revanche, l'engagement annuel donne droit à un mois offert. Et le programme partenaires propose des tarifs wholesale pour les devs et agences qui apportent plusieurs sites.",
    },
  ];

  const dev: QAItem[] = [
    {
      q: "Je suis développeur, puis-je revendre votre hébergement à mes clients ?",
      a: "Oui, c'est exactement ce qu'est le programme partenaires. Tarifs wholesale dégressifs, white-label possible, vous gardez la relation client. Plus de détails sur la page Partenaires.",
    },
    {
      q: "Quelles stacks supportez-vous ?",
      a: "Tout ce qui s'emballe en Docker ou s'exporte en statique : Next.js, Astro, Nuxt, SvelteKit, Remix, WordPress managé, Strapi, Directus, Ghost, applications Node/Python/Go, etc.",
    },
    {
      q: "Puis-je accéder en SSH au serveur ?",
      a: "Pas directement au cluster pour des raisons de sécurité. En revanche, vous gardez l'accès complet à votre repo Git, à votre CMS et aux logs applicatifs. Tout ce dont un dev a besoin pour itérer.",
    },
    {
      q: "Vous gérez le déploiement continu (CI/CD) ?",
      a: "Oui. Webhook depuis GitHub/GitLab, build automatique, déploiement après tests. Configuration faite ensemble lors de l'onboarding partenaire.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 pt-32" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Foire aux questions</h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Toutes les questions fréquentes sur Zenix : création de sites, hébergement, sécurité, tarifs et programme partenaires.
            Une question manquante ?{' '}
            <Link to="/contact" className="text-blue-600 hover:underline font-medium">contactez-moi</Link>.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <FaqCategory
            id="general"
            title="Général"
            icon={<Globe className="w-5 h-5 text-blue-600" aria-hidden="true" />}
            items={general}
          />
          <FaqCategory
            id="sites"
            title="Création de sites"
            icon={<Code2 className="w-5 h-5 text-blue-600" aria-hidden="true" />}
            items={sites}
          />
          <FaqCategory
            id="hebergement"
            title="Hébergement & maintenance"
            icon={<Server className="w-5 h-5 text-blue-600" aria-hidden="true" />}
            items={hebergement}
          />
          <FaqCategory
            id="securite"
            title="Sécurité & RGPD"
            icon={<Shield className="w-5 h-5 text-blue-600" aria-hidden="true" />}
            items={securite}
          />
          <FaqCategory
            id="tarifs"
            title="Tarifs & facturation"
            icon={<CreditCard className="w-5 h-5 text-blue-600" aria-hidden="true" />}
            items={tarifs}
          />
          <FaqCategory
            id="dev"
            title="Pour les développeurs"
            icon={<Wrench className="w-5 h-5 text-blue-600" aria-hidden="true" />}
            items={dev}
          />
        </div>

        <div className="text-center mt-12">
          <Link
            to="/contact"
            onClick={() => trackEvent('contact_click', { source: 'faq', cta: 'pose_question' })}
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-lg active:scale-95"
          >
            Poser une autre question
            <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
