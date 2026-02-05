import { NODE_ENV } from '@/configs/constants';

export const isProd: boolean = NODE_ENV === 'production';

interface IPagination {
    take: number;
    skip: number;
}

export const pagination = (pageNo: number = 1, pageSize: number = 10): IPagination => {
    return {
        take: pageSize,
        skip: (pageNo - 1) * pageSize,
    };
};
