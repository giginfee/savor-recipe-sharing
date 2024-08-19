import swaggerJSDoc  from 'swagger-jsdoc';
import {serve, setup} from 'swagger-ui-express';
import { Express } from 'express';
import { userSchema } from './swaggerSchemas/UserSchema';
import { errorSchema } from './swaggerSchemas/ErrorSchema';


const options:swaggerJSDoc.OAS3Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Savor API',
            version: '1.0.0',
            description: 'An API documentation for Savor back-end',
        },
        servers: [
            {
                url: process.env.SERVER_URL,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: userSchema,
                Error: errorSchema,
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts']
};


const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
    app.use('/api-docs', serve, setup(swaggerSpec));
}