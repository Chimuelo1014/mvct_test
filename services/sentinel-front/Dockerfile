# Etapa 1 — Build del frontend
FROM node:20-slim AS builder

WORKDIR /app

# ✅ Recibir VITE_API_URL como argumento de build
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY package*.json ./
RUN npm install

COPY . .
RUN chmod +x node_modules/.bin/vite
RUN npm run build

# Etapa 2 — Servir con NGINX
FROM nginx:1.25-alpine

WORKDIR /usr/share/nginx/html

# ✅ Copiar el build
COPY --from=builder /app/dist .

# ✅ Configuración de Nginx para SPA
RUN echo 'server { \
    listen 3000; \
    location / { \
        root /usr/share/nginx/html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]