import { Request, Response } from 'express';

import * as authService from './authService';

import { resSend } from '@/middleware/responseHandler';
import { StatusCode } from '@/types/common';

export const getAuth = async (req: Request, res: Response) => {
    const { userSession, query } = req;
    const response = await authService.getAuthService(userSession, query);
    resSend(res, StatusCode.OK, 'get auth', response);
};

export const createAuth = async (req: Request, res: Response) => {
    const { userSession, body } = req;
    const response = await authService.createAuthService(userSession, body);
    resSend(res, StatusCode.OK, 'create auth', response);
};

export const updateAuth = async (req: Request, res: Response) => {
    const { userSession, params, body } = req;
    const response = await authService.updateAuthService(userSession, params, body);
    resSend(res, StatusCode.OK, 'update auth', response);
};

export const deleteAuth = async (req: Request, res: Response) => {
    const { userSession, params } = req;
    const response = await authService.deleteAuthService(userSession, params);
    resSend(res, StatusCode.OK, 'delete auth', response);
};
