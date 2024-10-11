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

## Dependencies/ extensions included
1. [NestJS](https://docs.nestjs.com/) core
2. [Prettier](https://prettier.io/docs/en/)
3. [Jest](https://jestjs.io/docs/getting-started)
4. [nestjs/config](https://docs.nestjs.com/techniques/configuration)
5. [TypeORM](https://typeorm.io/) + mySQL
6. [nestjs/paginate](https://www.npmjs.com/package/nestjs-paginate)
7. [nestjs/swagger](https://docs.nestjs.com/openapi/introduction)
10. [class-validator](https://github.com/typestack/class-validator)

##  Features set up
* Separate database module
* Standardised CRUD template
* Standardised responses
* Request, response and error event logging
* Parameter validation

**To do**
* Caching with [redis](https://redis.io/docs/latest/develop/)
* JWT auth

## API response schema

All API responses conform to the `APIResponse<T>` type, whereby `<T>` is the DTO type and: 

`export type APIResponse<T> = APIResponseData<T> | APIResponseError;`


### Data response

```
export interface APIResponseData<T> {
  success: boolean = true                       // true for OK code
  path: string                                  // the endpoint path
  requestMethod: keyof typeof RequestMethod     // 'GET' | 'POST' | 'PUT' etc.
  paginated: boolean                            // true if response is paginated
  payload: T | T[] | Paginate<T>                // DTO payload, potentially paginated 
}
```

### Error
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
# aethon-nestjs-boilerplate

## Description

Aethon Holdings Nestjs REST API boilerplate

## Dependencies/ extensions included
1. [NestJS](https://docs.nestjs.com/) core
2. [Prettier](https://prettier.io/docs/en/)
3. [Jest](https://jestjs.io/docs/getting-started)
4. [nestjs/config](https://docs.nestjs.com/techniques/configuration)
5. [TypeORM](https://typeorm.io/) + mySQL
6. [nestjs/paginate](https://www.npmjs.com/package/nestjs-paginate)
7. [nestjs/swagger](https://docs.nestjs.com/openapi/introduction)
10. [class-validator](https://github.com/typestack/class-validator)

##  Features set up
* Separate database module
* Standardised CRUD template
* Standardised responses
* Request, response and error event logging
* Parameter validation

**To do**
* Caching with [redis](https://redis.io/docs/latest/develop/)
* JWT auth

## API response schema

All API responses conform to the `APIResponse<T>` type, whereby `<T>` is the DTO type and: 

`export type APIResponse<T> = APIResponseData<T> | APIResponseError;`


### Data response

```
export interface APIResponseData<T> {
    success: boolean = true                     // true for OK code
    path: string                                // the endpoint path
    requestMethod: keyof typeof RequestMethod   // 'GET' | 'POST' | 'PUT' etc.
    paginated: boolean                          // true if response is paginated
    payload: T | T[] | Paginate<T>              // DTO payload, potentially paginated 
}
```

### Error
```
export interface APIResponseError {
    success: boolean = false                    // false for error
    path: string                                // the endpoint path
    requestMethod: keyof typeof RequestMethod   // 'GET' | 'POST' | 'PUT' etc.
    error: {
        status: number                          // HTTP error code
        message: string                         // error message
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