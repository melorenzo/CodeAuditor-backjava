# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve con Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# Config para que React Router funcione con rutas anidadas
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
