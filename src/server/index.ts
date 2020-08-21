import express from 'express';
import { PORT } from '../config';

const app = express();

app.get('/', (req, res) => res.send('test'));

export default function() {
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
};
