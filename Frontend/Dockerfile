# Image frontend : nginx servant le build statique Vite.
#
# On part de nginx-unprivileged : contrairement à l'image nginx officielle dont
# le process master tourne en root, celle-ci tourne intégralement en uid 101
# (nginx). C'est ce que SECURITY.md annonce, et ce n'était pas le cas avant.
# Conséquence : le serveur écoute sur 8080, un process non privilégié ne pouvant
# pas se binder sur un port < 1024.
FROM nginxinc/nginx-unprivileged:alpine

# Les correctifs Alpine et les COPY nécessitent root ; on repasse en nginx
# ensuite pour que le runtime reste non privilégié.
USER root

RUN apk update && apk upgrade --no-cache

WORKDIR /usr/share/nginx/html

# 1) Contenu de Public/ (images, robots.txt, sitemap.xml...)
COPY Public/ ./
# 2) dist/ par-dessus (index.html, assets/)
COPY dist/ ./

# Garde-fou : un build sans images est un build cassé, on échoue tôt.
RUN test -f ./images/Logo.webp || (echo "ERREUR: images/Logo.webp manquant" && exit 1)

# .htaccess est une config Apache : inerte dans une image nginx. On la supprime
# pour ne pas laisser croire qu'elle a un effet (elle n'en a jamais eu ici).
RUN rm -f ./.htaccess

# Active le renseignement de ${NGINX_LOCAL_RESOLVERS} depuis /etc/resolv.conf.
# Ce comportement est opt-in dans l'entrypoint officiel : sans cette variable,
# le script 15-local-resolvers.envsh sort immédiatement et le template est rendu
# avec un ${NGINX_LOCAL_RESOLVERS} littéral, ce qui empêche nginx de démarrer.
ENV NGINX_ENTRYPOINT_LOCAL_RESOLVERS=1

# La config est un template : l'entrypoint de l'image y substitue
# ${NGINX_LOCAL_RESOLVERS} au démarrage et écrit le résultat dans conf.d.
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

# On retire la config par défaut de l'image : si jamais le rendu du template
# échouait, nginx démarrerait sans aucun server block et la readiness probe
# échouerait franchement, au lieu de servir silencieusement le site sans nos
# headers de sécurité ni notre gestion des 404.
RUN rm -f /etc/nginx/conf.d/default.conf

# Le snippet vit hors de conf.d : tout *.conf présent dans conf.d est inclus
# automatiquement au niveau http, ce qui n'est pas ce qu'on veut pour un
# fragment destiné à être inclus dans chaque location.
RUN mkdir -p /etc/nginx/snippets
COPY nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf

RUN chown -R 101:101 /usr/share/nginx/html

# Validation de la config au build : une erreur de syntaxe fait échouer l'image
# ici, avant tout push GHCR, plutôt que de partir en production.
# On rend le template avec un résolveur factice, on teste, puis on nettoie —
# l'entrypoint regénérera le vrai fichier au démarrage.
#
# `nginx -t` s'exécute ici en root et laisse derrière lui un /tmp/nginx.pid
# appartenant à root ; l'uid 101 ne pourrait alors plus l'écrire au démarrage.
# On le supprime dans la même couche.
RUN sed 's|${NGINX_LOCAL_RESOLVERS}|127.0.0.11|' /etc/nginx/templates/default.conf.template \
      > /etc/nginx/conf.d/default.conf \
    && nginx -t \
    && rm -f /etc/nginx/conf.d/default.conf /tmp/nginx.pid

USER 101

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --spider -q http://127.0.0.1:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
