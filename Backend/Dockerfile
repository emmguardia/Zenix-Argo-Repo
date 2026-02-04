FROM node:20-alpine

ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=error
ENV NPM_CONFIG_UPDATE_NOTIFIER=false

# Mise à jour des paquets Alpine (correctifs sécurité)
RUN apk update && apk upgrade --no-cache

RUN addgroup -g 10000 appuser && adduser -D -u 10000 -G appuser appuser

WORKDIR /app

RUN npm install -g npm@latest > /dev/null 2>&1 \
    && npm install -g tar@7.5.7 \
    && (cd /usr/local/lib/node_modules/npm && npm install tar@7.5.7) 2>/dev/null || true

RUN echo "update-notifier=false" > .npmrc && echo "loglevel=error" >> .npmrc

COPY package*.json ./

RUN if [ -f package-lock.json ]; then npm ci --omit=dev --no-audit --no-fund --loglevel=error; else npm install --omit=dev --no-audit --no-fund --loglevel=error; fi \
    && npm cache clean --force 2>/dev/null || true

COPY server.js ./
COPY lib/ ./lib/

RUN mkdir -p /app/secrets && chown -R 10000:10000 /app

VOLUME ["/app/secrets"]

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD node -e "const http=require('http');http.get('http://localhost:3000/health',(r)=>{process.exit(r.statusCode===200?0:1)}).on('error',()=>process.exit(1))"

CMD ["node", "server.js"]
