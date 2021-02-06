# Builder stage
FROM node:12.16.2-alpine as ts-builder

WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./

RUN npm install
ADD ./src /app/src
RUN npm run tsc

# Runner stage
FROM node:12.16.2-alpine as ts-runner
WORKDIR  /app
COPY --from=ts-builder ./app/build ./build
COPY package* ./

RUN npm install

CMD ["node", "build/index.js"]
