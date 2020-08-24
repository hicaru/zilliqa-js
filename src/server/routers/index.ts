import express from 'express';
import { Request, Response } from 'express';

import { Methods } from '../methods';

import { blockchainRoute } from './blockchain';
import { transactionRoute } from './transaction';

const router = express();

function jsonRPC(req: Request, res: Response) {
    const { method } = req.body;

    blockchainRoute(method, req, res);
    transactionRoute(method, req, res);
}

router.post('/', jsonRPC);

export default router;
