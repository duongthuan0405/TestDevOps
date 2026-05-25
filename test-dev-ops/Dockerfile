FROM node:24-alpine3.22 AS dependencies
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN npm install

FROM node:24-alpine3.22 AS builder
WORKDIR /app
COPY --from=dependencies /app/node_modules/ ./node_modules/
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:24-alpine3.22 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder --chown=node:node /app/public/ ./public/
COPY --from=builder --chown=node:node /app/.next/ ./.next/

USER node
EXPOSE 3000

ENTRYPOINT ["start", "server.js"]
