# ==============================================================================
# XTUR AI Vision Surveillance Platform - Production Dockerfile for Coolify
# Base Image: Nginx Alpine (Ultra-lightweight ~25MB, secure & high-performance)
# ==============================================================================
FROM nginx:alpine

# Set working directory to Nginx html folder
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy application files (HTML, CSS, JS, Assets, Exports)
COPY . .

# Expose HTTP port for Coolify / Traefik reverse proxy
EXPOSE 80

# Healthcheck to ensure container is healthy
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:80/ || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
