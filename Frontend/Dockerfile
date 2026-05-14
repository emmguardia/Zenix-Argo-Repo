FROM nginx:alpine

# Mise à jour des paquets Alpine (correctifs sécurité)
RUN apk update && apk upgrade --no-cache

WORKDIR /usr/share/nginx/html

# 1) Contenu de Public (images, robots, etc.) en premier
COPY Public/ ./
# 2) dist/ par-dessus (index.html, assets/)
COPY dist/ ./
# Vérification : au moins une image doit exister
RUN test -f ./images/Logo.webp || (echo "ERREUR: images/Logo.webp manquant" && exit 1)

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
