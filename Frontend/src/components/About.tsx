import { useEffect, useRef, useState } from 'react';
import { Award, BarChart, Code, Clock, Users } from 'lucide-react';
const About = () => {
  const [animate, setAnimate] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);
  const stats = [
    { icon: <Award className="w-6 h-6" />, value: "1+", label: "Année d'Expérience" },
    { icon: <Code className="w-6 h-6" />, value: "10+", label: "Sites Web Créés" },
    { icon: <Users className="w-6 h-6" />, value: "10+", label: "Clients Satisfaits" },
    { icon: <BarChart className="w-6 h-6" />, value: "100%", label: "Fidélisation Client" },
  ];
  return (
    <section id="about" className="py-20 bg-slate-50" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">À Propos de Moi</h2>
            <div className="h-1 w-20 bg-blue-600 mb-6"></div>
            <div className={`space-y-4 transition-all duration-700 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-slate-600">
                Étudiant passionné en cybersécurité, je crée des sites web à mon temps libre depuis plusieurs années. Cette expérience pratique m'a permis de développer une approche unique qui combine sécurité et design.
              </p>
              <p className="text-slate-600">
                Mon parcours en cybersécurité m'a appris l'importance de la prudence et de la rigueur dans chaque projet. Je m'engage à créer des sites web non seulement esthétiques mais aussi sécurisés et performants.
              </p>
              <p className="text-slate-600">
                Mon approche est centrée sur l'écoute et la compréhension des besoins de mes clients. Je prends le temps de bien comprendre vos objectifs pour vous proposer des solutions adaptées et sécurisées.
              </p>
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Pourquoi Me Choisir ?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-blue-600 p-1 rounded text-white mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-600">Expertise en sécurité et développement web</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-600 p-1 rounded text-white mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-600">Approche personnalisée et attentive à vos besoins</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-600 p-1 rounded text-white mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-600">Sites web sécurisés et optimisés</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-600 p-1 rounded text-white mr-3 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-600">Communication transparente et réactive</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`transition-all duration-1000 delay-300 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="bg-white rounded-xl shadow-xl p-8 relative before:absolute before:inset-0 before:bg-blue-600 before:rounded-xl before:-z-10 before:translate-x-4 before:translate-y-4">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors">
                    <div className="inline-flex p-3 bg-blue-100 text-blue-600 rounded-full mb-3">
                      {stat.icon}
                    </div>
                    <h4 className="text-3xl font-bold text-blue-600 mb-1">{stat.value}</h4>
                    <p className="text-sm text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-slate-900 rounded-lg text-white">
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 text-blue-400 mr-2" />
                  <h4 className="text-lg font-semibold">Temps de Réponse Rapide</h4>
                </div>
                <p className="text-slate-300 text-sm">
                  Je crois en la communication rapide. La plupart des demandes reçoivent une réponse sous 24 heures, et les mises à jour du projet sont fournies régulièrement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;