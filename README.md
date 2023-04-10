<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">An example of REST API application using <a href="https://nestjs.com/" target="_blank">NestJS</a> framework that covers a lot of techniques.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter or boilerplate repository to implement REST API. This application includes 5 main modules:
- Auth (responsible for authentication)
- Post (responsible for post-related operations)
- Storage (responsible for storage-related operations)
- Topic (responsible for topic-related operations)
- User (responsible for user-related operations)

For further example and explanation, please refer to [OpenAPI](#openapi) section.


## Outline
This example API repository could be a starter repository or a boilerplate repository or any other study purpose that highlights some techniques or features provided by NestJS documentation such as:

The overview section:
- [Controllers](https://docs.nestjs.com/controllers)
- [Providers](https://docs.nestjs.com/providers)
- [Middleware](https://docs.nestjs.com/middleware)
- [Exception Filters](https://docs.nestjs.com/exception-filters)
- [Pipes](https://docs.nestjs.com/pipes)
- [Guards](https://docs.nestjs.com/guards)
- [Interceptors](https://docs.nestjs.com/interceptors)
- [Custom decorators](https://docs.nestjs.com/custom-decorators)

The fundamental section:
- [Testing](https://docs.nestjs.com/fundamentals/testing) (includes unit test and e2e testing)

The techniques section:
- [Configuration](https://docs.nestjs.com/techniques/configuration)
- [Database](https://docs.nestjs.com/techniques/database)
- [Validation](https://docs.nestjs.com/techniques/validation)
- [Caching](https://docs.nestjs.com/techniques/caching)
- [Serialization](https://docs.nestjs.com/techniques/serialization)
- [Versioning](https://docs.nestjs.com/techniques/versioning)
- [Task Scheduling](https://docs.nestjs.com/techniques/task-scheduling)
- [Logging](https://docs.nestjs.com/techniques/logger)
- [Compression](https://docs.nestjs.com/techniques/compression)
- [File upload](https://docs.nestjs.com/techniques/file-upload)
- [Streaming files](https://docs.nestjs.com/techniques/streaming-files)

The security section:
- [Authentication](https://docs.nestjs.com/security/authentication)
- [Authorization](https://docs.nestjs.com/security/authorization)
- [Encryption and Hashing](https://docs.nestjs.com/security/encryption-and-hashing)
- [Helmet](https://docs.nestjs.com/security/helmet)
- [CORS](https://docs.nestjs.com/security/cors)
- [CSRF Protection](https://docs.nestjs.com/security/csrf)
- [Rate limiting](https://docs.nestjs.com/security/rate-limiting)

[OpenAPI](https://docs.nestjs.com/openapi/introduction)

Some techniques are implemented as fundamental and others are implemented further than the documentation explained. You may also refer to the specified commit to see how the exact technique is implemented.

## Installation

```bash
$ npm install
```

## Migration

```bash
# create new migration
$ npm run migration:create

# drop schema
$ npm run schema:drop

# generate migration
$ npm run migration:generate

# run migration
$ npm run migration:run

# revert migration
$ npm run migration:revert
```

## Seeds

```bash
$ npm run seed:run
```

## Other bash command related to database

```bash
# create an empty database
$ npm run db:create

# drop database
$ npm run db:drop

# refresh database (remove the uploads folder destination, re-migrating & re-seeding)
$ npm run db:refresh
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Technical documentation

```bash
$ npm run docs:serve
```

## OpenAPI
The [OpenAPI](https://swagger.io/specification/) specification is a language-agnostic definition format used to describe RESTful APIs. Nest provides a dedicated module which allows generating such a specification by leveraging decorators.



## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Farista Latuconsina](https://github.com/latuconsinafr)
- Twitter - [@nestframework](https://twitter.com/latuconsinafr)

## License

This repository is [MIT licensed](LICENSE).
