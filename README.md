# aethon-nestjs-boilerplate

<p align="center">
  <a href="https://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="https://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
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

Aethon Holdings Nestjs REST API boilerplate

## Running

`npm install`

In `\env`, create `env.dev.ts`, `env.test.ts` and `env.prod.ts` based on provided `env.example.ts`.

`npm run start:dev` to run based on configuration in `env.dev.ts`.  Each of run `start:dev`, `start:test` overwrites `env.ts` with the corresponding env file,  before bootstraping NestJS, thus configuring the system.

## Dependencies/ extensions included
1. [NestJS](https://docs.nestjs.com/) core
2. [Prettier](https://prettier.io/docs/en/)
3. [Jest](https://jestjs.io/docs/getting-started)
4. [nestjs/config](https://docs.nestjs.com/techniques/configuration)
5. [TypeORM](https://typeorm.io/) + mySQL
6. [nestjs/paginate](https://www.npmjs.com/package/nestjs-paginate)
7. [nestjs/swagger](https://docs.nestjs.com/openapi/introduction)
10. [class-validator](https://github.com/typestack/class-validator)
11. [redis](https://redis.io/docs/latest/develop/)
12. [compodoc](https://compodoc.app/guides/getting-started.html)

##  Features set up
* Separate database module
* Standardised CRUD template
* Standardised responses
* Request, response and error event logging
* Parameter validation
* Caching with Redis
* api version paths

**To do**
* JWT auth

## Technical notes

### API response schema
All API responses conform to the `APIResponse<T>` type, whereby `<T>` is the DTO type and: 

`export type APIResponse<T> = APIResponseData<T> | APIResponseError;`

#### Data response
```
export interface APIResponseData<T> {
  success: boolean = true                       // true for OK code
  path: string                                  // the endpoint path
  requestMethod: keyof typeof RequestMethod     // 'GET' | 'POST' | 'PUT' etc.
  paginated: boolean                            // true if response is paginated
  payload: T | T[] | Paginate<T>                // DTO payload, potentially paginated 
}
```

#### Error Response
```
export interface APIResponseError {
  success: boolean = false                      // false for true
  path: string                                  // the endpoint path
  requestMethod: keyof typeof RequestMethod     // 'GET' | 'POST' | 'PUT' etc.
  error: {
    status: number                              // HTTP response code
    message: string                             // error message
  }
}
```
Pagination of type `T` DTOs in `APIResponseData<T>` is based on [`nestjs/paginate`](https://www.npmjs.com/package/nestjs-paginate) under the following interface:
```
export interface Root {
    data: T[]                                   // paginated DTO array
    meta: {                                     // pagination features, based on config and query
        itemsPerPage: number                    // standard items per page
        totalItems: number                      // total items being paginated
        currentPage: number                     // page offset
        totalPages: number                      // max page count
        sortBy: string[][]                      // [[fieldName:string, 'ASC' | 'DESC']]
        search: string                          // search across columns
        filter: Filter                          // where query object
    }
    links: {
        first: string                           // link to api call at beginning of pagination
        previous: string                        // link to previous page
        current: string                         // current current page api call link
        next: string                            // link to next page
        last: string                            // link to last page
    }
}
```

### PersistenceService and Caching
Interactions with both the database and cache are abstracted out of the services into the `PersistenceService`.  The service then utilises the `DatabaseService` and `CachingService` to interact with these two components.

In this schema, controller-related services thus are focused on implementing business logic and flow, while the `PersistenceService` offers a single entry point to persistence functionality.

In this repo, `PersistenceService` exposes basic CRUD database methods such as `findOne()`, and similar cache interaction methods such as `findOneInCache()`. These additional logical layers are there in order to enable smoother decoupling of the caching or DB solutions while giving services a single "point of contact" with the back end. The `PersistenceService` can also be utilised to enforce consistent global query caching strategies, if needed, coupling database and cache operations with specific strategies as needed.

To enforce consistent key usage across all modules, the function `utils.getKey(keyBuilder: KeyBuilder): string` in `\src\common\utils\utils.ts` returns concatenated cache key strings.

### Testing
Example unit tests are included for all key components.  Run `npm run test` to run all Jest tests.