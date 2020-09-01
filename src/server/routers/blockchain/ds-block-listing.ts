import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { RPCErrorCode, invalidParams, internalError } from '../../errors';
import { paginate } from '../../../utils';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const lastDSBlock = chain.dsBlockchain.getLastDSBlock;
    let { params } = body;

    if (!lastDSBlock) {
        return res.json(internalError(body.id, body.jsonrpc, 'no found DsBlock.'));
    }

    if (!params[0]) {
        return res.json(invalidParams(body.id, body.jsonrpc));
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
