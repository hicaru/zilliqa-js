import { Request, Response } from 'express';
import { BlockChain } from '../../../common';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const pendingTxns = chain.txBlockchain.pendingTransactions.list;
    const hashSet = Object.keys(pendingTxns);

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: {
            Txns: hashSet.map((hash) => ({
                TxnHash: hash,
                code: pendingTxns[hash].status
            }))
        }
    });
};
