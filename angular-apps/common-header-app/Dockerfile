FROM node:19.4.0 as build

WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build:single-spa:common-header-app

EXPOSE 5001

CMD ng serve --port 5001 --host 0.0.0.0 --disable-host-check
