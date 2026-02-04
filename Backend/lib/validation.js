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
