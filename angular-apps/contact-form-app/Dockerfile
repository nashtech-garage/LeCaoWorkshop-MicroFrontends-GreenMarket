FROM node:16.15-alpine as build

WORKDIR /usr/src/app

RUN npm install --location=global @angular/cli

COPY angular-apps/contact-form-app/.npmrc /usr/src/app/

COPY angular-apps/contact-form-app/package*.json /usr/src/app/

RUN npm install --no-audit --maxsockets 1

COPY angular-apps/contact-form-app /usr/src/app

RUN npm run build:single-spa:contact-form-app

RUN chown -R node /usr/src/app

USER node

FROM nginx:alpine

COPY angular-apps/contact-form-app/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /usr/src/app/dist/contact-form-app /usr/share/nginx/html
