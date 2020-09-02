import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { invalidParams } from '../../errors';
import { TransactionStatuses } from '../../../config';

export default function(req: Request, res: Response) {
    const { body } = req;
    const [hash] = body.params;
    const chain = req.app.settings.chain as BlockChain;

    if (!hash) {
        return res.json(invalidParams(body.id, body.jsonrpc));
    } else if (hash.length != 64) {
        return res.json(invalidParams(body.id, body.jsonrpc, 'Txn Hash size not appropriate'));
    }

    const tx = chain.txBlockchain.getTransaction(hash);

    if (!tx) {
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            result: {
                code: TransactionStatuses.TransactionNotFound,
                confirmed: false
            }
        });
    }

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: {
            code: tx.status,
            confirmed: tx.receipt?.success,
            pending: false
        }
    });
};
