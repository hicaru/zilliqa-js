import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PORT } from '../config';
import { BlockChain } from '../common';
import middleware from './middleware';
import routers from './routers';

const app = express();

app.use(bodyParser.json());

export default function(chain: BlockChain, port = PORT) {
    app.set('chain', chain);
    app.use(cors());
    app.use(middleware, routers);

    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
};
