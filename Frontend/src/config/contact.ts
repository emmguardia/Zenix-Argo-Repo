/**
 * Coordonnées obligatoires au titre de l'article 6-III-1 de la LCEN, stockées
 * encodées.
 *
 * POURQUOI ENCODÉES
 * La loi impose de publier le téléphone et l'adresse du siège de l'éditeur.
 * Les écrire en clair revient à les offrir aux moissonneurs, qui parcourent le
 * web à la recherche de motifs `0X XX XX XX XX` et d'adresses postales pour
 * alimenter des bases de démarchage. L'encodage base64 ne rend pas la valeur
 * secrète — il la rend simplement invisible aux expressions régulières, ce qui
 * suffit à écarter l'immense majorité de ces robots.
 *
 * CE QUE ÇA NE PROTÈGE PAS
 *   - Un moissonneur qui pilote un vrai navigateur voit la page comme un
 *     humain, donc la valeur décodée.
 *   - Ce dépôt est public : n'importe qui peut lire ces constantes et les
 *     décoder. Si cela devient gênant, la parade est de les injecter au build
 *     via des variables d'environnement (`VITE_CONTACT_*`) alimentées par un
 *     secret GitHub — la valeur disparaît alors du dépôt, mais reste présente
 *     dans le bundle JavaScript déployé, qui est public par nature.
 *   - L'adresse d'une entreprise individuelle est de toute façon diffusée par
 *     l'INSEE sur annuaire-entreprises.data.gouv.fr. Une demande de
 *     non-diffusion peut être adressée à l'INSEE : c'est gratuit et c'est le
 *     seul levier qui retire réellement l'adresse des bases publiques.
 *
 * L'affichage passe par <ProtectedValue>, qui ne décode qu'après le premier
 * rendu, côté navigateur.
 */

/** « 06 17 06 31 44 » — affiché tel quel. */
export const CONTACT_PHONE_DISPLAY = 'MDYgMTcgMDYgMzEgNDQ=';

/** « tel:+33617063144 » — cible du lien, au format international. */
export const CONTACT_PHONE_HREF = 'dGVsOiszMzYxNzA2MzE0NA==';

/** Adresse complète du siège, telle qu'exigée par la LCEN. */
export const CONTACT_ADDRESS_FULL =
  'NTQ1IGNoZW1pbiBkZXMgVmlnbmVyb25zLCA2OTgzMCBTYWludC1HZW9yZ2VzLWRlLVJlbmVpbnMsIEZyYW5jZQ==';

/**
 * Décode une valeur base64 en UTF-8.
 *
 * `atob` seul rend une chaîne d'octets : « é » y arriverait en deux caractères
 * parasites. On repasse donc explicitement par TextDecoder.
 */
export function decodeContact(encoded: string): string {
  try {
    const bytes = Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return '';
  }
}
