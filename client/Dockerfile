# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Optimize caching
COPY package*.json ./  
RUN npm install

# Copy the rest of the client code
COPY public ./public      
COPY src ./src             
COPY src/Assets ./src/assets      


# Build the app
RUN npm run build

# Stage 2: Serve using nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
