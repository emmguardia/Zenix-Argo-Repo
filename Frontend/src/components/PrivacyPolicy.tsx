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
              <p><strong>Adresse :</strong>69830 Saint-Georges-de-Reneins, France</p>
              <p><strong>SIRET :</strong> 991 413 600</p>
              <p><strong>Email :</strong> contact@zenixweb.fr</p>
              <p><strong>Statut :</strong> Étudiant</p>
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
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Données techniques :</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Adresse IP</li>
                  <li>Type de navigateur</li>
                  <li>Pages visitées</li>
                  <li>Durée de visite</li>
                </ul>
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
                <li><strong>Données de navigation :</strong> 13 mois maximum</li>
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
                Ce site n'utilise pas de cookies de tracking ou d'analyse. Seuls des cookies techniques 
                nécessaires au fonctionnement du site peuvent être utilisés.
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
              <p><strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}</p>
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
