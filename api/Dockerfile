# --- Stage 1: build do frontend Next.js (static export) ---
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build
# gera a pasta /app/frontend/out (next export)

# --- Stage 2: build da API ---
FROM node:20-alpine AS api-build
WORKDIR /app
COPY api/package*.json ./
RUN npm ci
COPY api/ ./
RUN npx prisma generate
RUN npm run build
# gera /app/dist (JS compilado do TypeScript)

# --- Stage 3: imagem final ---
FROM node:20-alpine
WORKDIR /app

# Copia so o necessario pra rodar em producao
COPY --from=api-build /app/package*.json ./
COPY --from=api-build /app/dist ./dist
COPY --from=api-build /app/prisma ./prisma
COPY --from=api-build /app/node_modules ./node_modules
COPY --from=frontend-build /app/frontend ./frontend
# inclui o frontend completo (node_modules + codigo-fonte + /out) porque o
# server.ts dispara "npm run build" em runtime quando um artigo e publicado

ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", "dist/server.js"]