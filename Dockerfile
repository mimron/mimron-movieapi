FROM node:alpine

RUN mkdir -p /usr/src/mimron-movieapi && chown -R node:node /usr/src/mimron-movieapi

WORKDIR /usr/src/mimron-movieapi

COPY package.json yarn.lock ./

USER node

RUN yarn install --pure-lockfile

COPY --chown=node:node . .

EXPOSE 3000
