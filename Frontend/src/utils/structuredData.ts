export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Zenix Web",
  "alternateName": "Zenix",
  "url": "https://www.zenixweb.fr",
  "logo": "https://www.zenixweb.fr/images/Logo.webp",
  "description": "Services professionnels de développement web incluant la création de sites, l'hébergement, les mises à jour et la modification de sites web.",
  "foundingDate": "2024",
  "founder": {
    "@type": "Person",
    "name": "Enzo Monnet Mata",
    "jobTitle": "Développeur Web & Étudiant Cybersécurité",
    "alumniOf": "Guardia",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lyon",
      "addressCountry": "FR"
    }
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lyon",
    "addressCountry": "FR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "url": "https://www.zenixweb.fr/contact"
  },
  "sameAs": [
    "https://www.zenixweb.fr"
  ],
  "serviceArea": {
    "@type": "Country",
    "name": "France"
  }
};
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Enzo Monnet Mata",
  "jobTitle": "Développeur Web & Étudiant Cybersécurité",
  "description": "Étudiant en cybersécurité à Guardia, passionné par le développement web et la création d'expériences digitales uniques.",
  "alumniOf": "Guardia",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Lyon",
    "addressCountry": "FR"
  },
  "image": "https://www.zenixweb.fr/images/profile-photo.webp",
  "url": "https://www.zenixweb.fr",
  "knowsAbout": [
    "Développement Web",
    "Landing Pages",
    "SEO",
    "UI/UX Design",
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
  "provider": {
    "@type": "Organization",
    "name": "Zenix Web",
    "url": "https://www.zenixweb.fr"
  },
  "serviceType": "Développement Web",
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
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
  "name": "Zenix Web",
  "url": "https://www.zenixweb.fr",
  "description": "Services professionnels de développement web incluant la création de sites, l'hébergement, les mises à jour et la modification de sites web.",
  "publisher": {
    "@type": "Organization",
    "name": "Zenix Web",
    "url": "https://www.zenixweb.fr"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.zenixweb.fr/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};
export const consultationSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Consultation gratuite - Développement Landing Page",
  "description": "Consultation gratuite de 15 minutes pour analyser vos besoins en développement de landing page et vous proposer une solution personnalisée.",
  "provider": {
    "@type": "Person",
    "name": "Enzo Monnet Mata",
    "jobTitle": "Développeur Web & Étudiant Cybersécurité",
    "url": "https://www.zenixweb.fr"
  },
  "serviceType": "Consultation Web",
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "EUR",
    "description": "Consultation gratuite de 15 minutes",
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-01-01",
    "url": "https://www.zenixweb.fr/contact"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://www.zenixweb.fr/contact",
    "serviceName": "Calendly - Prise de rendez-vous",
  },
  "hoursAvailable": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "18:00"
  }
};
export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
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
  "provider": {
    "@type": "Organization",
    "name": "Zenix Web",
    "url": "https://www.zenixweb.fr"
  },
  "serviceType": "Hébergement Web",
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Offres d'Hébergement",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Zenix Start",
          "description": "Hébergement haute performance avec cluster K3S, auto-scaling, Cloudflare, sauvegarde quotidienne et 2 petites modifications mensuelles. 39€ HT/mois."
        },
        "price": "39",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Zenix Relax",
          "description": "Hébergement avec 6 petites modifications par mois incluses et rapport trimestriel. 69€ HT/mois."
        },
        "price": "69",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Zenix Pro",
          "description": "Hébergement avec modifications illimitées (2h/mois), rapport mensuel et optimisations techniques SEO continues. 149€ HT/mois."
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
  "provider": {
    "@type": "Organization",
    "name": "Zenix Web",
    "url": "https://www.zenixweb.fr"
  },
  "serviceType": "Développement Web",
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
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
  "provider": {
    "@type": "Organization",
    "name": "Zenix Web",
    "url": "https://www.zenixweb.fr"
  },
  "serviceType": "Hébergement Web Wholesale",
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
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
          "description": "Hébergement managé K3s en wholesale pour revente, 20€/site/mois HT."
        },
        "price": "20",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pack 6 à 20 sites",
          "description": "Hébergement managé K3s en wholesale pour revente, 17€/site/mois HT."
        },
        "price": "17",
        "priceCurrency": "EUR"
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Pack 21+ sites",
          "description": "Hébergement managé K3s en wholesale pour revente, 14€/site/mois HT."
        },
        "price": "14",
        "priceCurrency": "EUR"
      }
    ]
  }
};
export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qui se cache derrière Zenix ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Zenix est portée par Enzo Monnet Mata, développeur web freelance basé à Lyon, étudiant en cybersécurité à Guardia."
      }
    },
    {
      "@type": "Question",
      "name": "Où êtes-vous basé ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "À Lyon, en France. Les serveurs sont également hébergés en France, ce qui garantit la souveraineté des données et la conformité RGPD."
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
        "text": "Oui. La migration depuis Wix, Squarespace, OVH, o2switch, WordPress ou autre est proposée en option à 99€ une fois, sans interruption visible pour vos visiteurs."
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
        "text": "Oui. Hébergement physique en France, sauvegardes en UE. Pas de transfert vers les États-Unis pour les données client."
      }
    },
    {
      "@type": "Question",
      "name": "Y a-t-il un engagement de durée ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Non. Toutes les offres d'hébergement sont sans engagement, facturées au mois. Vous pouvez résilier à tout moment avec un préavis d'un mois."
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
  "description": "Boutiques en ligne sécurisées avec paiement intégré, gestion produits, SEO e-commerce optimisé. Conformité PCI-DSS.",
  "provider": {
    "@type": "Organization",
    "name": "Zenix Web",
    "url": "https://www.zenixweb.fr"
  },
  "serviceType": "Développement E-commerce",
  "areaServed": {
    "@type": "Country",
    "name": "France"
  },
  "offers": {
    "@type": "Offer",
    "description": "Création de site e-commerce sécurisé avec paiement en ligne et gestion produits",
    "availability": "https://schema.org/InStock"
  }
};