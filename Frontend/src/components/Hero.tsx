import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

/**
 * Ce qui est compris dans une prestation.
 *
 * Formulé pour un artisan ou une association, pas pour un administrateur
 * système. Les termes métier ont été retirés un par un : « intégration »,
 * « pare-feu applicatif », « supervision », « restaurations testées » ne
 * disaient rien à la cible. On décrit le résultat, pas la technique.
 */
const INCLUS = [
  { titre: 'La création du site', detail: 'Design, mise en page, mise en ligne' },
  { titre: 'L’hébergement', detail: 'Sur mes serveurs, en France' },
  { titre: 'La sécurité', detail: 'Site protégé et tenu à jour' },
  { titre: 'Les sauvegardes', detail: 'Chaque jour, et je vérifie qu’elles fonctionnent' },
  { titre: 'Le suivi', detail: 'Vos modifications, toute l’année' }
];

const Hero = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const id = requestAnimationFrame(() => setFadeIn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-ink-950 pt-20 md:min-h-[80vh] lg:min-h-screen hero-compact">
      {/* Un seul halo, bleu, très diffus. Le fond portait auparavant trois
          taches animées — bleue, violette, indigo — qui introduisaient à elles
          seules deux couleurs hors palette. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-0 h-[32rem] w-[32rem] rounded-full bg-brand-600/20 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-brand-500/10 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-16">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div
            className={`transition-all duration-700 ${
              fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <p className="eyebrow eyebrow--dark mb-5">Villefranche-sur-Saône · Lyon · Partout en France</p>

            <h1 className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Création de sites web en Beaujolais,{' '}
              <span className="text-brand-300">hébergement compris</span>
            </h1>

            {/* Trois lignes, pas dix. Le paragraphe expliquait auparavant en
                quatre phrases ce que font « la plupart des prestataires » avant
                d'en venir au sujet : un visiteur ne lit pas un éditorial, il
                cherche à savoir ce qu'on lui vend. */}
            <p className="mb-8 max-w-lg text-lg leading-relaxed text-ink-300">
              Je crée votre site et je l’héberge sur mes propres serveurs, en France. Une seule
              personne à joindre, du premier devis au dépannage.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => {
                  trackEvent('contact_click', { source: 'hero', cta: 'devis_gratuit' });
                  navigate('/contact');
                }}
                className="rounded-lg bg-brand-600 px-7 py-3.5 font-semibold whitespace-nowrap text-white transition-colors hover:bg-brand-700 active:scale-[0.98]"
              >
                Demander un devis
              </button>
              <button
                onClick={() => {
                  trackEvent('nav_click', { destination: '/hebergement', source: 'hero', cta: 'hebergement' });
                  navigate('/hebergement');
                }}
                className="rounded-lg border border-white/15 bg-white/[0.06] px-7 py-3.5 font-semibold whitespace-nowrap text-white transition-colors hover:bg-white/[0.12] active:scale-[0.98]"
              >
                Voir les offres d’hébergement
              </button>
            </div>

            <p className="mt-5 text-sm text-ink-400">
              Réponse sous 24 h. Devis gratuit et sans engagement.
            </p>
          </div>

          {/* Ce qui remplace la maquette de navigateur : la liste de ce qui est
              réellement compris. Elle dit quelque chose du service, là où trois
              pastilles rouge/jaune/verte et des blocs gris ne disaient rien —
              et ramenaient trois couleurs de plus. */}
          <div
            className={`transition-all delay-150 duration-700 ${
              fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-8">
              {/* « Périmètre de la prestation » était du vocabulaire de devis.
                  Le titre dit maintenant la même chose en français courant. */}
              <p className="eyebrow eyebrow--dark mb-1">Ce qui est compris</p>
              <p className="mb-6 font-display text-xl font-bold text-white">
                Tout, du devis au dépannage
              </p>

              <ul className="divide-y divide-white/[0.08]">
                {INCLUS.map((item) => (
                  <li key={item.titre} className="flex gap-4 py-3.5 first:pt-0 last:pb-0">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"
                    />
                    <div>
                      <p className="font-medium text-white">{item.titre}</p>
                      <p className="text-sm text-ink-400">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
