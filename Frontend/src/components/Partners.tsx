import { useEffect, useRef } from 'react';
import { Check, ArrowRight, Code2, Layers, Lock, TrendingUp, Wallet, Wrench, Eye, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

interface TierRowProps {
  range: string;
  unitPrice: string;
  margin: string;
}

const TierRow = ({ range, unitPrice, margin }: TierRowProps) => (
  <tr className="border-t border-slate-200">
    <td className="py-4 px-4 text-slate-700 font-medium">{range}</td>
    <td className="py-4 px-4 text-blue-600 font-bold">{unitPrice}</td>
    <td className="py-4 px-4 text-green-700">{margin}</td>
  </tr>
);

interface PerkProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Perk = ({ icon, title, description }: PerkProps) => (
  <div className="flex items-start gap-4">
    <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-slate-800 mb-1">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  </div>
);

const Partners = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('section_view', { id: 'partners' });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const handleContact = (cta: string) => {
    trackEvent('partners_contact_click', { source: 'partners', cta });
    navigate('/contact');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 pt-32" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Code2 className="w-4 h-4" aria-hidden="true" />
            Programme réservé aux développeurs & agences
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Programme Partenaires Zenix</h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Vous codez des sites pour vos clients. Vous détestez gérer l'ops, les backups, le monitoring, les renouvellements TLS.
            Confiez-nous l'hébergement managé sur infrastructure K3s en France — vous gardez votre marge, vos clients, votre branding.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mb-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Tarifs revendeur (wholesale)</h2>
          <p className="text-slate-600 text-center mb-8">Vous achetez à prix wholesale, vous revendez au prix de votre choix.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="py-3 px-4 text-sm font-semibold text-slate-700">Nombre de sites managés</th>
                  <th className="py-3 px-4 text-sm font-semibold text-slate-700">Prix par site / mois</th>
                  <th className="py-3 px-4 text-sm font-semibold text-slate-700">Marge typique à la revente</th>
                </tr>
              </thead>
              <tbody>
                <TierRow range="1 à 5 sites" unitPrice="20€" margin="+30 à +60€ / site / mois" />
                <TierRow range="6 à 20 sites" unitPrice="17€" margin="+35 à +65€ / site / mois" />
                <TierRow range="21+ sites" unitPrice="14€" margin="sur mesure" />
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-4 text-center">
            Engagement mensuel, facturation unique partenaire. Pas de frais d'entrée. Premier mois offert sur le premier site.
            <br />
            TVA non applicable, art. 293 B du CGI : le prix affiché est le prix facturé, sans TVA à récupérer de votre côté.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mb-16 grid md:grid-cols-2 gap-8">
          <Perk
            icon={<Server className="w-6 h-6 text-blue-600" aria-hidden="true" />}
            title="On gère le boring stuff"
            description="K3s, monitoring, backups quotidiens off-site, TLS auto, scaling, healing, mises à jour OS et runtimes. Vous codez, on opère."
          />
          <Perk
            icon={<Eye className="w-6 h-6 text-blue-600" aria-hidden="true" />}
            title="White-label disponible"
            description="Rapports trimestriels Umami à votre marque, sous-domaines neutres possibles. Votre client ne voit que vous."
          />
          <Perk
            icon={<Wallet className="w-6 h-6 text-blue-600" aria-hidden="true" />}
            title="Marge récurrente, pas de commission"
            description="Vous achetez en wholesale et facturez ce que vous voulez à votre client. MRR passive sans capter une commission une seule fois."
          />
          <Perk
            icon={<Lock className="w-6 h-6 text-blue-600" aria-hidden="true" />}
            title="Souveraineté & RGPD"
            description="Datacenters en France. Données et sauvegardes hébergées en UE. Aucune dépendance hyperscaler US."
          />
          <Perk
            icon={<Layers className="w-6 h-6 text-blue-600" aria-hidden="true" />}
            title="Stack agnostique"
            description="Sites statiques, Next.js, Astro, Nuxt, WordPress managé, Webflow exporté, Strapi, Directus, applis Docker custom — on déploie."
          />
          <Perk
            icon={<Wrench className="w-6 h-6 text-blue-600" aria-hidden="true" />}
            title="Support technicien à technicien"
            description="Un seul interlocuteur tech côté Zenix. Pas de ticket niveau 1, pas de script. Vous écrivez technique, je réponds technique."
          />
        </div>

        <div className="max-w-5xl mx-auto mb-16 bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Ce qui est inclus dans chaque site managé</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-start"><Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" /><span className="text-slate-700">Cluster K3s redondant, auto-scaling et auto-healing</span></li>
              <li className="flex items-start"><Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" /><span className="text-slate-700">Sauvegardes quotidiennes chiffrées (rétention 30 jours)</span></li>
              <li className="flex items-start"><Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" /><span className="text-slate-700">Certificats TLS automatiques (Let's Encrypt)</span></li>
              <li className="flex items-start"><Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" /><span className="text-slate-700">WAF Cloudflare et protection anti-DDoS</span></li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start"><Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" /><span className="text-slate-700">Monitoring uptime et alertes</span></li>
              <li className="flex items-start"><Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" /><span className="text-slate-700">Analytics Umami sans cookie (RGPD-friendly)</span></li>
              <li className="flex items-start"><Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" /><span className="text-slate-700">Staging environment à la demande</span></li>
              <li className="flex items-start"><Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" aria-hidden="true" /><span className="text-slate-700">Restauration en quelques minutes en cas d'incident</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Comment ça marche</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3">1</div>
              <h3 className="font-semibold text-slate-800 mb-2">Premier contact</h3>
              <p className="text-sm text-slate-600">On échange 20 minutes pour comprendre votre stack, vos clients, vos contraintes.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3">2</div>
              <h3 className="font-semibold text-slate-800 mb-2">Accord & onboarding</h3>
              <p className="text-sm text-slate-600">Accord partenaire signé, accès à l'infra. Premier site offert pour valider.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3">3</div>
              <h3 className="font-semibold text-slate-800 mb-2">Déploiement</h3>
              <p className="text-sm text-slate-600">Vous m'envoyez le repo ou les fichiers, je déploie sous 24h ouvrées.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mx-auto mb-3">4</div>
              <h3 className="font-semibold text-slate-800 mb-2">Marge passive</h3>
              <p className="text-sm text-slate-600">Vous facturez votre client à votre prix. Je vous facture mensuellement le pack global.</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mb-16 bg-blue-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Questions fréquentes des partenaires</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Qui parle au client final ?</h3>
              <p className="text-slate-600">
                Vous. Je suis transparent pour votre client. Vous restez son interlocuteur unique, je suis votre prestataire infra côté coulisses.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Qui facture le client final ?</h3>
              <p className="text-slate-600">
                Vous. Je vous facture un pack global mensuel selon le nombre de sites. Vous facturez votre client au tarif que vous décidez.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Que se passe-t-il si je perds un client ?</h3>
              <p className="text-slate-600">
                Vous baissez simplement votre nombre de sites le mois suivant. Aucun engagement par site, aucun frais de sortie.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Quels frameworks sont supportés ?</h3>
              <p className="text-slate-600">
                Tout ce qui s'emballe en Docker ou s'exporte en statique. Next.js, Astro, Nuxt, SvelteKit, WordPress, Strapi, applis custom. Si on peut le builder, on peut l'héberger.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Le client peut-il accéder lui-même au site (CMS, admin) ?</h3>
              <p className="text-slate-600">
                Oui. Vous configurez les accès comme vous voulez. Je n'interagis pas avec votre client sauf demande explicite.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Et si j'apporte 30 sites d'un coup ?</h3>
              <p className="text-slate-600">
                On passe en pricing négocié sur mesure. Contactez-moi pour qu'on en discute, je peux aller plus bas que 14€/site sur volume.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-white text-center shadow-2xl">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-90" aria-hidden="true" />
          <h2 className="text-3xl font-bold mb-4">Devenez partenaire Zenix</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Échangeons 20 minutes. Si l'offre vous convient, votre premier site est offert pour valider la qualité avant que vous engagiez un client.
          </p>
          <button
            onClick={() => handleContact('devenir_partenaire')}
            className="bg-white text-blue-700 hover:bg-blue-50 font-semibold py-3 px-8 rounded-full transition-all shadow-lg active:scale-95 inline-flex items-center"
          >
            Démarrer la conversation
            <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Partners;
