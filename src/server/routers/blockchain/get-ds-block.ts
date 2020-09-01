import { Request, Response } from 'express';
import { BlockChain } from '../../../common';
import { internalError, invalidParams } from '../../errors';

export default function(req: Request, res: Response) {
    const { body } = req;
    const chain = req.app.settings.chain as BlockChain;
    const [id] = body.params;
    const dsBlock = chain.dsBlockchain.getBlock(Number(id));

    if (!id) {
        return res.json(invalidParams(body.id, body.jsonrpc));
    }

    if (!dsBlock) {
        return res.json(internalError(body.id, body.jsonrpc, 'no found DsBlock.'));
    }

    return res.json({
        id: body.id,
        jsonrpc: body.jsonrpc,
        result: {
            header: {
                BlockNum: String(dsBlock.blockHeader.blockNum),
                Difficulty: chain.difficulty,
                DifficultyDS: chain.dsDifficulty,
                GasPrice: String(chain.defaultGasPrice),
                LeaderPubKey: String(chain.defaultMiner),
                PoWWinners: [],
                PrevHash: String(dsBlock.blockHeader.prevHash),
                Timestamp: String(dsBlock.timestamp)
              },
              signature: dsBlock.blockHash
        }
    });
};
