![alt text](https://hitchhikersguidegalaxy.github.io/imagens/characters/marvin.png)

> Here I am, brain the size of a planet, and they tell me to schedule your sessions.

# TeleMarvin

TeleMarvin is a telegram bot that helps your RPG group to better schedule your sessions. Chances are you suck at scheduling, but don't fret TeleMarvin is here to help you with his cheerful disposition.

## Running TeleMarvin

### Requirements
1. Telegram Bot [Token](https://core.telegram.org/bots/api)
3. Nodejs v12.0.0

The Telegram token may be set in a `.env` file or as a environment variable.

```
export TELEGRAM_TOKEN=<telegram_token>
```

Then it is as easy as running:
```
npm install
npm run start:dev
```

Alternativately, the easiest way of running Marvin would be via Docker:

```
$ docker build -t <tag> .
$ docker run -d --name telemarvin
-e TELEGRAM_TOKEN=$TELEGRAM_TOKEN \
<tag>
```

There is also a `docker-compose` set up pointing to telemarvin @ dockerhub.

```
## TODO LIST:
* Write dev/prod setup
* Integrate a better configuration file
* Create github-actions integration for CI CD
