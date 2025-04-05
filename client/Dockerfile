# 1. Aşama: Build aşaması
FROM node:18-alpine as build

# Çalışma dizinini /app olarak ayarlıyoruz
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalayın
COPY package*.json ./

# Bağımlılıkları yükleyin
RUN npm install

# Tüm proje dosyalarını kopyalayın
COPY . .

# Dosya yapısını kontrol etmek için ls komutları ekleyelim
RUN echo "Listing /app directory:" && ls -l /app
RUN echo "Listing /app/src directory:" && ls -l /app/src
RUN echo "Listing /app/src/components directory:" && ls -l /app/src/components
RUN echo "Listing /app/src/assets directory:" && ls -l /app/src/assets

# Build işlemini çalıştırın
RUN npm run build

# 2. Aşama: Nginx ile dağıtım
FROM nginx:alpine

# Build edilen dosyaları Nginx'in html dizinine kopyalayın
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
