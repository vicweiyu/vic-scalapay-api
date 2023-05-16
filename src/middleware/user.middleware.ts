import { Context, Next } from 'koa';
import bcrypt from 'bcryptjs';

import * as utils from '../common/utils';

import userService from '../services/user.service';

const validateRegisterInput = async (ctx: Context, next: Next) => {
  const { username, password } = ctx.request.body;

  if (utils.isEmptyString(username) || utils.isEmptyString(password)) {
    utils.emitError(ctx, '3000');
    return;
  }

  await next();
};

const checkUserIsExisted = async (ctx: Context, next: Next) => {
  const { username } = ctx.request.body;

  try {
    const result = await userService.getUserInfo({ username });
    if (result) {
      utils.emitError(ctx, '3001');
      return;
    }
  } catch (error) {
    utils.emitError(ctx, '2000');
    return;
  }

  await next();
};

const encryptPassword = async (ctx: Context, next: Next) => {
  const { password } = ctx.request.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  ctx.request.body.password = hash;

  await next();
};

const validateLoginInput = async (ctx: Context, next: Next) => {
  const { username, password } = ctx.request.body;

  if (utils.isEmptyString(username) || utils.isEmptyString(password)) {
    utils.emitError(ctx, '3010');
    return;
  }

  await next();
};

const verifyUserCredential = async (ctx: Context, next: Next) => {
  const { username, password } = ctx.request.body;

  try {
    const result = await userService.getUserInfo({ username });
    if (!result) {
      utils.emitError(ctx, '3011');
      return;
    }

    if (!bcrypt.compareSync(password, result.getDataValue('password'))) {
      utils.emitError(ctx, '3011');
      return;
    }
  } catch (error) {
    utils.emitError(ctx, '2000');
    return;
  }

  await next();
};

const validateChangePWDInput = async (ctx: Context, next: Next) => {
  const { username } = ctx.state.auth;
  const { password } = ctx.request.body;

  if (utils.isEmptyString(password)) {
    utils.emitError(ctx, '3012');
    return;
  }

  try {
    const result = await userService.getUserInfo({ username });
    if (!result) {
      utils.emitError(ctx, '2000');
      return;
    }

    if (bcrypt.compareSync(password, result.getDataValue('password'))) {
      utils.emitError(ctx, '3013');
      return;
    }
  } catch (error) {
    utils.emitError(ctx, '2000');
    return;
  }

  await next();
};

export {
  validateRegisterInput,
  checkUserIsExisted,
  encryptPassword,
  validateLoginInput,
  verifyUserCredential,
  validateChangePWDInput,
};
