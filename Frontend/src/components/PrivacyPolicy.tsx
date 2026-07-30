import { useNavigate } from 'react-router-dom';
const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-white pt-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Politique de Confidentialité</h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600">
            Protection de vos données personnelles - RGPD
          </p>
        </div>
        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Responsable du traitement</h2>
            <div className="space-y-3 text-slate-700">
              <p><strong>Nom :</strong> Enzo Monnet-Mata</p>
              <p><strong>Adresse :</strong> 545 chemin des Vignerons, 69830 Saint-Georges-de-Reneins, France</p>
              <p><strong>SIRET :</strong> 991 413 600 00016</p>
              <p><strong>Email :</strong> contact@zenixweb.fr</p>
              <p><strong>Statut :</strong> Entrepreneur Individuel (Micro-Entrepreneur), exerçant sous l'enseigne Zenix Web</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Données collectées</h2>
            <div className="space-y-4 text-slate-700">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Via le formulaire de contact :</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Nom complet</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone (optionnel)</li>
                  <li>Type de projet</li>
                  <li>Budget estimé</li>
                  <li>Délai souhaité</li>
                  <li>Message détaillé</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Mesure d'audience (Umami) :</h3>
                <p className="mb-2">
                  La fréquentation du site est mesurée avec <strong>Umami</strong>, une solution auto-hébergée sur nos serveurs en France.
                  Aucun cookie n'est déposé et aucune donnée n'est transmise à un tiers. Les informations suivantes sont traitées
                  sous forme <strong>agrégée et anonyme</strong> :
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Pages visitées et durée de consultation</li>
                  <li>Type de navigateur, système d'exploitation et type d'appareil</li>
                  <li>Pays de provenance et site référent</li>
                  <li>Adresse IP : utilisée uniquement en mémoire pour générer un identifiant de visite anonyme, puis <strong>immédiatement écartée</strong> — elle n'est jamais enregistrée</li>
                </ul>
                <p className="mt-2">
                  Ces données ne permettent ni de vous identifier, ni de vous suivre d'un site à l'autre.
                  Base légale : intérêt légitime (article 6.1.f du RGPD) à mesurer la fréquentation de notre site.
                  Ce traitement étant strictement anonyme et sans cookie, il ne nécessite pas votre consentement préalable.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Journaux techniques :</h3>
                <p>
                  Nos serveurs conservent des journaux de connexion (adresse IP, date, ressource demandée) à des fins de
                  sécurité et de diagnostic, ainsi qu'au titre de nos obligations légales d'hébergeur (article 6 de la LCEN).
                </p>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Finalités du traitement</h2>
            <div className="space-y-3 text-slate-700">
              <p>Vos données personnelles sont collectées et traitées pour :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Répondre à vos demandes de devis et de contact</li>
                <li>Établir des propositions commerciales personnalisées</li>
                <li>Assurer le suivi de nos échanges</li>
                <li>Améliorer la qualité de nos services</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Base légale</h2>
            <div className="space-y-3 text-slate-700">
              <p>Le traitement de vos données personnelles est basé sur :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Votre consentement</strong> : pour l'envoi de communications commerciales</li>
                <li><strong>L'exécution d'un contrat</strong> : pour la réalisation des services demandés</li>
                <li><strong>L'intérêt légitime</strong> : pour l'amélioration de nos services</li>
              </ul>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Durée de conservation</h2>
            <div className="space-y-3 text-slate-700">
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Données de contact :</strong> 3 ans après le dernier échange</li>
                <li><strong>Données contractuelles :</strong> 5 ans après la fin du contrat</li>
                <li><strong>Statistiques de fréquentation (anonymes) :</strong> 13 mois maximum</li>
                <li><strong>Journaux de connexion :</strong> 12 mois (obligation légale d'hébergeur, LCEN)</li>
              </ul>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Destinataires des données</h2>
            <div className="space-y-3 text-slate-700">
              <p>Vos données personnelles sont accessibles uniquement à :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Enzo Monnet-Mata (responsable du traitement)</li>
                <li>Les prestataires techniques (hébergement, maintenance)</li>
                <li>Les autorités compétentes si requis par la loi</li>
              </ul>
              <p className="mt-4">
                <strong>Important :</strong> Vos données ne sont jamais vendues, louées ou transmises 
                à des tiers à des fins commerciales.
              </p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Vos droits</h2>
            <div className="space-y-3 text-slate-700">
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
                <li><strong>Droit d'effacement :</strong> supprimer vos données</li>
                <li><strong>Droit à la limitation :</strong> restreindre le traitement</li>
                <li><strong>Droit à la portabilité :</strong> récupérer vos données</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
                <li><strong>Droit de retrait du consentement :</strong> à tout moment</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à : 
                <a href="mailto:contact@zenixweb.fr" className="text-blue-600 hover:underline">
                  contact@zenixweb.fr
                </a>
              </p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Sécurité des données</h2>
            <div className="space-y-3 text-slate-700">
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour 
                protéger vos données personnelles contre :
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>L'accès non autorisé</li>
                <li>La divulgation accidentelle</li>
                <li>La modification non autorisée</li>
                <li>La destruction ou la perte</li>
              </ul>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Cookies et technologies similaires</h2>
            <div className="space-y-3 text-slate-700">
              <p>
                Ce site ne dépose <strong>aucun cookie</strong> de tracking, de publicité ou de mesure d'audience.
                Notre solution d'analyse (Umami, auto-hébergée) fonctionne sans cookie : c'est pourquoi aucun
                bandeau de consentement ne vous est présenté. Seuls des cookies strictement techniques,
                nécessaires au fonctionnement du site, peuvent être utilisés.
              </p>
              <p>
                Vous pouvez configurer votre navigateur pour refuser les cookies, mais cela peut 
                affecter le fonctionnement de certaines fonctionnalités du site.
              </p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Réclamations</h2>
            <div className="space-y-3 text-slate-700">
              <p>
                Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une 
                réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
              </p>
              <p>
                <strong>CNIL</strong><br />
                3 Place de Fontenoy - TSA 80715<br />
                75334 PARIS CEDEX 07<br />
                Tél : 01 53 73 22 22<br />
                Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  www.cnil.fr
                </a>
              </p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Modifications</h2>
            <div className="space-y-3 text-slate-700">
              <p>
                Cette politique de confidentialité peut être modifiée à tout moment. 
                Toute modification sera publiée sur cette page avec une date de mise à jour.
              </p>
              {/* Date figée volontairement. Un `new Date()` affichait la date du
                  jour à chaque visite : le document se prétendait mis à jour
                  quotidiennement, ce qui vide la mention de tout sens et n'est
                  pas défendable pour un document opposable.
                  À modifier à la main lors d'une vraie révision. */}
              <p><strong>Dernière mise à jour :</strong> 30 juillet 2026</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate(-1)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
          >
            Retour
          </button>
        </div>
      </div>
    </section>
  );
};
export default PrivacyPolicy;
