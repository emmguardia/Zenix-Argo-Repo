import { MapPin, Mail, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
const Footer = () => {
  const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
    try {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', eventName, params || {});
      }
    } catch { /* gtag not available */ }
  };
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <img src="/images/Logo.png" alt="Zenix Logo" className="h-32 w-auto" />
            </div>
            <p className="text-slate-400 mb-4">
              Développeur web freelance spécialisé dans la création de sites web modernes et performants.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.linkedin.com/in/enzo-monnet-mata-3a1888378/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                onClick={() => trackEvent('social_click', { platform: 'linkedin', location: 'footer' })}
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/zenix_web/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
                onClick={() => trackEvent('social_click', { platform: 'instagram', location: 'footer' })}
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-3">
              <p className="flex items-center text-slate-400">
                <Mail className="w-5 h-5 mr-2" />
                <a href="mailto:contact@zenixweb.fr" className="text-slate-400 hover:text-white transition-colors" onClick={() => trackEvent('contact_click', { method: 'email', location: 'footer' })}>
                  contact@zenixweb.fr
                </a>
              </p>
              <p className="flex items-center text-slate-400">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Lyon, France</span>
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/nos-services" className="hover:text-white transition-colors">Nos Services</Link></li>
              <li><Link to="/site-vitrine" className="hover:text-white transition-colors">Site Vitrine</Link></li>
              <li><Link to="/site-ecommerce" className="hover:text-white transition-colors">Site E-commerce</Link></li>
              <li><Link to="/landing" className="hover:text-white transition-colors">Landing Page</Link></li>
              <li><Link to="/hebergement" className="hover:text-white transition-colors">Hébergement</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-slate-400">
            <p>&copy; {new Date().getFullYear()} Zenix. Tous droits réservés.</p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 mt-4 md:mt-0">
              <Link to="/mentions-legales" className="hover:text-white transition-colors text-sm">
                Mentions Légales
              </Link>
              <Link to="/politique-confidentialite" className="hover:text-white transition-colors text-sm">
                Politique de Confidentialité
              </Link>
              <Link to="/conditions-vente" className="hover:text-white transition-colors text-sm">
                Conditions de Vente
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;