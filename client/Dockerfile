# Client Dockerfile
# Use official Node.js image for building the frontend
ARG NODE_VERSION=20-alpine
FROM node:${NODE_VERSION} AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire frontend code
COPY . .

# Expose the port the app runs on
# ENV PORT=3000

# Build the project using Vite
RUN npm run build

# Serve the built project using a static server
FROM nginx:stable-alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 6173
CMD [ "nginx", "-g", "daemon off;" ]

LABEL maintainer=$'Bùi Tá Phát\n\
>                  Apeironous\n\
>                  Lancelot Moretti'