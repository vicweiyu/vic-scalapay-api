import axios from 'axios';

import { SCALAPAY_API_KEY, SCALAPAY_API_V2_ORDERS } from '../integration/scalapay.common';

import { SPCreateOrderReq } from '../integration/order.integration';

class OrderService {
  async createOrder(req: SPCreateOrderReq) {
    const result = await axios.post(SCALAPAY_API_V2_ORDERS, req, {
      headers: { Authorization: `Bearer ${SCALAPAY_API_KEY}` },
    });

    return result;
  }
}

export default new OrderService();
