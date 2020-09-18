import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { RPCErrorCode, invalidParams, internalError } from '../../errors';
import { paginate } from '../../../utils';
import BN from 'bn.js';

export default function(req: Request, res: Response) {
    const amountOfResult = 11;
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const lastTxBlock = chain.txBlockchain.lastblock;
    let { params } = body;
    let data = [];

    if (!lastTxBlock) {
        return res.json(internalError(body.id, body.jsonrpc, 'no found DsBlock.'));
    }

    if (!params[0]) {
        return res.json(invalidParams(body.id, body.jsonrpc));
    }

    try {
        const lastTXBlockNumber = lastTxBlock.getHeader().blockNum;
        const first = lastTXBlockNumber >= amountOfResult ? lastTXBlockNumber - amountOfResult : 0;
        const maxPages = (
            new BN(lastTXBlockNumber).div(new BN(amountOfResult))
        ).toNumber();
    
        for (let index = first; index < first + amountOfResult; index++) {
            const txBlock = chain.txBlockchain.getBlock(index);
    
            if (txBlock) {
                data.push({
                    BlockNum: index,
                    Hash: txBlock?.blockHash
                });
            }
        }

        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            result: {
                data,
                maxPages
            }
        });
    } catch (err) {
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            error: {
                data: null,
                code: RPCErrorCode.JSON_PARSE_ERROR,
                message: 'JSON_PARSE_ERROR: The JSON-Object is not JSON-Valid'
            }
        });
    }
};
