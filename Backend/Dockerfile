FROM node:26-alpine

ENV NODE_ENV=production \
    NPM_CONFIG_LOGLEVEL=error \
    NPM_CONFIG_UPDATE_NOTIFIER=false \
    NPM_CONFIG_FUND=false \
    NPM_CONFIG_AUDIT=false \
    PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH

# Mise à jour des paquets Alpine (correctifs sécurité)
RUN apk update && apk upgrade --no-cache

# Utilisateur non-root pour le runtime (uid 10000)
RUN addgroup -g 10000 appuser && adduser -D -u 10000 -G appuser appuser

# Corriger CVE-2026-26960 (tar): forcer 7.5.8 dans le tar bundlé par npm
RUN npm install -g tar@7.5.8 \
    && NPM_TAR="/usr/local/lib/node_modules/npm/node_modules/tar" \
    && rm -rf "$NPM_TAR" \
    && mkdir -p "$(dirname "$NPM_TAR")" \
    && cp -r /usr/local/lib/node_modules/tar "$NPM_TAR" \
    && npm cache clean --force

# Corriger CVE-2024-21538 (cross-spawn), CVE-2025-64756 (glob), CVE-2026-27903/27904 (minimatch)
RUN npm install -g cross-spawn@7.0.5 glob@10.5.0 minimatch@10.2.3 \
    && G="/usr/local/lib/node_modules" \
    && for d in $(find "$G" -name "cross-spawn" -type d 2>/dev/null); do \
         [ "$d" = "$G/cross-spawn" ] && continue; \
         rm -rf "$d" && cp -r "$G/cross-spawn" "$d"; \
       done \
    && for d in $(find "$G" -name "glob" -type d 2>/dev/null); do \
         [ "$d" = "$G/glob" ] && continue; \
         rm -rf "$d" && cp -r "$G/glob" "$d"; \
       done \
    && for d in $(find "$G" -name "minimatch" -type d 2>/dev/null); do \
         [ "$d" = "$G/minimatch" ] && continue; \
         rm -rf "$d" && cp -r "$G/minimatch" "$d"; \
       done \
    && npm cache clean --force

# pnpm via corepack (bundlé avec Node 20). Version épinglée pour reproductibilité.
RUN corepack enable && corepack prepare pnpm@10.33.4 --activate

WORKDIR /app

# Copier les fichiers de manifeste + lockfile + config pnpm avant d'installer
# pour bénéficier du cache Docker tant qu'ils ne changent pas.
COPY package.json pnpm-lock.yaml .npmrc ./

# Installation des dépendances de production uniquement, lockfile strict.
# ignore-scripts=true dans .npmrc empêche l'exécution des postinstall malicieux.
# --frozen-lockfile : refuse si pnpm-lock.yaml ne correspond pas à package.json.
RUN pnpm install --prod --frozen-lockfile \
    && pnpm store prune 2>/dev/null || true

# Copier le code applicatif après l'install (les changements code n'invalident pas le cache install)
COPY server.js ./
COPY lib/ ./lib/

# Préparer les dossiers et passer en non-root
RUN mkdir -p /app/secrets && chown -R 10000:10000 /app

VOLUME ["/app/secrets"]

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "const http=require('http');http.get('http://localhost:3000/health',(r)=>{process.exit(r.statusCode===200?0:1)}).on('error',()=>process.exit(1))"

CMD ["node", "server.js"]
