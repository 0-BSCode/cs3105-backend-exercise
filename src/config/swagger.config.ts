import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const jsDocOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management API',
            version: '1.0.0',
            description: 'A simple API for managing users',
        },
    },
    apis: [path.join(__dirname, '..', 'routes/*.{js,ts}')],
};

export const specs = swaggerJSDoc(jsDocOptions);