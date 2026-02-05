import { Request, Response, NextFunction } from 'express';

import logger from '@/utils/logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const { method, url, method: httpMethod, query, params, body, ip } = req;

    res.on('finish', () => {
        const duration = Date.now() - start;
        const { statusCode } = res;

        const logData = {
            method: httpMethod,
            url: url,
            status: statusCode,
            duration: `${duration}ms`,
            ip,
            query: Object.keys(query).length ? query : undefined,
            params: Object.keys(params).length ? params : undefined,
            body: method !== 'GET' ? body : undefined,
            user: req.userSession?.entityId || 'anonymous',
        };

        const message = `${logData.method} ${logData.url} ${logData.status} - ${logData.duration}`;

        if (statusCode >= 500) {
            logger.error(`SERVER_ERROR: ${message}`, logData);
        } else if (statusCode >= 400) {
            logger.warn(`CLIENT_ERROR: ${message}`, logData);
        } else {
            logger.info(`SUCCESS: ${message}`, logData);
        }
    });

    next();
};
