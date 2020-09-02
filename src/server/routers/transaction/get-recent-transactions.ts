import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { internalError } from '../../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const lastTxBlock = chain.txBlockchain.getLastTXBlock;

    if (!lastTxBlock) {
        return res.json(internalError(body.id, body.jsonrpc));
    }

    const txList = lastTxBlock.transactions.list;

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: {
            TxnHashes: txList,
            number: lastTxBlock.transactions.size()
        }
    });
};
