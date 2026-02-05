import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

import { resSend } from './responseHandler';

import { StatusCode } from '@/types/common';

const options = {
    errors: {
        wrap: {
            label: '',
        },
    },
    allowUnknown: true,
};

const reqValidator = (validator: ObjectSchema) => {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            if (req.method === 'GET') {
                req.query = await validator.validateAsync(req.query, options);
            } else if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
                req.body = await validator.validateAsync(req.body, options);
            }
            next();
        } catch (error) {
            resSend(
                res,
                StatusCode.BAD_REQUEST,
                error.details?.[0]?.context?.message || error.message,
                null,
            );
        }
    };
};

export default reqValidator;
