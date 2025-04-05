# Stage 1: Build
FROM node:16-alpine AS builder
WORKDIR /app

# Optimize caching
COPY package*.json ./  
RUN npm install

# Listele: /app dizinindeki mevcut dosyaları kontrol et
RUN echo "Listing /app directory:" && ls -l /app

# Copy the rest of the client code
COPY public ./public      
COPY src ./src             
COPY assets ./assets      


# Build the app
RUN npm run build

# Listele: /app/build dizinini kontrol et (build işlemi sonrası)
RUN echo "Listing /app/build directory:" && ls -l /app/build

# Stage 2: Serve using nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
