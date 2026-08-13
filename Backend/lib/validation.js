/**
 * Validation et constantes partagées (testables sans dépendances runtime).
 */
/**
 * Types de projet proposés dans le formulaire de contact.
 *
 * La liste en comptait huit, dont deux variantes de landing page et deux
 * intitulés qui décrivaient un service plutôt qu'un projet (« Optimisation
 * SEO », « Support technique »). Un menu déroulant de huit entrées fait hésiter
 * plus qu'il ne guide : le visiteur cherche laquelle est « la bonne » au lieu
 * de décrire son besoin. Six entrées, formulées du point de vue du client.
 *
 * ATTENTION — ces clés sont dupliquées côté formulaire
 * (Frontend/src/components/ContactPage.tsx). Toute modification ici doit y être
 * reportée, sinon l'email d'alerte affiche la clé brute au lieu du libellé.
 */
export const projectLabels = {
  'site-vitrine': 'Un site vitrine',
  'landing-page': 'Une landing page',
  'ecommerce': 'Une boutique en ligne',
  'refonte': 'La refonte d’un site existant',
  'hebergement': 'L’hébergement d’un site existant',
  'autre': 'Autre projet'
};

/**
 * Délai souhaité.
 *
 * Les durées chiffrées ont été retirées : « Rapide (4-6 jours) » ou
 * « Détendu (2 semaines tarif réduit) » annonçaient un engagement de délai et
 * une remise avant même d'avoir lu le projet. Le délai réel se discute au devis.
 */
export const timelineLabels = {
  'rapide': 'Rapide',
  'normal': 'Normal',
  'presse': 'Pressé',
  'ne-sais-pas': 'Je ne sais pas'
};

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export function isValidEmail(email) {
  return typeof email === 'string' && EMAIL_REGEX.test(email);
}

export function getProjectLabel(project) {
  return projectLabels[project] || project;
}

export function getTimelineLabel(timeline) {
  return timelineLabels[timeline] || timeline;
}

/**
 * Limiteur de débit en mémoire, par clé (ici l'IP), sur fenêtre glissante.
 *
 * Volontairement sans dépendance ni Redis : le backend tourne sur 1 à 4 replicas
 * et l'objectif n'est pas de compter au message près, mais d'empêcher qu'un
 * script fasse partir des centaines d'emails. Chaque replica applique sa propre
 * limite ; dans le pire cas (4 replicas) le plafond effectif est multiplié par 4,
 * ce qui reste très loin d'un abus.
 */
export function createRateLimiter({ windowMs, max, now = () => Date.now() } = {}) {
  const hits = new Map();

  return function isAllowed(key) {
    const current = now();
    const windowStart = current - windowMs;

    // Purge opportuniste : évite que la Map grossisse indéfiniment sans avoir
    // à faire tourner un timer.
    for (const [k, timestamps] of hits) {
      const kept = timestamps.filter((t) => t > windowStart);
      if (kept.length === 0) hits.delete(k);
      else hits.set(k, kept);
    }

    const timestamps = (hits.get(key) || []).filter((t) => t > windowStart);
    if (timestamps.length >= max) {
      return false;
    }

    timestamps.push(current);
    hits.set(key, timestamps);
    return true;
  };
}

/**
 * Détermine l'IP du client pour la limitation de débit.
 *
 * ATTENTION — ne pas remplacer ceci par `app.set('trust proxy', true)` + `req.ip`.
 * Avec cette option, Express retient l'entrée la plus à GAUCHE de
 * `X-Forwarded-For`, et nginx se contente d'ajouter l'IP réelle à la suite de ce
 * que le client a envoyé. Un attaquant qui envoie lui-même un
 * `X-Forwarded-For: 1.2.3.4` pilote donc entièrement la valeur retenue, et lui
 * suffit de la faire varier pour annuler toute limitation.
 *
 * On s'appuie sur `CF-Connecting-IP`, que Cloudflare écrit lui-même et écrase
 * systématiquement s'il est fourni par le client. Tout le trafic légitime passe
 * par Cloudflare (le site n'est joignable que par lui).
 *
 * Limite connue : quelqu'un capable d'atteindre l'origine sans passer par
 * Cloudflare pourrait forger cet en-tête. C'est une question de filtrage réseau
 * en amont, pas applicative — et le honeypot reste la première barrière.
 */
export function getClientIp(req) {
  const cloudflareIp = req.headers?.['cf-connecting-ip'];
  if (typeof cloudflareIp === 'string' && cloudflareIp.trim().length > 0) {
    return cloudflareIp.trim();
  }
  // Repli : adresse de la socket. En cas d'accès direct à l'origine, toutes les
  // requêtes partagent alors le même compteur, ce qui reste un comportement sûr.
  return req.socket?.remoteAddress || 'inconnue';
}

/**
 * Détecte le remplissage d'un champ piège (honeypot).
 *
 * Le champ est présent dans le DOM mais invisible et hors du parcours clavier :
 * un humain ne peut pas le remplir, la majorité des bots remplissent tout ce
 * qu'ils trouvent. On répond ensuite 200 sans rien envoyer, pour ne pas
 * apprendre au bot que sa soumission a été rejetée.
 */
export function isHoneypotTriggered(value) {
  return typeof value === 'string' && value.trim().length > 0;
}
