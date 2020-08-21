import express from 'express';

const router = express();

router.get('/', (req, res) => res.send('test'));


export default router;
