import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { RPCErrorCode, invalidParams, internalError } from '../../errors';
import { paginate } from '../../../utils';

export default function(req: Request, res: Response) {
    const amountOfResult = 11;
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const lastDSBlock = chain.dsBlockchain.getLastDSBlock;
    let { params } = body;
    let data = [];

    if (!lastDSBlock) {
        return res.json(internalError(body.id, body.jsonrpc, 'no found DsBlock.'));
    }

    if (!params[0]) {
        return res.json(invalidParams(body.id, body.jsonrpc));
    }

    try {
        const lastDsBlockNumber = lastDSBlock.getHeader().blockNum;
        const first = lastDsBlockNumber >= amountOfResult ? lastDsBlockNumber - amountOfResult : 0;
        const maxPages = first + amountOfResult;
    
        for (let index = first; index < first + amountOfResult; index++) {
            const dsBlock = chain.dsBlockchain.getBlock(index);
    
            if (dsBlock) {
                data.push({
                    BlockNum: index,
                    Hash: dsBlock?.blockHash
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
