FROM node:19.4.0 as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

COPY copy_env.sh .

ENV NODE_ENV production

RUN ./copy_env.sh

RUN npm run build

FROM nginx as runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html
