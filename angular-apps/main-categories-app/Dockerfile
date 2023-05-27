FROM node:19-alpine as build

WORKDIR /app

#RUN npm install -g @angular/cli

#COPY ./package.json .

COPY . .

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/main-categories-app /usr/share/nginx/html
