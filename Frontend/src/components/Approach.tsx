/**
 * ⚠ COMPOSANT EN ATTENTE — il n'est monté sur aucune route.
 *
 * Il a figuré sur la page d'accueil, puis en a été retiré : six paragraphes
 * développés y faisaient trop de texte avant même d'arriver aux réalisations.
 * Le contenu est conservé tel quel pour la future page « FAQ » ou « Notre
 * approche », où il aura toute sa place.
 *
 * Pour le remettre en service : l'importer dans src/App.tsx et l'associer à une
 * route dans src/config/routes.ts. Le vocabulaire est à revoir d'abord — il
 * reste plus technique que le reste du site (« pare-feu applicatif »,
 * « supervision »).
 *
 * ── Contenu d'origine ────────────────────────────────────────────────────────
 * Ce qui distingue la prestation, en six points.
 *
 * Le site n'avait rien de tel : on passait du hero aux réalisations sans jamais
 * expliquer ce qu'on achète. Cette section existe pour ça, et chaque point est
 * vérifiable — pas d'adjectif seul, pas de « sur mesure », pas de « partenaire
 * de confiance ». Numérotation plutôt qu'icônes : six pictogrammes génériques
 * alignés font catalogue, des chiffres font sommaire.
 */
const POINTS = [
  {
    titre: 'Un seul interlocuteur',
    texte:
      'Conception, développement, mise en ligne, hébergement, maintenance. La même personne du premier échange au serveur qui tourne. Pas de support à trois niveaux, pas de ticket qui transite entre deux prestataires qui se renvoient la responsabilité.'
  },
  {
    titre: 'Infrastructure opérée en propre',
    texte:
      'Vos sites tournent sur des serveurs que j’administre, situés en France — pas sur un hébergement mutualisé revendu avec une marge. C’est ce qui me permet d’intervenir directement quand quelque chose cloche, plutôt que d’ouvrir un ticket chez un tiers.'
  },
  {
    titre: 'La sécurité au départ, pas en option',
    texte:
      'HTTPS partout, pare-feu applicatif, limitation des abus, mises à jour suivies, et un site qui n’expose rien de plus que nécessaire. Ce sont des réflexes de travail, pas une prestation supplémentaire à cocher sur le devis.'
  },
  {
    titre: 'Des sauvegardes réellement restaurées',
    texte:
      'Une sauvegarde qu’on n’a jamais restaurée n’est pas une sauvegarde : c’est une hypothèse. Les miennes sont quotidiennes, chiffrées, et la restauration est testée pour de bon — c’est le seul moyen de savoir qu’elle fonctionne le jour où elle sert.'
  },
  {
    titre: 'Supervision continue',
    texte:
      'L’infrastructure est surveillée en permanence. L’objectif est simple : détecter un incident avant que vous ne le constatiez, et le traiter avant que vous n’ayez à écrire.'
  },
  {
    titre: 'Le site vit après la livraison',
    texte:
      'Un texte à changer, un prix à corriger, une photo à remplacer, une page à ajouter : c’est compris dans l’abonnement mensuel. Un site qu’on n’ose plus toucher se périme en deux ans.'
  }
];

const Approach = () => {
  return (
    <section className="bg-white py-20 md:py-28 section-compact">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Ce qui change</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-ink-950 md:text-4xl">
            Livrer un site, c’est la moitié du travail
          </h2>
          <span className="rule mb-6" aria-hidden="true" />
          <p className="text-lg leading-relaxed text-ink-600">
            L’autre moitié commence à la mise en ligne : les mises à jour, les sauvegardes, la
            surveillance, les évolutions. C’est là que la plupart des sites de petites structures
            sont abandonnés, et c’est précisément ce que je prends en charge.
          </p>
        </div>

        <ol className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((point, index) => (
            <li key={point.titre}>
              {/* Seul emploi chiffré de l'ambre sur la page, conformément à la
                  règle posée dans index.css. */}
              <span className="font-display text-sm font-bold tabular-nums text-accent-600">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 mb-2.5 text-xl font-bold tracking-tight text-ink-950">
                {point.titre}
              </h3>
              <p className="leading-relaxed text-ink-600">{point.texte}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Approach;
