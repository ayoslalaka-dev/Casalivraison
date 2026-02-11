# backend/Dockerfile
FROM node:18-alpine

# Install netcat for health check
RUN apk add --no-cache netcat-openbsd

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Copy and set permissions for entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose port
EXPOSE 3000

# Use entrypoint script
ENTRYPOINT ["docker-entrypoint.sh"]
