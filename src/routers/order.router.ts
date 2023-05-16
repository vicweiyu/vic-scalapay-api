import Router from '@koa/router';

import { auth } from '../middleware/auth.middleware';
import { validateSubmitOrderInput } from '../middleware/order.middleware';

import orderController from '../controllers/order.controller';

const router = new Router({ prefix: '/api/orders' });

router.post('/submitOrder', auth, validateSubmitOrderInput, orderController.submitOrder);

export default router;
