import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

/**
 * Bande de conclusion de la page d'accueil.
 *
 * Remplace l'ancienne section « Pourquoi je fais ça », qui fermait la page sur
 * quatre encarts interchangeables — « Vision claire », « Approche humaine »,
 * « Innovation constante », « Qualité garantie » — et un bloc « Votre succès
 * est mon succès ». Aucun de ces textes n'était vérifiable, et la page se
 * terminait sans proposer la moindre action : le visiteur convaincu n'avait
 * nulle part où cliquer.
 */
const HomeCta = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-ink-950 py-20 md:py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow eyebrow--dark mb-4">Prendre contact</p>
          <h2 className="mb-5 text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
            Décrivez votre projet, je vous réponds sous 24 heures
          </h2>
          <p className="mb-9 text-lg leading-relaxed text-ink-300">
            Quelques lignes suffisent pour commencer. Vous recevez un devis chiffré et détaillé,
            sans engagement.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => {
                trackEvent('contact_click', { source: 'home_cta', cta: 'devis_gratuit' });
                navigate('/contact');
              }}
              className="rounded-lg bg-brand-600 px-8 py-3.5 font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-700 active:scale-[0.98]"
            >
              Demander un devis
            </button>
            <button
              onClick={() => {
                trackEvent('nav_click', { destination: '/nos-services', source: 'home_cta' });
                navigate('/nos-services');
              }}
              className="rounded-lg border border-white/15 bg-white/[0.06] px-8 py-3.5 font-semibold whitespace-nowrap text-white transition-colors hover:bg-white/[0.12] active:scale-[0.98]"
            >
              Voir les prestations
            </button>
          </div>

          <p className="mt-7 text-sm text-ink-400">
            Sans engagement · Hébergement en France · Un seul interlocuteur
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeCta;
