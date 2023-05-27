FROM node:19-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

COPY .env.example .env

ENV NODE_ENV production

RUN npm run build

FROM nginx as runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
