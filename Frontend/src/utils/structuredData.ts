export const SITE_URL = "https://zenixweb.fr";

/** Profils officiels. `sameAs` sert à Google pour relier ces comptes à l'entité
 *  « Zenix Web » : sans lui, chaque profil est vu comme une entité distincte. */
const SAME_AS = [
  "https://www.linkedin.com/in/enzo-monnet-mata-3a1888378/",
  "https://www.instagram.com/zenix_web/"
];

/** Adresse réelle de l'entreprise (celle du SIRET et des mentions légales).
 *  Elle indiquait auparavant « Lyon », ce qui contredisait les documents
 *  légaux : une incohérence de NAP (Name-Address-Phone) dégrade la confiance
 *  que Google accorde à l'entité. La rue n'est volontairement pas exposée ici :
 *  ville et code postal suffisent à Google pour rattacher l'entité, et
 *  l'adresse complète figure déjà au Registre National des Entreprises.
 *
 *  PAS DE `telephone` ICI, ET C'EST DÉLIBÉRÉ. Le JSON-LD est pré-rendu dans le
 *  HTML brut : y placer le numéro le servirait en clair à tout ce qui télécharge
 *  la page, ce qui annulerait la protection mise en place dans les mentions
 *  légales (cf. src/config/contact.ts et le composant ProtectedValue).
 *  Le NAP reste donc incomplet et le référencement local un peu moins fort :
 *  c'est le prix assumé pour ne pas exposer un numéro personnel aux
 *  moissonneurs. À rouvrir le jour où une ligne professionnelle dédiée existe —
 *  elle pourra alors figurer ici sans réserve. */
const BUSINESS_ADDRESS = {
  "@type": "PostalAddress",
  "addressLocality": "Saint-Georges-de-Reneins",
  "postalCode": "69830",
  "addressRegion": "Auvergne-Rhône-Alpes",
  "addressCountry": "FR"
};

/** Zone d'intervention, du plus proche au plus large.
 *  L'ordre compte : Villefranche-sur-Saône et le Beaujolais viennent en tête
 *  parce que c'est là que l'entreprise est établie et où elle peut réellement
 *  se classer. Lyon reste déclarée — c'est la bonne façon d'annoncer qu'on y
 *  intervient sans prétendre y être domicilié. */
const AREA_SERVED = [
  { "@type": "City", "name": "Villefranche-sur-Saône" },
  { "@type": "AdministrativeArea", "name": "Beaujolais" },
  { "@type": "City", "name": "Lyon" },
  { "@type": "AdministrativeArea", "name": "Rhône" },
  { "@type": "AdministrativeArea", "name": "Auvergne-Rhône-Alpes" },
  { "@type": "Country", "name": "France" }
];

