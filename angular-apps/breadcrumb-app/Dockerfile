FROM node:16.15-alpine as build

WORKDIR /usr/src/app

RUN npm install --location=global @angular/cli

COPY angular-apps/breadcrumb-app/.npmrc /usr/src/app/

COPY angular-apps/breadcrumb-app/package*.json /usr/src/app/

RUN npm install --no-audit --maxsockets 1

COPY angular-apps/breadcrumb-app /usr/src/app

RUN npm run build:single-spa:breadcrumb-app

RUN chown -R node /usr/src/app

USER node

FROM nginx:alpine

COPY angular-apps/breadcrumb-app/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /usr/src/app/dist/breadcrumb-app /usr/share/nginx/html
