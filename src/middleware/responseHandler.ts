import { Response } from 'express';

import message, { MessageCode } from './msgs';

export interface ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data: T;
}

export interface CookieOptions {
    name: string;
    value: string;
    options?: {
        domain?: string;
        path?: string;
        expires?: Date;
        maxAge?: number;
        secure?: boolean;
        httpOnly?: boolean;
        sameSite?: 'strict' | 'lax' | 'none';
    };
}

export const resSend = <T>(
    res: Response,
    code: MessageCode,
    customMessage?: string,
    data?: T,
    cookies?: CookieOptions | CookieOptions[],
): void => {
    const config = message[code] ?? message[500];

    // Optional cookie support (future-safe)
    if (cookies) {
        const cookieList = Array.isArray(cookies) ? cookies : [cookies];
        cookieList.forEach((c) => res.cookie(c.name, c.value, c.options));
    }

    const response: ApiResponse<T> = {
        success: config.status,
        message: customMessage ?? config.message,
        data: data ?? ({} as T),
    };

    res.status(config.httpCode).json(response);
};
