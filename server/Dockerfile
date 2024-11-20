# Server Dockerfile
ARG NODE_VERSION=20-alpine
FROM node:${NODE_VERSION}

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire server code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]

LABEL maintainer=$'Bùi Tá Phát'