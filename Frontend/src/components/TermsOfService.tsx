import { useNavigate } from 'react-router-dom';
import ProtectedValue from './ProtectedValue';
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_HREF, CONTACT_ADDRESS_FULL } from '../config/contact';

const Article = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <p className="font-semibold mb-2">{title}</p>
    <div className="space-y-2">{children}</div>
  </div>
);

const TermsOfService = () => {
  const navigate = useNavigate();
  return (
    <section className="py-20 bg-white pt-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-ink-900 mb-4">Conditions Générales de Vente</h1>
          <div className="h-1 w-20 bg-brand-600 mx-auto mb-6"></div>
          <p className="text-lg text-ink-600">
            et de Prestation de Services — Création de sites web · Hébergement · Maintenance
          </p>
          <p className="text-sm text-ink-500 mt-2">Version 3.1 — en vigueur au 12 août 2026</p>
        </div>

        <div className="prose prose-lg max-w-none">
          {/* Identification */}
          <div className="bg-brand-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-ink-900 mb-6">Identification du Prestataire</h2>
            <div className="space-y-3 text-ink-700">
              <p><strong>Prestataire :</strong> Zenix Web — Enzo Monnet-Mata, entrepreneur individuel (micro-entreprise)</p>
              {/* Affichage protégé du moissonnage, voir src/config/contact.ts. */}
              <p><strong>Siège :</strong> <ProtectedValue encoded={CONTACT_ADDRESS_FULL} /></p>
              <p><strong>SIRET :</strong> 991 413 600 00016 · TVA non applicable, art. 293 B du CGI</p>
              <p>
                <strong>Contact :</strong> contact@zenixweb.fr ·{' '}
                <ProtectedValue
                  encoded={CONTACT_PHONE_DISPLAY}
                  hrefEncoded={CONTACT_PHONE_HREF}
                  className="text-brand-600 hover:underline"
                />{' '}
                · zenixweb.fr
              </p>
            </div>
          </div>

          {/* Objet, définitions, documents, commande */}
          <div className="bg-ink-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-ink-900 mb-6">Objet, Définitions et Formation du Contrat</h2>
            <div className="space-y-6 text-ink-700">
              <Article title="Article 1 — Objet et champ d'application">
                <p>Les présentes Conditions Générales de Vente (« CGV ») régissent l'ensemble des relations contractuelles entre le Prestataire, Enzo Monnet-Mata exerçant sous l'enseigne « Zenix Web », et tout client professionnel, entreprise ou association (le « Client »). Elles couvrent deux grandes familles de prestations : (i) la création, refonte et intégration de sites web (sites vitrine, e-commerce, landing pages) et (ii) l'hébergement et la maintenance de ces sites. Elles ne s'adressent pas aux consommateurs au sens du Code de la consommation.</p>
                <p>Toute commande emporte acceptation pleine et entière des présentes CGV, qui prévalent sur tout document du Client (conditions générales d'achat, bon de commande), sauf accord écrit exprès du Prestataire. Conformément à l'article L441-1 du Code de commerce, les CGV sont communiquées à tout client professionnel qui en fait la demande.</p>
              </Article>
              <Article title="Article 2 — Définitions">
                <p>Dans les présentes CGV, les termes suivants ont la signification indiquée ci-dessous :</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Prestataire :</strong> Zenix Web (Enzo Monnet-Mata), fournisseur des prestations.</li>
                  <li><strong>Client :</strong> la personne morale ou physique agissant à titre professionnel ou associatif ayant accepté un devis.</li>
                  <li><strong>Parties :</strong> le Prestataire et le Client.</li>
                  <li><strong>Devis :</strong> l'offre chiffrée décrivant les prestations, le prix, les délais et les modalités ; une fois signé, il vaut bon de commande.</li>
                  <li><strong>Prestation de création :</strong> la conception, la refonte ou l'intégration d'un site web.</li>
                  <li><strong>Livrable :</strong> tout élément (site, page, développement, document, code) remis au Client.</li>
                  <li><strong>Recette :</strong> la phase de vérification et de validation du Livrable par le Client.</li>
                  <li><strong>Abonnement :</strong> toute prestation récurrente d'hébergement et/ou de maintenance.</li>
                  <li><strong>Site :</strong> le site web objet des prestations, ses fichiers et sa base de données.</li>
                  <li><strong>Espace Client :</strong> la plateforme en ligne sécurisée mise à disposition du Client.</li>
                </ul>
              </Article>
              <Article title="Article 3 — Documents contractuels">
                <p>L'accord des Parties est constitué, par ordre de priorité décroissant : (1) le devis signé par le Client ; (2) le cahier des charges ou l'annexe fonctionnelle signé(e), le cas échéant ; (3) les présentes CGV. En cas de contradiction, le document de rang supérieur prévaut. L'ensemble forme l'intégralité de l'accord et remplace tout échange antérieur.</p>
              </Article>
              <Article title="Article 4 — Devis, commande et formation du contrat">
                <p>Sauf mention contraire, les devis sont valables trente (30) jours à compter de leur émission. Le contrat est réputé formé à la réception cumulative, par le Prestataire, du devis daté et signé par le Client et du paiement de l'acompte prévu. Le Prestataire débute les travaux après encaissement de l'acompte et réception de l'ensemble des éléments nécessaires (textes, images, accès, identifiants, etc.).</p>
              </Article>
              {/* Article ajouté : les CGV étaient totalement muettes sur ce point.
                  L'article L221-3 du Code de la consommation étend le droit de
                  rétractation de 14 jours aux professionnels de 5 salariés au plus
                  quand le contrat sort de leur activité principale — ce qui est le
                  cas de la quasi-totalité des artisans, commerçants et petites
                  associations qui commandent un site. Sans clause ni renonciation
                  expresse recueillie, un client pouvait se rétracter APRÈS
                  livraison. Numéroté « bis » pour ne pas décaler les 27 articles
                  suivants, déjà cités dans les devis émis. */}
              <Article title="Article 4 bis — Droit de rétractation applicable à certains professionnels">
                <p>Conformément à l'article L221-3 du Code de la consommation, le Client professionnel qui emploie <strong>cinq (5) salariés au maximum</strong> et dont l'objet du contrat n'entre pas dans le champ de son activité principale bénéficie, lorsque le contrat est conclu hors établissement ou à distance, d'un <strong>droit de rétractation de quatorze (14) jours</strong> à compter de la conclusion du contrat, sans avoir à motiver sa décision ni à supporter de pénalité.</p>
                <p>Ce droit s'exerce par toute déclaration écrite dénuée d'ambiguïté adressée à contact@zenixweb.fr. Le formulaire type de rétractation est joint au devis et communiqué sur simple demande.</p>
                <p><strong>Exécution anticipée.</strong> Le Client qui souhaite que les prestations débutent avant l'expiration de ce délai en fait la demande expresse, sur le devis ou par écrit, et reconnaît qu'il perd son droit de rétractation une fois la prestation pleinement exécutée. Si le Client se rétracte alors que l'exécution a commencé à sa demande, il règle le montant correspondant aux prestations effectivement fournies au jour de la rétractation, au prorata de leur avancement.</p>
                <p>À défaut de demande expresse d'exécution anticipée, le Prestataire ne débute les travaux qu'à l'expiration du délai de quatorze (14) jours.</p>
              </Article>
            </div>
          </div>

          {/* Prix et paiement */}
          <div className="bg-ink-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-ink-900 mb-6">Prix et Paiement</h2>
            <div className="space-y-6 text-ink-700">
              <Article title="Article 5 — Prix">
                <p>Les prix sont exprimés en euros (€) et nets de taxe : en application de l'article 293 B du CGI, la TVA n'est pas applicable. Ils s'entendent hors frais de services tiers (nom de domaine, licences logicielles, thèmes, extensions, polices, API, régies publicitaires), qui restent à la charge du Client et peuvent lui être refacturés au coût réel. Aucun escompte n'est accordé en cas de paiement anticipé.</p>
              </Article>
              <Article title="Article 6 — Modalités et échéancier de paiement">
                <p>Sauf stipulation contraire au devis, les modalités sont les suivantes :</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Prestations de création :</strong> un acompte de 20 % à la commande, le solde étant exigible à la livraison. Pour les projets importants, le paiement peut être échelonné en 20 % à la commande, 40 % à une étape clé d'avancement et 40 % à la livraison.</li>
                  <li><strong>Abonnements (hébergement / maintenance) :</strong> payables mensuellement d'avance, par prélèvement automatique via Stripe.</li>
                  <li><strong>Factures ponctuelles :</strong> payables sous 30 jours à compter de leur émission.</li>
                </ul>
                <p>Les moyens de paiement acceptés sont le virement bancaire et la carte bancaire via Stripe.</p>
              </Article>
              <Article title="Article 7 — Retard de paiement">
                <p><strong>Client professionnel</strong> — Conformément aux articles L441-10 et L441-9 du Code de commerce, tout retard de paiement entraîne de plein droit, sans mise en demeure préalable : des intérêts de retard au taux de la BCE majoré de 10 points, ainsi qu'une indemnité forfaitaire de 40 € pour frais de recouvrement (sans préjudice d'une indemnisation complémentaire sur justificatifs).</p>
                <p>En cas de non-paiement et après mise en demeure restée sans effet, le Prestataire pourra suspendre l'exécution des prestations.</p>
              </Article>
            </div>
          </div>

          {/* Exécution */}
          <div className="bg-ink-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-ink-900 mb-6">Exécution des Prestations</h2>
            <div className="space-y-6 text-ink-700">
              <Article title="Article 8 — Obligations et collaboration du Client">
                <p>La bonne exécution des prestations suppose une collaboration active du Client, qui s'engage à :</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>fournir en temps utile l'ensemble des contenus, informations et accès nécessaires ;</li>
                  <li>désigner un interlocuteur unique habilité à valider les demandes et les livrables ;</li>
                  <li>répondre aux sollicitations et valider les étapes dans les délais convenus ;</li>
                  <li>garantir qu'il détient les droits sur les contenus qu'il transmet (textes, images, marques, logos), et garantir le Prestataire contre toute réclamation d'un tiers à ce titre.</li>
                </ul>
                <p>Tout retard ou manquement du Client dans la fourniture des éléments suspend d'autant les délais d'exécution, sans que la responsabilité du Prestataire puisse être engagée.</p>
              </Article>
              <Article title="Article 9 — Délais d'exécution">
                <p>Les délais indiqués au devis sont donnés à titre indicatif, sauf délai expressément qualifié de ferme. Ils courent à compter de l'encaissement de l'acompte et de la réception de l'ensemble des éléments nécessaires. Un dépassement raisonnable de délai ne peut donner lieu à indemnité, retenue ou annulation.</p>
              </Article>
              <Article title="Article 10 — Cycles de révision de la maquette">
                <p>La prestation de création comprend quatre (4) séries de modifications sur les propositions graphiques (maquettes) et le contenu, permettant au Client d'ajuster le rendu. Au-delà de ces quatre séries, toute nouvelle demande de retouche fait l'objet d'un devis complémentaire.</p>
              </Article>
              <Article title="Article 11 — Recette et réception">
                <p>La livraison s'accompagne d'une phase de recette. Le Client dispose d'un délai de dix (10) jours ouvrés pour formuler par écrit ses réserves motivées portant sur une non-conformité au devis. À défaut de réserve dans ce délai, ou en cas de mise en ligne / exploitation du Livrable par le Client, la prestation est réputée acceptée sans réserve.</p>
              </Article>
              <Article title="Article 12 — Modifications et prestations complémentaires">
                <p>Toute demande de modification n'entrant pas dans le périmètre défini au devis (« change request ») fait l'objet d'un devis complémentaire et d'une facturation supplémentaire. Les délais initiaux sont ajustés en conséquence.</p>
              </Article>
            </div>
          </div>

          {/* Propriété intellectuelle */}
          <div className="bg-ink-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-ink-900 mb-6">Propriété Intellectuelle</h2>
            <div className="space-y-6 text-ink-700">
              <Article title="Article 13 — Propriété intellectuelle et licence d'utilisation">
                <p>Conformément à l'article L131-3 du Code de la propriété intellectuelle, les droits sont définis comme suit :</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Titularité (propriété) :</strong> le Prestataire, en sa qualité d'auteur, demeure titulaire des droits de propriété intellectuelle sur le code source qu'il développe, ainsi que sur ses composants, briques techniques, bibliothèques et savoir-faire génériques. Il conserve le droit de les réutiliser pour d'autres projets.</li>
                  <li><strong>Licence concédée au Client :</strong> à compter du paiement intégral, le Prestataire concède au Client une licence d'utilisation non exclusive, cessible avec le Site, mondiale et pour toute la durée légale des droits d'auteur. Cette licence couvre les droits de reproduction, de représentation et d'adaptation (modification) du Site, pour l'exploitation de l'activité du Client.</li>
                  <li><strong>Éléments spécifiques :</strong> les éléments graphiques et développements réalisés spécifiquement pour le Client lui sont cédés dans le cadre de cette licence.</li>
                  <li><strong>Contenus du Client :</strong> les textes, images, marques et logos fournis par le Client restent sa propriété.</li>
                  <li><strong>Composants tiers :</strong> les composants tiers (CMS, extensions, thèmes, polices, images sous licence) restent soumis aux conditions de leurs éditeurs et sont exclus de la présente licence.</li>
                </ul>
                <p className="bg-brand-50 rounded-lg p-4 mt-3"><strong>En clair</strong> — Le Client est pleinement libre d'utiliser son Site : il peut l'héberger où il veut, l'exploiter, le faire évoluer et le confier à un autre prestataire de son choix, y compris récupérer et réutiliser le code pour son propre Site. De son côté, le Prestataire, en tant qu'auteur, en conserve la propriété et peut réutiliser ses briques techniques génériques pour d'autres clients. Personne n'est prisonnier de l'autre.</p>
              </Article>
              <Article title="Article 14 — Signature du Prestataire">
                <p>Une mention discrète « Réalisé par Zenix Web », avec lien vers le site du Prestataire, figure en pied de page du Site. Le Client s'engage à la conserver pendant toute la durée de l'hébergement du Site par le Prestataire. En cas de migration du Site vers un autre hébergeur, cette obligation cesse et le Client est libre de retirer la mention.</p>
              </Article>
              <Article title="Article 15 — Droit de portfolio et références">
                <p>Le Prestataire est autorisé à présenter la réalisation (captures, nom, lien) au sein de son portfolio et de ses supports de communication, à des fins de référence, sauf refus écrit du Client.</p>
              </Article>
            </div>
          </div>

          {/* Hébergement et abonnements */}
          <div className="bg-ink-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-ink-900 mb-6">Hébergement, Maintenance et Abonnements</h2>
            <div className="space-y-6 text-ink-700">
              <Article title="Article 16 — Hébergement et maintenance (Abonnements)">
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Infrastructure :</strong> l'hébergement est assuré sur des serveurs détenus et administrés par le Prestataire, situés en France. Le Prestataire a la qualité d'hébergeur au sens de la loi n° 2004-575 (LCEN). Le trafic transite par Cloudflare, Inc. (États-Unis), qui assure la protection contre les attaques par déni de service et le pare-feu applicatif ; ce recours constitue une sous-traitance ultérieure au sens de l'article 21, encadrée par les clauses contractuelles types de la Commission européenne.</li>
                  <li><strong>Durée et reconduction :</strong> les Abonnements mensuels sont conclus sans engagement et reconduits tacitement chaque mois. L'option annuelle est conclue avec engagement de douze (12) mois.</li>
                  <li><strong>Résiliation :</strong> l'Abonnement est résiliable par écrit moyennant un préavis de trente (30) jours, avec effet à la fin de la période en cours (aucun remboursement au prorata).</li>
                  <li><strong>Disponibilité :</strong> le Prestataire vise une disponibilité de 99 % (obligation de moyens), hors opérations de maintenance planifiées, cas de force majeure et incidents imputables à un tiers.</li>
                  <li><strong>Sauvegardes :</strong> des sauvegardes régulières sont réalisées dans le cadre de l'Abonnement. En l'absence d'Abonnement de maintenance actif, aucune sauvegarde ni garantie de disponibilité n'est assurée.</li>
                  <li><strong>Impayé :</strong> un échec de prélèvement donne lieu à relance ; à défaut de régularisation sous quinze (15) jours, le service peut être suspendu, puis résilié, sans remboursement des périodes échues.</li>
                </ul>
                <p><strong>Réversibilité :</strong> à la fin de l'Abonnement, le Prestataire met à disposition du Client, sur demande, une copie exportable des fichiers et de la base de données du Site. Les données sont conservées trente (30) jours après la fin de l'Abonnement, puis peuvent être définitivement supprimées des serveurs.</p>
              </Article>
              <Article title="Article 17 — Tarifs des abonnements et garantie de prix">
                <p>Le tarif d'Abonnement souscrit par le Client est garanti et gelé pour toute la durée pendant laquelle l'Abonnement demeure actif et payé sans interruption : il n'est pas révisé à la hausse tant que cette continuité est respectée.</p>
                <p><strong>Perte du tarif garanti</strong> — En cas d'interruption, de suspension pour impayé ou de résiliation de l'Abonnement, le tarif garanti est définitivement perdu. Toute reprise ou réactivation du service s'effectue au tarif en vigueur au jour de la reprise, sans négociation possible.</p>
              </Article>
              <Article title="Article 18 — Statut d'hébergeur (LCEN)">
                <p>En sa qualité d'hébergeur (art. 6 de la LCEN), le Prestataire conserve les données d'identification requises et défère aux réquisitions de l'autorité judiciaire. Il n'est pas tenu à une obligation générale de surveillance des contenus. Le Client demeure éditeur et seul responsable des contenus qu'il publie sur le Site, et s'engage à ne rien diffuser d'illicite. Le Prestataire peut suspendre l'accès à un contenu manifestement illicite dès qu'il en a connaissance.</p>
              </Article>
              <Article title="Article 19 — Accessibilité numérique">
                <p>La mise en conformité du Site avec les normes d'accessibilité numérique (RGAA / EN 301 549, « European Accessibility Act ») n'est pas comprise dans les prestations, sauf mention expresse au devis. Le Client est informé qu'il peut y être légalement tenu (notamment pour un site e-commerce, s'il emploie plus de 10 salariés ou réalise plus de 2 M€ de chiffre d'affaires) et en demeure seul responsable. Une prestation d'audit et de mise en conformité peut être proposée sur devis distinct.</p>
              </Article>
            </div>
          </div>

          {/* Garantie, données, confidentialité */}
          <div className="bg-ink-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-ink-900 mb-6">Garantie, Données Personnelles et Confidentialité</h2>
            <div className="space-y-6 text-ink-700">
              <Article title="Article 20 — Garantie et support">
                <p>Le Prestataire accorde une garantie contractuelle gratuite d'un (1) mois à compter de la livraison, couvrant les bugs, erreurs d'affichage et dysfonctionnements résultant d'un défaut de développement. Sont exclus : les modifications réalisées par le Client ou un tiers, les problèmes liés aux contenus fournis par le Client, à un hébergement tiers ou à des services tiers mal configurés. La garantie cesse à l'expiration du mois ou au transfert du Site vers un hébergement tiers. Au-delà, le support est assuré dans le cadre d'un Abonnement de maintenance ou facturé sur devis.</p>
              </Article>
              <Article title="Article 21 — Données personnelles (RGPD)">
                <p>Lorsqu'il traite des données personnelles pour le compte du Client, le Prestataire agit en qualité de <strong>sous-traitant</strong> au sens de l'article 28 du RGPD. Il traite les données sur instructions documentées du Client, veille à leur sécurité et à leur confidentialité, met en œuvre les mesures techniques et organisationnelles de l'article 32, assiste le Client dans le traitement des demandes d'exercice de droits, lui notifie toute violation de données dans les meilleurs délais, et supprime ou restitue les données en fin de contrat au choix du Client.</p>
                <p><strong>Sous-traitance ultérieure.</strong> Le Client donne au Prestataire une autorisation générale et écrite de recourir à des sous-traitants ultérieurs pour l'exécution des prestations d'hébergement et de maintenance. Le Prestataire tient à jour la liste de ces sous-traitants, la communique au Client sur simple demande et l'informe préalablement, avec un préavis de trente (30) jours, de tout ajout ou remplacement. Le Client dispose de ce même délai pour s'y opposer par écrit pour un motif légitime tenant à la protection des données ; à défaut d'accord entre les Parties, le Client peut résilier les prestations concernées sans pénalité. Le Prestataire demeure pleinement responsable, à l'égard du Client, de l'exécution par ses sous-traitants ultérieurs des obligations du présent article.</p>
                <p><strong>Audit.</strong> Le Prestataire met à disposition du Client, sur demande écrite et dans un délai raisonnable, les informations nécessaires pour démontrer le respect des obligations du présent article.</p>
                <p>Le Client, responsable de traitement, garantit la licéité des traitements qu'il met en œuvre et assure ses propres obligations (mentions légales, information des personnes, consentements, cookies). Les données propres du Client (facturation, contact) sont traitées par le Prestataire en qualité de responsable de traitement et conservées pour la durée légale.</p>
                <p>Les modalités détaillées du traitement — catégories de données et de personnes concernées, nature, finalité et durée — font l'objet d'une annexe au contrat d'hébergement, qui vaut accord de sous-traitance au sens de l'article 28.3 du RGPD.</p>
              </Article>
              <Article title="Article 22 — Confidentialité">
                <p>Chaque Partie s'engage à ne pas divulguer les informations confidentielles échangées, pendant la durée du contrat et pendant trois (3) ans après son terme, sauf information déjà publique ou obligation légale de divulgation.</p>
              </Article>
            </div>
          </div>

          {/* Responsabilité et dispositions générales */}
          <div className="bg-ink-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-ink-900 mb-6">Responsabilité et Dispositions Générales</h2>
            <div className="space-y-6 text-ink-700">
              <Article title="Article 23 — Responsabilité">
                <p>Le Prestataire est tenu d'une obligation de moyens. Sa responsabilité contractuelle est limitée aux dommages directs et prouvés, dans la limite du montant total effectivement payé par le Client au titre de la prestation concernée (ou, pour un Abonnement, des douze derniers mois). Le Prestataire ne saurait être tenu responsable des dommages indirects (perte d'exploitation, de données, de clientèle, préjudice commercial). Cette limitation ne s'applique pas en cas de faute lourde ou dolosive. En l'absence d'Abonnement de sauvegarde, le Client demeure responsable de la conservation de ses propres contenus.</p>
              </Article>
              <Article title="Article 24 — Force majeure">
                <p>Aucune des Parties ne pourra être tenue responsable d'un manquement résultant d'un cas de force majeure au sens de l'article 1218 du Code civil (notamment catastrophe naturelle, incendie, panne généralisée, défaillance d'un fournisseur d'accès ou d'énergie). Les obligations sont suspendues pendant la durée de l'événement ; s'il se prolonge au-delà de trente (30) jours, le contrat pourra être résilié de plein droit.</p>
              </Article>
              <Article title="Article 25 — Sous-traitance">
                <p>Le Prestataire se réserve la faculté de confier, sous sa responsabilité et sans que cela ne modifie ses engagements envers le Client, tout ou partie des prestations à des sous-traitants de son choix. Lorsque cette sous-traitance emporte un traitement de données personnelles pour le compte du Client, elle s'exerce dans les conditions et sous les garanties prévues à l'article 21, qui prévaut sur le présent article.</p>
              </Article>
              <Article title="Article 26 — Résiliation">
                <p>En cas de manquement grave de l'une des Parties, non réparé dans un délai de quinze (15) jours après mise en demeure restée sans effet, l'autre Partie pourra résilier le contrat de plein droit. En cas de résiliation à l'initiative du Client sans faute du Prestataire, l'acompte reste acquis au Prestataire et les prestations déjà réalisées sont facturées au prorata de leur avancement.</p>
              </Article>
              <Article title="Article 27 — Indépendance des Parties">
                <p>Le Prestataire exécute ses prestations en toute indépendance, en qualité de professionnel indépendant. Les présentes CGV ne créent aucun lien de subordination, de société ni de mandat entre les Parties.</p>
              </Article>
              <Article title="Article 28 — Non-renonciation et nullité partielle">
                <p>Le fait pour l'une des Parties de ne pas se prévaloir d'une clause n'emporte pas renonciation à s'en prévaloir ultérieurement. Si une stipulation est jugée nulle ou inapplicable, les autres conservent leur pleine valeur.</p>
              </Article>
              <Article title="Article 29 — Modification des CGV">
                <p>Les CGV applicables sont celles en vigueur à la date de la commande. Pour les Abonnements, toute modification des CGV est notifiée moyennant un préavis d'un (1) mois ; le refus du Client vaut demande de résiliation à l'échéance.</p>
              </Article>
              <Article title="Article 30 — Droit applicable et litiges">
                <p>Les présentes CGV sont soumises au droit français. En cas de litige, les Parties s'efforceront de trouver une solution amiable avant toute action contentieuse.</p>
                {/* La clause attributive de compétence au ressort de Lyon a été
                    restreinte. L'article 48 du Code de procédure civile ne la rend
                    valable qu'entre commerçants ; or l'article 1er ouvre les CGV
                    aux associations et aux professions libérales, qui n'ont pas
                    cette qualité. La clause était donc nulle à leur égard, tout en
                    laissant croire le contraire. Elle est désormais limitée aux
                    seuls cas où la loi l'autorise. */}
                <p>À défaut d'accord dans un délai raisonnable, et <strong>lorsque les deux Parties ont la qualité de commerçant</strong> au sens de l'article 48 du Code de procédure civile, compétence est attribuée aux tribunaux du ressort de Lyon, y compris en cas de pluralité de défendeurs ou d'appel en garantie.</p>
                <p>Dans tous les autres cas — notamment lorsque le Client est une association, une profession libérale ou tout autre professionnel non commerçant — les règles de compétence de droit commun s'appliquent.</p>
              </Article>
              <Article title="Article 31 — Acceptation">
                <p>L'acceptation du devis et/ou le paiement de l'acompte vaut acceptation pleine et entière des présentes Conditions Générales de Vente et de Prestation de Services.</p>
              </Article>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="bg-brand-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-700 transition-all"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsOfService;
