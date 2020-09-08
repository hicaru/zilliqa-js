import { Request, Response } from 'express';
import { BlockChain, CircularArray } from '../../../common';
import { internalError, invalidParams, RPCErrorCode } from '../../errors';
import { paginate } from '../../../utils';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const lastTXBlock = chain.txBlockchain.getLastTXBlock;
    const lastDSBlock = chain.dsBlockchain.getLastDSBlock;
    let { params } = body;

    if (!lastTXBlock) {
        return res.json(internalError(body.id, body.jsonrpc, 'no found lastTXBlock.'));
    }

    if (!params[0]) {
        return res.json(invalidParams(body.id, body.jsonrpc));
    }

    if (!lastDSBlock?.txBlocks) {
        return res.json(internalError(body.id, body.jsonrpc));
    }

    try {
        let data = [];

        if (lastDSBlock?.txBlocks instanceof CircularArray) {
            const keys = Object.keys(lastDSBlock?.txBlocks.list);

            data = keys.map((key) => ({
                BlockNum: key,
                Hash: lastDSBlock?.txBlocks.list[key].blockHash
            }));
        } else {
            data = (lastDSBlock?.txBlocks as any);
        }

        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            result: {
                data,
                maxPages: data.length
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
