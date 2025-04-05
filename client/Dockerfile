# Stage 1: Build
FROM node:16-alpine AS builder
WORKDIR /app

# Optimize caching
COPY package*.json ./
RUN npm install

# Copy rest of the client code
COPY public ./public
COPY src ./src

# Build the app
RUN npm run build

# Stage 2: Serve using nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
