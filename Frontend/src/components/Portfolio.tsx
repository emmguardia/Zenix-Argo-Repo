import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Eye, Code2, X, } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const projects = [
    {
      title: "Site E-commerce de Toilettage",
      description: "Plateforme d'e-commerce complète et responsive, offrant une gestion intégrale des produits et des commandes, ainsi qu'une solution de paiement en ligne sécurisée.",
      image: "/images/domainedesrevesbleus.webp",
      technologies: ["React", "MongoDB", "TailwindCSS", "Node.js", "K3s", "Vite","Python"],
      category: "Site E-commerce",
      url: "https://domainedesrevesbleus.eu/"
    },
    {
      title: "Site Vitrine Portfolio",
      description: "Portfolio personnel entièrement réalisé sur mesure pour présenter mes projets, compétences et expériences professionnelles.",
      image: "/images/portfolio-zenix.webp",
      technologies: ["Node.js", "MariaDB", "K3s", "Vite","PHP","MySQL"],
      category: "Site Vitrine",
      url: "https://portfolio.zenixweb.fr/"
    },
    {
      title: "Site de Vente de Collier, Laisse et Harnais pour Chien",
      description: "Boutique en ligne complète pour la vente de produits spécialisés. Intègre un système de catalogue, un panier d'achat sécurisé et une interface d'administration pour la gestion des stocks.",
      image: "/images/vente-produits-chien.webp",
      technologies: ["React", "MongoDB", "TailwindCSS", "Node.js", "K3s", "Vite"],
      category: "Site E-commerce",
      url: "https://clos-de-la-reine.zenixweb.fr/"
    },
    {
      title: "Site pour une Association de Cuisine",
      description: "Site institutionnel pour l'association, la présentation des membres et une section dédiée au partage de recettes.",
      image: "/images/portfolio-zenix.webp",
      technologies: ["Node.js", "TailwindCSS", "K3s", "Vite","React"],
      category: "Site Vitrine",
      url: "#"
    },
    {
      title: "Blog de Cybersécurité",
      description: "Blog de cybersécurité pour partager mes connaissances et mes expériences en cybersécurité.",
      image: "/images/blog-cybersécurité.webp",
      technologies: ["Node.js", "TailwindCSS", "K3s", "Vite","React"],
      category: "Blog",
      url: "https://blog-cyber.zenixweb.fr/"
    }
  ];
  const isSingle = projects.length === 1;
  useEffect(() => {
    if (!sectionRef.current) return;
    const el = sectionRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trackEvent('section_view', { id: 'portfolio' });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <section id="portfolio" className="py-12 md:py-16 bg-slate-50 pt-20 md:pt-24 section-compact" ref={sectionRef}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">Mon Portfolio</h2>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Découvrez mes projets récents. Chaque création est unique et adaptée aux besoins de mes clients.
          </p>
        </div>
        <div className={isSingle ? "grid grid-cols-1 gap-6 md:gap-8 place-items-center" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"}>
          {projects.map((project, index) => (
            <div key={index} className={isSingle ? "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group max-w-xl w-full" : "bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"}>
              <div 
                className="h-48 bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center overflow-hidden relative cursor-pointer"
                onClick={() => setSelectedImage(project.image)}
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  width={400}
                  height={300}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="text-center hidden">
                  <Code2 className="w-12 h-12 text-blue-600 mx-auto mb-2" />
                  <p className="text-slate-600 text-sm">Aucun Visuel disponible pour l'instant</p>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedImage(project.image)}
                      className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                      title="Voir l'image en grand"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => { trackEvent('portfolio_project_click', { title: project.title }); window.open(project.url, '_blank'); }}
                      className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
                      title="Voir le projet en ligne"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-4 text-sm">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-4xl max-h-full cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Aperçu du projet"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
};
export default Portfolio;