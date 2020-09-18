import { Request, Response } from 'express';
import { BlockChain, CircularArray } from '../../../common';
import { internalError } from '../../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const lastTxBlock = chain.txBlockchain.lastblock;
    let txBool = [];

    if (!lastTxBlock) {
        return res.json(internalError(body.id, body.jsonrpc));
    }

    if (lastTxBlock.transactions instanceof CircularArray) {
        const txList = lastTxBlock.transactions.list;

        txBool = Object.keys(txList);
    } else {
        txBool = lastTxBlock.transactions;
    }

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: {
            TxnHashes: txBool,
            number: lastTxBlock.transactions.size()
        }
    });
};
