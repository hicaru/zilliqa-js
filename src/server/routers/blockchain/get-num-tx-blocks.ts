import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { RPCErrorCode } from '../../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const txBlock = chain.getLastTXBlock;

    if (!txBlock) {
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            error: {
                data: null,
                code: RPCErrorCode.RPC_INTERNAL_ERROR,
                message: 'INTERNAL_ERROR: no found txBlock.'
            }
        });
    }

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: txBlock.getHeader().blockNum
    });
};