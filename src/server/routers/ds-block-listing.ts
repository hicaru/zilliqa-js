import { Request, Response } from 'express';
import { BlockChain } from '../../common';
import { RPCErrorCode } from '../errors';
import { paginate } from '../../utils';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const lastDSBlock = chain.getLastDSBlock;
    let { params } = body;

    if (!lastDSBlock) {
        return res.json({
            code: RPCErrorCode.RPC_INTERNAL_ERROR
        });
    }

    if (!params || !params[0]) {
        params = [1];
    }

    const maxPages = lastDSBlock.txBlocks.size();
    const blockNumbers = Object.keys(lastDSBlock.txBlocks.list);
    const paginatedBlocksNumbers = paginate(blockNumbers, 11, params[0]);
    const data = paginatedBlocksNumbers.map((blockNumber) => ({
        BlockNum: Number(blockNumber),
        Hash: lastDSBlock.txBlocks.list[Number(blockNumber)].blockHash
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
