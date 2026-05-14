import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
interface BreadcrumbItem {
  name: string;
  path: string;
}
const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Accueil', path: '/' }
    ];
    let currentPath = '';
    pathSegments.forEach((segment) => {
      currentPath += `/${segment}`;
      const name = getSegmentName(segment);
      breadcrumbs.push({ name, path: currentPath });
    });
    return breadcrumbs;
  };
  const getSegmentName = (segment: string): string => {
    const segmentNames: { [key: string]: string } = {
      'landing': 'Landing Page',
      'hebergement': 'Hébergement',
      'site-vitrine': 'Site Vitrine',
      'site-ecommerce': 'Site E-commerce',
      'nos-services': 'Nos Services',
      'contact': 'Contact',
      'mentions-legales': 'Mentions Légales',
      'politique-confidentialite': 'Politique de Confidentialité',
      'conditions-vente': 'Conditions de Vente',
    };
    return segmentNames[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };
  const breadcrumbs = getBreadcrumbs();
  if (location.pathname === '/') {
    return null;
  }
  return (
    <nav className="bg-slate-50 py-4" aria-label="Fil d'Ariane">
      <div className="container mx-auto px-6">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.path} className="flex items-center">
              {index === 0 && <Home className="w-4 h-4 mr-1" />}
              {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-slate-400" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-slate-600 font-medium" aria-current="page">
                  {breadcrumb.name}
                </span>
              ) : (
                <Link
                  to={breadcrumb.path}
                  className="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {breadcrumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};
export default Breadcrumbs;
