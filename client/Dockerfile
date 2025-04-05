# 1. Aşama: Build aşaması
FROM node:18-alpine as build

# Çalışma dizinini /app olarak ayarlıyoruz
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalayın
COPY package*.json ./

# Bağımlılıkları yükleyin
RUN npm install

# Tüm proje dosyalarını kopyalayın (örn. src, public, vs.)
COPY . .

# Build işlemini çalıştırın
RUN npm run build

# 2. Aşama: Nginx ile dağıtım
FROM nginx:alpine

# Build edilen dosyaları Nginx'in html dizinine kopyalayın
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
