FROM node:12

ARG NODE_ENV

WORKDIR /app

COPY . /app

RUN npm install

RUN npm install pm2 -g

EXPOSE 3050

ENTRYPOINT pm2-runtime start /app/app.config.js --env "${NODE_ENV}"
