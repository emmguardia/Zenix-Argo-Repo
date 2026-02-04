import { CheckCircle, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import SEO from '../components/SEO';
import { seoConfig } from '../config/seoConfig';
const Confirmation = () => {
  useEffect(() => {
    try {
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (w.gtag) {
        w.gtag('event', 'ads_conversion_Demande_de_devis_1', {});
      }
    } catch { /* gtag not available */ }
  }, []);
  return (
    <>
      <SEO
        title={seoConfig.confirmation.title}
        description={seoConfig.confirmation.description}
        url={seoConfig.confirmation.url}
        keywords={seoConfig.confirmation.keywords}
        noindex={true}
      />
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-4">
            Message Envoyé avec Succès !
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            Merci de m'avoir contacté. Je vous répondrai dans les plus brefs délais.
          </p>
        </div>
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">
              Prochaines Étapes
            </h2>
            <ul className="text-left space-y-3 text-blue-700">
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                <span>Je vais examiner votre demande dans les 24 heures</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                <span>Vous recevrez une réponse détaillée par email</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                <span>Nous pourrons ensuite planifier un appel pour discuter de votre projet</span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retour à l'accueil
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
export default Confirmation; 