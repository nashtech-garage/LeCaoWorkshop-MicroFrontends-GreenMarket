FROM nginx:alpine

COPY images-app/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY images-app /usr/share/nginx/html
