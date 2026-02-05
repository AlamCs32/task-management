import { AppDataSource } from '@/configs/postgresDataSource';
import { Task, User, UserRole } from '@/entities';

export const UserRepository = AppDataSource.getRepository(User);
export const TaskRepository = AppDataSource.getRepository(Task);
export const UserRoleRepository = AppDataSource.getRepository(UserRole);
