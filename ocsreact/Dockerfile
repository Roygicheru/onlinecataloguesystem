# --- Stage 1: Build React app ---
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files first to leverage layer caching
COPY package*.json ./
RUN npm ci --silent

# Copy rest and build
COPY . .
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:1.27-alpine
# Replace default nginx config with our custom config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