/** `ProfessionalService` plutôt qu'`Organization` : c'est un sous-type de
 *  LocalBusiness, éligible aux résultats locaux. Sur des requêtes du type
 *  « développeur web Lyon », c'est ce typage qui permet à Google de rattacher
 *  le site à une zone géographique. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  "name": "Zenix Web",
  "alternateName": "Zenix",
  "url": SITE_URL,
  "logo": {
    "@type": "ImageObject",
    "url": `${SITE_URL}/images/Logo.webp`,
    "width": 512,
    "height": 512
  },
  "image": `${SITE_URL}/images/Logo.webp`,
  "description": "Création de sites web, hébergement managé et maintenance pour les entreprises, associations et indépendants. Sites vitrine, e-commerce et landing pages, hébergés en France.",
  "slogan": "Votre site à votre image, comme vous, unique",
  // Format ISO partiel accepté. Indiquait « 2024 », alors que l'entreprise a
  // été créée en septembre 2025 : une divergence avec les données publiques du
  // RNE n'apporte rien et fragilise l'entité aux yeux de Google.
  "foundingDate": "2025-09",
  "email": "contact@zenixweb.fr",
  // Pas de `vatID` : cette propriété attend un numéro d'identification TVA au
  // format FRXX999999999. Elle contenait « TVA non applicable, art. 293 B du
  // CGI », qui est une mention de facture, pas un numéro — un validateur le
  // signale en erreur. L'entreprise étant en franchise en base, elle n'a
  // simplement pas de numéro de TVA : la propriété n'a pas lieu d'être.
  // La mention légale, elle, figure bien sur les factures, dans les mentions
  // légales et à l'article 5 des CGV.
  "taxID": "99141360000016",
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Virement bancaire, Carte bancaire, Prélèvement SEPA",
  "founder": {
    "@type": "Person",
    "@id": `${SITE_URL}/#enzo-monnet-mata`
  },
  "address": BUSINESS_ADDRESS,
  "areaServed": AREA_SERVED,
  "knowsLanguage": "fr-FR",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "contact@zenixweb.fr",
    "availableLanguage": "French",
    "url": `${SITE_URL}/contact`
  },
  "sameAs": SAME_AS
};
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#enzo-monnet-mata`,
  "name": "Enzo Monnet-Mata",
  "jobTitle": "Développeur web et administrateur d'infrastructure",
  "description": "Développeur web indépendant établi en Beaujolais. Création de sites vitrine, e-commerce et landing pages, hébergés et maintenus sur une infrastructure opérée en propre, en France.",
  // Le parcours de formation en cybersécurité (`affiliation` vers l'école) a été
  // retiré ici comme sur le reste du site : l'offre repose sur un abonnement
  // d'hébergement, et signaler « étudiant » comme trait d'identité de l'entité
  // travaille contre cet engagement de durée. La compétence reste déclarée dans
  // `knowsAbout`, où elle décrit ce qui est maîtrisé plutôt qu'un statut.
  "worksFor": { "@id": `${SITE_URL}/#organization` },
  "address": BUSINESS_ADDRESS,
  "image": `${SITE_URL}/images/profile-photo.webp`,
  "url": SITE_URL,
  "sameAs": SAME_AS,
  "knowsAbout": [
    "Développement web",
    "Création de site vitrine",
    "Site e-commerce",
    "Landing page",
    "Référencement naturel",
    "Hébergement web",
    "Kubernetes",
    "Cybersécurité",
    "React",
    "TypeScript",
    "Tailwind CSS"
  ]
};
export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Services de Développement Web",
  "description": "Services professionnels de développement web incluant la création de sites, l'hébergement, les mises à jour et la modification de sites web.",
  "provider": { "@id": `${SITE_URL}/#organization` },
  "serviceType": "Développement Web",
  "areaServed": AREA_SERVED,
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Services Web",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Création de Site Web",
          "description": "Conception et développement de sites web personnalisés adaptés à votre marque et vos objectifs commerciaux."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hébergement & Mises à Jour",
          "description": "Services d'hébergement fiables avec maintenance régulière et mises à jour pour garantir la sécurité de votre site."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Modification de Site Web",
          "description": "Améliorations et modifications de sites web existants pour optimiser leur fonctionnalité et leur design."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Design UI/UX",
          "description": "Interfaces utilisateur intuitives et expériences engageantes qui captiveront votre audience."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Optimisation SEO",
          "description": "Optimisation de votre site pour les moteurs de recherche afin d'augmenter sa visibilité et attirer plus de visiteurs."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Support Technique",
          "description": "Support technique continu pour résoudre les problèmes et assurer le bon fonctionnement de votre site."
        }
      }
    ]
  }
};
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  "name": "Zenix Web",
  "url": SITE_URL,
  "description": "Création de sites web, hébergement managé et maintenance. Sites vitrine, e-commerce et landing pages, hébergés en France.",
  "inLanguage": "fr-FR",
  "publisher": { "@id": `${SITE_URL}/#organization` }
  // Pas de `SearchAction` : le site n'a pas de moteur de recherche interne.
  // En déclarer un que l'URL ne sait pas traiter est une donnée structurée
  // fausse, que Google peut signaler comme telle.
};
export const consultationSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Devis gratuit et échange sur votre projet web",
  "description": "Échange gratuit pour analyser vos besoins et vous proposer un devis personnalisé de création ou de refonte de site web. Réponse sous 24 heures.",
  "provider": { "@id": `${SITE_URL}/#organization` },
  "serviceType": "Consultation Web",
  "areaServed": AREA_SERVED,
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "description": "Devis gratuit et sans engagement",
    "availability": "https://schema.org/InStock",
    "url": `${SITE_URL}/contact`
  },
  // Le canal est le formulaire du site. La mention « Calendly » figurait ici
  // alors qu'aucun Calendly n'est proposé nulle part sur le site.
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": `${SITE_URL}/contact`,
    "serviceName": "Formulaire de demande de devis"
  }
};

/** Fil d'Ariane. Google s'en sert pour remplacer l'URL brute par un chemin
 *  lisible dans les résultats de recherche. */
