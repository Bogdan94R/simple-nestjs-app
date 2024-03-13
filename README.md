<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Installation

```bash
# install dependencies
$ npm install
# init prisma client
$ npx prisma generate
```

## Setup environment

- create .env
- copy all variables from .env.example to .env
- fill all variables for .env

## Run app for development

```bash
# run database
$ docker-compose up
# run migrations
$ npx prisma migrate deploy
# run app in development using watch mode (for build process enabled SWC)
$ npm run start:dev
```

## License

Nest is [MIT licensed](LICENSE).
