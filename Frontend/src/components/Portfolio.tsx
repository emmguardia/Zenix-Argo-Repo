import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Eye, Code2, X } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface Project {
  title: string;
  client: string;
  description: string;
  /** Ce que le site permet de faire, en langage client. */
  capabilities: string[];
  image: string;
  category: string;
  url: string;
}

/**
 * Réalisations.
 *
 * Chaque projet est décrit par ses CAPACITÉS, pas par sa pile technique. Un
 * prospect qui cherche un site ne sait pas ce qu'apportent « React » ou
 * « MongoDB » ; il sait en revanche s'il a besoin d'encaisser des paiements ou
 * de modifier son catalogue lui-même. Le détail technique reste disponible sur
 * demande et sur la page Partenaires, qui s'adresse à un public de développeurs.
 */
const projects: Project[] = [
  {
    title: 'ÉduSport Connect',
    client: 'Association, Mâcon',
    description:
      "Site d'une association qui accompagne les jeunes par le sport, l'éducation et le numérique, en Europe et en Afrique. L'équipe publie ses événements et suit ses candidatures de bénévoles en autonomie, sans intervention technique.",
    capabilities: [
      'Agenda des événements',
      'Candidatures bénévoles',
      'Espace partenaires',
      'Back-office autonome',
      'Plusieurs administrateurs',
      'FAQ'
    ],
    image: '/images/edusport-connect.webp',
    category: 'Site associatif',
    url: 'https://edusportconnect.fr/'
  },
  {
    title: 'Domaine des Rêves Bleus',
    client: 'Salon de toilettage canin',
    description:
      'Salon de toilettage professionnel et sa boutique en ligne. Les clients créent leur compte, commandent et règlent en ligne ; le catalogue et les commandes se pilotent depuis un espace d\'administration.',
    capabilities: [
      'Paiement en ligne sécurisé',
      'Comptes clients',
      'Carnet d\'adresses',
      'Suivi des commandes',
      'Gestion du catalogue',
      'Protection anti-intrusion'
    ],
    image: '/images/domainedesrevesbleus.webp',
    category: 'Boutique en ligne',
    url: 'https://domainedesrevesbleus.eu/'
  },
  {
    title: 'Le Clos de la Reine',
    client: 'Accessoires pour chiens sur mesure',
    description:
      'Boutique de colliers, laisses et harnais fabriqués sur mesure. Le client compose sa demande, reçoit une proposition de prix, puis sa facture est générée automatiquement.',
    capabilities: [
      'Catalogue et collections',
      'Panier et favoris',
      'Codes promotionnels',
      'Demandes sur mesure',
      'Facturation automatique',
      'Galerie photo'
    ],
    image: '/images/vente-produits-chien.webp',
    category: 'Boutique en ligne',
    // Domaine de production (chart Helm du projet). L'ancien lien pointait vers
    // un sous-domaine zenixweb.fr qui ne résout plus.
    url: 'https://leclosdelareine.com/'
  },
  {
    title: 'Club Quisine',
    client: 'Association culinaire',
    description:
      "Site d'une association de cuisine : recettes détaillées, présentation des membres et informations pratiques. Les recettes s'ajoutent depuis le back-office, sans toucher au code.",
    capabilities: [
      'Bibliothèque de recettes',
      'Fiches détaillées',
      'Présentation de l\'équipe',
      'Espace membre',
      'Publication autonome'
    ],
    image: '/images/club-quisine.webp',
    category: 'Site vitrine',
    url: 'https://quisine.zenixweb.fr/'
  }
];

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('section_view', { id: 'portfolio' });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Fermeture de la visionneuse à la touche Échap.
  useEffect(() => {
    if (!selectedImage) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedImage]);

  return (
    <section
      id="portfolio"
      className="py-20 md:py-24 bg-white section-compact"
      ref={sectionRef}
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-ink-950 mb-4">Mes réalisations</h2>
          <span className="rule mx-auto mb-5" aria-hidden="true" />
          <p className="text-lg text-ink-600 max-w-2xl mx-auto">
            Des sites en ligne, utilisés au quotidien par leurs propriétaires. Tous sont hébergés
            et maintenus par Zenix.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {projects.map((project) => (
            <article
              key={project.url}
              className="bg-white rounded-2xl border border-ink-200 overflow-hidden transition-colors duration-200 hover:border-brand-300 flex flex-col"
            >
              <button
                type="button"
                className="h-52 bg-ink-100 overflow-hidden relative cursor-zoom-in block w-full"
                onClick={() => setSelectedImage(project.image)}
                aria-label={`Agrandir l'aperçu de ${project.title}`}
              >
                <img
                  src={project.image}
                  alt={`Aperçu du site ${project.title}`}
                  width={800}
                  height={456}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="absolute inset-0 hidden items-center justify-center flex-col">
                  <Code2 className="w-12 h-12 text-brand-600 mb-2" aria-hidden="true" />
                  <p className="text-ink-500 text-sm">Aperçu indisponible</p>
                </div>
              </button>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3 gap-3">
                  <span className="text-xs font-semibold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-full">
                    {project.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedImage(project.image)}
                    className="p-1 text-ink-400 hover:text-brand-600 transition-colors"
                    aria-label={`Voir l'aperçu de ${project.title} en grand`}
                  >
                    <Eye className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>

                <h3 className="text-xl font-bold text-ink-950">{project.title}</h3>
                <p className="text-sm text-ink-500 mb-3">{project.client}</p>
                <p className="text-ink-600 mb-4 text-sm flex-grow">{project.description}</p>

                <ul className="flex flex-wrap gap-2 mb-5">
                  {project.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="text-xs bg-ink-100 text-ink-700 px-2.5 py-1 rounded-full"
                    >
                      {capability}
                    </li>
                  ))}
                </ul>

                {/* Vrai lien plutôt qu'un window.open : explorable par les moteurs,
                    ouvrable dans un nouvel onglet, et accessible au clavier. */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('portfolio_project_click', { title: project.title })}
                  className="inline-flex items-center justify-center text-brand-600 hover:text-brand-700 font-semibold text-sm mt-auto"
                >
                  Voir le site en ligne
                  <ExternalLink className="w-4 h-4 ml-1.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu agrandi"
        >
          <div className="relative max-w-5xl max-h-full cursor-default" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-ink-300 transition-colors"
              aria-label="Fermer l'aperçu"
            >
              <X className="w-8 h-8" aria-hidden="true" />
            </button>
            <img
              src={selectedImage}
              alt="Aperçu agrandi du projet"
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
