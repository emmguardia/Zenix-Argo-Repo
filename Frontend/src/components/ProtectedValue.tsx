import { useSyncExternalStore } from 'react';
import { decodeContact } from '../config/contact';

/**
 * Rien à observer : la valeur ne change jamais. On ne se sert de
 * `useSyncExternalStore` que pour sa capacité à distinguer le rendu navigateur
 * du rendu serveur, d'où cet abonnement vide mais stable (une fonction
 * recréée à chaque rendu provoquerait un réabonnement en boucle).
 */
const subscribe = () => () => {};
const onClient = () => true;
const onServer = () => false;

interface ProtectedValueProps {
  /** Valeur encodée en base64 (voir src/config/contact.ts). */
  encoded: string;
  /** Cible du lien, encodée elle aussi. Sans elle, la valeur est du texte simple. */
  hrefEncoded?: string;
  className?: string;
}

/**
 * Affiche une coordonnée sans qu'elle figure en clair dans le HTML servi.
 *
 * POURQUOI CE DÉTOUR PAR useSyncExternalStore
 * Aujourd'hui le corps de page est rendu côté client : décoder directement
 * pendant le rendu suffirait. Mais le chantier SEO à venir consiste précisément
 * à pré-rendre ce corps au moment du build (vite-react-ssg) — et un composant
 * qui décode pendant le rendu verrait alors sa valeur figée en clair dans le
 * HTML généré, annulant silencieusement toute la protection.
 * `useSyncExternalStore` distingue les deux contextes : son troisième argument
 * est l'instantané utilisé côté serveur (donc au pré-rendu), où il renvoie
 * `false` et laisse la valeur vide. La protection survivra à ce chantier sans
 * qu'on ait à y repenser.
 * (Un `useEffect` ferait le même travail, mais poserait un `setState` dans un
 * effet, ce que refuse la règle react-hooks/set-state-in-effect.)
 *
 * ACCESSIBILITÉ
 * Une fois affichée, c'est du texte normal : sélectionnable, copiable, lu par
 * les lecteurs d'écran. Aucun clic n'est demandé au visiteur, l'information
 * reste donc « librement accessible » au sens de la LCEN.
 *
 * SANS JAVASCRIPT
 * Rien ne s'affiche — mais le site entier étant une SPA, aucune page n'est
 * lisible sans JavaScript de toute façon. Ce composant ne dégrade rien.
 */
export default function ProtectedValue({ encoded, hrefEncoded, className }: ProtectedValueProps) {
  const isBrowser = useSyncExternalStore(subscribe, onClient, onServer);

  const value = isBrowser ? decodeContact(encoded) : '';
  const href = isBrowser && hrefEncoded ? decodeContact(hrefEncoded) : '';

  // Réserve la place avant l'affichage : sans cela, la ligne se décale d'un
  // cran au moment où la valeur arrive (Cumulative Layout Shift).
  if (!value) {
    return <span className={className} aria-hidden="true">&nbsp;</span>;
  }

  if (href) {
    return (
      <a href={href} className={className}>
        {value}
      </a>
    );
  }

  return <span className={className}>{value}</span>;
}
