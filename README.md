es6-koa-jwt
===========

> A starting template for writing a server using Koa.js and JWT in ES6

I used [palanik/node-es6-starter](https://github.com/palanik/node-es6-starter) as the base for the ES6 setup.

## Quick Start

* `npm install`
* export a secret string from the `secret.js` file or run the line below:
* * `echo "module.exports = '$(openssl rand -base64 32)';" >> secret.js`
* `npm run dev`

## Setup

### Included Packages

* jsonwebtoken
* koa
* koa-bodyparser
* koa-json-error
* koa-jwt
* koa-router

### Routes

There are some routes that are already setup to help with some of the ways that the middleware (routes and JWT) are ordered. You can find everything in the `src/routes/` directory.

#### Home Route

The default page is unauthenticated by default. You can add new public routes in the `src/routes/public.js` file.

```
GET http://localhost:3000/

{
    "hello": "world"
}
```

#### Authenticating a user

You will need to edit the `src/routes/jwt.js` and setup the auth stuff so you are calling a real user against a real username and password. But you can do a fake login out-of-the-box using the following after `npm run dev` runs:

```
POST http://localhost:3000/login

{
    "username": "john.doe",
    "password": "foobar"
}
```

This will return the token as an object:

```
{
    "token": "some.crazy.string"
}
```

### Coding style

Airbnb has an excellent [style guide](https://github.com/airbnb/javascript) for ES6. We will follow the guide and adhere to the recommended coding style.

### ESLint

We will use ESLint with Airbnb style and pre-parse our code to detect violations of the style.

## Commands

### Test

```
npm test
```

### Lint

```
npm run lint
```

### Build

```
npm run build
```

### Run

#### ES6 code via babel

```
npm run dev
```

#### ES5 code (Transpiled)

```
npm run build

node lib/
```

or

```
npm start
```

## Code Directories

* ./src - source code, stays in git repo.
* ./lib - transpiled ES5 code, not saved in git, gets published to npm.

## License

  [MIT](LICENSE)
