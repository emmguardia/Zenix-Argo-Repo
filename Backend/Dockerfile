FROM node:20-slim

ENV NODE_ENV=production
ENV NPM_CONFIG_LOGLEVEL=error
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV DEBIAN_FRONTEND=noninteractive

RUN groupadd -r appuser 2>/dev/null || true && useradd -r -g appuser -u 1000 appuser 2>/dev/null || true

WORKDIR /app

RUN npm install -g npm@latest > /dev/null 2>&1

RUN echo "update-notifier=false" > .npmrc && echo "loglevel=error" >> .npmrc

COPY package*.json ./

RUN if [ -f package-lock.json ]; then npm ci --omit=dev --no-audit --no-fund --loglevel=error; else npm install --omit=dev --no-audit --no-fund --loglevel=error; fi \
    && npm cache clean --force 2>/dev/null || true

COPY server.js ./
COPY lib/ ./lib/

RUN mkdir -p /app/secrets && chown -R 1000:1000 /app 2>/dev/null || true

VOLUME ["/app/secrets"]

USER 1000

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD node -e "const http=require('http');http.get('http://localhost:3000/health',(r)=>{process.exit(r.statusCode===200?0:1)}).on('error',()=>process.exit(1))"

CMD ["node", "server.js"]
