FROM node:16.15-alpine as build

WORKDIR /app

COPY vue-apps/mainpage-blog-app/.npmrc /app/

COPY vue-apps/mainpage-blog-app/package*.json /app/

RUN npm install --no-audit --maxsockets 1

COPY vue-apps/mainpage-blog-app /app

COPY vue-apps/mainpage-blog-app/.env.example /app/.env

RUN npm run build

FROM nginx:alpine

ENV NODE_ENV production

COPY vue-apps/mainpage-blog-app/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
