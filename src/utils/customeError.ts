import { StatusCode } from '@/types/common';

export function throwCustomError(
    message: string,
    status: StatusCode = StatusCode.SERVER_ERROR,
    data = {},
) {
    throw Object.assign(new Error(message), {
        status,
        data,
    });
}
