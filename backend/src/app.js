import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

import './database';

class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(cors());
        this.server.use(
            '/uploads',
            express.static(path.resolve(__dirname, '..', 'tmp'))
        );
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
