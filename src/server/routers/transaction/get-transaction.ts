import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { invalidParams, RPCErrorCode } from '../../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const [hash] = body.params;
    const chain = req.app.settings.chain as BlockChain;

    if (!hash) {
        return res.json(invalidParams(body.id, body.jsonrpc));
    }

    const tx = chain.txBlockchain.getTransaction(hash);

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: tx
    });
};
