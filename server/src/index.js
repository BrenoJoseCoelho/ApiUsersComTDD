
const Koa = require('koa');
const Router = require('./routers/User_Route');
const cors = require('koa-cors');
const { koaBody }  = require('koa-body');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const app = new Koa();

mongoose.connect("mongodb://localhost:27017",{useNewUrlParser: true, useUnifiedTopology: true});



app
  .use(cors())
  .use(koaBody()) 
  .use(Router.routes())
  .use(Router.allowedMethods())
  .use(logger())
  .use(bodyParser())
  .use((ctx) => {
    ctx.body = `Request Body: ${JSON.stringify(ctx.request.body)}`;
  });

const server = app.listen(4000);

module.exports = server;