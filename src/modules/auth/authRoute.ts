import { Router } from 'express';

import * as authController from './authController';
import * as authValidation from './authValidation';

import { authenticateUser } from '@/middleware/authMiddleware';
import reqValidator from '@/middleware/payloadValidator';

const router = Router();

router.post(
    '/login',
    reqValidator(authValidation.loginValidation),
    authController.Login,
    /*
      #swagger.path = '/api/auth/login'
      #swagger.method = 'post'
      #swagger.tags = ['Auth']
      #swagger.summary = 'User login'
      #swagger.description = 'Login using email and password'
      #swagger.consumes = ['application/json']
      #swagger.produces = ['application/json']
  
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", example: "user@example.com" },
                password: { type: "string", example: "Password@123" }
              },
              required: ["email", "password"]
            }
          }
        }
      }
    */
);

router.post(
    '/signup',
    reqValidator(authValidation.signupValidation),
    authController.signup,
    /*
      #swagger.path = '/api/auth/signup'
      #swagger.method = 'post'
      #swagger.tags = ['Auth']
      #swagger.summary = 'User signup'
      #swagger.description = 'Register a new user'
      #swagger.consumes = ['application/json']
  
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                username: { type: "string", example: "john_doe" },
                email: { type: "string", example: "john@example.com" },
                password: { type: "string", example: "Password@123" }
              },
              required: ["username", "email", "password"]
            }
          }
        }
      }
    */
);

router.patch(
    '/change-password',
    authenticateUser(),
    reqValidator(authValidation.changePasswordValidation),
    authController.changePassword,
    /*
      #swagger.path = '/api/auth/change-password'
      #swagger.method = 'patch'
      #swagger.tags = ['Auth']
      #swagger.summary = 'Change password'
      #swagger.security = [{ "bearerAuth": [] }]
  
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                oldPassword: { type: "string", example: "OldPass@123" },
                newPassword: { type: "string", example: "NewPass@123" }
              },
              required: ["oldPassword", "newPassword"]
            }
          }
        }
      }
    */
);

router.post(
    '/forget-password',
    reqValidator(authValidation.forgetPasswordValidation),
    authController.forgetPassword,
    /*
      #swagger.path = '/api/auth/forget-password'
      #swagger.method = 'post'
      #swagger.tags = ['Auth']
      #swagger.summary = 'Forgot password'
      #swagger.description = 'Send reset password link to email'
  
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string", example: "user@example.com" }
              },
              required: ["email"]
            }
          }
        }
      }
    */
);

router.patch(
    '/reset-password',
    reqValidator(authValidation.resetPasswordValidation),
    authController.resetPassword,
    /*
      #swagger.path = '/api/auth/reset-password'
      #swagger.method = 'patch'
      #swagger.tags = ['Auth']
      #swagger.summary = 'Reset password'
  
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: { type: "string", example: "reset-token-here" },
                newPassword: { type: "string", example: "Password@123" }
              },
              required: ["token", "newPassword"]
            }
          }
        }
      }
    */
);

router.get(
    '/refresh-token',
    authController.refreshToken,
    /*
      #swagger.path = '/api/auth/refresh-token'
      #swagger.method = 'get'
      #swagger.tags = ['Auth']
      #swagger.summary = 'Refresh access token'
    */
);

router.get(
    '/logout',
    authController.logout,
    /*
      #swagger.path = '/api/auth/logout'
      #swagger.method = 'get'
      #swagger.tags = ['Auth']
      #swagger.summary = 'Logout user'
    */
);

export default router;
