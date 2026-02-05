import Joi from 'joi';

import { CreateTaskBody, DeleteTaskBody, GetTaskQuery, UpdateTaskBody } from './taskType';

import { TaskStatus } from '@/utils/enums';

const { string, number, date } = Joi.types();

const taskStatusValues = Object.values(TaskStatus);

export const getTaskValidation = Joi.object<GetTaskQuery>({
    search: string.allow('').optional().trim(),
    status: string.valid(...taskStatusValues).optional(),
    pageNo: number.integer().min(1).default(1),
    pageSize: number.integer().min(1).max(100).default(10),
});

export const createTaskValidation = Joi.object<CreateTaskBody>({
    title: string.required().min(3).max(255).trim(),
    description: string.optional().allow('').trim(),
    status: string.valid(...taskStatusValues).default(TaskStatus.PENDING),
    dueDate: date.iso().required().messages({
        'date.format': 'dueDate must be a valid ISO date',
    }),
});

export const updateTaskValidation = Joi.object<UpdateTaskBody>({
    taskId: number.integer().required(),
    title: string.optional().min(3).max(255).trim(),
    description: string.optional().allow('').trim(),
    status: string.valid(...taskStatusValues).optional(),
    dueDate: date.iso().optional(),
}).min(1);

export const deleteTaskValidation = Joi.object<DeleteTaskBody>({
    taskId: number.integer().required(),
});
