FROM nginx:alpine

COPY common-app/nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY common-app /usr/share/nginx/html
