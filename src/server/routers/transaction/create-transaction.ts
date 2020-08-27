import { Request, Response } from 'express';
import { BlockChain, Transaction } from '../../../common';
import { invalidParams } from '../../errors';

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
    
        chain.addTransaction(transaction);
    
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            result: String(chain.chainId)
        });
    } catch (err) {
        console.error(err);
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            result: String(chain.chainId)
        });
    }
};
