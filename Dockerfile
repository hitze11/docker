# Stage 1: Builder
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Laufzeit
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 8081
HEALTHCHECK --interval=5s --timeout=3s CMD curl -f http://localhost:8081/ || exit 1