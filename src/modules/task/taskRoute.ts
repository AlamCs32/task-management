import { Router } from 'express';

import * as taskController from './taskController';
import * as taskValidation from './taskValidation';

import { authenticateUser } from '@/middleware/authMiddleware';
import reqValidator from '@/middleware/payloadValidator';

const router = Router();

router.get(
    '/',
    authenticateUser(),
    reqValidator(taskValidation.getTaskValidation),
    taskController.getTask,
    /* #swagger.path = '/api/tasks'
      #swagger.method = 'get'
      #swagger.tags = ['Tasks']
      #swagger.summary = 'Get all tasks'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.parameters['search'] = { in: 'query', type: 'string' }
      #swagger.parameters['status'] = { in: 'query', type: 'string', enum: ['PENDING', 'IN_PROGRESS', 'COMPLETED'] }
      #swagger.parameters['pageNo'] = { in: 'query', type: 'integer', default: 1 }
      #swagger.parameters['pageSize'] = { in: 'query', type: 'integer', default: 10 }
    */
);

router.get(
    '/:taskId',
    authenticateUser(),
    taskController.getTask,
    /* #swagger.path = '/api/tasks/{taskId}'
      #swagger.method = 'get'
      #swagger.tags = ['Tasks']
      #swagger.summary = 'Get task details'
      #swagger.security = [{ "bearerAuth": [] }]
    */
);

router.post(
    '/',
    authenticateUser(),
    reqValidator(taskValidation.createTaskValidation),
    taskController.createTask,
    /* #swagger.path = '/api/tasks'
      #swagger.method = 'post'
      #swagger.tags = ['Tasks']
      #swagger.summary = 'Create a new task'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: { type: "string", example: "Buy Groceries" },
                description: { type: "string", example: "Milk, Bread, Eggs" },
                status: { type: "string", example: "PENDING" },
                dueDate: { type: "string", format: "date-time", example: "2026-12-31T23:59:59Z" }
              },
              required: ["title", "dueDate"]
            }
          }
        }
      }
    */
);

router.put(
    '/',
    authenticateUser(),
    reqValidator(taskValidation.updateTaskValidation),
    taskController.updateTask,
    /* #swagger.path = '/api/tasks'
      #swagger.method = 'put'
      #swagger.tags = ['Tasks']
      #swagger.summary = 'Update a task'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                taskId: { type: "integer", example: 1 },
                title: { type: "string" },
                status: { type: "string" }
              },
              required: ["taskId"]
            }
          }
        }
      }
    */
);

router.delete(
    '/',
    authenticateUser(),
    reqValidator(taskValidation.deleteTaskValidation),
    taskController.deleteTask,
    /* #swagger.path = '/api/tasks'
      #swagger.method = 'delete'
      #swagger.tags = ['Tasks']
      #swagger.summary = 'Delete a task'
      #swagger.security = [{ "bearerAuth": [] }]
      #swagger.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                taskId: { type: "integer", example: 1 }
              },
              required: ["taskId"]
            }
          }
        }
      }
    */
);

export default router;