export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});
export const hostingServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Hébergement Web Haute Performance",
  "description": "Offres d'hébergement web avec cluster K3S, auto-scaling, Cloudflare et sauvegarde quotidienne. Maintenance et sécurité incluses.",
  "provider": { "@id": `${SITE_URL}/#organization` },
  "serviceType": "Hébergement Web",
  "areaServed": AREA_SERVED,
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Offres d'Hébergement",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Zenix Start",
          "description": "Hébergement haute performance avec cluster K3S, auto-scaling, Cloudflare, sauvegarde quotidienne et 2 petites modifications mensuelles. 39€/mois, TVA non applicable."
        },
        "price": "39",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Zenix Relax",
          "description": "Hébergement avec 6 petites modifications par mois incluses et rapport trimestriel. 69€/mois, TVA non applicable."
        },
        "price": "69",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Zenix Pro",
          "description": "Hébergement avec modifications illimitées (2h/mois), rapport mensuel et optimisations techniques SEO continues. 149€/mois, TVA non applicable."
        },
        "price": "149",
        "priceCurrency": "EUR"
      }
    ]
  }
};
export const vitrineServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Création de Site Vitrine Professionnel",
  "description": "Sites vitrine modernes, sécurisés et optimisés pour le SEO. Design responsive, sécurité renforcée, structured data JSON-LD.",
  "provider": { "@id": `${SITE_URL}/#organization` },
  "serviceType": "Développement Web",
  "areaServed": AREA_SERVED,
  "offers": {
    "@type": "Offer",
    "description": "Création de site vitrine professionnel avec SEO et sécurité optimisés",
    "availability": "https://schema.org/InStock"
  }
};
export const partnersServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Programme Partenaires Zenix - Hébergement Wholesale",
  "description": "Programme partenaires pour développeurs et agences : hébergement managé K3s en wholesale, white-label, infrastructure souveraine en France.",
  "provider": { "@id": `${SITE_URL}/#organization` },
  "serviceType": "Hébergement Web Wholesale",
  "areaServed": AREA_SERVED,
  "audience": {
    "@type": "BusinessAudience",
    "audienceType": "Développeurs web, agences digitales, freelances"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tarifs Wholesale",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pack 1 à 5 sites",
          "description": "Hébergement managé K3s en wholesale pour revente, 20€/site/mois, TVA non applicable."
        },
        "price": "20",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pack 6 à 20 sites",
          "description": "Hébergement managé K3s en wholesale pour revente, 17€/site/mois, TVA non applicable."
        },
        "price": "17",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pack 21+ sites",
          "description": "Hébergement managé K3s en wholesale pour revente, 14€/site/mois, TVA non applicable."
        },
        "price": "14",
        "priceCurrency": "EUR"
      }
    ]
  }
};
/** ATTENTION — ce schéma doit rester le miroir EXACT des questions/réponses
 *  affichées dans FAQ.tsx. Google exige que le contenu d'un FAQPage soit
 *  visible à l'identique sur la page ; un texte présent ici mais absent de
 *  l'écran est une donnée structurée trompeuse, susceptible d'une action
 *  manuelle. Toute modification ici doit être reportée là-bas, et inversement. */
