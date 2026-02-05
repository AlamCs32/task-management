import express, { Application } from 'express';

import authRoute from '@/modules/auth/authRoute';
import taskRoute from '@/modules/task/taskRoute';

const app: Application = express();

app.use('/auth', authRoute);
app.use('/task', taskRoute);

export default app;
