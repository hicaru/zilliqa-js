import { Request, Response } from 'express';
import { BlockChain, Transaction } from '../../../common';
import { invalidParams, unableToVerifyTransaction } from '../../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const [attributes] = body.params;

    if (!attributes) {
        return res.json(invalidParams(body.id, body.jsonrpc));
    }

    const chain = req.app.settings.chain as BlockChain;

    try {
        const transaction = new Transaction(
            attributes.version,
            attributes.nonce,
            attributes.amount,
            attributes.gasPrice,
            attributes.gasLimit,
            attributes.code,
            attributes.data,
            attributes.toAddr,
            attributes.pubKey,
            attributes.signature,
            attributes.priority
        );
    
        chain.txBlockchain.addTransaction(transaction);
    
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            result: {
                Info: transaction.info,
                TranID: transaction.hash
            }
        });
    } catch (err) {
        return res.json(unableToVerifyTransaction(body.id, body.jsonrpc));
    }
};
