import Router from '@koa/router';

import { auth } from '../middleware/auth.middleware';
import {
  validateRegisterInput,
  checkUserIsExisted,
  encryptPassword,
  validateLoginInput,
  verifyUserCredential,
  validateChangePWDInput,
} from '../middleware/user.middleware';

import userController from '../controllers/user.controller';

const router = new Router({ prefix: '/api/users' });

router.post('/register', validateRegisterInput, checkUserIsExisted, encryptPassword, userController.register);

router.post('/login', validateLoginInput, verifyUserCredential, userController.generateToken);

router.patch('/changePassword', auth, validateChangePWDInput, encryptPassword, userController.changePassword);

export default router;
