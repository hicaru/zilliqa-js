import express from 'express';
import { Request, Response } from 'express';

import { Methods } from '../methods';

import GetNetworkId from './get-network-id';
import GetBlockchainInfo from './get-blockchain-info';
import GetDsBlock from './get-ds-block';
import GetLatestDsBlock from './get-latest-ds-block';

const router = express();

function jsonRPC(req: Request, res: Response) {
    const { method } = req.body;
     
    switch (method) {
        case Methods.GET_NETWORK_ID:
            return GetNetworkId(req, res);
        case Methods.GET_BLOCKCHAIN_INFO:
            return GetBlockchainInfo(req, res);
        case Methods.GET_DS_BLOCK:
            return GetDsBlock(req, res);
        case Methods.GET_LATEST_DS_BLOCK:
            return GetLatestDsBlock(req, res);
    }
}

router.post('/', jsonRPC);

export default router;
