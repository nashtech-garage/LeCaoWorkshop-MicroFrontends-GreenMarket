FROM node:16.15-alpine as build

WORKDIR /usr/src/app

COPY vue-apps/contact-map-app/.npmrc /usr/src/app/

COPY vue-apps/contact-map-app/package*.json /usr/src/app/

RUN npm install --no-audit --maxsockets 1

COPY vue-apps/contact-map-app /usr/src/app

RUN npm run build

FROM nginx:alpine

ENV NODE_ENV production

COPY vue-apps/contact-map-app/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
