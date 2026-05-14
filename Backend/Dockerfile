# syntax=docker/dockerfile:1.7
#
# Build multi-stage : on installe les deps dans un stage build, on ne garde dans
# l'image finale que node + node_modules + le code. npm/npx/corepack sont retirés
# du runtime car non nécessaires (on lance "node server.js"), ce qui élimine d'un
# coup toutes les CVEs récurrentes des paquets bundlés par npm (tar, cross-spawn,
# glob, minimatch, etc.). Plus de patches manuels à maintenir.

# ── Stage 1 : install des dépendances prod ───────────────────────────────────
FROM node:26-alpine AS deps

ENV NODE_ENV=production \
    PNPM_HOME=/pnpm \
    PATH=/pnpm:$PATH

# Maj des paquets Alpine (correctifs sécurité système)
RUN apk update && apk upgrade --no-cache

# Installe pnpm épinglé. On n'utilise pas corepack ici car il a été retiré du
# bundle Node à partir de Node 25/26. npm install -g fonctionne sur toutes les
# versions de Node et nous donne le même contrôle sur la version installée.
# npm sera de toute façon retiré du runtime stage final.
RUN npm install -g pnpm@10.33.4 --no-audit --no-fund

WORKDIR /app

# Copie des manifestes uniquement pour bénéficier du cache Docker tant qu'ils ne
# changent pas. .npmrc embarque minimum-release-age=1440 et ignore-scripts=true.
COPY package.json pnpm-lock.yaml .npmrc ./

# Install lockfile-strict, prod-only, sans scripts (déjà géré par .npmrc).
RUN pnpm install --prod --frozen-lockfile \
    && pnpm store prune 2>/dev/null || true

# ── Stage 2 : image runtime minimale ─────────────────────────────────────────
FROM node:26-alpine AS runtime

ENV NODE_ENV=production

# Maj sécu Alpine
RUN apk update && apk upgrade --no-cache

# Utilisateur non-root (uid 10000)
RUN addgroup -g 10000 appuser && adduser -D -u 10000 -G appuser appuser

# HARDENING SUPPLY-CHAIN : on retire npm, npx, corepack et leurs deps bundlées
# (tar, cross-spawn, glob, minimatch, etc.) car le runtime n'en a pas besoin.
# Toutes les CVEs habituelles sur ces paquets disparaissent automatiquement.
# Le binaire node est conservé tel quel.
RUN rm -rf \
      /usr/local/lib/node_modules/npm \
      /usr/local/lib/node_modules/corepack \
      /usr/local/bin/npm \
      /usr/local/bin/npx \
      /usr/local/bin/corepack \
      /opt/yarn-* \
      /usr/local/bin/yarn \
      /usr/local/bin/yarnpkg \
    && rm -rf /root/.npm /root/.cache 2>/dev/null || true

WORKDIR /app

# Récupère uniquement node_modules + manifestes depuis le stage deps
COPY --from=deps --chown=10000:10000 /app/node_modules ./node_modules
COPY --chown=10000:10000 package.json ./

# Code applicatif
COPY --chown=10000:10000 server.js ./
COPY --chown=10000:10000 lib/ ./lib/

# Dossier secrets monté en volume au runtime (Sealed Secret K8s)
RUN mkdir -p /app/secrets && chown -R 10000:10000 /app/secrets

VOLUME ["/app/secrets"]

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "const http=require('http');http.get('http://localhost:3000/health',(r)=>{process.exit(r.statusCode===200?0:1)}).on('error',()=>process.exit(1))"

CMD ["node", "server.js"]
