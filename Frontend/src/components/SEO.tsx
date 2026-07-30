import React, { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  structuredData?: object | object[];
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title = "Zenix | Services de Développement Web Expert",
  description = "Services professionnels de développement web incluant la création de sites, l'hébergement, les mises à jour et la modification de sites web. Obtenez un site web beau et fonctionnel pour votre entreprise.",
  keywords = "développement web, création site web, landing page, hébergement web, SEO, design web, Lyon, France, Enzo Monnet Mata",
  // Visuel de partage dédié au format 1200x630 attendu par les réseaux sociaux.
  // Le logo était utilisé auparavant alors qu'il est carré (2048x2048), tout en
  // étant déclaré en 1200x630 : les plateformes le recadraient mal.
  image = "https://zenixweb.fr/images/og-cover.webp",
  url = "https://zenixweb.fr",
  type = "website",
  structuredData,
  noindex = false
}) => {
  const sanitizeMetaContent = (content: string): string => {
    return content
      .replace(/[<>"']/g, '')
      .replace(/\r\n/g, ' ')
      .trim();
  };

  const fullTitle = title.includes("Zenix") ? title : `${title} | Zenix Web`;
  const robotsContent = noindex ? "noindex, nofollow" : "index, follow";
  const canonicalUrl = url && url.startsWith('http') ? url : `https://zenixweb.fr${url.startsWith('/') ? url : '/' + url}`;

  useEffect(() => {
    document.title = sanitizeMetaContent(fullTitle);

    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = sanitizeMetaContent(content);
    };

    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }
      element.href = href;
    };

    // Retire TOUS les blocs JSON-LD, y compris ceux écrits dans le HTML au
    // build par scripts/prerender-seo.mjs. Ne supprimer que les blocs marqués
    // `data-seo-dynamic` laisserait cohabiter le JSON-LD pré-rendu et celui
    // injecté à l'hydratation, soit chaque schéma déclaré deux fois.
    // Au runtime, ce composant est seul responsable des données structurées.
    const removeScripts = (type: string) => {
      document.querySelectorAll(`script[type="${type}"]`).forEach((script) => script.remove());
    };

    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'Enzo Monnet Mata');
    updateMetaTag('robots', robotsContent);
    updateMetaTag('language', 'fr');
    updateMetaTag('revisit-after', '7 days');

    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:url', canonicalUrl, 'property');
    updateMetaTag('og:title', fullTitle, 'property');
    updateMetaTag('og:description', description, 'property');
    updateMetaTag('og:image', image, 'property');
    updateMetaTag('og:image:width', '1200', 'property');
    updateMetaTag('og:image:height', '630', 'property');
    updateMetaTag('og:site_name', 'Zenix Web', 'property');
    updateMetaTag('og:locale', 'fr_FR', 'property');

    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', canonicalUrl);
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    // Pas de twitter:creator : aucun compte X n'est rattaché à Zenix.

    const safeCanonicalUrl = canonicalUrl.replace(/[<>"']/g, '');
    updateLinkTag('canonical', safeCanonicalUrl);

    removeScripts('application/ld+json');

    if (structuredData) {
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];
      dataArray.forEach((data) => {
        try {
          const script = document.createElement('script');
          script.type = 'application/ld+json';
          script.setAttribute('data-seo-dynamic', 'true');
          const sanitizedData = JSON.parse(JSON.stringify(data).replace(/[<>]/g, ''));
          script.textContent = JSON.stringify(sanitizedData);
          document.head.appendChild(script);
        } catch (err) {
          console.error('Error adding structured data:', err);
        }
      });
    }
  }, [fullTitle, description, keywords, image, canonicalUrl, type, robotsContent, structuredData]);

  return null;
};

export default SEO;
