# 1. Build our app
FROM node:16.15-alpine as builder

COPY .npmrc ./
COPY package.json ./

RUN npm i && mkdir /app && mv ./node_modules ./app
RUN rm -f .npmrc

WORKDIR /app

COPY . .

RUN npm run build:webpack

# 2. Deploy our app to NGINX
FROM nginx:1.23.2-alpine

ENV NODE_ENV production

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]

# FROM node:19-alpine as builder

# # Set the working directory to /app inside the container
# WORKDIR /app

# COPY package.json package-lock.json ./
# # Copy app files
# COPY . .

# # Install dependencies (npm install makes sure the exact versions in the lockfile gets installed)
# RUN npm install

# # Build the app
# RUN npm run build:webpack

# # Bundle static assets with nginx
# FROM nginx:alpine as production

# ENV NODE_ENV production

# # Add your nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Copy built assets from `builder` image
# COPY --from=builder /app/dist /usr/share/nginx/html

# # Expose port
# EXPOSE 80

# # Start nginx
# CMD ["nginx", "-g", "daemon off;"]