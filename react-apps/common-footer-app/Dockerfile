FROM node:19.4.0 as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV NODE_ENV production

RUN npm run build

EXPOSE 5005

CMD npm start