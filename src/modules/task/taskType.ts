import { TaskStatus } from '@/utils/enums';

export interface GetTaskQuery {
    search?: string;
    status?: TaskStatus;
    pageNo?: number;
    pageSize?: number;
}

export interface CreateTaskBody {
    title: string;
    description?: string;
    status?: TaskStatus;
    dueDate: Date;
}

export interface UpdateTaskBody {
    taskId: number;
    title?: string;
    description?: string;
    status?: TaskStatus;
    dueDate: Date;
}

export interface DeleteTaskBody {
    taskId: number;
}
