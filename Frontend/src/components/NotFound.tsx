import { Link } from 'react-router-dom';
import { Home, ArrowRight, SearchX } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { useEffect } from 'react';

const suggestions = [
  { name: 'Nos Services', path: '/nos-services' },
  { name: 'Hébergement', path: '/hebergement' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
];

const NotFound = () => {
  useEffect(() => {
    trackEvent('page_not_found', { path: window.location.pathname });
  }, []);

  return (
    <section className="py-20 bg-white pt-32 min-h-[70vh] flex items-center">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-6">
          <SearchX className="w-8 h-8 text-blue-600" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold text-blue-600 mb-2">Erreur 404</p>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Cette page n'existe pas</h1>
        <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-lg text-slate-600 mb-8">
          Le lien est peut-être erroné, ou la page a été déplacée. Voici les pages les plus consultées :
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {suggestions.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => trackEvent('nav_click', { destination: item.path, source: '404' })}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium py-2 px-5 rounded-full transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <Link
          to="/"
          onClick={() => trackEvent('nav_click', { destination: '/', source: '404', cta: 'retour_accueil' })}
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-lg active:scale-95"
        >
          <Home className="w-5 h-5 mr-2" aria-hidden="true" />
          Retour à l'accueil
          <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
