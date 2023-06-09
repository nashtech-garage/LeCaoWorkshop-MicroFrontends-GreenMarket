FROM node:16.15-alpine as build

WORKDIR /app

COPY react-apps/main-featured-product-app/.npmrc /app/

COPY react-apps/main-featured-product-app/package*.json /app/

RUN npm install --no-audit --maxsockets 1

COPY react-apps/main-featured-product-app /app

COPY react-apps/main-featured-product-app/.env.example /app/.env

RUN npm run build:webpack

FROM nginx:alpine

ENV NODE_ENV production

COPY react-apps/main-featured-product-app/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
