import { useNavigate } from 'react-router-dom';
const TermsOfService = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-white pt-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Conditions Générales de Vente</h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600">
            Conditions de vente et d'utilisation des services
          </p>
        </div>
        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">I. Identification des Parties</h2>
            <div className="space-y-3 text-slate-700">
              <p><strong>Prestataire :</strong> Enzo Monnet-Mata</p>
              <p><strong>Adresse :</strong> 69830 Saint-Georges-de-Reneins, France</p>
              <p><strong>SIRET :</strong> 991 413 600</p>
              <p><strong>Email :</strong> contact@zenixweb.fr</p>
              <p><strong>Site web :</strong> www.zenixweb.fr</p>
              <p><strong>TVA :</strong> TVA non applicable – article 293 B du CGI</p>
              <p className="mt-4"><strong>Client</strong></p>
              <p>Toute personne morale ou physique ayant accepté un devis ou passé commande auprès du Prestataire.</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">II. Objet et Documents Contractuels</h2>
            <div className="space-y-4 text-slate-700">
              <div>
                <p className="font-semibold mb-2">1. Objet</p>
                <p>Les présentes CGV définissent les conditions dans lesquelles le Prestataire fournit des prestations de création, refonte, hébergement, maintenance et services associés (ex. landing pages, sites vitrine, sites e-commerce) au Client.</p>
              </div>
              <div>
                <p className="font-semibold mb-2">2. Documents Contractuels</p>
                <p>L'offre contractuelle est constituée, par ordre de priorité décroissant :</p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li>Le devis accepté et signé par le Client (ou bon de commande).</li>
                  <li>Le présent document (CGV).</li>
                  <li>Le cahier des charges / annexe fonctionnelle signé(e).</li>
                </ul>
                <p className="mt-2">Tout document émanant du Client (bon de commande, conditions générales d'achat) est inopposable au Prestataire, sauf acceptation écrite expresse de ce dernier.</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">III. Commande et Prix</h2>
            <div className="space-y-4 text-slate-700">
              <div>
                <p className="font-semibold mb-2">3. Devis, Commande et Validation</p>
                <p>La commande est réputée fermée à réception cumulative :</p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li>Du devis signé / bon de commande signé par le Client.</li>
                  <li>Du paiement de l'acompte prévu au devis.</li>
                </ul>
                <p className="mt-2">Le devis précise la nature des prestations, le prix, les délais, les modalités de paiement et les éventuelles prestations complémentaires. Le Prestataire commence les travaux après réception de l'acompte et des éléments nécessaires fournis par le Client (textes, images, accès, etc.).</p>
              </div>
              <div>
                <p className="font-semibold mb-2">4. Prix et Modalités de Paiement</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Prix :</strong> Les prix sont indiqués en euros (€). Sauf mention contraire sur le devis, les prestations sont facturées en régime de TVA non applicable – article 293 B du CGI.</li>
                  <li><strong>Modalités :</strong> Les modalités sont celles indiquées sur le devis. À défaut, les modalités par défaut sont : acompte à la commande [pourcentage défini sur le devis], solde à la livraison.</li>
                  <li><strong>Moyens de paiement :</strong> Virement bancaire, PayPal, chèque (si accepté et mentionné sur le devis).</li>
                </ul>
                <p className="mt-3 font-semibold">Retard de Paiement (Applicable en B2B)</p>
                <p>Conformément à l'article L441-10 du Code de commerce :</p>
                <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
                  <li>En cas de retard de paiement, des intérêts de retard seront appliqués au taux légal majoré, calculés de plein droit à compter du jour suivant la date d'échéance.</li>
                  <li>Une indemnité forfaitaire de 40 € pour frais de recouvrement sera également due.</li>
                  <li>En cas de non-paiement total ou partiel à l'échéance, le Prestataire pourra suspendre l'exécution des prestations après mise en demeure restée sans effet.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">IV. Exécution et Modifications</h2>
            <div className="space-y-4 text-slate-700">
              <div>
                <p className="font-semibold mb-2">5. Délais de Livraison – Validation et Réception</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Délais :</strong> Indiqués sur le devis. Ils commencent à courir à compter de la réception de l'acompte et de l'ensemble des éléments nécessaires transmis par le Client.</li>
                  <li><strong>Validation (Recette) :</strong> La livraison est accompagnée d'une phase de validation. Le Client dispose d'un délai précisé sur le devis (par défaut : 10 jours ouvrables) pour formuler ses réserves. À défaut, la prestation est considérée comme acceptée.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">6. Modifications et Prestations Complémentaires</p>
                <p>Toute modification en cours de projet (change request) non prévue au devis fera l'objet d'un devis complémentaire et d'une facturation supplémentaire. Les délais initiaux pourront être ajustés en conséquence.</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">V. Réclamations, Garantie et Support</h2>
            <div className="space-y-3 text-slate-700">
              <p className="font-semibold mb-2">7. Réclamations, Garantie et Support</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>Réclamations :</strong> Toute réclamation relative à la livraison doit être signalée par écrit (email à contact@zenixweb.fr ou courrier recommandé).</li>
                <li><strong>Non-conformité et défauts critiques :</strong> à signaler dans un délai maximal de 10 jours calendaires à compter de la livraison.</li>
                <li><strong>Autres réclamations :</strong> au plus tard 14 jours après la livraison.</li>
                <li><strong>Garantie Contractuelle :</strong> Le Prestataire accorde une garantie contractuelle gratuite de 1 mois à compter de la livraison, couvrant les bugs techniques, erreurs d'affichage, dysfonctionnements de navigation ou de paiement résultant d'un défaut de développement.</li>
                <li><strong>Exclusions de Garantie :</strong> La garantie ne couvre pas les modifications non autorisées par le Client ou un tiers, les problèmes causés par les contenus fournis par le Client, les problèmes liés à un hébergement tiers, ou les problèmes liés à des services tiers mal configurés par le Client. La garantie prend fin à l'expiration de la période d'un mois ou au transfert du site sur un hébergement tiers.</li>
                <li><strong>Support :</strong> Le Prestataire fournit 1 mois de support technique inclus ; au-delà, le support est facturé sur devis ou au tarif en vigueur.</li>
              </ul>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">VI. Propriété Intellectuelle et Responsabilité</h2>
            <div className="space-y-4 text-slate-700">
              <div>
                <p className="font-semibold mb-2">8. Propriété Intellectuelle</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Titularité :</strong> Sauf stipulation contraire, le Prestataire demeure titulaire des droits de propriété intellectuelle afférents aux éléments techniques (code source, composants développés spécifiquement) jusqu'au paiement intégral de la prestation.</li>
                  <li><strong>Cession des droits :</strong> À compter du paiement intégral, le Prestataire cède au Client les droits d'utilisation nécessaires à l'exploitation du site pour son activité (droits patrimoniaux), dans les conditions prévues au devis.</li>
                  <li>Sont exclus de la cession les composants tiers (plugins, thèmes, bibliothèques, images sous licence) qui restent soumis aux conditions de leurs éditeurs.</li>
                  <li><strong>Droit de Portfolio :</strong> Le Prestataire conserve le droit d'intégrer le projet au sein de son portfolio, sauf accord contraire écrit.</li>
                  <li><strong>Garantie du Client :</strong> Le Client garantit qu'il a les droits nécessaires sur les contenus qu'il fournit et indemnise le Prestataire en cas de réclamation d'un tiers.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">9. Hébergement, Sauvegarde et Transfert</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Si l'hébergement est fourni par le Prestataire, les conditions sont précisées au devis.</li>
                  <li>Le Prestataire n'est pas responsable des incidents liés à l'hébergeur choisi par le Client, ni des perturbations liées à la fourniture d'accès Internet.</li>
                  <li>En cas de transfert du site vers un hébergement tiers, le Prestataire peut facturer les opérations de migration si celles-ci ne sont pas incluses dans le devis.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">10. Données Personnelles (RGPD)</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Le Prestataire traite les données personnelles nécessaires à l'exécution de la prestation conformément au RGPD.</li>
                  <li>Le Client s'engage à respecter la réglementation applicable (collecte de consentements, mentions légales, cookies).</li>
                  <li>Le Prestataire agit en qualité de sous-traitant lorsque celui-ci traite des données personnelles pour le compte du Client ; un contrat ou une clause spécifique est mise en place le cas échéant.</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">11. Confidentialité</p>
                <p>Chaque Partie s'engage à ne pas divulguer les informations confidentielles reçues pendant la durée du projet et pendant 3 ans après la fin du contrat, sauf information déjà publique ou obligation légale.</p>
              </div>
              <div>
                <p className="font-semibold mb-2">12. Responsabilité</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Le Prestataire exécute sa mission avec diligence. Sa responsabilité contractuelle est limitée aux dommages directs et prouvés, dans la limite du montant total payé par le Client au titre de la prestation concernée.</li>
                  <li>Le Prestataire ne pourra en aucun cas être tenu pour responsable des dommages indirects (perte d'exploitation, perte de clientèle, préjudice commercial, etc.).</li>
                  <li>Cette limitation ne s'applique pas en cas de faute lourde ou dolosive.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">VII. Dispositions Générales</h2>
            <div className="space-y-4 text-slate-700">
              <div>
                <p className="font-semibold mb-2">13. Force Majeure</p>
                <p>Les Parties ne pourront être tenues responsables en cas d'inexécution ou de retard résultant d'un cas de force majeure (grève, incendie, catastrophe naturelle, panne généralisée, etc.).</p>
              </div>
              <div>
                <p className="font-semibold mb-2">14. Sous-traitance</p>
                <p>Le Prestataire se réserve la possibilité de confier, sous sa responsabilité, tout ou partie des prestations à des sous-traitants.</p>
              </div>
              <div>
                <p className="font-semibold mb-2">15. Résiliation</p>
                <p>En cas de manquement grave par l'une des Parties, après mise en demeure restée sans effet pendant 15 jours, l'autre Partie pourra résilier le contrat. En cas de résiliation à l'initiative du Client sans faute du Prestataire, l'acompte reste acquis et les prestations réalisées facturées au prorata.</p>
              </div>
              <div>
                <p className="font-semibold mb-2">16. Preuves et Facturation</p>
                <p>Les factures sont envoyées par email. Toute contestation relative à une facture doit être formulée dans les 14 jours suivant sa réception.</p>
              </div>
              <div>
                <p className="font-semibold mb-2">17. Médiation / Litiges</p>
                <p>Les Parties s'engagent à rechercher une solution amiable avant toute action judiciaire. À défaut d'accord amiable, compétence exclusive est attribuée aux tribunaux de Lyon (ou la juridiction spécifiée dans le devis/contrat).</p>
              </div>
              <div>
                <p className="font-semibold mb-2">18. Acceptation</p>
                <p>L'acceptation du devis et/ou le paiement de l'acompte vaut acceptation pleine et entière des présentes Conditions Générales de Vente.</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Annexes (à joindre au devis)</h2>
            <ul className="list-disc list-inside ml-4 space-y-1 text-slate-700">
              <li>Cahier des charges / spécifications fonctionnelles.</li>
              <li>Devis / bon de commande.</li>
              <li>Modalités spécifiques d'hébergement/maintenance si applicable.</li>
            </ul>
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
export default TermsOfService;
