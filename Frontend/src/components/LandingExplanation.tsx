import { TrendingUp, Smartphone, Zap, Target } from 'lucide-react';
const LandingExplanation = () => {
  return (
    <section className="py-20 bg-white pt-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          {/* h1 : la page /landing n'en avait aucun. */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Création de Landing Page optimisée pour la conversion
          </h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Une landing page est une page web spécialement conçue pour convertir vos visiteurs en clients.
            Contrairement à un site web classique, elle se concentre sur un objectif précis : générer des leads ou des ventes.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Pourquoi une Landing Page ?</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Conversion optimisée</h4>
                  <p className="text-slate-600">Tous les éléments sont pensés pour guider le visiteur vers l'action souhaitée.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-violet-100 p-2 rounded-lg">
                  <Smartphone className="w-6 h-6 text-violet-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Responsive design</h4>
                  <p className="text-slate-600">Parfaitement adaptée à tous les écrans, mobile, tablette et desktop.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Chargement rapide</h4>
                  <p className="text-slate-600">Optimisée pour des performances maximales et un meilleur référencement.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-amber-100 p-2 rounded-lg">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">Message ciblé</h4>
                  <p className="text-slate-600">Un message clair et percutant qui parle directement à votre audience.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8">
            <h4 className="text-xl font-bold text-slate-800 mb-4">Exemples d'utilisation</h4>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Lancement d'un nouveau produit ou service
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Campagne publicitaire ciblée
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Collecte d'emails pour newsletter
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Promotion d'un événement
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                Téléchargement d'un lead magnet
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LandingExplanation;
