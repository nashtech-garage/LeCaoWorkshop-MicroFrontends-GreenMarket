FROM node:18-alpine as build

WORKDIR /app

# COPY package.json package-lock.json ./

COPY . .

RUN npm install

COPY .env.example .env

ENV NODE_ENV production

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
