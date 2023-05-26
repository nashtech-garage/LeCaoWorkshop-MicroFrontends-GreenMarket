FROM node:19.4.0 as build

WORKDIR /app

RUN npm install -g @angular/cli

COPY ./package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx as runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/contact-form-app /usr/share/nginx/html
