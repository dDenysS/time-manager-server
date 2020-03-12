const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const api = require('./server/routes');

const index = new Koa();
const router = new Router();

index.use(cors());
index.use(helmet());
index.use(logger());
index.use(bodyParser());

require('./server/services/passport');
index.use(passport.initialize())
index.use(passport.session())


index.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});


index.use(api.routes());

index.use(router.allowedMethods());

const PORT = process.env.PORT || 3000;

index.listen(PORT);
