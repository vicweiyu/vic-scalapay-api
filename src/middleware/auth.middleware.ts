import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '../common/constants';
import * as utils from '../common/utils';

const auth = async (ctx: Context, next: Next) => {
  const { authorization = '' } = ctx.request.header;
  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    ctx.state.auth = payload;
  } catch (error) {
    const name = (error as Error).name;
    switch (name) {
      case 'TokenExpiredError':
        utils.emitError(ctx, '2001', error);
        break;
      case 'JsonWebTokenError':
        utils.emitError(ctx, '2002', error);
        break;
      default:
        utils.emitError(ctx, '2000', error);
        break;
    }

    return;
  }

  await next();
};

export { auth };
