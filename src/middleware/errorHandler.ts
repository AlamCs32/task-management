import { NextFunction, Request, Response } from 'express';

import { resSend } from './responseHandler';

import logger from '@/utils/logger';

const errorHandler = (
    error: Error & { status?: number; data?: any },
    req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    console.log(error);
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';
    const data = error.data || {};

    logger.error({
        message: error.message || 'Internal Server Error',
        stack: error.stack,
        path: req.originalUrl,
        method: req.method,
        body: req.body,
        query: req.query,
    });

    resSend(res, status, message, data);
};

export default errorHandler;
