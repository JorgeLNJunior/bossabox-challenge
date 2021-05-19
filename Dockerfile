FROM node:14-alpine

WORKDIR /usr/app/api

COPY package*.json ./

RUN npm install --only=prod

RUN apk add --no-cache bash

COPY wait-for-it.sh ./

RUN chmod -R +x ./wait-for-it.sh
