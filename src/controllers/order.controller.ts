import { Context, Next } from 'koa';

import { CODE_SUCCESS } from '../common/constants';
import * as utils from '../common/utils';

import { SPCreateOrderReq, SubmitOrderInput } from '../integration/order.integration';

import orderService from '../services/order.service';

class OrderController {
  async submitOrder(ctx: Context, next: Next) {
    const input: SubmitOrderInput = ctx.request.body;

    try {
      const createOrderReq = Object.assign(new SPCreateOrderReq(), { ...input });
      createOrderReq.computeTotalAmount();
      createOrderReq.fillMerchantInfo();

      const result = await orderService.createOrder(createOrderReq);

      ctx.body = utils.generateResp(CODE_SUCCESS, { spRes: result.data });
    } catch (error) {
      utils.emitError(ctx, '4000');
      return;
    }
  }
}

export default new OrderController();
