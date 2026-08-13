import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  /** Libellé de la page courante. Le maillon « Accueil » est ajouté ici. */
  current: string;
}

/**
 * Fil d'Ariane des pages internes.
 *
 * Utile à deux titres : il donne à Google un chemin de navigation lisible qui
 * remplace l'URL brute dans les résultats de recherche (le BreadcrumbList
 * correspondant est injecté par le composant SEO), et il ajoute un lien de
 * remontée vers l'accueil sur chaque page.
 */
const Breadcrumbs = ({ current }: BreadcrumbsProps) => (
  // pt-28 et non pt-24 : l'en-tête fixe mesure 96 px, un padding de 96 px
  // collerait le texte contre son bord inférieur.
  <nav aria-label="Fil d'Ariane" className="bg-ink-50 border-b border-ink-100 pt-28 pb-3">
    <div className="container mx-auto px-6">
      <ol className="flex flex-wrap items-center gap-y-1 text-sm">
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center text-ink-500 hover:text-brand-600 transition-colors"
          >
            <Home className="w-4 h-4 mr-1.5" aria-hidden="true" />
            Accueil
          </Link>
        </li>
        <li className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-2 text-ink-300" aria-hidden="true" />
          <span className="text-ink-700 font-medium" aria-current="page">
            {current}
          </span>
        </li>
      </ol>
    </div>
  </nav>
);

export default Breadcrumbs;
