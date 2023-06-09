FROM node:16.15-alpine as build

WORKDIR /app

COPY react-apps/common-contact-app/.npmrc /app/

COPY react-apps/common-contact-app/package*.json /app/

RUN npm install --no-audit --maxsockets 1

COPY react-apps/common-contact-app /app

RUN npm run build:webpack

FROM nginx:alpine

ENV NODE_ENV production

COPY react-apps/common-contact-app/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
