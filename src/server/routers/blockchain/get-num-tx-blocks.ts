import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { internalError } from '../../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const txBlock = chain.txBlockchain.lastblock;

    if (!txBlock) {
        return res.json(internalError(body.id, body.jsonrpc, 'no found txBlock.'));
    }

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: txBlock.getHeader().blockNum + 1
    });
};