export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qui se cache derrière Zenix ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zenix est portée par Enzo Monnet-Mata, développeur web et administrateur d'infrastructure, établi en Beaujolais. Je conçois le site, je l'héberge sur mes propres serveurs et j'en assure la maintenance : vous traitez directement avec moi, pas avec un commercial intermédiaire."
      }
    },
    {
      "@type": "Question",
      "name": "Où êtes-vous basé ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "À Saint-Georges-de-Reneins, en Beaujolais, entre Villefranche-sur-Saône et Lyon. J'interviens dans tout le Rhône et, à distance, partout en France. Les serveurs sont eux aussi situés en France."
      }
    },
    {
      "@type": "Question",
      "name": "Combien de temps pour mettre en ligne un site ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Une landing page simple : 5 à 10 jours. Un site vitrine : 2 à 4 semaines. Un e-commerce : 4 à 8 semaines."
      }
    },
    {
      "@type": "Question",
      "name": "C'est quoi une petite modification ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Changer un texte, remplacer une image, modifier un prix, une adresse, des horaires. Tout ce qui prend moins de 15 minutes."
      }
    },
    {
      "@type": "Question",
      "name": "Mon site est hébergé ailleurs, vous le migrez ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui. La migration depuis Wix, Squarespace, OVH, o2switch, WordPress ou autre est proposée en option à 69€ une fois, sans interruption visible pour vos visiteurs."
      }
    },
    {
      "@type": "Question",
      "name": "Que se passe-t-il si mon site a un problème ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "L'infrastructure se répare automatiquement pour la majorité des incidents. En dernier recours, restauration depuis sauvegarde quotidienne sous quelques minutes."
      }
    },
    {
      "@type": "Question",
      "name": "Mes données sont-elles bien en Europe ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Vos données et celles de vos visiteurs sont hébergées sur nos serveurs en France, et les sauvegardes restent dans l'Union européenne. Une seule exception, que nous préférons annoncer : le trafic transite par Cloudflare, société américaine, qui assure la protection anti-DDoS et le pare-feu. Le détail figure dans notre politique de confidentialité."
      }
    },
    {
      "@type": "Question",
      "name": "Y a-t-il un engagement de durée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Par défaut non : les offres d'hébergement sont mensuelles, sans durée minimale, résiliables avec un préavis d'un mois. Une option volontaire d'engagement sur 12 mois existe et offre le 12ᵉ mois."
      }
    },
    {
      "@type": "Question",
      "name": "Je suis développeur, puis-je revendre votre hébergement à mes clients ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Oui, c'est le programme partenaires. Tarifs wholesale dégressifs, white-label possible, vous gardez la relation client."
      }
    }
  ]
};
export const ecommerceServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Création de Site E-commerce Sécurisé",
  // Formulation à ne pas retoucher sans y regarder à deux fois : la
  // certification PCI DSS est détenue par Stripe, pas par Zenix. Écrire
  // « conformité PCI-DSS » sans préciser qui la détient revient à revendiquer
  // une qualification qu'on n'a pas.
  "description": "Boutiques en ligne avec paiement par carte traité par Stripe, certifié PCI DSS niveau 1, gestion des produits et référencement optimisé.",
  "provider": { "@id": `${SITE_URL}/#organization` },
  "serviceType": "Développement E-commerce",
  "areaServed": AREA_SERVED,
  "offers": {
    "@type": "Offer",
    "description": "Création de site e-commerce sécurisé avec paiement en ligne et gestion produits",
    "availability": "https://schema.org/InStock"
  }
};