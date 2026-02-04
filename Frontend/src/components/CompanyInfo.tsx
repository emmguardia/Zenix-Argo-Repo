import { Target, Users, Zap, Shield } from 'lucide-react';
const CompanyInfo = () => {
  return (
    <section id="company-info" className="py-12 md:py-16 bg-white pt-20 md:pt-24 section-compact">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Pourquoi je fais ça</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
          Pour moi, coder est plus qu'un travail : c'est un jeu. Chaque projet est un défi où je cherche le meilleur résultat. Ma mission : transformer cette passion en expériences digitales uniques.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Vision claire</h3>
            <p className="text-slate-600">
              Chaque projet commence par une compréhension approfondie de vos objectifs et de votre vision.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-violet-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-violet-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Approche humaine</h3>
            <p className="text-slate-600">
              Je privilégie une relation de confiance et un accompagnement personnalisé tout au long du projet.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Innovation constante</h3>
            <p className="text-slate-600">
              Je reste à la pointe des technologies pour vous offrir les solutions les plus modernes et efficaces.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">Qualité garantie</h3>
            <p className="text-slate-600">
              Chaque ligne de code est soigneusement écrite et testée pour garantir des performances optimales.
            </p>
          </div>
        </div>
        <div className="mt-8 md:mt-12 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-6 md:p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Mon engagement envers vous</h3>
          <p className="text-blue-100 max-w-3xl mx-auto">
            En tant qu'étudiant en cybersécurité, je comprends l'importance de la sécurité et de la fiabilité. 
            Chaque projet que je réalise respecte les meilleures pratiques de sécurité et de développement. 
            Votre succès est mon succès, et je m'engage à vous fournir des solutions qui dépassent vos attentes.
          </p>
        </div>
      </div>
    </section>
  );
};
export default CompanyInfo;
