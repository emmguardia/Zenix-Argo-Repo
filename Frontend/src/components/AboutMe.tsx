/**
 * Section « À propos » — seule section de texte de la page d'accueil.
 *
 * Historique des écueils, pour ne pas y retomber :
 *
 *  1. Trois encarts « Qui suis-je ? / Mon expertise / Ma passion »,
 *     interchangeables avec n'importe quel site de freelance.
 *  2. Version qui répétait mot pour mot l'argument du hero.
 *  3. Version saturée de vocabulaire métier (« orchestration de conteneurs »,
 *     « supervision », « accès cloisonnés ») devant un public d'artisans.
 *  4. Version narrative qui racontait le déroulé d'un projet — sujet de la page
 *     Contact, pas de celle-ci.
 *  5. Version en quatre principes séparés : le découpage en petits blocs
 *     hachait la lecture et donnait un ton de plaquette.
 *
 * Cette version tient en deux paragraphes suivis : qui, ce que je fais,
 * pourquoi je le fais, et pourquoi ces choix comptent pour le client. Le texte
 * porte les valeurs sans jamais les nommer comme telles — « je préfère
 * l'exigence » ne vaut rien, « j'administre mes propres serveurs » se vérifie.
 */
const AboutMe = () => {
  return (
    <section id="about-me" className="bg-ink-50 py-20 md:py-24 section-compact">
      <div className="container mx-auto px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">À propos</p>
            <h2 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-ink-950 md:text-4xl">
              Qui va s’occuper de votre site
            </h2>
            <span className="rule mb-7" aria-hidden="true" />

            <div className="space-y-5 text-lg leading-relaxed text-ink-600">
              <p>
                Je m’appelle Enzo Monnet-Mata. Je conçois des sites web et je les héberge sur mes
                propres serveurs, depuis le Beaujolais, pour des artisans, des commerçants, des
                associations et des acteurs du tourisme local, à Villefranche, à Lyon et partout en
                France. Je travaille seul, et c’est un choix : j’administre l’infrastructure autant
                que j’écris le code, ce qui me permet de répondre de l’ensemble plutôt que d’une
                moitié, et d’intervenir moi-même au lieu de transmettre une demande à un tiers.
              </p>
              <p>
                J’ai créé Zenix parce que trop de sites de petites structures sont livrés puis
                laissés à l’abandon : plus de mises à jour, plus de sauvegardes, plus personne à
                joindre au bout de six mois. Un site n’est pas un document qu’on remet et qu’on
                oublie, c’est un outil qui doit tenir dans le temps — rester rapide, rester sûr,
                continuer d’être trouvé sur Google. C’est la raison pour laquelle la maintenance,
                la sécurité et les sauvegardes quotidiennes ne figurent pas en option sur mes
                devis : un site qu’on ne protège pas n’est pas un site terminé, et le facturer
                comme s’il l’était ne me paraît pas défendable.
              </p>
            </div>
          </div>

          {/* Carte d'identité : uniquement ce qui pèse dans une décision.
              « Se déplace » a été retiré (les échanges se font à distance) et
              « Réponse sous 24 h » aussi — l'information figure déjà deux fois
              ailleurs sur la page, sous le hero et dans l'appel à l'action.
              Le SIRET les remplace : c'est ce qui distingue une entreprise
              déclarée d'une activité informelle, et il est vérifiable en ligne. */}
          <div className="rounded-2xl border border-ink-200 bg-white p-7 lg:sticky lg:top-28">
            <img
              src="/images/profile-photo.webp"
              alt="Enzo Monnet-Mata"
              width={72}
              height={72}
              loading="lazy"
              className="h-18 w-18 rounded-full object-cover"
            />
            <p className="mt-4 font-display text-lg font-bold text-ink-950">Enzo Monnet-Mata</p>
            <p className="text-sm text-ink-500">Création de sites web et hébergement</p>

            <dl className="mt-6 space-y-3 border-t border-ink-200 pt-5 text-sm">
              <div>
                <dt className="text-ink-500">Secteur</dt>
                <dd className="font-medium text-ink-900">
                  Beaujolais, Villefranche, Lyon — et toute la France à distance
                </dd>
              </div>
              <div>
                <dt className="text-ink-500">Vos données</dt>
                <dd className="font-medium text-ink-900">Hébergées sur mes serveurs, en France</dd>
              </div>
              <div>
                <dt className="text-ink-500">Entreprise</dt>
                <dd className="font-medium text-ink-900">
                  Entrepreneur individuel
                  <span className="block font-normal text-ink-500">SIRET 991 413 600 00016</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
