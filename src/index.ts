import 'reflect-metadata';
import cors from 'cors';
import express, { Application } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { CORS_ORIGIN, PORT } from '@/configs/constants';
import { AppDataSource } from '@/configs/postgresDataSource';
import errorHandler from '@/middleware/errorHandler';
import { requestLogger } from '@/middleware/requestLogger';
import allRoutes from '@/routes';
import swaggerFile from '@/swagger-output.json';
import logger from '@/utils/logger';

const app: Application = express();

// Initialize Data Source
AppDataSource.initialize()
    .then(async () => {
        logger.info('\n== Data Source has been initialized! ==');
    })
    .catch((error) => logger.error(error));

// Allow cors
app.use(
    cors({
        origin: CORS_ORIGIN,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
);

// Allow app to use json
app.use(express.json({ limit: '500mb' }));

// Log Middleware
app.use(requestLogger);

// Log http requests
app.use(morgan('dev'));

// Allow all Routes
app.use('/api', allRoutes);

// Server Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Global Error Handler
app.use(errorHandler);

// Server Connection
app.listen(PORT, () => {
    logger.info(`== Server running on Port ${PORT} ==`);
});
