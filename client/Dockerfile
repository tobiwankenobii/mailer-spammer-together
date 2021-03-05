FROM node:14-alpine

ENV CHOKIDAR_USEPOLLING=true

WORKDIR /app

RUN apt-get update && apt-get install -y make

COPY package.json yarn.lock /app/
RUN yarn install

COPY . .

CMD yarn start
