import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { RPCErrorCode } from '../../errors';
import { paginate } from '../../../utils';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const lastTXBlock = chain.getLastTXBlock;
    let { params } = body;

    if (!lastTXBlock) {
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            error: {
                data: null,
                code: RPCErrorCode.RPC_INTERNAL_ERROR,
                message: 'INTERNAL_ERROR: no found rootTxBlock or txBlock.'
            }
        });
    }

    if (!params[0]) {
        return res.json({
            id: body.id,
            jsonrpc: body.jsonrpc,
            error: {
                data: null,
                code: RPCErrorCode.RPC_INVALID_PARAMS,
                message: 'INVALID_PARAMS: Invalid method parameters (invalid name and/or type) recognised'
            }
        });
    }

    const maxPages = lastTXBlock.transactions.size();
    const blockNumbers = Object.keys(lastTXBlock.transactions.list);
    const paginatedBlocksNumbers = paginate(blockNumbers, 11, params[0]);
    const data = paginatedBlocksNumbers.map((blockNumber) => ({
        BlockNum: Number(blockNumber),
        Hash: lastTXBlock.transactions.list[Number(blockNumber)].hash
    }));

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: {
            data,
            maxPages
        }
    });
};
