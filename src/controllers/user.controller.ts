import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';

import { CODE_SUCCESS, JWT_SECRET, JWT_EXPIRED_TIME } from '../common/constants';
import * as utils from '../common/utils';

import userService from '../services/user.service';

class UserController {
  async register(ctx: Context, next: Next) {
    const { username, password } = ctx.request.body;

    try {
      const result = await userService.createUser(username, password);

      ctx.body = utils.generateResp(CODE_SUCCESS, { id: result.getDataValue('id') });
    } catch (error) {
      utils.emitError(ctx, '2000');
      return;
    }
  }

  async generateToken(ctx: Context, next: Next) {
    const { username } = ctx.request.body;

    try {
      const data = {
        token: jwt.sign({ username, data: '' }, JWT_SECRET, { expiresIn: JWT_EXPIRED_TIME }),
      };

      ctx.body = utils.generateResp(CODE_SUCCESS, data);
    } catch (error) {
      utils.emitError(ctx, '2000');
      return;
    }
  }

  async changePassword(ctx: Context, next: Next) {
    const { username } = ctx.state.auth;
    const { password } = ctx.request.body;

    try {
      const userInfo = await userService.getUserInfo({ username });
      if (!userInfo) {
        utils.emitError(ctx, '2000');
        return;
      }

      const result = await userService.updateUserPWDByID({ id: userInfo.getDataValue('id'), password });

      ctx.body = utils.generateResp(CODE_SUCCESS, { flag: result });
    } catch (error) {
      utils.emitError(ctx, '2000');
      return;
    }
  }
}

export default new UserController();
