import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { notSupport, invalidParams, RPCErrorCode } from '../../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const [address] = body.params;

    if (!address) {
        return res.json(invalidParams(body.id, body.jsonrpc));
    }

    const chain = req.app.settings.chain as BlockChain;
    const account = chain.getAccount(address);

    if (!account) {
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            error: {
                data: null,
                code: RPCErrorCode.RPC_INVALID_ADDRESS_OR_KEY,
                message: 'Account is not created'
            }
        });
    }

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: {
            balance: account.balance,
            nonce: account.nonce
        }
    });
};
