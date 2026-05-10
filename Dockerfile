# syntax=docker/dockerfile:1.6

# ---- Build stage ---------------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
RUN npm run build

# ---- Runtime stage -------------------------------------------------------
FROM node:20-alpine AS runtime

WORKDIR /app

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=4321

# Copy lockfile + manifest, install only production deps.
COPY --from=builder /app/package.json /app/package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund \
    && npm cache clean --force \
    && chown -R node:node /app

# Copy compiled output. Public assets (referenced by /images/...) are emitted
# inside dist/client by the Astro Node adapter — no separate copy needed.
COPY --chown=node:node --from=builder /app/dist ./dist

USER node

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
