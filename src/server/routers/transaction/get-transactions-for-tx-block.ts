import { Request, Response } from 'express';
import { BlockChain } from '../../../common';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    // const txns = chain.txBlockchain.

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: String(chain.chainId)
    });
};
