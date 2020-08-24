import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { internalError, invalidParams } from '../../errors';
import { paginate } from '../../../utils';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const lastTXBlock = chain.getLastTXBlock;
    let { params } = body;

    if (!lastTXBlock) {
        return res.json(internalError(body.id, body.jsonrpc, 'no found lastTXBlock.'));
    }

    if (!params[0]) {
        return res.json(invalidParams(body.id, body.jsonrpc));
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
