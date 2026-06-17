FROM node:22-bookworm-slim AS dependencies

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --omit=dev --build-from-source=sqlite3

FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production
ENV PORT=3000
ENV DB_PATH=/data/biblioteca.db

WORKDIR /app

RUN mkdir -p /data \
    && chown -R node:node /data /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY --chown=node:node package*.json ./
COPY --chown=node:node auth.js server.js ./
COPY --chown=node:node Controller ./Controller
COPY --chown=node:node Database ./Database
COPY --chown=node:node Public ./Public
COPY --chown=node:node Repositories ./Repositories
COPY --chown=node:node Router ./Router
COPY --chown=node:node Service ./Service
COPY --chown=node:node views ./views

USER node

EXPOSE 3000

VOLUME ["/data"]

CMD ["npm", "start"]
