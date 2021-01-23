FROM node:12.16.2-alpine

WORKDIR /usr/src
COPY package.json ./
COPY tsconfig.json ./

RUN npm install

ADD ./src /usr/src
RUN npm run tsc

CMD ["node", "index.js"]
