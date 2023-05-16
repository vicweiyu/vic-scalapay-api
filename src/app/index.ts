import Koa, { Context } from 'koa';
import KoaLogger from 'koa-logger';
import koaHelmet from 'koa-helmet';
import koaBody from 'koa-body';
import koaCompress from 'koa-compress';
import cors from '@koa/cors';

import { OVERALL_ERROR_EVENT } from '../common/constants';
import * as utils from '../common/utils';

import userRouter from '../routers/user.router';
import orderRouter from '../routers/order.router';

const app = new Koa();

// Logger
app.use(KoaLogger());

// Helmet
app.use(koaHelmet());

// Cors
app.use(cors());

// Request Body Parse
app.use(koaBody());

// Routes
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(orderRouter.routes()).use(orderRouter.allowedMethods());

// Compress
app.use(koaCompress({ threshold: 1024 }));

// Overall Error Handling
app.on(OVERALL_ERROR_EVENT, (errorCode: string, ctx: Context) => {
  ctx.status = 200; // TODO
  ctx.body = utils.generateResp(errorCode);
});

export default app;
