# 1. Build our app
FROM node:16.15-alpine as builder

COPY .npmrc ./
COPY package.json ./

RUN npm i && mkdir /app && mv ./node_modules ./app
RUN rm -f .npmrc

WORKDIR /app

COPY . .

RUN npm run build

# 2. Deploy our app to NGINX
FROM nginx:1.23.2-alpine

# ENV NODE_ENV production

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]

# FROM node:18-alpine as build

# WORKDIR /app

# # COPY package.json package-lock.json ./

# COPY . .

# RUN npm install

# ENV NODE_ENV production

# RUN npm run build

# FROM nginx:alpine

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=build /app/dist /usr/share/nginx/html
