import { User, Code, Heart } from 'lucide-react';
const AboutMe = () => {
  return (
    <section id="about-me" className="py-12 md:py-16 bg-white pt-20 md:pt-24 section-compact">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">À propos de moi</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-4"></div>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Qui suis-je ?</h3>
                <p className="text-slate-600 text-sm md:text-base">
                  Étudiant en cybersécurité à Guardia, passionné par le développement web. Je combine mes compétences techniques avec une approche créative.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-violet-600 text-white p-3 rounded-lg">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Mon expertise</h3>
                <p className="text-slate-600 text-sm md:text-base">
                Formé en autodidacte, j'ai exploré le développement web pendant des années. Je crée des landing pages modernes et efficaces adaptées à chaque projet.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-600 text-white p-3 rounded-lg">
                <Heart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Ma passion</h3>
                <p className="text-slate-600 text-sm md:text-base">
                Chaque projet est l'occasion de repousser mes limites. Mon objectif : concevoir des expériences digitales uniques alliant design, performance et simplicité.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-8 text-center">
            <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white shadow-lg">
              <img 
                src="/images/profile-photo.jpg" 
                alt="Enzo Monnet Mata"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center" style={{display: 'none'}}>
                <User className="w-16 h-16 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Enzo Monnet Mata</h3>
            <p className="text-slate-600 mb-4">Développeur Web & Étudiant Cybersécurité</p>
            <div className="space-y-2 text-sm text-slate-500">
              <p>📍 Lyon, France</p>
              <p>🎓 Guardia - Cybersécurité</p>
              <p>💻 Auto-Entrepreneur et Développeur Web</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AboutMe;
