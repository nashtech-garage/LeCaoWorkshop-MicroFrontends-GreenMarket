FROM node:19-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
COPY package.json package-lock.json ./
# Copy app files
COPY . .
# Install dependencies (npm install makes sure the exact versions in the lockfile gets installed)
RUN npm install
# Build the app
RUN npm run build:webpack

# Bundle static assets with nginx
FROM nginx as production
ENV NODE_ENV production

# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from `builder` image
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]