FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=build /app/dist /usr/share/nginx/html

COPY . /usr/share/nginx/html