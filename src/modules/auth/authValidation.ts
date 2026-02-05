import Joi from 'joi';

import {
    changePasswordBody,
    forgetPasswordBody,
    LoginBody,
    resetPasswordBody,
    SignupBody,
} from './authType';

const { string } = Joi.types();

export const emailSchema = string.email().lowercase().trim().required();

export const passwordSchema = string
    .min(6)
    .max(20)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .messages({
        'string.pattern.base':
            'Password must contain uppercase, lowercase, number and special character',
    })
    .required();

export const loginValidation = Joi.object<LoginBody>({
    email: emailSchema,
    password: string.required(),
});

export const signupValidation = Joi.object<SignupBody>({
    username: string.min(3).max(50).trim().required(),
    email: emailSchema,
    password: passwordSchema,
});

export const changePasswordValidation = Joi.object<changePasswordBody>({
    oldPassword: string.required(),
    newPassword: passwordSchema,
});

export const forgetPasswordValidation = Joi.object<forgetPasswordBody>({
    email: emailSchema,
});

export const resetPasswordValidation = Joi.object<resetPasswordBody>({
    token: string.required(),
    newPassword: passwordSchema,
});
