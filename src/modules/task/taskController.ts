import { Request, Response } from 'express';

import * as taskService from './taskService';

import { resSend } from '@/middleware/responseHandler';
import { StatusCode } from '@/types/common';
import { throwCustomError } from '@/utils/customeError';

export const getTask = async (req: Request, res: Response) => {
    const { userSession, query } = req;
    const response = await taskService.getTaskService(userSession, query);
    resSend(res, StatusCode.OK, 'Fetch task successfully', response);
};

export const getTaskDetail = async (req: Request, res: Response) => {
    const { userSession, params, query } = req;

    const taskId = Number(params.taskId);

    if (!Number.isInteger(taskId) || taskId <= 0) {
        throwCustomError('taskId is invalid', StatusCode.BAD_REQUEST);
    }

    const response = await taskService.getTaskDetailService(userSession, taskId, query);

    resSend(res, StatusCode.OK, 'Fetch task detail successfully', response);
};

export const createTask = async (req: Request, res: Response) => {
    const { userSession, body } = req;
    const response = await taskService.createTaskService(userSession, body);
    resSend(res, StatusCode.OK, 'Task created successfully', response);
};

export const updateTask = async (req: Request, res: Response) => {
    const { userSession, body } = req;
    const response = await taskService.updateTaskService(userSession, body);
    resSend(res, StatusCode.OK, 'Task updated successfully', response);
};

export const deleteTask = async (req: Request, res: Response) => {
    const { userSession, body } = req;
    const response = await taskService.deleteTaskService(userSession, body);
    resSend(res, StatusCode.OK, 'Task deleted successfully', response);
};
