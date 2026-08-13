import { MapPin, Mail, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
const Footer = () => {
  return (
    <footer className="bg-ink-950 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <img src="/images/Logo.webp" alt="Zenix Logo" width={320} height={128} loading="lazy" className="h-32 w-auto" />
            </div>
            <p className="text-ink-400 mb-4">
              Développeur web freelance spécialisé dans la création de sites web modernes et performants.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/enzo-monnet-mata-3a1888378/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Profil LinkedIn d'Enzo Monnet Mata"
                className="text-ink-400 hover:text-white transition-colors"
                onClick={() => trackEvent('social_click', { platform: 'linkedin', location: 'footer' })}
              >
                <Linkedin className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="https://www.instagram.com/zenix_web/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Profil Instagram Zenix Web"
                className="text-ink-400 hover:text-white transition-colors"
                onClick={() => trackEvent('social_click', { platform: 'instagram', location: 'footer' })}
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-3">
              <p className="flex items-center text-ink-400">
                <Mail className="w-5 h-5 mr-2" />
                <a href="mailto:contact@zenixweb.fr" className="text-ink-400 hover:text-white transition-colors" onClick={() => trackEvent('contact_click', { source: 'footer', method: 'email' })}>
                  contact@zenixweb.fr
                </a>
              </p>
              <p className="flex items-center text-ink-400">
                <MapPin className="w-5 h-5 mr-2" />
                {/* Doit rester identique à l'adresse déclarée dans le JSON-LD
                    (structuredData.ts) et dans les mentions légales : le footer
                    apparaît sur toutes les pages, c'est le signal d'ancrage
                    local le plus lourd du site. Il affichait « Lyon, France »,
                    ce que contredisaient les documents légaux. */}
                <span>Saint-Georges-de-Reneins, 69830</span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-ink-400">
              <li><Link to="/nos-services" className="hover:text-white transition-colors" onClick={() => trackEvent('footer_link_click', { destination: '/nos-services', page: 'nos_services' })}>Nos Services</Link></li>
              <li><Link to="/site-vitrine" className="hover:text-white transition-colors" onClick={() => trackEvent('footer_link_click', { destination: '/site-vitrine', page: 'site_vitrine' })}>Site Vitrine</Link></li>
              <li><Link to="/site-ecommerce" className="hover:text-white transition-colors" onClick={() => trackEvent('footer_link_click', { destination: '/site-ecommerce', page: 'site_ecommerce' })}>Site E-commerce</Link></li>
              <li><Link to="/landing" className="hover:text-white transition-colors" onClick={() => trackEvent('footer_link_click', { destination: '/landing', page: 'landing' })}>Landing Page</Link></li>
              <li><Link to="/hebergement" className="hover:text-white transition-colors" onClick={() => trackEvent('footer_link_click', { destination: '/hebergement', page: 'hebergement' })}>Hébergement</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors" onClick={() => trackEvent('footer_link_click', { destination: '/faq', page: 'faq' })}>FAQ</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-ink-900 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-ink-400">
            <p>&copy; {new Date().getFullYear()} Zenix. Tous droits réservés.</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 mt-4 md:mt-0">
              <Link to="/mentions-legales" className="hover:text-white transition-colors text-sm">
                Mentions Légales
              </Link>
              <Link to="/politique-confidentialite" className="hover:text-white transition-colors text-sm">
                Politique de Confidentialité
              </Link>
              <Link to="/conditions-vente" className="hover:text-white transition-colors text-sm">
                Conditions de Vente
              </Link>
              {/* Lien volontairement discret, mais lisible : en ink-600 sur le
                  fond sombre du pied de page il ne donnait que 2,67:1, sous le
                  minimum WCAG. ink-400 le garde en retrait à 6,81:1. */}
              <Link
                to="/partenaires"
                className="text-ink-400 hover:text-white transition-colors text-xs"
                onClick={() => trackEvent('footer_link_click', { destination: '/partenaires', page: 'partenaires' })}
              >
                Partenaires
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;