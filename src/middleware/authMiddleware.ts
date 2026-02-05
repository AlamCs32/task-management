import { Request, Response, NextFunction } from 'express';

import { StatusCode } from '@/types/common';
import { throwCustomError } from '@/utils/customeError';
import { verifyAccessToken } from '@/utils/jwtService';

export const authenticateUser = (...userType: string[]) => {
    return async (req: Request, _res: Response, next: NextFunction) => {
        const authorizationHeader = req.headers['authorization'];

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            throwCustomError('Bearer token missing or invalid', StatusCode.UNAUTHORIZED);
        }

        const token = authorizationHeader.split(' ')[1];

        try {
            const decodedToken = verifyAccessToken(token);

            if (!decodedToken || !decodedToken.entityRole) {
                return throwCustomError('Invalid session payload', StatusCode.UNAUTHORIZED);
            }
            if (userType.length && !userType.includes(decodedToken?.entityRole)) {
                throwCustomError('Access denied', StatusCode.FORBIDDEN);
            }

            req.userSession = decodedToken;
            next();
        } catch (error: any) {
            if (error.name === 'TokenExpiredError') {
                error.status = StatusCode.UNAUTHORIZED;
                error.message = 'Session expired. Please log in again.';
            }
            next(error);
        }
    };
};
