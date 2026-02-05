import { DataSource } from 'typeorm';

import { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } from '@/configs/constants';
import { Task, User, UserRole } from '@/entities';
import { isProd } from '@/utils/helper';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    synchronize: isProd ? false : true,
    logging: isProd ? false : true,
    entities: [User, UserRole, Task],
    migrations: [],
    subscribers: [],
});
