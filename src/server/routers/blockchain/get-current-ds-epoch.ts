import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { internalError } from '../../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const lastDsBlock = chain.getLastDSBlock;

    if (!lastDsBlock) {
        return res.json(internalError(body.id, body.jsonrpc, 'no found DsBlock.'));
    }

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: String(lastDsBlock.getHeader().blockNum)
    });
};
