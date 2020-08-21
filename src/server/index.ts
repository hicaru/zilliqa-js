import express from 'express';
import { PORT } from '../config';
import { BlockChain } from '../common';

const app = express();

app.get('/', (req, res) => res.send('test'));

export default function(chain: BlockChain) {
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
};
