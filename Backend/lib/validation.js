/**
 * Validation et constantes partagées (testables sans dépendances runtime).
 */
export const projectLabels = {
  'landing-page-devis': 'Landing Page (devis personnalisé)',
  'landing-page-standard': 'Landing Page Standard (100€)',
  'site-vitrine': 'Site Vitrine Multi-pages',
  'hebergement': 'Hébergement (Site Vitrine ou Landing Page)',
  'refonte': 'Refonte (Site Vitrine ou Landing Page)',
  'optimisation-seo': 'Optimisation SEO',
  'support-technique': 'Support technique',
  'autre': 'Autre projet'
};

export const timelineLabels = {
  'urgent': 'Rapide (4-6 jours)',
  'rapide': 'Normal (7 jours)',
  'normal': 'Détendu (2 semaines tarif réduit)',
  'flexible': 'Pas pressé (1 mois tarif réduit)'
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
