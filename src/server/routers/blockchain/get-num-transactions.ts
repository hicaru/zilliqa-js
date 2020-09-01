import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { internalError } from '../../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const result = chain.getNumTransactions;

    if (!result) {
        return res.json(internalError(body.id, body.jsonrpc, ''));
    }

    return res.json({
        result,
        id: body.id,
        jsonrpc: body.jsonrpc
    });
};
