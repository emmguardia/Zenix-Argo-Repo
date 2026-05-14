import React, { useEffect, useRef } from 'react';
import { Code, GanttChart, PenTool, Server, Settings, Wrench } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delayValue: string;
}
const ServiceCard = ({ icon, title, description, delayValue }: ServiceCardProps) => {
  return (
    <div className={`bg-white rounded-xl p-6 shadow-lg transition-all hover:shadow-xl hover:scale-105 duration-300 group data-[animate=true]:animate-fadeInUp animate-delay-${delayValue}`} data-animate="false">
      <div className="bg-blue-600 text-white p-3 rounded-lg inline-flex group-hover:bg-indigo-600 transition-colors duration-300 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-800">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};
const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const animatedElements = entry.target.querySelectorAll('[data-animate="false"]');
            animatedElements.forEach((animEl) => {
              animEl.setAttribute('data-animate', 'true');
            });
            trackEvent('section_view', { id: 'services' });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);
  const services = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Création de Site Web",
      description: "Conception et développement de sites web personnalisés adaptés à votre marque et vos objectifs commerciaux.",
      delayValue: "200"
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Hébergement & Mises à Jour",
      description: "Services d'hébergement fiables avec maintenance régulière et mises à jour pour garantir la sécurité de votre site.",
      delayValue: "400"
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Modification de Site Web",
      description: "Améliorations et modifications de sites web existants pour optimiser leur fonctionnalité et leur design.",
      delayValue: "600"
    },
    {
      icon: <PenTool className="w-6 h-6" />,
      title: "Design UI/UX",
      description: "Interfaces utilisateur intuitives et expériences engageantes qui captiveront votre audience.",
      delayValue: "800"
    },
    {
      icon: <GanttChart className="w-6 h-6" />,
      title: "Optimisation SEO",
      description: "Optimisation de votre site pour les moteurs de recherche afin d'augmenter sa visibilité et attirer plus de visiteurs.",
      delayValue: "1000"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Support Technique",
      description: "Support technique continu pour résoudre les problèmes et assurer le bon fonctionnement de votre site.",
      delayValue: "1200"
    },
  ];
  return (
    <section id="services" className="py-20 bg-slate-50 pt-32" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Mes Services</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Des solutions complètes de développement web pour aider votre entreprise à établir une présence en ligne forte.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delayValue={service.delayValue}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Services;