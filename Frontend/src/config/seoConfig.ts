/**
 * Métadonnées SEO par page.
 *
 * Contraintes respectées ici, car Google tronque au-delà :
 *   - title       : ~60 caractères max, mot-clé principal en tête, marque à la fin.
 *   - description : ~155 caractères max. Elle n'est pas un facteur de classement,
 *                   mais c'est le texte qui décide du clic : un bénéfice concret
 *                   y vaut mieux qu'une accumulation de mots-clés.
 *
 * Ces valeurs sont aussi celles injectées en dur dans le HTML au build par
 * scripts/prerender-seo.mjs — c'est donc ici, et nulle part ailleurs, qu'on
 * modifie un titre ou une description.
 *
 * ANCRAGE GÉOGRAPHIQUE — Beaujolais, et non Lyon.
 * Le site revendiquait « Lyon » dans ses titres et descriptions alors que le
 * SIRET, les mentions légales et les CGV déclarent Saint-Georges-de-Reneins,
 * à une trentaine de kilomètres. Pour Google, le signal le plus fort est le NAP
 * (nom, adresse, téléphone), pas le title : demander à ranker sur une ville où
 * l'entreprise n'est pas domiciliée revient à s'auto-contredire.
 * L'ancrage est donc Villefranche-sur-Saône — la ville de référence du
 * Beaujolais, à 8 km du siège, celle que les prospects tapent réellement
 * (personne ne cherche « site web Saint-Georges-de-Reneins »).
 * Lyon n'est pas abandonnée pour autant : elle reste déclarée en `areaServed`
 * dans les données structurées, ce qui est la façon correcte d'annoncer une
 * zone d'intervention sans prétendre y être établi.
 *
 * Plus de champ `keywords` : la balise correspondante est ignorée par Google
 * depuis 2009 et par Bing, et ne servait qu'à publier le ciblage aux concurrents.
 */
export const seoConfig = {
  home: {
    title: "Création de site web à Villefranche-sur-Saône | Zenix Web",
    description:
      "Développeur web indépendant en Beaujolais : sites vitrine, e-commerce et landing pages, avec hébergement managé en France. Devis gratuit sous 24 h.",
    url: "https://zenixweb.fr/",
  },
  landing: {
    title: "Création de landing page qui convertit | Zenix Web",
    description:
      "Landing page sur mesure pensée pour la conversion : design moderne, chargement rapide, formulaire intégré. Devis gratuit sous 24 h.",
    url: "https://zenixweb.fr/landing",
  },
  contact: {
    title: "Devis gratuit pour votre site web | Zenix Web",
    description:
      "Décrivez votre projet et recevez un devis personnalisé sous 24 h. Site vitrine, e-commerce ou landing page, en Beaujolais et partout en France.",
    url: "https://zenixweb.fr/contact",
  },
  mentionsLegales: {
    title: "Mentions légales | Zenix Web",
    description:
      "Mentions légales du site zenixweb.fr : éditeur, hébergeur, propriété intellectuelle et traitement des données personnelles.",
    url: "https://zenixweb.fr/mentions-legales",
  },
  politiqueConfidentialite: {
    title: "Politique de confidentialité | Zenix Web",
    description:
      "Comment vos données personnelles sont collectées et protégées : finalités, durées de conservation, droits RGPD et mesure d'audience sans cookie.",
    url: "https://zenixweb.fr/politique-confidentialite",
  },
  conditionsVente: {
    title: "Conditions générales de vente | Zenix Web",
    description:
      "CGV de Zenix Web : prestations, prix, délais, propriété intellectuelle, hébergement, garantie et responsabilité. Version 3.1 en vigueur.",
    url: "https://zenixweb.fr/conditions-vente",
  },
  confirmation: {
    title: "Message envoyé | Zenix Web",
    description: "Votre demande a bien été envoyée. Je vous réponds sous 24 heures.",
    url: "https://zenixweb.fr/confirmation",
  },
  hosting: {
    title: "Hébergement web managé en France | Zenix Web",
    description:
      "Hébergement et maintenance de votre site : serveurs en France, sauvegardes quotidiennes, sécurité incluse. Dès 39 €/mois, sans engagement.",
    url: "https://zenixweb.fr/hebergement",
  },
  vitrine: {
    title: "Création de site vitrine professionnel | Zenix Web",
    description:
      "Site vitrine sur mesure, rapide, sécurisé et optimisé pour le référencement. Design responsive et hébergement en France. Devis gratuit sous 24 h.",
    url: "https://zenixweb.fr/site-vitrine",
  },
  ecommerce: {
    title: "Création de site e-commerce sécurisé | Zenix Web",
    description:
      "Boutique en ligne complète : catalogue produits, paiement sécurisé, gestion des commandes et référencement optimisé. Devis gratuit sous 24 h.",
    url: "https://zenixweb.fr/site-ecommerce",
  },
  typesDeSites: {
    title: "Nos services de création de sites web | Zenix Web",
    description:
      "Landing page pour convertir, site vitrine pour présenter votre activité, e-commerce pour vendre en ligne. Trouvez la solution adaptée à votre projet.",
    url: "https://zenixweb.fr/nos-services",
  },
  faq: {
    title: "Questions fréquentes | Zenix Web",
    description:
      "Délais, tarifs, hébergement, sécurité, RGPD, modifications : les réponses aux questions les plus posées sur la création et l'hébergement de sites web.",
    url: "https://zenixweb.fr/faq",
  },
  partners: {
    title: "Programme partenaires revendeurs | Zenix Web",
    description:
      "Développeurs et agences : hébergement managé en wholesale dès 14 €/site, en marque blanche. Marge récurrente et infrastructure en France.",
    url: "https://zenixweb.fr/partenaires",
  },
};
