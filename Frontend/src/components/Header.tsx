import { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
/** URL de l'espace client. Sous-domaine distinct, servi par un autre déploiement. */
const ESPACE_CLIENT_URL = 'https://app.zenixweb.fr/';

/**
 * Routes dont la première section est sombre, et sur lesquelles l'en-tête reste
 * donc transparent tant qu'on n'a pas défilé.
 *
 * Une liste explicite plutôt qu'une détection automatique : l'en-tête est rendu
 * avant la section qu'il survole, il ne peut pas en mesurer la couleur sans
 * provoquer un scintillement au chargement. Ajouter une page à hero sombre
 * suppose d'ajouter son chemin ici.
 */
const ROUTES_HERO_SOMBRE = new Set(['/']);

/* Le bouton n'avait aucun rembourrage : la zone cliquable se limitait aux
   lettres elles-mêmes, ce qui oblige à viser. `px-3 py-2` porte la cible à
   36 px de haut — au-dessus des 24 px minimum recommandés par le WCAG (2.5.8)
   et confortable au doigt sur mobile. Le fond au survol rend en plus la zone
   visible avant le clic. */
const NavigationLink = memo(
  ({ link, onNavigate, surSombre }: { link: { name: string; path: string }; onNavigate: (path: string) => void; surSombre: boolean }) => (
    <button
      onClick={() => onNavigate(link.path)}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        surSombre
          ? 'text-white/85 hover:bg-white/10 hover:text-white'
          : 'text-ink-700 hover:bg-ink-100 hover:text-brand-600'
      }`}
    >
      {link.name}
    </button>
  )
);
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  /* Transparent uniquement au sommet d'une page à hero sombre. Dès qu'on
     défile, l'en-tête repasse en blanc : le contenu qui passe dessous est
     clair, un texte blanc y deviendrait illisible. */
  const surSombre = ROUTES_HERO_SOMBRE.has(pathname) && !scrolled;
  const goTo = useCallback((path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);
  const navigation = [
    { name: 'Accueil', path: '/' },
    { name: 'Nos Services', path: '/nos-services' },
    { name: 'Hébergement', path: '/hebergement' },
    { name: 'Contactez moi', path: '/contact' },
  ];
  return (
    /* Deux états, et non un seul :
        - au sommet d'une page à hero sombre, l'en-tête se fond dans le hero et
          tout son contenu passe en clair ;
        - partout ailleurs, fond blanc et contenu sombre.
       Le problème d'origine n'était pas la transparence mais le fait que le
       texte restait gris foncé dans les deux cas : sur le hero de l'accueil,
       les liens de navigation étaient illisibles jusqu'au premier défilement.
       C'est la COULEUR DU CONTENU qui devait suivre le fond, pas le fond qui
       devait être supprimé. */
    <header
      className={`fixed z-50 w-full transition-[background-color,box-shadow] duration-300 ${
        surSombre ? 'bg-transparent py-2' : 'bg-white/95 backdrop-blur-md py-2'
      } ${scrolled ? 'py-1 shadow-md' : ''}`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <img src="/images/Logo.webp" alt="Zenix Logo" width={200} height={80} className="h-20 w-auto" fetchPriority="high" />
            </Link>
          </div>
          {}
          {/* `space-x-8` remplacé par `gap-1` : l'écart de 2 rem séparait des
              boutons sans rembourrage. Maintenant que chaque lien a sa propre
              zone, un écart d'un cran suffit et les cibles restent jointives
              sans se toucher visuellement. */}
          <nav className="hidden items-center gap-1 md:flex">
            {navigation.map((link) => (
              <NavigationLink key={link.path} link={link} surSombre={surSombre} onNavigate={(p: string) => { trackEvent('nav_click', { destination: p, location: 'header' }); goTo(p); }} />
            ))}
          </nav>
          {}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => { trackEvent('contact_click', { source: 'header', cta: 'me_contacter' }); goTo('/contact'); }}
              className="whitespace-nowrap rounded-full bg-brand-600 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-brand-700 active:scale-[0.98]"
            >
              Me Contacter
            </button>
            {/* Lien externe : vrai <a>, pas un bouton de routeur — la cible est
                un autre déploiement, sur un sous-domaine distinct.

                Le contour était gris (ink-300/ink-700), ce qui le faisait
                passer pour un élément désactivé à côté du bouton bleu plein. Il
                reprend maintenant le bleu de marque : deux actions clairement
                lisibles, hiérarchisées par le remplissage — plein pour le devis
                (la conversion visée), contour pour l'espace client (réservé aux
                clients déjà signés). */}
            <a
              href={ESPACE_CLIENT_URL}
              onClick={() => trackEvent('espace_client_click', { location: 'header' })}
              className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-5 py-2.5 font-semibold transition-colors ${
                surSombre
                  ? 'border-white/40 text-white hover:border-white hover:bg-white/10'
                  : 'border-brand-600 text-brand-600 hover:bg-brand-50'
              }`}
            >
              <LogIn className="h-4 w-4" aria-hidden="true" />
              Mon Espace Client
            </a>
          </div>
          {}
          <button
            className={`focus:outline-none md:hidden ${surSombre ? 'text-white' : 'text-ink-700'}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg py-4 px-6 animate-fadeIn">
            <nav className="flex flex-col space-y-4">
              {navigation.map((link) => (
                <button
                  key={link.path}
                  onClick={() => { trackEvent('nav_click', { destination: link.path, device: 'mobile' }); goTo(link.path); }}
                  className="rounded-lg px-3 py-3 text-left font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-brand-600"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => { trackEvent('contact_click', { source: 'header', cta: 'me_contacter', device: 'mobile' }); goTo('/contact'); }}
                className="mt-2 rounded-lg bg-brand-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-700 active:scale-[0.98]"
              >
                Me Contacter
              </button>
              {/* Le panneau mobile a toujours un fond blanc : pas de variante
                  sombre à gérer ici. */}
              <a
                href={ESPACE_CLIENT_URL}
                onClick={() => trackEvent('espace_client_click', { location: 'header', device: 'mobile' })}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-600 px-5 py-3 font-semibold text-brand-600 transition-colors hover:bg-brand-50"
              >
                <LogIn className="h-4 w-4" aria-hidden="true" />
                Mon Espace Client
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
export default memo(Header);