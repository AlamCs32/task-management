import 'dotenv/config';
import fs from 'fs';
import path from 'path';

import swaggerAutogen from 'swagger-autogen';

import { SWAGGER_HOST } from './configs/constants';

const doc = {
    info: {
        title: 'Helpie App',
        description: 'API Documentation for Helpie App',
    },
    servers: [
        {
            url: SWAGGER_HOST,
        },
    ],
    schemes: ['http', 'https'],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
                name: 'authorization',
                in: 'header',
            },
        },
    },
};

const paths = ['./modules/auth/authRoute.ts'];

const outputFile = path.join(__dirname, './swagger-output.json');
// const endpointsFiles = [path.join(__dirname, './modules/auth/authRoute.ts')];
const endpointsFiles = paths.map((routesPath: string) => path.join(__dirname, routesPath));

if (!fs.existsSync(outputFile)) {
    fs.writeFileSync(outputFile, JSON.stringify({}, null, 2));
}

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
