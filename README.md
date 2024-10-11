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