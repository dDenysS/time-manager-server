const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const logger = require('koa-logger');
const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');

const api = require('./server/routes/api');

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(helmet());
app.use(logger());
app.use(bodyParser());

require('./server/services/passport');
app.use(passport.initialize())
app.use(passport.session())


app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});


app.use(api.routes());

app.use(router.allowedMethods());

const PORT = process.env.PORT || 3000;

app.listen(PORT);
