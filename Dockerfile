# Build for local development
FROM node:19-alpine as development

RUN apk add --no-cache python3 make gcc g++

WORKDIR /usr/src/app

RUN mkdir dist && chown -R node:node dist

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node