import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from '../config';
import { BlockChain } from '../common';
import middleware from './middleware';

const app = express();

app.use(bodyParser.json());

export default function(chain: BlockChain) {
    app.set('chain', chain);
    app.use(middleware);

    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
};
