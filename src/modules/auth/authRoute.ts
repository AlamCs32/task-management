import { Router } from 'express';

import * as authController from './authController';
import * as authValidation from './authValidation';

import { authenticateUser } from '@/middleware/authMiddleware';
import reqValidator from '@/middleware/payloadValidator';

const router = Router();

router.post('/login', reqValidator(authValidation.loginValidation), authController.Login);

router.post('/signup', reqValidator(authValidation.signupValidation), authController.signup);

router.patch(
    '/change-password',
    authenticateUser(),
    reqValidator(authValidation.changePasswordValidation),
    authController.changePassword,
);

router.post(
    '/forget-password',
    reqValidator(authValidation.forgetPasswordValidation),
    authController.forgetPassword,
);

router.patch(
    '/reset-password',
    reqValidator(authValidation.resetPasswordValidation),
    authController.resetPassword,
);

router.get('/refresh-token', authController.refreshToken);
router.get('/logout', authController.logout);

export default router;
