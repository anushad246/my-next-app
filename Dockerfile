
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci


FROM node:20-alpine AS builder
WORKDIR /app

ARG APP_ENV=production
ENV APP_ENV=${APP_ENV}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN if [ "$APP_ENV" = "testing" ]; then \
      npm run build:testing; \
    else \
      npm run build:prod; \
    fi


FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ARG APP_ENV=production
ENV APP_ENV=${APP_ENV}

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

COPY --from=builder /app/public          ./public
COPY --from=builder /app/.next           ./.next
COPY --from=builder /app/node_modules    ./node_modules
COPY --from=builder /app/package.json    ./package.json
COPY --from=builder /app/next.config.ts  ./next.config.ts

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "-c", "if [ \"$APP_ENV\" = \"testing\" ]; then npm run start:testing; else npm run start:prod; fi"]
