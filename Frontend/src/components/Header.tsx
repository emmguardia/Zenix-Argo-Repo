import { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
const NavigationLink = memo(({ link, onNavigate }: { link: { name: string; path: string }, onNavigate: (path: string) => void }) => (
  <button
    onClick={() => onNavigate(link.path)}
    className="text-slate-700 hover:text-blue-600 transition-colors font-medium text-sm"
  >
    {link.name}
  </button>
));
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
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-md py-1'
          : 'bg-transparent py-2'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <img src="/images/Logo.webp" alt="Zenix Logo" width={200} height={80} className="h-20 w-auto" fetchPriority="high" />
            </Link>
          </div>
          {}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((link) => (
              <NavigationLink key={link.path} link={link} onNavigate={(p: string) => { trackEvent('nav_click', { destination: p, location: 'header' }); goTo(p); }} />
            ))}
          </nav>
          {}
          <div className="hidden md:block">
            <button
              onClick={() => { trackEvent('contact_click', { source: 'header', cta: 'me_contacter' }); goTo('/contact'); }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Me Contacter
            </button>
          </div>
          {}
          <button
            className="md:hidden text-slate-700 focus:outline-none"
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
                  className="text-slate-700 hover:text-blue-600 transition-colors py-2 font-medium"
                >
                  {link.name}
                </button>
              ))}
              <button
                onClick={() => { trackEvent('contact_click', { source: 'header', cta: 'me_contacter', device: 'mobile' }); goTo('/contact'); }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg transition-all active:scale-95 mt-2"
              >
                Me Contacter
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
export default memo(Header);