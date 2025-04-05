# Stage 1: Build
FROM node:16-alpine AS builder
WORKDIR /app

# Optimize caching
COPY client/package*.json ./
RUN npm install

# Listele: /app dizinindeki mevcut dosyaları kontrol et
RUN echo "Listing /app directory:" && ls -l /app

# Copy the rest of the client code
COPY client/public ./public
COPY client/src ./src
COPY client/assets ./assets   # assets klasörünü doğru şekilde kopyala

# Listele: /app/src ve /app/assets dizinlerini kontrol et
RUN echo "Listing /app/src directory:" && ls -l /app/src
RUN echo "Listing /app/assets directory:" && ls -l /app/assets

# Build the app
RUN npm run build

# Listele: /app/build dizinini kontrol et (build işlemi sonrası)
RUN echo "Listing /app/build directory:" && ls -l /app/build

# Stage 2: Serve using nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

# Optional: add custom nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
