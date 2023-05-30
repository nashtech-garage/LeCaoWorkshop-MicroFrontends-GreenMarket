# 1. Build our app
FROM node:16.15-alpine as builder

RUN npm install -g @angular/cli

COPY .npmrc ./
COPY package.json ./

RUN npm i && mkdir /app && mv ./node_modules ./app
RUN rm -f .npmrc

WORKDIR /app

COPY . .

RUN npm run build

# 2. Deploy our app to NGINX
FROM nginx:1.23.2-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/checkout-app /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]

# FROM node:18.10.0 AS build
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm install -g @angular/cli@16.0.3
# RUN npm cache clean --force
# RUN npm install

# COPY . .
# RUN npm run build

# FROM nginx:1.23.2-alpine
# COPY nginx.conf /etc/nginx/nginx.conf
# COPY --from=build /usr/src/app/dist/checkout-app /usr/share/nginx/html


# Stage 1
# FROM node:10-alpine as build-step
# RUN mkdir -p /app
# WORKDIR /app
# COPY package.json /app
# RUN npm install
# COPY . /app
# RUN npm run build

# Stage 2
# FROM nginx:1.17.1-alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build-step /app/dist/checkout-app /usr/share/nginx/html

# FROM node:18-alpine as build

# WORKDIR /app

# RUN npm install -g @angular/cli

# COPY package*.json .

# COPY . .

# RUN npm install

# RUN npm run build

# # only at the end of the file
# USER app

# FROM nginx:alpine

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=build /app/dist/checkout-app /usr/share/nginx/html
