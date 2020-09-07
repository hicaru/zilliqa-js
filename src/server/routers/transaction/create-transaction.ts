import { Request, Response } from 'express';
import { getAddressFromPublicKey } from '@zilliqa-js/crypto/dist/util';
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
        const address = getAddressFromPublicKey(attributes.pubKey);
        const account = chain.getAccount(address);
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

        if (!transaction.isValid()) {
            return res.json(unableToVerifyTransaction(body.id, body.jsonrpc));
        }
    
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
