import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { invalidParams, UnableToProcess } from '../../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const [hash] = body.params;
    const chain = req.app.settings.chain as BlockChain;

    if (!hash) {
        return res.json(invalidParams(body.id, body.jsonrpc));
    } else if (hash.length < 64 || hash.length > 64) {
        return res.json(invalidParams(body.id, body.jsonrpc, 'Txn Hash size not appropriate'));
    }

    const tx = chain.txBlockchain.getTransaction(hash);

    if (!tx) {
        return res.json(UnableToProcess(body.id, body.jsonrpc));
    }

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: {
            ID: tx.hash,
            amount: String(tx.amount),
            gasLimit: String(tx.gasLimit),
            gasPrice: String(tx.gasPrice),
            nonce: String(tx.nonce),
            receipt: tx.receipt,
            senderPubKey: `0x${tx.pubKey}`,
            signature: `0x${tx.signature}`,
            toAddr: String(tx.toAddr),
            version: String(tx.version)
        }
    });
};
