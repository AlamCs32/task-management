import express, { Application } from 'express';

import authRoute from '@/modules/auth/authRoute';

const app: Application = express();

app.use('/auth', authRoute);

export default app;
