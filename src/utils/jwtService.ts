import jwt, { SignOptions } from 'jsonwebtoken';

import {
    JWT_SECRET,
    JWT_SECRET_EXPIRES_IN,
    REFRESH_SECRET,
    REFRESH_SECRET_EXPIRES_IN,
} from '@/configs/constants';
import { UserSessionData } from '@/types/express';

export interface TokenPayload extends Pick<UserSessionData, 'entityId' | 'entityRole'> {}

export const generateAccessToken = (
    payload: TokenPayload,
    options = { expiresIn: JWT_SECRET_EXPIRES_IN },
) => {
    return jwt.sign(payload, JWT_SECRET, options as SignOptions);
};

export const verifyAccessToken = (token: string): UserSessionData => {
    return jwt.verify(token, JWT_SECRET) as UserSessionData;
};

export const generateRefreshToken = (
    payload: TokenPayload,
    options = { expiresIn: REFRESH_SECRET_EXPIRES_IN },
) => {
    return jwt.sign(payload, REFRESH_SECRET, options as SignOptions);
};

export const verifyRefreshToken = (token: string): UserSessionData => {
    return jwt.verify(token, REFRESH_SECRET) as UserSessionData;
};
