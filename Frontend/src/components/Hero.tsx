import { useEffect, useState } from 'react';
import { ChevronDown, Code, Layout, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';
const Hero = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const id = requestAnimationFrame(() => setFadeIn(true));
    return () => cancelAnimationFrame(id);
  }, []);
  const goToServices = () => {
    navigate('/nos-services');
  };
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 overflow-hidden pt-20 md:min-h-[80vh] lg:min-h-screen hero-compact">
      <div className="absolute w-full h-full">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-blue-600/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            className={`transition-all duration-1000 ${
              fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Création de sites web en Beaujolais — Villefranche-sur-Saône et Lyon
            </h1>
            {}
            <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-blue-200 mb-6 leading-tight">
              Votre site à votre image, comme vous, unique
            </div>
            <p className="text-lg text-slate-300 mb-8 max-w-xl">
              Spécialiste des <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">Landing Pages</span> rapides, modernes et orientées conversion. Configurez votre page et obtenez un devis gratuit en quelques clics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => { trackEvent('contact_click', { source: 'hero', cta: 'devis_gratuit' }); navigate('/contact'); }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
              >
                Faire un Devis Gratuit
              </button>
              <button
                onClick={() => { trackEvent('nav_click', { destination: '/nos-services', source: 'hero', cta: 'decouvrir_services' }); navigate('/nos-services'); }}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-full transition-all border border-white/20 active:scale-95"
              >
                Découvrir Mes Services
              </button>
            </div>
          </div>
          <div 
            className={`relative hidden md:block transition-all duration-1000 delay-300 ${
              fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl shadow-2xl border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center mb-3">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="ml-4 text-sm text-slate-400">zenixweb.fr</div>
              </div>
              <div className="space-y-3">
                <div className="h-2 bg-gradient-to-r from-blue-500 to-violet-500 rounded w-3/4"></div>
                <div className="h-2 bg-slate-700 rounded w-full"></div>
                <div className="h-2 bg-slate-700 rounded w-5/6"></div>
                <div className="h-2 bg-slate-700 rounded w-4/6"></div>
                <div className="h-8 bg-slate-700 rounded w-full mt-6"></div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="h-24 bg-slate-700 rounded"></div>
                  <div className="h-24 bg-slate-700 rounded"></div>
                  <div className="h-24 bg-slate-700 rounded"></div>
                  <div className="h-24 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-5 bg-blue-600 text-white p-4 rounded-lg shadow-lg animate-bounce-slow">
              <Layout className="w-6 h-6" />
            </div>
            <div className="absolute -top-5 -left-5 bg-violet-600 text-white p-4 rounded-lg shadow-lg animate-pulse">
              <Code className="w-6 h-6" />
            </div>
            <div className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-amber-500 text-white p-4 rounded-lg shadow-lg animate-float">
              <Rocket className="w-6 h-6" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hidden sm:block">
          <button onClick={() => { trackEvent('nav_click', { destination: '/nos-services', source: 'hero', cta: 'decouvrir_services_bas' }); goToServices(); }} className="flex flex-col items-center group">
            <span className="text-sm font-medium mb-2 group-hover:text-blue-400 transition-colors">Découvrez mes services</span>
            <ChevronDown className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
};
export default Hero;