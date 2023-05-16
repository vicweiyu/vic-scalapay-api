import { Context, Next } from 'koa';

import * as utils from '../common/utils';

import { isValidatedAmount, isValidatedContactInfo, isValidatedOrderItem } from '../integration/scalapay.common';
import { SubmitOrderInput } from '../integration/order.integration';

const validateSubmitOrderInput = async (ctx: Context, next: Next) => {
  const input: SubmitOrderInput = ctx.request.body;

  if (
    utils.isEmptyString(input?.consumer?.givenNames) ||
    utils.isEmptyString(input?.consumer?.surname) ||
    (!utils.isEmptyString(input?.consumer?.email) && !utils.isValidatedEmail(input.consumer.email))
  ) {
    utils.emitError(ctx, '3100');
    return;
  }

  if (input?.billing && !isValidatedContactInfo(input.billing)) {
    utils.emitError(ctx, '3100');
    return;
  }

  if (!isValidatedContactInfo(input?.shipping)) {
    utils.emitError(ctx, '3100');
    return;
  }

  if (utils.isEmptyArray(input?.items)) {
    utils.emitError(ctx, '3100');
    return;
  }

  for (let i of input.items) {
    if (!isValidatedOrderItem(i)) {
      utils.emitError(ctx, '3100');
      return;
    }
  }

  if (!utils.isEmptyArray(input?.discounts)) {
    for (let d of input.discounts) {
      if (!isValidatedAmount(d.amount)) {
        utils.emitError(ctx, '3100');
        return;
      }
    }
  }

  if (input?.shippingAmount && !isValidatedAmount(input.shippingAmount)) {
    utils.emitError(ctx, '3100');
    return;
  }

  if (input?.taxAmount && !isValidatedAmount(input.taxAmount)) {
    utils.emitError(ctx, '3100');
    return;
  }

  await next();
};

export { validateSubmitOrderInput };
