import { Request, Response } from 'express';

import * as authService from './authService';

import { resSend } from '@/middleware/responseHandler';
import { StatusCode } from '@/types/common';
import { throwCustomError } from '@/utils/customeError';
import { isProd } from '@/utils/helper';

export const Login = async (req: Request, res: Response) => {
    const { body } = req;
    const { accessToken, refreshToken } = await authService.LoginService(body);
    resSend(res, StatusCode.OK, 'Login successfully', accessToken, {
        name: 'refreshToken',
        value: refreshToken,
        options: cookiesOptions,
    });
};

export const signup = async (req: Request, res: Response) => {
    const { body } = req;
    const { accessToken, refreshToken } = await authService.signupService(body);
    resSend(res, StatusCode.OK, 'Signup successfully', accessToken, {
        name: 'refreshToken',
        value: refreshToken,
        options: cookiesOptions,
    });
};

export const changePassword = async (req: Request, res: Response) => {
    const { userSession, body } = req;
    const response = await authService.changePasswordService(userSession, body);
    resSend(res, StatusCode.OK, '', response);
};

export const forgetPassword = async (req: Request, res: Response) => {
    const { body } = req;
    const response = await authService.forgetPasswordService(body);
    resSend(res, StatusCode.OK, 'delete auth', response);
};

export const resetPassword = async (req: Request, res: Response) => {
    const { body } = req;
    const response = await authService.resetPasswordService(body);
    resSend(res, StatusCode.OK, 'delete auth', response);
};

export const refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) throwCustomError('Refresh token missing', StatusCode.UNAUTHORIZED);

    const { accessToken, refreshToken: newRefreshToken } =
        await authService.refreshTokenService(refreshToken);

    resSend(res, StatusCode.OK, 'Token refreshed', accessToken, {
        name: 'refreshToken',
        value: newRefreshToken,
        options: cookiesOptions,
    });
};

export const logout = async (_req: Request, res: Response) => {
    res.clearCookie('refreshToken', cookiesOptions);

    resSend(res, StatusCode.OK, 'Logout successful');
};

const cookiesOptions = {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    path: '/api/auth/refresh-token',
    maxAge: 7 * 24 * 60 * 60 * 1000,
} as any;
