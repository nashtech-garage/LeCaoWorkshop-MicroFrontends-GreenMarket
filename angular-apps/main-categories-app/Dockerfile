FROM node:18.10.0 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g @angular/cli@16.0.3
RUN npm cache clean --force
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.23.2-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/main-categories-app /usr/share/nginx/html

# FROM node:18-alpine as build

# WORKDIR /app

# RUN npm install -g @angular/cli

# COPY package*.json .

# COPY . .

# RUN npm install

# RUN npm run build --prod

# USER app

# FROM nginx:alpine

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=build /app/dist/main-categories-app /usr/share/nginx/html
