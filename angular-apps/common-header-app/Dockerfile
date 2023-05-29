FROM node:18-alpine as build

WORKDIR /app

# RUN npm install -g @angular/cli

# RUN npm install -g  @angular/cli@15.2.6

# COPY ./package.json .

COPY . .

RUN npm install

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/common-header-app /usr/share/nginx/html
