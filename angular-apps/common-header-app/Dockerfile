FROM node:19.4.0 as build

WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build:single-spa:common-header-app

FROM nginx as runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/common-header-app /usr/share/nginx/html
