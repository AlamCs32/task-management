import { GetTaskQuery, CreateTaskBody, UpdateTaskBody, DeleteTaskBody } from './taskType';

import { Task } from '@/entities';
import { TaskRepository } from '@/repository';
import { ServiceResponse, StatusCode } from '@/types/common';
import { UserSessionData } from '@/types/express';
import { throwCustomError } from '@/utils/customeError';
import { createEntity } from '@/utils/entityHelper';
import { UserRole } from '@/utils/enums';
import { isValidQueryString, pagination } from '@/utils/helper';

export const getTaskService = async (
    userSession: UserSessionData,
    query: GetTaskQuery = {},
): ServiceResponse<{ rows: Task[]; rowsCount: number }> => {
    const { entityId, entityRole } = userSession;
    const { search, status, pageNo = 1, pageSize = 10 } = query;
    const { take, skip } = pagination(pageNo, pageSize);

    const qb = TaskRepository.createQueryBuilder('task')
        .leftJoinAndSelect('task.user', 'user')
        .where('task.isActive = :isActive', { isActive: true });

    qb.select([
        'task.taskId',
        'task.title',
        'task.description',
        'task.status',
        'task.dueDate',
        'task.isActive',
        'task.createdAt',
        'task.updatedAt',
        'user.username',
        'user.email',
    ]);

    // Admin can see all tasks
    if (entityId && entityRole === UserRole.USER) {
        qb.andWhere('task.userId = :userId', { userId: entityId });
    }

    if (status) {
        qb.andWhere('task.status = :status', { status });
    }

    if (isValidQueryString(search)) {
        qb.andWhere('task.title ILIKE :search', { search: `%${search}%` });
    }

    qb.orderBy('task.updatedAt', 'DESC');
    qb.skip(skip).take(take);

    const [rows, rowsCount] = await qb.getManyAndCount();

    return {
        rowsCount,
        rows,
    };
};

export const getTaskDetailService = async (
    userSession: UserSessionData,
    taskId: number,
    query: Partial<GetTaskQuery>,
): ServiceResponse => {};

export const createTaskService = async (
    userSession: UserSessionData,
    body: CreateTaskBody,
): ServiceResponse => {
    const { entityId } = userSession;

    await createEntity({
        repository: TaskRepository,
        data: { ...body, user: { userId: entityId } },
    });

    return;
};

export const updateTaskService = async (
    userSession: UserSessionData,
    body: UpdateTaskBody,
): ServiceResponse => {
    const { entityId, entityRole } = userSession;

    const task = await TaskRepository.findOneBy({ taskId: body.taskId, isActive: true });
    if (!task) throwCustomError('Task not found', StatusCode.NOT_FOUND);

    // User can only update their own task
    if (entityRole === UserRole.USER && task.userId !== entityId) {
        throwCustomError('You cannot update this task', StatusCode.FORBIDDEN);
    }

    await TaskRepository.update(body.taskId, body);

    return;
};

export const deleteTaskService = async (
    userSession: UserSessionData,
    body: DeleteTaskBody,
): ServiceResponse => {
    const { taskId } = body;
    const { entityId, entityRole } = userSession;

    const task = await TaskRepository.findOneBy({ taskId, isActive: true });
    if (!task) throwCustomError('Task not found', StatusCode.NOT_FOUND);

    // User can only delete their own task
    if (entityRole === UserRole.USER && task.userId !== entityId) {
        throwCustomError('You cannot delete this task', StatusCode.FORBIDDEN);
    }

    // Soft Delete: Just set isActive to false
    task.isActive = false;
    await TaskRepository.save(task);

    return;
};
