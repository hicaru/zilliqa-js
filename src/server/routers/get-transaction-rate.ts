import { Request, Response } from 'express';
import { BlockChain } from '../../common';
// import { RPCErrorCode } from '../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    // const chain = req.app.settings.chain as BlockChain;
    // const txBlock = chain.getLastTXBlock;

    // if (!txBlock) {
    //     return res.json({
    //         code: RPCErrorCode.RPC_INTERNAL_ERROR
    //     });
    // }

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: 100
    });
};
