import Koa from 'koa';
import koajwt from 'koa-jwt';
import requestBodyParser from 'koa-bodyparser';
import jsonError from 'koa-json-error';
import Router from 'koa-router';

// exported secret key
import secret from '../secret';

import { publicRoutes, jwtRoutes, protectedRoutes } from './routes/index';

const app = new Koa();

// routes that need to be loaded before the JWT setup
const publicRouter = new Router();

// routes that are accessed with auth
const protectedRouter = new Router();

if (process.env.NODE_ENV === 'local') {
  app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
  });
}

app.use(requestBodyParser());
app.use(jsonError());

// Custom 401 handling if you don't want to expose koa-jwt errors to users
app.use((ctx, next) => next().catch((err) => {
  if (process.env.NODE_ENV === 'local') {
    console.log(err);
  }

  if (err.status === 401) {
    ctx.type = 'application/json; charset=utf-8';
    ctx.status = 401;
    ctx.body = {
      error: 'Protected resource, use Authorization header to get access',
    };
  } else {
    throw err;
  }
}));

publicRoutes
  .concat(jwtRoutes)
  .forEach((route) => {
    publicRouter[route.method](route.path, route.fn);
  });

app
  .use(publicRouter.routes())
  .use(publicRouter.allowedMethods());

protectedRoutes.forEach((route) => {
  protectedRouter[route.method](route.path, route.fn);
});

// Middleware below this line is only reached if JWT token is valid
app
  .use(koajwt({
    secret,
  }))
  .use(protectedRouter.routes())
  .use(protectedRouter.allowedMethods());

export default function main() {
  return app;
}

if (require.main === module) {
  app.listen(3000, 'localhost');
  if (process.env.NODE_ENV === 'local') {
    console.log('application running at http://localhost:3000');
  }
}
