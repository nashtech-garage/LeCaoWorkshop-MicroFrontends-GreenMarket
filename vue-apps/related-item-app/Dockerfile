FROM node:16.15-alpine as build

WORKDIR /app

COPY vue-apps/related-item-app/.npmrc /app/

COPY vue-apps/related-item-app/package*.json /app/

RUN npm install --no-audit --maxsockets 1

COPY vue-apps/related-item-app /app

COPY vue-apps/related-item-app/.env.example /app/.env

RUN npm run build

FROM nginx:alpine

ENV NODE_ENV production

COPY vue-apps/related-item-app/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
