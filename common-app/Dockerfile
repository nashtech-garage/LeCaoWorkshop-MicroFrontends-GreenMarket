FROM nginx:1.23.2-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /usr/share/nginx/html/*

COPY . /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
