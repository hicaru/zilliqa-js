import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { RPCErrorCode } from '../../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: chain.dsDifficulty
    });
};
