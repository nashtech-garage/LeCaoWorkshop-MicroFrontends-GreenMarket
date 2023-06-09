FROM node:16.15-alpine as build

WORKDIR /app

COPY root-config/.npmrc /app/

COPY root-config/package*.json /app/

RUN npm install --no-audit --maxsockets 1

COPY root-config /app

RUN npm run build:webpack

FROM nginx:alpine

ENV NODE_ENV production

COPY root-config/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
