import express from 'express';
import { Request, Response } from 'express';

import { Methods } from '../methods';

import GetNetworkId from './get-network-id';

const router = express();

function jsonRPC(req: Request, res: Response) {
    const { method } = req.body;
     
    switch (method) {
        case Methods.GET_NETWORK_ID:
            return GetNetworkId(req, res);
    }
}

router.post('/', jsonRPC);

export default router;
