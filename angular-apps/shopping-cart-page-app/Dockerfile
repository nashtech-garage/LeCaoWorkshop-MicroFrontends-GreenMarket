# 1. Build our app
FROM node:16.15-alpine as builder

RUN npm install -g @angular/cli

COPY .npmrc ./
COPY package.json ./

RUN npm i && mkdir /app && mv ./node_modules ./app

RUN rm -f .npmrc

WORKDIR /app

COPY . .

RUN npm run build

# 2. Deploy our app to NGINX
FROM nginx:1.23.2-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/shopping-cart-page-app /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
