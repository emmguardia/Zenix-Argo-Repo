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
 */
export const seoConfig = {
  home: {
    title: "Création de site web à Lyon | Zenix Web",
    description:
      "Développeur web indépendant à Lyon : sites vitrine, e-commerce et landing pages, avec hébergement managé en France. Devis gratuit sous 24 h.",
    keywords:
      "création site web Lyon, développeur web Lyon, site vitrine, site e-commerce, landing page, hébergement web France",
    url: "https://zenixweb.fr/",
  },
  landing: {
    title: "Création de landing page qui convertit | Zenix Web",
    description:
      "Landing page sur mesure pensée pour la conversion : design moderne, chargement rapide, formulaire intégré. Devis gratuit sous 24 h.",
    keywords:
      "création landing page, landing page conversion, page d'atterrissage, landing page Lyon, générer des leads",
    url: "https://zenixweb.fr/landing",
  },
  contact: {
    title: "Devis gratuit pour votre site web | Zenix Web",
    description:
      "Décrivez votre projet et recevez un devis personnalisé sous 24 h. Site vitrine, e-commerce ou landing page, à Lyon et partout en France.",
    keywords:
      "devis site web gratuit, contact développeur web, créer un site internet, devis création site Lyon",
    url: "https://zenixweb.fr/contact",
  },
  mentionsLegales: {
    title: "Mentions légales | Zenix Web",
    description:
      "Mentions légales du site zenixweb.fr : éditeur, hébergeur, propriété intellectuelle et traitement des données personnelles.",
    keywords: "mentions légales, Zenix Web, éditeur du site, hébergeur",
    url: "https://zenixweb.fr/mentions-legales",
  },
  politiqueConfidentialite: {
    title: "Politique de confidentialité | Zenix Web",
    description:
      "Comment vos données personnelles sont collectées et protégées : finalités, durées de conservation, droits RGPD et mesure d'audience sans cookie.",
    keywords: "politique de confidentialité, RGPD, protection des données, cookies, Umami",
    url: "https://zenixweb.fr/politique-confidentialite",
  },
  conditionsVente: {
    title: "Conditions générales de vente | Zenix Web",
    description:
      "CGV de Zenix Web : prestations, prix, délais, propriété intellectuelle, hébergement, garantie et responsabilité. Version 3.0 en vigueur.",
    keywords: "CGV, conditions générales de vente, contrat création site web, prestation web",
    url: "https://zenixweb.fr/conditions-vente",
  },
  confirmation: {
    title: "Message envoyé | Zenix Web",
    description: "Votre demande a bien été envoyée. Je vous réponds sous 24 heures.",
    keywords: "confirmation, message envoyé",
    url: "https://zenixweb.fr/confirmation",
  },
  hosting: {
    title: "Hébergement web managé en France | Zenix Web",
    description:
      "Hébergement et maintenance de votre site : serveurs en France, sauvegardes quotidiennes, sécurité incluse. Dès 39 €/mois, sans engagement.",
    keywords:
      "hébergement web France, hébergement managé, maintenance site web, sauvegarde site, hébergement sécurisé, hébergement Kubernetes",
    url: "https://zenixweb.fr/hebergement",
  },
  vitrine: {
    title: "Création de site vitrine professionnel | Zenix Web",
    description:
      "Site vitrine sur mesure, rapide, sécurisé et optimisé pour le référencement. Design responsive et hébergement en France. Devis gratuit sous 24 h.",
    keywords:
      "création site vitrine, site vitrine professionnel, site vitrine Lyon, site internet entreprise, site vitrine sur mesure",
    url: "https://zenixweb.fr/site-vitrine",
  },
  ecommerce: {
    title: "Création de site e-commerce sécurisé | Zenix Web",
    description:
      "Boutique en ligne complète : catalogue produits, paiement sécurisé, gestion des commandes et référencement optimisé. Devis gratuit sous 24 h.",
    keywords:
      "création site e-commerce, boutique en ligne, vendre en ligne, site e-commerce Lyon, paiement sécurisé",
    url: "https://zenixweb.fr/site-ecommerce",
  },
  typesDeSites: {
    title: "Nos services de création de sites web | Zenix Web",
    description:
      "Landing page pour convertir, site vitrine pour présenter votre activité, e-commerce pour vendre en ligne. Trouvez la solution adaptée à votre projet.",
    keywords:
      "services création site web, types de sites internet, landing page, site vitrine, site e-commerce",
    url: "https://zenixweb.fr/nos-services",
  },
  faq: {
    title: "Questions fréquentes | Zenix Web",
    description:
      "Délais, tarifs, hébergement, sécurité, RGPD, modifications : les réponses aux questions les plus posées sur la création et l'hébergement de sites web.",
    keywords:
      "FAQ création site web, tarifs site internet, délai création site, questions hébergement web",
    url: "https://zenixweb.fr/faq",
  },
  partners: {
    title: "Programme partenaires revendeurs | Zenix Web",
    description:
      "Développeurs et agences : hébergement managé en wholesale dès 14 €/site, en marque blanche. Marge récurrente et infrastructure en France.",
    keywords:
      "hébergement revendeur, programme partenaire hébergement, white label hosting, hébergement agences web",
    url: "https://zenixweb.fr/partenaires",
  },
};
